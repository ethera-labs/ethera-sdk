import { entryPointV07 } from '@/config';
import type { ComposeConfigReturnType } from '@/config/create';
import { createUserOps } from '@/utils/user-operations';
import { toMultiChainECDSAValidator } from '@zerodev/multi-chain-ecdsa-validator';
import type { KernelSmartAccountImplementation } from '@zerodev/sdk';
import { createKernelAccount } from '@zerodev/sdk';
import { KERNEL_V3_1 } from '@zerodev/sdk/constants';
import type { Signer } from '@zerodev/sdk/types';

type Props = {
  chainId: number;
  multiChainIds?: number[];
  signer: Signer;
};

export const createSmartAccount = async (
  { signer, chainId, multiChainIds = [] }: Props,
  config: ComposeConfigReturnType
) => {
  const publicClient = config.getPublicClient(chainId);
  const validator = await toMultiChainECDSAValidator(publicClient!, {
    entryPoint: config.entryPoint,
    signer,
    kernelVersion: KERNEL_V3_1,
    validatorAddress: config.accountAbstractionContracts?.[chainId]?.multichainValidator,
    multiChainIds: multiChainIds
  });
  const kernelAccount = await createKernelAccount(publicClient as KernelSmartAccountImplementation['client'], {
    entryPoint: entryPointV07,
    plugins: { sudo: validator },
    kernelVersion: KERNEL_V3_1,
    accountImplementationAddress: config.accountAbstractionContracts?.[chainId]?.kernelImpl,
    factoryAddress: config.accountAbstractionContracts?.[chainId]?.kernelFactory,
    useMetaFactory: false
  });
  return {
    validator: validator,
    account: {
      ...kernelAccount,
      createUserOp: createUserOps.bind(null, config, kernelAccount)
    },
    signer,
    publicClient
  };
};
