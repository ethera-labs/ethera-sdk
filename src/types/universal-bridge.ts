import type { Address } from 'viem';
import type { AllowancePolicy } from './bridge';
import type { ComposableSmartAccount, GasOverrides } from './user-operations';

export type UniversalBridgeGasOverrides = {
  source?: GasOverrides;
  destination?: GasOverrides;
};

type UniversalBridgeErc20Asset = {
  kind: 'erc20';
  token: Address;
  amount: bigint;
  allowancePolicy?: AllowancePolicy;
};

type UniversalBridgeCetAsset = {
  kind: 'cet';
  token: Address;
  amount: bigint;
  allowancePolicy?: AllowancePolicy;
};

type UniversalBridgeAutoAsset = {
  kind: 'auto';
  token: Address;
  amount: bigint;
  allowancePolicy?: AllowancePolicy;
};

type UniversalBridgeNativeAsset = {
  kind: 'native';
  amount: bigint;
};

export type UniversalBridgeAsset =
  | UniversalBridgeErc20Asset
  | UniversalBridgeCetAsset
  | UniversalBridgeAutoAsset
  | UniversalBridgeNativeAsset;

export type ComposeUniversalBridgeTransferParams = {
  sourceSmartAccount: ComposableSmartAccount;
  destinationSmartAccount: ComposableSmartAccount;
  sourceBridge: Address;
  destinationBridge: Address;
  sessionId: bigint;
  asset: UniversalBridgeAsset;
  recipient?: Address;
  gasOverrides?: UniversalBridgeGasOverrides;
};
