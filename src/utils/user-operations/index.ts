import { EtheraError } from '@/errors';
import { getPaymasterDataForChain } from '@/api/paymaster';
import type {
  EtheraConfigReturnType,
  EtheraPublicClient,
  PreparedUserOps,
  SignedUserOps,
  UnpreparedUserOps,
  UserOpCall,
  UserOpsOptions,
  UserOpsParams
} from '@/types';
import { encodeXtMessage, toRpcUserOpCanonical } from '@/main';
import { prepareAndSignUserOperations, signUserOperations } from '@zerodev/multi-chain-ecdsa-validator';
import type { CreateKernelAccountReturnType } from '@zerodev/sdk';
import type { Chain, Client, Transport } from 'viem';
import { type Hex } from 'viem';
import type { GetPaymasterDataParameters, PaymasterActions, SmartAccount } from 'viem/account-abstraction';

const FALLBACK_CALL_GAS_LIMIT = 900_000n;
const MIN_VERIFICATION_GAS_LIMIT = 1_200_000n;
const PRE_VERIFICATION_GAS = 90_000n;

const withMargin = (value: bigint, marginPct = 25n) => value + (value * marginPct) / 100n;

const assertOperationsNotEmpty = (operations: unknown[], method: string) => {
  if (operations.length === 0) {
    throw new EtheraError('OPERATIONS_EMPTY', `${method} requires at least one operation.`, {
      details: { method }
    });
  }
};

const assertCallsNotEmpty = (calls: UserOpCall[], method: string, operationIndex?: number) => {
  if (calls.length === 0) {
    throw new EtheraError('CALLS_EMPTY', `${method} requires at least one call per operation.`, {
      details: { method, operationIndex }
    });
  }
};

const normalizeCalls = (calls: UserOpCall[]): UserOpCall[] =>
  calls.map((call) => ({
    ...call,
    value: call.value ?? 0n
  }));

const accountAddressDetails = (accountAddress: string | undefined) => (accountAddress ? { accountAddress } : {});

const toExplorerUrl = (hash: Hex, publicClient: EtheraPublicClient) => {
  const explorerUrl = publicClient.chain?.blockExplorers?.default?.url;

  if (!explorerUrl) {
    return hash;
  }

  try {
    return new URL(`tx/${hash}`, explorerUrl).toString();
  } catch {
    return hash;
  }
};

const validateAndNormalizeUserOpComposition = (operations: UserOpsParams): UserOpsParams => {
  assertOperationsNotEmpty(operations, 'composeUserOps');

  const operationsByChain = new Map<number, Array<{ operationIndex: number; accountAddress?: string }>>();

  return operations.map((operation, operationIndex) => {
    const { smartAccount, calls } = operation;

    assertCallsNotEmpty(calls, 'composeUserOps', operationIndex);

    if (
      !smartAccount?.account ||
      typeof smartAccount.account.createUserOp !== 'function' ||
      !smartAccount.publicClient
    ) {
      const accountAddress = smartAccount?.account?.address;

      throw new EtheraError(
        'SMART_ACCOUNT_INVALID',
        'composeUserOps requires smartAccount objects returned by createSmartAccount or useSmartAccount.',
        {
          details: { method: 'composeUserOps', operationIndex, ...accountAddressDetails(accountAddress) }
        }
      );
    }

    const accountChainId = smartAccount.account.client?.chain?.id;
    const publicClientChainId = smartAccount.publicClient.chain?.id;
    const accountAddress = smartAccount.account.address;

    if (!accountChainId || !publicClientChainId) {
      throw new EtheraError(
        'SMART_ACCOUNT_INVALID',
        'composeUserOps requires smart accounts with chain-aware account and public client instances.',
        {
          details: {
            method: 'composeUserOps',
            operationIndex,
            chainId: publicClientChainId ?? accountChainId,
            ...accountAddressDetails(accountAddress)
          }
        }
      );
    }

    if (accountChainId !== publicClientChainId) {
      throw new EtheraError(
        'CHAIN_ID_MISMATCH',
        `composeUserOps received mismatched chain IDs for operation ${operationIndex}.`,
        {
          details: {
            method: 'composeUserOps',
            operationIndex,
            chainId: publicClientChainId,
            ...accountAddressDetails(accountAddress),
            expected: String(publicClientChainId),
            received: String(accountChainId)
          }
        }
      );
    }

    const chainOperations = operationsByChain.get(publicClientChainId) ?? [];
    const duplicate = accountAddress
      ? chainOperations.find((entry) => entry.accountAddress?.toLowerCase() === accountAddress.toLowerCase())
      : undefined;

    if (duplicate) {
      throw new EtheraError(
        'COMPOSE_OPERATION_DUPLICATE',
        `composeUserOps received duplicate operations for chain ${publicClientChainId} and account ${accountAddress}.`,
        {
          details: {
            method: 'composeUserOps',
            operationIndex,
            duplicateOperationIndex: duplicate.operationIndex,
            chainId: publicClientChainId,
            accountAddress
          }
        }
      );
    }

    const ambiguous = chainOperations.find((entry) => !entry.accountAddress || !accountAddress);

    if (ambiguous) {
      throw new EtheraError(
        'COMPOSE_OPERATION_AMBIGUOUS',
        `composeUserOps received ambiguous operations for chain ${publicClientChainId}.`,
        {
          details: {
            method: 'composeUserOps',
            operationIndex,
            duplicateOperationIndex: ambiguous.operationIndex,
            chainId: publicClientChainId,
            ...accountAddressDetails(accountAddress)
          }
        }
      );
    }

    operationsByChain.set(publicClientChainId, [
      ...chainOperations,
      { operationIndex, accountAddress }
    ]);

    return {
      ...operation,
      calls: normalizeCalls(calls)
    };
  });
};

export const createUserOps = async (
  config: EtheraConfigReturnType,
  account: CreateKernelAccountReturnType<'0.7'>,
  calls: UserOpCall[]
) => {
  assertCallsNotEmpty(calls, 'createUserOps');
  const normalizedCalls = normalizeCalls(calls);

  const chainId = account.client.chain!.id;
  const publicClient = config.getPublicClient(chainId);
  if (!publicClient) {
    throw new EtheraError('PUBLIC_CLIENT_NOT_FOUND', `Public client not found for chain ${chainId}.`, {
      details: { method: 'createUserOps', chainId }
    });
  }

  // Estimate gas for each call
  const callGasEstimates = await Promise.all(
    normalizedCalls.map((call) =>
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

  const callData = await account.encodeCalls(normalizedCalls);

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

export const composeUserOps = async (operations: UserOpsParams, options: UserOpsOptions = {}) => {
  const normalizedOperations = validateAndNormalizeUserOpComposition(operations);

  const unpreparedOperations = await Promise.all(
    normalizedOperations.map(({ smartAccount, calls }) => smartAccount.account.createUserOp(calls))
  );

  return composeUnpreparedUserOps(unpreparedOperations, options);
};

export const composeUnpreparedUserOps = async (operations: UnpreparedUserOps, options: UserOpsOptions = {}) => {
  assertOperationsNotEmpty(operations, 'composeUnpreparedUserOps');

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

export const composePreparedUserOps = async (operations: PreparedUserOps, options: UserOpsOptions = {}) => {
  assertOperationsNotEmpty(operations, 'composePreparedUserOps');

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

export const composeSignedUserOps = async (operations: SignedUserOps, options: UserOpsOptions = {}) => {
  assertOperationsNotEmpty(operations, 'composeSignedUserOps');

  const builds = await Promise.all(
    operations.map((operation) =>
      operation.publicClient.request({
        method: 'compose_buildSignedUserOpsTx',
        params: [[operation.signedCanonicalOps], { chainId: operation.publicClient.chain!.id }]
      })
    )
  );

  const explorerUrls = builds.map((build, i) => toExplorerUrl(build.hash, operations[i].publicClient));

  options.onComposed?.(builds, explorerUrls);

  const payload = encodeXtMessage({
    senderId: 'client',
    entries: builds.map((build, i) => ({
      chainId: operations[i].publicClient.chain!.id,
      rawTx: build.raw as `0x${string}`
    }))
  });

  options.onPayloadEncoded?.(payload);

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
