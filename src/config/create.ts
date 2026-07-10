import {
  validateAccountAbstractionContracts
} from '@/config/account-abstraction';
import { entryPointV07 } from '@/config/defaults';
import { EtheraError } from '@/errors';
import type { EtheraRpcSchema } from '@/types/ethera';
import type { EtheraConfigArgs, EtheraConfigReturnType } from '@/types/config';
import type { Config } from '@wagmi/core';
import { getPublicClient } from '@wagmi/core';
import type { Chain, PublicClient, Transport } from 'viem';
import type { SmartAccount } from 'viem/account-abstraction';

export function createEtheraConfig<TConfig extends Config>(
  props: EtheraConfigArgs<TConfig>
): EtheraConfigReturnType<TConfig> {
  const entryPoint = props.entryPoint ?? entryPointV07;

  const aaChainIds = Object.keys(props.accountAbstractionContracts).map(Number) as TConfig['chains'][number]['id'][];
  const wagmiChainIds = new Set(props.wagmi.chains.map((c) => c.id));
  for (const id of aaChainIds) {
    if (!wagmiChainIds.has(id)) {
      throw new EtheraError('PUBLIC_CLIENT_NOT_FOUND', `AA chain ${id} not present in wagmi config.`, {
        details: { chainId: id }
      });
    }
  }
  validateAccountAbstractionContracts(aaChainIds, props.accountAbstractionContracts);

  return {
    getPaymasterEndpoint: props.getPaymasterEndpoint,
    xtSubmissionUrl: props.xtSubmissionUrl,
    getBundlerUrl: props.getBundlerUrl,
    getPublicClient: (chainId) => {
      const publicClient = getPublicClient(props.wagmi, { chainId }) as
        | PublicClient<Transport, Chain, SmartAccount, EtheraRpcSchema>
        | undefined;

      if (!publicClient) {
        throw new EtheraError('PUBLIC_CLIENT_NOT_FOUND', `Public client not found for chain ${chainId}.`, {
          details: { chainId }
        });
      }

      return publicClient;
    },
    accountAbstractionContracts: props.accountAbstractionContracts,
    entryPoints: props.entryPoints,
    getEntryPoint: (chainId) => props.entryPoints?.[chainId] ?? entryPoint,
    hasPaymaster: Boolean(props.getPaymasterEndpoint),
    entryPoint
  };
}
