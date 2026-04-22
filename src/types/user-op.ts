import type { Address, Hex } from 'viem';
import type { PrepareUserOperationReturnType } from 'viem/account-abstraction';

export interface CanonicalUserOp {
  sender: PrepareUserOperationReturnType['sender'];
  nonce: Hex;
  initCode: Hex;
  factory?: PrepareUserOperationReturnType['factory'];
  factoryData?: PrepareUserOperationReturnType['factoryData'];
  callData: PrepareUserOperationReturnType['callData'];
  callGasLimit: Hex;
  verificationGasLimit: Hex;
  preVerificationGas: Hex;
  maxFeePerGas: Hex;
  maxPriorityFeePerGas: Hex;
  paymaster?: PrepareUserOperationReturnType['paymaster'];
  paymasterData?: PrepareUserOperationReturnType['paymasterData'];
  paymasterVerificationGasLimit: Hex;
  paymasterPostOpGasLimit: Hex;
  signature: Hex;
}

export interface ComposedSignedUserOpsTxReturnType {
  raw: Hex;
  hash: Hex;
  to: Address;
  chainId: number;
  gas: Hex;
  maxFeePerGas: Hex;
  maxPriorityFeePerGas: Hex;
  userOpHashes: Hex[];
}
