import {
  type AccountAbstractionContracts,
  validateAccountAbstractionContracts
} from '@/config/account-abstraction';
import { entryPointV07 } from '@/config/defaults';
import { ComposeError } from '@/errors';
import type { ComposeRpcSchema } from '@/types/compose';
import type { Config } from '@wagmi/core';
import { getPublicClient } from '@wagmi/core';
import type { EntryPointType } from '@zerodev/sdk/types';
import type { Chain, PublicClient, Transport } from 'viem';
import type { EntryPointVersion, SmartAccount } from 'viem/account-abstraction';

type PaymasterEndpointArgs<TConfig extends Config> = {
  method: 'pm_getPaymasterStubData' | 'pm_getPaymasterData' | 'pm_sponsorUserOperation';
  chainId: TConfig['chains'][number]['id'];
};

type ComposeConfigArgs<TConfig extends Config> = {
  wagmi: TConfig;
  getPaymasterEndpoint?: (args: PaymasterEndpointArgs<TConfig>) => string;
  accountAbstractionContracts: Partial<Record<TConfig['chains'][number]['id'], AccountAbstractionContracts>>;
};

export type ComposeConfigReturnType<TConfig extends Config = Config> = {
  getPublicClient: (
    chainId: TConfig['chains'][number]['id']
  ) => PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
  hasPaymaster: boolean;
  entryPoint: EntryPointType<EntryPointVersion>;
} & Pick<ComposeConfigArgs<TConfig>, 'getPaymasterEndpoint' | 'accountAbstractionContracts'>;

export function createComposeConfig<TConfig extends Config>(
  props: ComposeConfigArgs<TConfig>
): ComposeConfigReturnType<TConfig> {
  validateAccountAbstractionContracts(
    props.wagmi.chains.map((chain) => chain.id) as TConfig['chains'][number]['id'][],
    props.accountAbstractionContracts
  );

  return {
    getPaymasterEndpoint: props.getPaymasterEndpoint,
    getPublicClient: (chainId) => {
      const publicClient = getPublicClient(props.wagmi, { chainId }) as
        | PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>
        | undefined;

      if (!publicClient) {
        throw new ComposeError('PUBLIC_CLIENT_NOT_FOUND', `Public client not found for chain ${chainId}.`, {
          details: { chainId }
        });
      }

      return publicClient;
    },
    accountAbstractionContracts: props.accountAbstractionContracts,
    hasPaymaster: Boolean(props.getPaymasterEndpoint),
    entryPoint: entryPointV07
  };
}
