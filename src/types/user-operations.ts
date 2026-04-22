import type { EtheraRpcSchema } from '@/types/ethera';
import type { CanonicalUserOp, ComposedSignedUserOpsTxReturnType } from '@/types/user-op';
import type { SignUserOperationsRequest } from '@zerodev/multi-chain-ecdsa-validator';
import type { CreateKernelAccountReturnType } from '@zerodev/sdk';
import type { Signer } from '@zerodev/sdk/types';
import type { Chain, PublicClient, Transport } from 'viem';
import type { Address, Hex } from 'viem';
import type { PaymasterActions, SmartAccount } from 'viem/account-abstraction';

export type EtheraPublicClient = PublicClient<Transport, Chain, SmartAccount, EtheraRpcSchema>;

export type UserOpCall = {
  to: Address;
  value: bigint;
  data: Hex;
};

export type CreatedUserOp = {
  account: CreateKernelAccountReturnType<'0.7'>;
  chainId: number;
  callData: Hex;
  callGasLimit: bigint;
  verificationGasLimit: bigint;
  preVerificationGas: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  paymaster?: PaymasterActions;
};

export type UnpreparedUserOp = {
  account: CreateKernelAccountReturnType;
  publicClient: EtheraPublicClient;
  userOp: CreatedUserOp;
};

export type SmartAccountUserOp = UnpreparedUserOp & {
  signer: Signer;
  chainId: number;
};

type ChainAwareAccount = {
  client?: {
    chain?: {
      id?: number;
    };
  };
};

export type CreateUserOpCapableAccount = ChainAwareAccount & {
  createUserOp: (calls: UserOpCall[]) => Promise<SmartAccountUserOp>;
};

export type ComposableSmartAccount = {
  account: CreateUserOpCapableAccount;
  publicClient: EtheraPublicClient;
};

export type UserOpsOperation = {
  smartAccount: ComposableSmartAccount;
  calls: UserOpCall[];
};

export type UserOpsParams = UserOpsOperation[];

export type UnpreparedUserOps = UnpreparedUserOp[];

export type UserOpsOptions = {
  onSigned?: (signedOps: CanonicalUserOp[]) => void;
  onComposed?: (builds: ComposedSignedUserOpsTxReturnType[], explorerUrls: string[]) => void;
  onPayloadEncoded?: (payload: Hex) => void;
};

export type PreparedUserOp = {
  account: CreateKernelAccountReturnType;
  publicClient: EtheraPublicClient;
  userOp: SignUserOperationsRequest;
};

export type PreparedUserOps = PreparedUserOp[];

export type SignedUserOp = {
  signedCanonicalOps: CanonicalUserOp;
  publicClient: EtheraPublicClient;
};

export type SignedUserOps = SignedUserOp[];
