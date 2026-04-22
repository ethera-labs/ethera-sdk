import type { CreateUserOpCapableAccount, EtheraPublicClient } from '@/types/user-operations';
import type { CreateKernelAccountReturnType } from '@zerodev/sdk';
import type { KernelValidator } from '@zerodev/sdk/types';
import type { Signer } from '@zerodev/sdk/types';

export type EtheraSmartAccount = CreateKernelAccountReturnType & Pick<CreateUserOpCapableAccount, 'createUserOp'>;

export interface CreateSmartAccountReturnType {
  validator: KernelValidator<'MultiChainECDSAValidator'>;
  account: EtheraSmartAccount;
  signer: Signer;
  publicClient: EtheraPublicClient;
}
