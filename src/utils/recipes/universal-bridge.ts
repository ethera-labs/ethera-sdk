import { EtheraError } from '@/errors';
import type {
  ComposableSmartAccount,
  ComposeUniversalBridgeTransferParams,
  GasOverrides,
  UserOpCall,
  UserOpsOptions,
  UserOpsParams
} from '@/types';
import { createAbiEncoder } from '@/utils/abi';
import { composeUnpreparedUserOps, composeUserOps } from '@/utils/user-operations';
import { type Address, erc20Abi } from 'viem';
import { buildAllowanceCall, getSmartAccountDetails } from './bridge';

const universalBridgeAbi = [
  {
    type: 'function',
    name: 'bridgeCETTo',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'chainDest', type: 'uint256' },
      { name: 'cetTokenSrc', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'sessionId', type: 'uint256' }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'bridgeERC20To',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'chainDest', type: 'uint256' },
      { name: 'tokenSrc', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'sessionId', type: 'uint256' }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'bridgeEthTo',
    stateMutability: 'payable',
    inputs: [
      { name: 'sessionId', type: 'uint256' },
      { name: 'chainDest', type: 'uint256' },
      { name: 'receiver', type: 'address' }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'receiveTokens',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'msgHeader',
        type: 'tuple',
        components: [
          { name: 'chainSrc', type: 'uint256' },
          { name: 'chainDest', type: 'uint256' },
          { name: 'sender', type: 'address' },
          { name: 'receiver', type: 'address' },
          { name: 'sessionId', type: 'uint256' },
          { name: 'label', type: 'string' }
        ]
      }
    ],
    outputs: [
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ]
  },
  {
    type: 'function',
    name: 'receiveETH',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'msgHeader',
        type: 'tuple',
        components: [
          { name: 'chainSrc', type: 'uint256' },
          { name: 'chainDest', type: 'uint256' },
          { name: 'sender', type: 'address' },
          { name: 'receiver', type: 'address' },
          { name: 'sessionId', type: 'uint256' },
          { name: 'label', type: 'string' }
        ]
      }
    ],
    outputs: [{ name: 'amount', type: 'uint256' }]
  }
] as const;

const supportsInterfaceAbi = [
  {
    type: 'function',
    name: 'supportsInterface',
    stateMutability: 'view',
    inputs: [{ name: 'interfaceId', type: 'bytes4' }],
    outputs: [{ name: '', type: 'bool' }]
  }
] as const;

const cetRemoteIdentityAbi = [
  {
    type: 'function',
    name: 'remoteAsset',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }]
  },
  {
    type: 'function',
    name: 'remoteChainID',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  }
] as const;

const cetTypeAbi = [
  {
    type: 'function',
    name: 'cetType',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }]
  }
] as const;

const cetFactoryOnBridgeAbi = [
  {
    type: 'function',
    name: 'cetFactory',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }]
  }
] as const;

const cetFactoryPredictAbi = [
  {
    type: 'function',
    name: 'predictAddress',
    stateMutability: 'view',
    inputs: [
      { name: 'remoteAsset', type: 'address' },
      { name: 'remoteChainId', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'address' }]
  }
] as const;

const bridge = createAbiEncoder(universalBridgeAbi);
const erc20 = createAbiEncoder(erc20Abi);

const COMPOSABLE_ERC20_INTERFACE_ID = '0x8387278f' as `0x${string}`;
const CORE_CET_TYPE = 0;
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

type ResolvedTokenKind = 'erc20' | 'cet' | 'native';

type MsgHeader = {
  chainSrc: bigint;
  chainDest: bigint;
  sender: Address;
  receiver: Address;
  sessionId: bigint;
  label: string;
};

type AccountDetails = { chainId: number; accountAddress: Address };

const detectCetSupport = async (
  publicClient: ComposableSmartAccount['publicClient'],
  tokenAddress: Address
): Promise<ResolvedTokenKind> => {
  try {
    const isComposable = await publicClient.readContract({
      address: tokenAddress,
      abi: supportsInterfaceAbi,
      functionName: 'supportsInterface',
      args: [COMPOSABLE_ERC20_INTERFACE_ID]
    });
    return isComposable ? 'cet' : 'erc20';
  } catch {
    return 'erc20';
  }
};

const resolveDestinationCetToken = async (
  params: ComposeUniversalBridgeTransferParams,
  sourceToken: Address,
  destinationChainId: number
): Promise<Address> => {
  const [remoteAsset, remoteChainID] = await Promise.all([
    params.sourceSmartAccount.publicClient.readContract({
      address: sourceToken,
      abi: cetRemoteIdentityAbi,
      functionName: 'remoteAsset'
    }),
    params.sourceSmartAccount.publicClient.readContract({
      address: sourceToken,
      abi: cetRemoteIdentityAbi,
      functionName: 'remoteChainID'
    })
  ]);

  if (remoteChainID === BigInt(destinationChainId)) {
    return remoteAsset;
  }

  // Check if the remote asset is already a deployed core CET on destination
  try {
    const cetType = await params.destinationSmartAccount.publicClient.readContract({
      address: remoteAsset,
      abi: cetTypeAbi,
      functionName: 'cetType'
    });
    if (Number(cetType) === CORE_CET_TYPE) {
      return remoteAsset;
    }
  } catch {
    // Non-CET or undeployed — fall through to factory prediction
  }

  const cetFactoryAddress = await params.destinationSmartAccount.publicClient.readContract({
    address: params.destinationBridge,
    abi: cetFactoryOnBridgeAbi,
    functionName: 'cetFactory'
  });

  const predicted = await params.destinationSmartAccount.publicClient.readContract({
    address: cetFactoryAddress,
    abi: cetFactoryPredictAbi,
    functionName: 'predictAddress',
    args: [remoteAsset, remoteChainID]
  });

  if (predicted.toLowerCase() === ZERO_ADDRESS) {
    throw new EtheraError(
      'UNIVERSAL_BRIDGE_TOKEN_RESOLUTION_FAILED',
      `CET factory returned zero address for ${sourceToken} on chain ${destinationChainId}.`,
      { details: { method: 'createUniversalBridgeTransferOperations', chainId: destinationChainId } }
    );
  }

  return predicted;
};

const buildMsgHeader = (
  sourceBridge: Address,
  sourceChainId: number,
  destinationChainId: number,
  receiver: Address,
  sessionId: bigint,
  label: 'SEND_ETH' | 'SEND_TOKENS'
): MsgHeader => ({
  chainSrc: BigInt(sourceChainId),
  chainDest: BigInt(destinationChainId),
  sender: sourceBridge,
  receiver,
  sessionId,
  label
});

const applyGasOverrides = <
  T extends { userOp: { callGasLimit: bigint; verificationGasLimit: bigint; preVerificationGas: bigint } }
>(
  op: T,
  overrides: GasOverrides | undefined
): T => {
  if (!overrides) return op;
  return {
    ...op,
    userOp: {
      ...op.userOp,
      ...(overrides.callGasLimit !== undefined ? { callGasLimit: overrides.callGasLimit } : {}),
      ...(overrides.verificationGasLimit !== undefined ? { verificationGasLimit: overrides.verificationGasLimit } : {}),
      ...(overrides.preVerificationGas !== undefined ? { preVerificationGas: overrides.preVerificationGas } : {})
    }
  };
};

const buildSourceCalls = async (
  params: ComposeUniversalBridgeTransferParams,
  resolvedKind: ResolvedTokenKind,
  source: AccountDetails,
  destination: AccountDetails
): Promise<UserOpCall[]> => {
  // params.asset.kind === 'native' mirrors resolvedKind for TypeScript to narrow .token access below
  if (resolvedKind === 'native' || params.asset.kind === 'native') {
    return [
      {
        to: params.sourceBridge,
        value: params.asset.amount,
        data: bridge.bridgeEthTo({
          sessionId: params.sessionId,
          chainDest: BigInt(destination.chainId),
          receiver: destination.accountAddress
        })
      }
    ];
  }

  const token = params.asset.token;
  const policy = params.asset.allowancePolicy ?? { strategy: 'exact' };

  const approvalCall = await buildAllowanceCall(
    policy,
    token,
    source.accountAddress,
    params.sourceBridge,
    params.asset.amount,
    params.sourceSmartAccount.publicClient
  );

  const bridgeCall =
    resolvedKind === 'cet'
      ? {
          to: params.sourceBridge,
          value: 0n,
          data: bridge.bridgeCETTo({
            chainDest: BigInt(destination.chainId),
            cetTokenSrc: token,
            amount: params.asset.amount,
            receiver: destination.accountAddress,
            sessionId: params.sessionId
          })
        }
      : {
          to: params.sourceBridge,
          value: 0n,
          data: bridge.bridgeERC20To({
            chainDest: BigInt(destination.chainId),
            tokenSrc: token,
            amount: params.asset.amount,
            receiver: destination.accountAddress,
            sessionId: params.sessionId
          })
        };

  return [...(approvalCall ? [approvalCall] : []), bridgeCall];
};

const buildDestinationCalls = (
  params: ComposeUniversalBridgeTransferParams,
  resolvedKind: ResolvedTokenKind,
  source: AccountDetails,
  destination: AccountDetails,
  recipient: Address,
  destinationToken: Address | null
): UserOpCall[] => {
  if (resolvedKind === 'native') {
    const msgHeader = buildMsgHeader(
      params.sourceBridge,
      source.chainId,
      destination.chainId,
      destination.accountAddress,
      params.sessionId,
      'SEND_ETH'
    );
    const calls: UserOpCall[] = [{ to: params.destinationBridge, value: 0n, data: bridge.receiveETH({ msgHeader }) }];
    if (recipient.toLowerCase() !== destination.accountAddress.toLowerCase()) {
      calls.push({ to: recipient, value: params.asset.amount, data: '0x' as `0x${string}` });
    }
    return calls;
  }

  const msgHeader = buildMsgHeader(
    params.sourceBridge,
    source.chainId,
    destination.chainId,
    destination.accountAddress,
    params.sessionId,
    'SEND_TOKENS'
  );

  const calls: UserOpCall[] = [{ to: params.destinationBridge, value: 0n, data: bridge.receiveTokens({ msgHeader }) }];

  if (recipient.toLowerCase() !== destination.accountAddress.toLowerCase()) {
    calls.push({
      to: destinationToken!,
      value: 0n,
      data: erc20.transfer({ recipient, amount: params.asset.amount })
    });
  }

  return calls;
};

export const createUniversalBridgeTransferOperations = async (
  params: ComposeUniversalBridgeTransferParams
): Promise<UserOpsParams> => {
  if (params.asset.amount === 0n) {
    throw new EtheraError('BRIDGE_AMOUNT_INVALID', 'Bridge transfer amount must be greater than zero.', {
      details: { method: 'createUniversalBridgeTransferOperations' }
    });
  }

  const source = getSmartAccountDetails(params.sourceSmartAccount, 'source', 'createUniversalBridgeTransferOperations');
  const destination = getSmartAccountDetails(
    params.destinationSmartAccount,
    'destination',
    'createUniversalBridgeTransferOperations'
  );
  const recipient = params.recipient ?? destination.accountAddress;

  const resolvedKind: ResolvedTokenKind =
    params.asset.kind === 'native'
      ? 'native'
      : params.asset.kind === 'auto'
        ? await detectCetSupport(params.sourceSmartAccount.publicClient, params.asset.token)
        : params.asset.kind;

  const destinationTokenPromise: Promise<Address | null> =
    resolvedKind === 'native' || params.asset.kind === 'native'
      ? Promise.resolve(null)
      : resolvedKind === 'cet'
        ? resolveDestinationCetToken(params, params.asset.token, destination.chainId)
        : Promise.resolve(params.asset.token);

  const [sourceCalls, destinationToken] = await Promise.all([
    buildSourceCalls(params, resolvedKind, source, destination),
    destinationTokenPromise
  ]);

  return [
    { smartAccount: params.sourceSmartAccount, calls: sourceCalls },
    { smartAccount: params.destinationSmartAccount, calls: buildDestinationCalls(params, resolvedKind, source, destination, recipient, destinationToken) }
  ];
};

export const composeUniversalBridgeTransfer = async (
  params: ComposeUniversalBridgeTransferParams,
  options: UserOpsOptions = {}
) => {
  const operations = await createUniversalBridgeTransferOperations(params);

  if (!params.gasOverrides) {
    return composeUserOps(operations, options);
  }

  const [sourceOp, destOp] = await Promise.all([
    operations[0].smartAccount.account.createUserOp(operations[0].calls),
    operations[1].smartAccount.account.createUserOp(operations[1].calls)
  ]);

  return composeUnpreparedUserOps(
    [
      applyGasOverrides(sourceOp, params.gasOverrides.source),
      applyGasOverrides(destOp, params.gasOverrides.destination)
    ],
    options
  );
};
