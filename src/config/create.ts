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

  validateAccountAbstractionContracts(
    props.wagmi.chains.map((chain) => chain.id) as TConfig['chains'][number]['id'][],
    props.accountAbstractionContracts
  );

  return {
    getPaymasterEndpoint: props.getPaymasterEndpoint,
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
