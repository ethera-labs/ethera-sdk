import { getAccountAbstractionContractsForChain } from '@/config/account-abstraction';
import type { CreateSmartAccountReturnType, EtheraConfigReturnType } from '@/types';
import type {
  SmartAccountUserOp,
  UserOpCall
} from '@/types';
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
  config: EtheraConfigReturnType
): Promise<CreateSmartAccountReturnType> => {
  const publicClient = config.getPublicClient(chainId);
  const contracts = getAccountAbstractionContractsForChain(config.accountAbstractionContracts, chainId);
  const entryPoint = config.getEntryPoint(chainId);
  const validator = await toMultiChainECDSAValidator(publicClient!, {
    entryPoint,
    signer,
    kernelVersion: KERNEL_V3_1,
    validatorAddress: contracts.multichainValidator,
    multiChainIds: multiChainIds
  });
  const kernelAccount = await createKernelAccount(publicClient as KernelSmartAccountImplementation['client'], {
    entryPoint,
    plugins: { sudo: validator },
    kernelVersion: KERNEL_V3_1,
    accountImplementationAddress: contracts.kernelImpl,
    factoryAddress: contracts.kernelFactory,
    // false: custom chains don't have ZeroDev's canonical KernelFactoryStaker deployed.
    // Account address is derived from kernelFactory directly via createAccount(), not through MetaFactory.
    useMetaFactory: false
  });
  const boundCreateUserOps = createUserOps.bind(null, config, kernelAccount);
  const createUserOp = async (calls: UserOpCall[]): Promise<SmartAccountUserOp> => ({
    account: kernelAccount,
    signer,
    chainId,
    publicClient,
    userOp: await boundCreateUserOps(calls)
  });

  return {
    validator,
    account: {
      ...kernelAccount,
      createUserOp
    },
    signer,
    publicClient
  };
};
