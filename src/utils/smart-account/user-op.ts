import type { Address, Hex } from 'viem';
import { concatHex, isHex, toHex, zeroAddress } from 'viem';
import type { PrepareUserOperationReturnType } from 'viem/account-abstraction';

export function toRpcUserOpCanonical(op: PrepareUserOperationReturnType) {
  const hx = (v: string | bigint) =>
    typeof v === 'string' && isHex(v as `0x${string}`) ? (v as `0x${string}`) : toHex(BigInt(v || '0'));

  const initCode: `0x${string}` =
    op.initCode && isHex(op.initCode) && op.initCode !== '0x'
      ? op.initCode
      : op.factory && op.factory !== zeroAddress && op.factoryData
        ? concatHex([
            (op.factory.toLowerCase().startsWith('0x') ? op.factory : '0x' + op.factory) as `0x${string}`,
            op.factoryData as `0x${string}`
          ])
        : '0x';


  return {
    sender: op.sender,
    nonce: hx(op.nonce),
    initCode,
    factory: op.factory,
    factoryData: op.factoryData,
    callData: op.callData,
    callGasLimit: hx(op.callGasLimit),
    verificationGasLimit: hx(op.verificationGasLimit),
    preVerificationGas: hx(op.preVerificationGas),
    maxFeePerGas: hx(op.maxFeePerGas),
    maxPriorityFeePerGas: hx(op.maxPriorityFeePerGas),
    paymaster: op.paymaster,
    paymasterData: op.paymasterData,
    paymasterVerificationGasLimit: hx(op.paymasterVerificationGasLimit!),
    paymasterPostOpGasLimit: hx(op.paymasterPostOpGasLimit!),
    signature: op.signature ?? '0x'
  };
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
