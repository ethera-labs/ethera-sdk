import { entryPointV07 } from '@/config/defaults';
import type { ComposeRpcSchema } from '@/types/compose';
import type { Config } from '@wagmi/core';
import { getPublicClient } from '@wagmi/core';
import type { EntryPointType } from '@zerodev/sdk/types';
import type { Account, Chain, PublicClient, Transport } from 'viem';
import type { EntryPointVersion } from 'viem/account-abstraction';

type PaymasterEndpointArgs<TConfig extends Config> = {
  method: 'pm_getPaymasterStubData' | 'pm_getPaymasterData' | 'pm_sponsorUserOperation';
  chainId: TConfig['chains'][number]['id'];
};

type AccountAbstractionContracts = {
  kernelImpl: `0x${string}`;
  kernelFactory: `0x${string}`;
  multichainValidator: `0x${string}`;
  metaFactory: `0x${string}`;
};

type ComposeConfigArgs<TConfig extends Config> = {
  wagmi: TConfig;
  getPaymasterEndpoint?: (args: PaymasterEndpointArgs<TConfig>) => string;
  accountAbstractionContracts: Partial<Record<TConfig['chains'][number]['id'], AccountAbstractionContracts>>;
};

export type ComposeConfigReturnType<TConfig extends Config = Config> = {
  getPublicClient: (
    chainId: TConfig['chains'][number]['id']
  ) => PublicClient<Transport, Chain, Account, ComposeRpcSchema>;
  hasPaymaster: boolean;
  entryPoint: EntryPointType<EntryPointVersion>;
} & Pick<ComposeConfigArgs<TConfig>, 'getPaymasterEndpoint' | 'accountAbstractionContracts'>;

export function createComposeConfig<TConfig extends Config>(
  props: ComposeConfigArgs<TConfig>
): ComposeConfigReturnType<TConfig> {
  return {
    getPaymasterEndpoint: props.getPaymasterEndpoint,
    getPublicClient: (chainId) => getPublicClient(props.wagmi, { chainId }) as unknown as PublicClient<Transport, Chain, Account, ComposeRpcSchema>,
    accountAbstractionContracts: props.accountAbstractionContracts,
    hasPaymaster: Boolean(props.getPaymasterEndpoint),
    entryPoint: entryPointV07
  };
}
