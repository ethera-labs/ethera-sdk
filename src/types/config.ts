import type { AccountAbstractionContracts } from '@/config/account-abstraction';
import type { EtheraRpcSchema } from '@/types/ethera';
import type { Config } from '@wagmi/core';
import type { EntryPointType } from '@zerodev/sdk/types';
import type { Chain, PublicClient, Transport } from 'viem';
import type { EntryPointVersion, SmartAccount } from 'viem/account-abstraction';

export type PaymasterEndpointArgs<TConfig extends Config> = {
  method: 'pm_getPaymasterStubData' | 'pm_getPaymasterData' | 'pm_sponsorUserOperation';
  chainId: TConfig['chains'][number]['id'];
};

export type EtheraConfigArgs<TConfig extends Config> = {
  wagmi: TConfig;
  getPaymasterEndpoint?: (args: PaymasterEndpointArgs<TConfig>) => string;
  accountAbstractionContracts: Partial<Record<TConfig['chains'][number]['id'], AccountAbstractionContracts>>;
};

export type EtheraConfigReturnType<TConfig extends Config = Config> = {
  getPublicClient: (
    chainId: TConfig['chains'][number]['id']
  ) => PublicClient<Transport, Chain, SmartAccount, EtheraRpcSchema>;
  hasPaymaster: boolean;
  entryPoint: EntryPointType<EntryPointVersion>;
} & Pick<EtheraConfigArgs<TConfig>, 'getPaymasterEndpoint' | 'accountAbstractionContracts'>;
