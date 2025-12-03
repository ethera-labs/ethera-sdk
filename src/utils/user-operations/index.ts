import { getPaymasterDataForChain } from '@/api/paymaster';
import type { ComposeConfigReturnType } from '@/config/create';
import type { ComposedSignedUserOpsTxReturnType } from '@/main';
import { encodeXtMessage, toRpcUserOpCanonical } from '@/main';
import type { ComposeRpcSchema } from '@/types/compose';
import type { SignUserOperationsRequest } from '@zerodev/multi-chain-ecdsa-validator';
import { prepareAndSignUserOperations, signUserOperations } from '@zerodev/multi-chain-ecdsa-validator';
import type { CreateKernelAccountReturnType } from '@zerodev/sdk';
import type { Chain, Client, PublicClient, Transport } from 'viem';
import { type Address, type Hex } from 'viem';
import type { GetPaymasterDataParameters, PaymasterActions, SmartAccount } from 'viem/account-abstraction';

const FALLBACK_CALL_GAS_LIMIT = 900_000n;
const MIN_VERIFICATION_GAS_LIMIT = 1_200_000n;
const PRE_VERIFICATION_GAS = 90_000n;

const withMargin = (value: bigint, marginPct = 25n) => value + (value * marginPct) / 100n;

export type UserOPCall = {
  to: Address;
  value: bigint;
  data: Hex;
};

export const createUserOps = async (
  config: ComposeConfigReturnType,
  account: CreateKernelAccountReturnType<'0.7'>,
  calls: UserOPCall[]
) => {
  const chainId = account.client.chain!.id;
  const publicClient = config.getPublicClient(chainId);
  if (!publicClient) {
    throw new Error(`Public client not found for chain ${chainId}`);
  }

  // Estimate gas for each call
  const callGasEstimates = await Promise.all(
    calls.map((call) =>
      publicClient
        .estimateGas({
          account,
          to: call.to,
          data: call.data,
          value: call.value
        })
        .then(withMargin)
        .catch((error: Error) => {
          console.warn(
            `Gas estimation failed for call to ${call.to}, falling back`,
            'message' in error ? error.message : 'Unknown error'
          );
          return FALLBACK_CALL_GAS_LIMIT;
        })
    )
  );

  // Sum all call gas limits
  const callGasLimit = callGasEstimates.reduce((acc, gas) => acc + gas, 0n);

  // Calculate verification gas limit
  const verificationGasLimit =
    callGasLimit + PRE_VERIFICATION_GAS > MIN_VERIFICATION_GAS_LIMIT
      ? callGasLimit + PRE_VERIFICATION_GAS
      : MIN_VERIFICATION_GAS_LIMIT;

  // Estimate fees per gas
  const gasEstimate = await publicClient.estimateFeesPerGas();

  const paymaster: PaymasterActions | undefined = config.hasPaymaster
    ? {
        getPaymasterData: (parameters: GetPaymasterDataParameters) => {
          return getPaymasterDataForChain({
            params: parameters,
            method: 'pm_sponsorUserOperation',
            getPaymasterEndpoint: config.getPaymasterEndpoint!
          });
        },
        getPaymasterStubData: (parameters: GetPaymasterDataParameters) => {
          return getPaymasterDataForChain({
            params: parameters,
            method: 'pm_getPaymasterStubData',
            getPaymasterEndpoint: config.getPaymasterEndpoint!
          });
        }
      }
    : undefined;

  const callData = await account.encodeCalls(calls);

  return {
    account,
    chainId,
    callData,
    callGasLimit,
    verificationGasLimit,
    preVerificationGas: PRE_VERIFICATION_GAS,
    maxFeePerGas: gasEstimate.maxFeePerGas!,
    maxPriorityFeePerGas: gasEstimate.maxPriorityFeePerGas!,
    ...(paymaster ? { paymaster } : {})
  };
};

export type CreateUserOPReturnType = Awaited<ReturnType<typeof createUserOps>>;

type ComposeUnpreparedUserOpsParams = {
  account: CreateKernelAccountReturnType;
  publicClient: PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
  userOp: CreateUserOPReturnType;
}[];

export type ComposeUserOpsOptions = {
  onSigned?: (signedOps: ReturnType<typeof toRpcUserOpCanonical>[]) => void;
  onComposed?: (builds: ComposedSignedUserOpsTxReturnType[], explorerUrls: string[]) => void;
  onPayloadEncoded?: (payload: Hex) => void;
};

export const composeUnpreparedUserOps = async (
  operations: ComposeUnpreparedUserOpsParams,
  options: ComposeUserOpsOptions = {}
) => {
  const signedCanonicalOps = (
    await prepareAndSignUserOperations(
      operations.map((operation) => operation.publicClient as Client<Transport, Chain, SmartAccount>),
      operations.map((operation) => operation.userOp)
    )
  ).map(toRpcUserOpCanonical);

  options.onSigned?.(signedCanonicalOps);

  return composeSignedUserOps(
    operations.map((op, i) => ({ ...op, signedCanonicalOps: signedCanonicalOps[i] })),
    options
  );
};

type ComposePreparedUserOpsParams = {
  account: CreateKernelAccountReturnType;
  publicClient: PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
  userOp: SignUserOperationsRequest;
}[];

export const composePreparedUserOps = async (
  operations: ComposePreparedUserOpsParams,
  options: ComposeUserOpsOptions = {}
) => {
  const unsignedUserOps = operations.map((op) => op.userOp);
  const sourcePublicClient = operations[0].publicClient;
  const sourceKernelAccount = operations[0].account;

  const signedCanonicalOps = (
    await signUserOperations(sourcePublicClient, {
      userOperations: unsignedUserOps,
      account: sourceKernelAccount // it uses it to get the Entrypoint address and version
    })
  ).map(toRpcUserOpCanonical);

  options.onSigned?.(signedCanonicalOps);

  return composeSignedUserOps(
    operations.map((op, i) => ({ ...op, signedCanonicalOps: signedCanonicalOps[i] })),
    options
  );
};

export type composeSignedUserOpsParams = {
  signedCanonicalOps: ReturnType<typeof toRpcUserOpCanonical>;
  publicClient: PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
}[];

export const composeSignedUserOps = async (
  operations: composeSignedUserOpsParams,
  options: ComposeUserOpsOptions = {}
) => {
  const builds = await Promise.all(
    operations.map((operation) =>
      operation.publicClient.request({
        method: 'compose_buildSignedUserOpsTx',
        params: [[operation.signedCanonicalOps], { chainId: operation.publicClient.chain!.id }]
      })
    )
  );

  const explorerUrls = builds.map((build, i) =>
    new URL(`tx/${build.hash}`, operations[i].publicClient.chain!.blockExplorers?.default?.url).toString()
  );

  options.onComposed?.(builds, explorerUrls);

  const payload = encodeXtMessage({
    senderId: 'client',
    entries: builds.map((build, i) => ({
      chainId: operations[i].publicClient.chain!.id,
      rawTx: build.raw as `0x${string}`
    }))
  });

  return {
    payload,
    builds,
    explorerUrls,
    send: () =>
      operations[0].publicClient
        .request({
          method: 'eth_sendXTransaction',
          params: [payload]
        })
        .then(() => ({
          hashes: builds.map((build) => build.hash),
          wait: () =>
            Promise.all(
              builds.map((build, i) => operations[i].publicClient.waitForTransactionReceipt({ hash: build.hash }))
            )
        }))
  };
};
