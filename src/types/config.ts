import type { AccountAbstractionContracts } from '@/config/account-abstraction';
import type { EtheraRpcSchema } from '@/types/ethera';
import type { Config } from '@wagmi/core';
import type { EntryPointType } from '@zerodev/sdk/types';
import type { Chain, PublicClient, Transport } from 'viem';
import type { SmartAccount } from 'viem/account-abstraction';

export type PaymasterEndpointArgs<TConfig extends Config> = {
  method: 'pm_getPaymasterStubData' | 'pm_getPaymasterData' | 'pm_sponsorUserOperation';
  chainId: TConfig['chains'][number]['id'];
};

export type EtheraConfigArgs<TConfig extends Config> = {
  wagmi: TConfig;
  getPaymasterEndpoint?: (args: PaymasterEndpointArgs<TConfig>) => string;
  accountAbstractionContracts: Partial<Record<TConfig['chains'][number]['id'], AccountAbstractionContracts>>;
  entryPoint?: EntryPointType<'0.7'>;
  entryPoints?: Partial<Record<TConfig['chains'][number]['id'], EntryPointType<'0.7'>>>;
};

export type EtheraConfigReturnType<TConfig extends Config = Config> = {
  getPublicClient: (
    chainId: TConfig['chains'][number]['id']
  ) => PublicClient<Transport, Chain, SmartAccount, EtheraRpcSchema>;
  getEntryPoint: (chainId: TConfig['chains'][number]['id']) => EntryPointType<'0.7'>;
  hasPaymaster: boolean;
  entryPoint: EntryPointType<'0.7'>;
} & Pick<EtheraConfigArgs<TConfig>, 'getPaymasterEndpoint' | 'accountAbstractionContracts' | 'entryPoints'>;
