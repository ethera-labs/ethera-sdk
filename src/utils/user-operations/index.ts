import { getValidatedPaymasterEndpoint, getPaymasterDataForChain } from '@/api/paymaster';
import { EtheraError } from '@/errors';
import { encodeXtMessage, toRpcUserOpCanonical } from '@/main';
import type {
  ComposeOperationIdentity,
  ComposedSignedUserOpsTxReturnType,
  ComposedOperationMetadata,
  ComposedUserOpsResult,
  EtheraConfigReturnType,
  EtheraPublicClient,
  PreparedUserOps,
  SignedUserOps,
  UnpreparedUserOps,
  UserOpCall,
  UserOpsOptions,
  UserOpsParams,
  ValidateComposePlanOptions,
  ValidateComposePlanResult
} from '@/types';
import { prepareAndSignUserOperations, signUserOperations } from '@zerodev/multi-chain-ecdsa-validator';
import type { CreateKernelAccountReturnType } from '@zerodev/sdk';
import type { Chain, Client, Transport } from 'viem';
import { type Address, type Hex } from 'viem';
import type { GetPaymasterDataParameters, PaymasterActions, SmartAccount } from 'viem/account-abstraction';

const FALLBACK_CALL_GAS_LIMIT = 900_000n;
const MIN_VERIFICATION_GAS_LIMIT = 1_200_000n;
const PRE_VERIFICATION_GAS = 90_000n;

type NormalizedUserOpsOperation = UserOpsParams[number] & {
  operationIndex: number;
  chainId: number;
  accountAddress?: Address;
  calls: UserOpCall[];
};

type OperationDescriptor = {
  operationIndex: number;
  chainId: number;
  accountAddress?: Address;
};

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

const createFallbackSessionId = (operations: OperationDescriptor[]) =>
  `compose-${operations
    .map(({ operationIndex, chainId, accountAddress }) => `${operationIndex}-${chainId}-${accountAddress ?? 'unknown'}`)
    .join('_')}`;

const createComposeSessionId = (operations: OperationDescriptor[]) => {
  const randomUuid = globalThis.crypto?.randomUUID?.();

  return randomUuid ? `compose-${randomUuid}` : createFallbackSessionId(operations);
};

const withComposeSession = (operations: OperationDescriptor[], sessionId = createComposeSessionId(operations)) =>
  operations.map<ComposeOperationIdentity>((operation) => ({
    ...operation,
    sessionId,
    operationId: `${sessionId}:${operation.operationIndex}:${operation.chainId}`
  }));

const describeNormalizedOperations = (operations: NormalizedUserOpsOperation[]): OperationDescriptor[] =>
  operations.map(({ operationIndex, chainId, accountAddress }) => ({
    operationIndex,
    chainId,
    accountAddress
  }));

const describeUnpreparedOperations = (operations: UnpreparedUserOps): OperationDescriptor[] =>
  operations.map((operation, operationIndex) => ({
    operationIndex,
    chainId: operation.publicClient.chain!.id,
    accountAddress: operation.account.address
  }));

const describePreparedOperations = (operations: PreparedUserOps): OperationDescriptor[] =>
  operations.map((operation, operationIndex) => ({
    operationIndex,
    chainId: operation.publicClient.chain!.id,
    accountAddress: operation.account.address
  }));

const describeSignedOperations = (operations: SignedUserOps): OperationDescriptor[] =>
  operations.map((operation, operationIndex) => ({
    operationIndex,
    chainId: operation.publicClient.chain!.id,
    accountAddress: operation.signedCanonicalOps.sender
  }));

const validateAndNormalizeUserOpComposition = (
  operations: UserOpsParams,
  method: 'composeUserOps' | 'validateComposePlan'
): NormalizedUserOpsOperation[] => {
  assertOperationsNotEmpty(operations, method);

  const operationsByChain = new Map<number, Array<{ operationIndex: number; accountAddress?: string }>>();

  return operations.map((operation, operationIndex) => {
    const { smartAccount, calls } = operation;

    assertCallsNotEmpty(calls, method, operationIndex);

    if (
      !smartAccount?.account ||
      typeof smartAccount.account.createUserOp !== 'function' ||
      !smartAccount.publicClient
    ) {
      const accountAddress = smartAccount?.account?.address;

      throw new EtheraError(
        'SMART_ACCOUNT_INVALID',
        `${method} requires smartAccount objects returned by createSmartAccount or useSmartAccount.`,
        {
          details: { method, operationIndex, ...accountAddressDetails(accountAddress) }
        }
      );
    }

    const accountChainId = smartAccount.account.client?.chain?.id;
    const publicClientChainId = smartAccount.publicClient.chain?.id;
    const accountAddress = smartAccount.account.address;

    if (!accountChainId || !publicClientChainId) {
      throw new EtheraError(
        'SMART_ACCOUNT_INVALID',
        `${method} requires smart accounts with chain-aware account and public client instances.`,
        {
          details: {
            method,
            operationIndex,
            chainId: publicClientChainId ?? accountChainId,
            ...accountAddressDetails(accountAddress)
          }
        }
      );
    }

    if (accountChainId !== publicClientChainId) {
      throw new EtheraError('CHAIN_ID_MISMATCH', `${method} received mismatched chain IDs for operation ${operationIndex}.`, {
        details: {
          method,
          operationIndex,
          chainId: publicClientChainId,
          ...accountAddressDetails(accountAddress),
          expected: String(publicClientChainId),
          received: String(accountChainId)
        }
      });
    }

    const chainOperations = operationsByChain.get(publicClientChainId) ?? [];
    const duplicate = accountAddress
      ? chainOperations.find((entry) => entry.accountAddress?.toLowerCase() === accountAddress.toLowerCase())
      : undefined;

    if (duplicate) {
      throw new EtheraError(
        'COMPOSE_OPERATION_DUPLICATE',
        `${method} received duplicate operations for chain ${publicClientChainId} and account ${accountAddress}.`,
        {
          details: {
            method,
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
      throw new EtheraError('COMPOSE_OPERATION_AMBIGUOUS', `${method} received ambiguous operations for chain ${publicClientChainId}.`, {
        details: {
          method,
          operationIndex,
          duplicateOperationIndex: ambiguous.operationIndex,
          chainId: publicClientChainId,
          ...accountAddressDetails(accountAddress)
        }
      });
    }

    operationsByChain.set(publicClientChainId, [...chainOperations, { operationIndex, accountAddress }]);

    return {
      ...operation,
      operationIndex,
      chainId: publicClientChainId,
      accountAddress,
      calls: normalizeCalls(calls)
    };
  });
};

const buildOperationMetadata = (
  operations: SignedUserOps,
  descriptors: ComposeOperationIdentity[],
  builds: ComposedSignedUserOpsTxReturnType[]
): ComposedOperationMetadata[] =>
  builds.map((build, operationIndex) => ({
    ...descriptors[operationIndex],
    hash: build.hash,
    explorerUrl: toExplorerUrl(build.hash, operations[operationIndex].publicClient)
  }));

const getPaymasterEndpointResolver = (options: ValidateComposePlanOptions) => {
  if (!options.config?.hasPaymaster) {
    return undefined;
  }

  if (!options.config.getPaymasterEndpoint) {
    throw new EtheraError(
      'PAYMASTER_ENDPOINT_INVALID',
      'validateComposePlan requires getPaymasterEndpoint when paymaster support is enabled.',
      {
        details: { method: 'validateComposePlan' }
      }
    );
  }

  return options.config.getPaymasterEndpoint;
};

const composeSignedUserOpsInternal = async (
  operations: SignedUserOps,
  options: UserOpsOptions,
  descriptors: ComposeOperationIdentity[]
): Promise<ComposedUserOpsResult> => {
  assertOperationsNotEmpty(operations, 'composeSignedUserOps');

  const builds: ComposedSignedUserOpsTxReturnType[] = await Promise.all(
    operations.map((operation, operationIndex) =>
      operation.publicClient
        .request({
          method: 'compose_buildSignedUserOpsTx',
          params: [[operation.signedCanonicalOps], { chainId: operation.publicClient.chain!.id }]
        })
        .catch((cause: unknown) => {
          throw new EtheraError(
            'COMPOSE_BUILD_FAILURE',
            `compose_buildSignedUserOpsTx failed for operation ${operationIndex}.`,
            { cause, details: { method: 'composeSignedUserOpsInternal', operationIndex, chainId: operation.publicClient.chain!.id } }
          );
        })
    )
  );

  const operationMetadata = buildOperationMetadata(operations, descriptors, builds);
  const explorerUrls = operationMetadata.map((operation) => operation.explorerUrl);

  operationMetadata.forEach((operation, operationIndex) => {
    options.onBuild?.({
      ...operation,
      build: builds[operationIndex]
    });
  });

  options.onComposed?.(builds, explorerUrls);

  let payload: Hex;
  try {
    payload = encodeXtMessage({
      senderId: 'client',
      entries: builds.map((build, operationIndex) => ({
        chainId: operations[operationIndex].publicClient.chain!.id,
        rawTx: build.raw
      }))
    });
  } catch (cause) {
    throw new EtheraError('PAYLOAD_ENCODING_FAILURE', 'Failed to encode XT payload.', {
      cause,
      details: { method: 'composeSignedUserOpsInternal' }
    });
  }

  options.onPayloadEncoded?.(payload);

  return {
    sessionId: descriptors[0].sessionId,
    payload,
    builds,
    explorerUrls,
    operations: operationMetadata,
    send: async () => {
      try {
        await operations[0].publicClient.request({
          method: 'eth_sendXTransaction',
          params: [payload]
        });
      } catch (cause) {
        throw new EtheraError('SEND_FAILURE', 'eth_sendXTransaction failed.', {
          cause,
          details: { method: 'composeSignedUserOpsInternal' }
        });
      }

      const hashes = builds.map((build) => build.hash);

      options.onSubmit?.({
        sessionId: descriptors[0].sessionId,
        payload,
        hashes,
        operations: operationMetadata
      });

      return {
        sessionId: descriptors[0].sessionId,
        hashes,
        operations: operationMetadata,
        wait: async () => {
          const receipts = await Promise.all(
            builds.map((build, operationIndex) =>
              operations[operationIndex].publicClient.waitForTransactionReceipt({ hash: build.hash })
            )
          );

          receipts.forEach((receipt, operationIndex) => {
            options.onReceipt?.({
              ...operationMetadata[operationIndex],
              receipt
            });
          });

          return receipts;
        }
      };
    }
  };
};

const composeUnpreparedUserOpsInternal = async (
  operations: UnpreparedUserOps,
  options: UserOpsOptions,
  descriptors: ComposeOperationIdentity[]
) => {
  assertOperationsNotEmpty(operations, 'composeUnpreparedUserOps');

  let signed: Awaited<ReturnType<typeof prepareAndSignUserOperations>>;
  try {
    signed = await prepareAndSignUserOperations(
      operations.map((operation) => operation.publicClient as Client<Transport, Chain, SmartAccount>),
      operations.map((operation) => operation.userOp)
    );
  } catch (cause) {
    throw new EtheraError('SIGNING_FAILURE', 'Failed to sign user operations.', {
      cause,
      details: { method: 'composeUnpreparedUserOps' }
    });
  }
  const signedCanonicalOps = signed.map(toRpcUserOpCanonical);

  signedCanonicalOps.forEach((signedUserOp, operationIndex) => {
    options.onSign?.({
      ...descriptors[operationIndex],
      signedUserOp
    });
  });

  options.onSigned?.(signedCanonicalOps);

  return composeSignedUserOpsInternal(
    operations.map((operation, operationIndex) => ({
      ...operation,
      signedCanonicalOps: signedCanonicalOps[operationIndex]
    })),
    options,
    descriptors
  );
};

const composePreparedUserOpsInternal = async (
  operations: PreparedUserOps,
  options: UserOpsOptions,
  descriptors: ComposeOperationIdentity[]
) => {
  assertOperationsNotEmpty(operations, 'composePreparedUserOps');

  const unsignedUserOps = operations.map((operation) => operation.userOp);
  const sourcePublicClient = operations[0].publicClient;
  const sourceKernelAccount = operations[0].account;

  let signed: Awaited<ReturnType<typeof signUserOperations>>;
  try {
    signed = await signUserOperations(sourcePublicClient, {
      userOperations: unsignedUserOps,
      account: sourceKernelAccount
    });
  } catch (cause) {
    throw new EtheraError('SIGNING_FAILURE', 'Failed to sign user operations.', {
      cause,
      details: { method: 'composePreparedUserOps' }
    });
  }
  const signedCanonicalOps = signed.map(toRpcUserOpCanonical);

  signedCanonicalOps.forEach((signedUserOp, operationIndex) => {
    options.onSign?.({
      ...descriptors[operationIndex],
      signedUserOp
    });
  });

  options.onSigned?.(signedCanonicalOps);

  return composeSignedUserOpsInternal(
    operations.map((operation, operationIndex) => ({
      ...operation,
      signedCanonicalOps: signedCanonicalOps[operationIndex]
    })),
    options,
    descriptors
  );
};

export const validateComposePlan = (
  operations: UserOpsParams,
  options: ValidateComposePlanOptions = {}
): ValidateComposePlanResult => {
  const normalizedOperations = validateAndNormalizeUserOpComposition(operations, 'validateComposePlan');
  const descriptors = withComposeSession(describeNormalizedOperations(normalizedOperations));
  const hasPaymaster = Boolean(options.config?.hasPaymaster);
  const getPaymasterEndpoint = getPaymasterEndpointResolver(options);

  return {
    sessionId: descriptors[0].sessionId,
    hasPaymaster,
    operations: descriptors.map((descriptor, operationIndex) => {
      const paymasterEndpoints = hasPaymaster
        ? {
            sponsorUserOperation: getValidatedPaymasterEndpoint({
              method: 'pm_sponsorUserOperation',
              chainId: descriptor.chainId,
              getPaymasterEndpoint: getPaymasterEndpoint!
            }),
            getPaymasterStubData: getValidatedPaymasterEndpoint({
              method: 'pm_getPaymasterStubData',
              chainId: descriptor.chainId,
              getPaymasterEndpoint: getPaymasterEndpoint!
            })
          }
        : undefined;

      return {
        ...descriptor,
        callCount: normalizedOperations[operationIndex].calls.length,
        ...(paymasterEndpoints ? { paymasterEndpoints } : {})
      };
    })
  };
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

  const callGasLimit = callGasEstimates.reduce((acc, gas) => acc + gas, 0n);
  const verificationGasLimit =
    callGasLimit + PRE_VERIFICATION_GAS > MIN_VERIFICATION_GAS_LIMIT
      ? callGasLimit + PRE_VERIFICATION_GAS
      : MIN_VERIFICATION_GAS_LIMIT;

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
  const normalizedOperations = validateAndNormalizeUserOpComposition(operations, 'composeUserOps');
  const descriptors = withComposeSession(describeNormalizedOperations(normalizedOperations));

  const unpreparedOperations = await Promise.all(
    normalizedOperations.map(({ smartAccount, calls }) => smartAccount.account.createUserOp(calls))
  );

  return composeUnpreparedUserOpsInternal(unpreparedOperations, options, descriptors);
};

export const composeUnpreparedUserOps = async (operations: UnpreparedUserOps, options: UserOpsOptions = {}) => {
  const descriptors = withComposeSession(describeUnpreparedOperations(operations));
  return composeUnpreparedUserOpsInternal(operations, options, descriptors);
};

export const composePreparedUserOps = async (operations: PreparedUserOps, options: UserOpsOptions = {}) => {
  const descriptors = withComposeSession(describePreparedOperations(operations));
  return composePreparedUserOpsInternal(operations, options, descriptors);
};

export const composeSignedUserOps = async (operations: SignedUserOps, options: UserOpsOptions = {}) => {
  const descriptors = withComposeSession(describeSignedOperations(operations));
  return composeSignedUserOpsInternal(operations, options, descriptors);
};
