import { EtheraError } from '@/errors';
import type { ComposableSmartAccount, UserOpCall, UserOpsOptions, UserOpsParams } from '@/types';
import { createAbiEncoder } from '@/utils/abi';
import { composeUserOps } from '@/utils/user-operations';
import { type Address, erc20Abi } from 'viem';

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

type BridgeTransferBase = {
  sourceSmartAccount: ComposableSmartAccount;
  destinationSmartAccount: ComposableSmartAccount;
  sourceBridge: Address;
  destinationBridge: Address;
  sessionId: bigint;
  recipient?: Address;
};

type Erc20BridgeTransfer = BridgeTransferBase & {
  asset: {
    kind: 'erc20';
    token: Address;
    amount: bigint;
    sourceOwner?: Address;
  };
};

type NativeBridgeTransfer = BridgeTransferBase & {
  asset: {
    kind: 'native';
    amount: bigint;
    wrappedToken: Address;
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

  return {
    chainId,
    accountAddress
  };
};

export const createBridgeTransferOperations = (params: ComposeBridgeTransferParams): UserOpsParams => {
  const source = getSmartAccountDetails(params.sourceSmartAccount, 'source');
  const destination = getSmartAccountDetails(params.destinationSmartAccount, 'destination');
  const recipient = params.recipient ?? destination.accountAddress;

  const sourceCalls: UserOpCall[] = [];
  const destinationCalls: UserOpCall[] = [
    {
      to: params.destinationBridge,
      value: 0n,
      data: bridge.receiveTokens({
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

    sourceCalls.push({
      to: params.sourceBridge,
      value: 0n,
      data: bridge.send({
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

    sourceCalls.push({
      to: params.sourceBridge,
      value: 0n,
      data: bridge.send({
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
      data: wrappedNative.withdraw({
        wad: params.asset.amount
      })
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
    {
      smartAccount: params.sourceSmartAccount,
      calls: sourceCalls
    },
    {
      smartAccount: params.destinationSmartAccount,
      calls: destinationCalls
    }
  ];
};

export const composeBridgeTransfer = (params: ComposeBridgeTransferParams, options: UserOpsOptions = {}) => {
  return composeUserOps(createBridgeTransferOperations(params), options);
};
