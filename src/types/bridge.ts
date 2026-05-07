import type { Address, Hex } from 'viem';
import type { ComposableSmartAccount } from './user-operations';

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
