import { EtheraError } from '@/errors';
import type { ComposableSmartAccount, EtheraPublicClient, UserOpCall, UserOpsOptions, UserOpsParams } from '@/types';
import { createAbiEncoder } from '@/utils/abi';
import { composeUserOps } from '@/utils/user-operations';
import { type Address, erc20Abi, type Hex, maxUint256 } from 'viem';

const erc20 = createAbiEncoder(erc20Abi);

const bridgeAbi = [
  {
    type: 'function',
    name: 'send',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'otherChainId', type: 'uint256' },
      { name: 'token', type: 'address' },
      { name: 'sender', type: 'address' },
      { name: 'receiver', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'sessionId', type: 'uint256' },
      { name: 'destBridge', type: 'address' }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'receiveTokens',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'otherChainId', type: 'uint256' },
      { name: 'sender', type: 'address' },
      { name: 'receiver', type: 'address' },
      { name: 'sessionId', type: 'uint256' },
      { name: 'srcBridge', type: 'address' }
    ],
    outputs: [
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ]
  }
] as const;

const wrappedNativeAbi = [
  {
    type: 'function',
    name: 'deposit',
    stateMutability: 'payable',
    inputs: [],
    outputs: []
  },
  {
    type: 'function',
    name: 'withdraw',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'wad', type: 'uint256' }],
    outputs: []
  }
] as const;

const bridge = createAbiEncoder(bridgeAbi);
const wrappedNative = createAbiEncoder(wrappedNativeAbi);

export type AllowancePolicy =
  | { strategy: 'exact' }
  | { strategy: 'max' }
  | { strategy: 'none' }
  | { strategy: 'custom'; amount: bigint };

export type BridgeSendParams = {
  otherChainId: bigint;
  token: Address;
  sender: Address;
  receiver: Address;
  amount: bigint;
  sessionId: bigint;
  destBridge: Address;
};

export type BridgeReceiveParams = {
  otherChainId: bigint;
  sender: Address;
  receiver: Address;
  sessionId: bigint;
  srcBridge: Address;
};

// Swap the encoding for contracts that share the same call semantics but use a
// different ABI. For bridges with extra parameters (fees, adapter options, chain
// selectors) the parameter set itself differs — use composeUserOps directly.
export type BridgeConfig = {
  encodeSend?: (params: BridgeSendParams) => Hex;
  encodeReceiveTokens?: (params: BridgeReceiveParams) => Hex;
};

type BridgeTransferBase = {
  sourceSmartAccount: ComposableSmartAccount;
  destinationSmartAccount: ComposableSmartAccount;
  sourceBridge: Address;
  destinationBridge: Address;
  sessionId: bigint;
  recipient?: Address;
  bridgeConfig?: BridgeConfig;
};

type Erc20BridgeTransfer = BridgeTransferBase & {
  asset: {
    kind: 'erc20';
    token: Address;
    amount: bigint;
    sourceOwner?: Address;
    allowancePolicy?: AllowancePolicy;
  };
};

type NativeBridgeTransfer = BridgeTransferBase & {
  asset: {
    kind: 'native';
    amount: bigint;
    wrappedToken: Address;
    allowancePolicy?: AllowancePolicy;
  };
};

export type ComposeBridgeTransferParams = Erc20BridgeTransfer | NativeBridgeTransfer;

const getSmartAccountDetails = (smartAccount: ComposableSmartAccount, role: 'source' | 'destination') => {
  const chainId = smartAccount.publicClient.chain?.id;
  const accountAddress = smartAccount.account.address;

  if (!chainId || !accountAddress) {
    throw new EtheraError(
      'SMART_ACCOUNT_INVALID',
      `composeBridgeTransfer requires ${role} smart accounts with chain-aware public clients and account addresses.`,
      {
        details: { method: 'composeBridgeTransfer', chainId }
      }
    );
  }

  return { chainId, accountAddress };
};

const resolveApprovalAmount = (policy: AllowancePolicy, transferAmount: bigint): bigint | null => {
  switch (policy.strategy) {
    case 'none':
      return null;
    case 'exact':
      return transferAmount;
    case 'max':
      return maxUint256;
    case 'custom':
      return policy.amount;
  }
};

const buildAllowanceCall = async (
  policy: AllowancePolicy,
  token: Address,
  owner: Address,
  spender: Address,
  transferAmount: bigint,
  publicClient: EtheraPublicClient
): Promise<UserOpCall | null> => {
  const approvalAmount = resolveApprovalAmount(policy, transferAmount);
  if (approvalAmount === null) return null;

  // Allowance is read at compose time, not execution time. A concurrent tx or a
  // sibling composeBridgeTransfer call in the same session could deplete it before
  // the composed bundle executes. Multiple calls for the same token/spender are not
  // coalesced — each reads independently. If you know the allowance is already
  // sufficient (e.g. a prior max approval), use { strategy: 'none' } to skip the
  // round-trip entirely.
  const currentAllowance = await publicClient.readContract({
    address: token,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [owner, spender]
  });

  if (currentAllowance >= approvalAmount) return null;

  return {
    to: token,
    value: 0n,
    data: erc20.approve({ spender, amount: approvalAmount })
  };
};

export const createBridgeTransferOperations = async (params: ComposeBridgeTransferParams): Promise<UserOpsParams> => {
  if (params.asset.amount === 0n) {
    throw new EtheraError('BRIDGE_AMOUNT_INVALID', 'Bridge transfer amount must be greater than zero.', {
      details: { method: 'createBridgeTransferOperations' }
    });
  }

  const source = getSmartAccountDetails(params.sourceSmartAccount, 'source');
  const destination = getSmartAccountDetails(params.destinationSmartAccount, 'destination');
  const recipient = params.recipient ?? destination.accountAddress;

  const encodeSendFn = params.bridgeConfig?.encodeSend ?? ((p: BridgeSendParams) => bridge.send(p));
  const encodeReceiveTokensFn =
    params.bridgeConfig?.encodeReceiveTokens ?? ((p: BridgeReceiveParams) => bridge.receiveTokens(p));

  const policy = params.asset.allowancePolicy ?? { strategy: 'exact' };

  const sourceCalls: UserOpCall[] = [];
  const destinationCalls: UserOpCall[] = [
    {
      to: params.destinationBridge,
      value: 0n,
      data: encodeReceiveTokensFn({
        otherChainId: BigInt(source.chainId),
        sender: source.accountAddress,
        receiver: destination.accountAddress,
        sessionId: params.sessionId,
        srcBridge: params.sourceBridge
      })
    }
  ];

  if (params.asset.kind === 'erc20') {
    if (params.asset.sourceOwner) {
      sourceCalls.push({
        to: params.asset.token,
        value: 0n,
        data: erc20.transferFrom({
          sender: params.asset.sourceOwner,
          recipient: source.accountAddress,
          amount: params.asset.amount
        })
      });
    }

    const approvalCall = await buildAllowanceCall(
      policy,
      params.asset.token,
      source.accountAddress,
      params.sourceBridge,
      params.asset.amount,
      params.sourceSmartAccount.publicClient
    );
    if (approvalCall) sourceCalls.push(approvalCall);

    sourceCalls.push({
      to: params.sourceBridge,
      value: 0n,
      data: encodeSendFn({
        otherChainId: BigInt(destination.chainId),
        token: params.asset.token,
        sender: source.accountAddress,
        receiver: destination.accountAddress,
        amount: params.asset.amount,
        sessionId: params.sessionId,
        destBridge: params.destinationBridge
      })
    });

    if (recipient !== destination.accountAddress) {
      destinationCalls.push({
        to: params.asset.token,
        value: 0n,
        data: erc20.transfer({
          recipient,
          amount: params.asset.amount
        })
      });
    }
  } else {
    sourceCalls.push({
      to: params.asset.wrappedToken,
      value: params.asset.amount,
      data: wrappedNative.deposit()
    });

    const approvalCall = await buildAllowanceCall(
      policy,
      params.asset.wrappedToken,
      source.accountAddress,
      params.sourceBridge,
      params.asset.amount,
      params.sourceSmartAccount.publicClient
    );
    if (approvalCall) sourceCalls.push(approvalCall);

    sourceCalls.push({
      to: params.sourceBridge,
      value: 0n,
      data: encodeSendFn({
        otherChainId: BigInt(destination.chainId),
        token: params.asset.wrappedToken,
        sender: source.accountAddress,
        receiver: destination.accountAddress,
        amount: params.asset.amount,
        sessionId: params.sessionId,
        destBridge: params.destinationBridge
      })
    });

    destinationCalls.push({
      to: params.asset.wrappedToken,
      value: 0n,
      data: wrappedNative.withdraw({ wad: params.asset.amount })
    });

    if (recipient !== destination.accountAddress) {
      destinationCalls.push({
        to: recipient,
        value: params.asset.amount,
        data: '0x'
      });
    }
  }

  return [
    { smartAccount: params.sourceSmartAccount, calls: sourceCalls },
    { smartAccount: params.destinationSmartAccount, calls: destinationCalls }
  ];
};

export const composeBridgeTransfer = async (params: ComposeBridgeTransferParams, options: UserOpsOptions = {}) => {
  return composeUserOps(await createBridgeTransferOperations(params), options);
};
