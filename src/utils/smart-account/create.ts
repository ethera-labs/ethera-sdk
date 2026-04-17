import { getAccountAbstractionContractsForChain } from '@/config/account-abstraction';
import { entryPointV07 } from '@/config';
import type { ComposeConfigReturnType } from '@/config/create';
import type { UserOPCall } from '@/utils/user-operations';
import { createUserOps } from '@/utils/user-operations';
import { toMultiChainECDSAValidator } from '@zerodev/multi-chain-ecdsa-validator';
import type { CreateKernelAccountReturnType, KernelSmartAccountImplementation } from '@zerodev/sdk';
import { createKernelAccount } from '@zerodev/sdk';
import { KERNEL_V3_1 } from '@zerodev/sdk/constants';
import type { KernelValidator, Signer } from '@zerodev/sdk/types';
import type { Chain, PublicClient, Transport } from 'viem';
import type { ComposeRpcSchema } from '@/types/compose';
import type { SmartAccount } from 'viem/account-abstraction';

type Props = {
  chainId: number;
  multiChainIds?: number[];
  signer: Signer;
};

export type ComposeSmartAccount = CreateKernelAccountReturnType & {
  createUserOp: (calls: UserOPCall[]) => Promise<{
    account: CreateKernelAccountReturnType;
    signer: Signer;
    chainId: number;
    publicClient: PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
    userOp: Awaited<ReturnType<typeof createUserOps>>;
  }>;
};

export interface CreateSmartAccountReturnType {
  validator: KernelValidator<'MultiChainECDSAValidator'>;
  account: ComposeSmartAccount;
  signer: Signer;
  publicClient: PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
}

export const createSmartAccount = async (
  { signer, chainId, multiChainIds = [] }: Props,
  config: ComposeConfigReturnType
): Promise<CreateSmartAccountReturnType> => {
  const publicClient = config.getPublicClient(chainId);
  const contracts = getAccountAbstractionContractsForChain(config.accountAbstractionContracts, chainId);
  const validator = await toMultiChainECDSAValidator(publicClient!, {
    entryPoint: config.entryPoint,
    signer,
    kernelVersion: KERNEL_V3_1,
    validatorAddress: contracts.multichainValidator,
    multiChainIds: multiChainIds
  });
  const kernelAccount = await createKernelAccount(publicClient as KernelSmartAccountImplementation['client'], {
    entryPoint: entryPointV07,
    plugins: { sudo: validator },
    kernelVersion: KERNEL_V3_1,
    accountImplementationAddress: contracts.kernelImpl,
    factoryAddress: contracts.kernelFactory,
    useMetaFactory: false
  });
  const boundCreateUserOps = createUserOps.bind(null, config, kernelAccount);
  return {
    validator: validator,
    account: {
      ...kernelAccount,
      createUserOp: async (calls: UserOPCall[]) => ({
        account: kernelAccount,
        signer,
        chainId,
        publicClient,
        userOp: await boundCreateUserOps(calls)
      })
    },
    signer,
    publicClient
  };
};
