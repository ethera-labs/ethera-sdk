import { rollupA, rollupB } from '@/config/chains';
import { createComposeConfig } from '@/config/create';
import { rollupsAccountAbstractionContracts } from '@/config/defaults';
import type { ComposeRpcSchema } from '@/types/compose';
import { createConfig, http } from '@wagmi/core';
import { createPublicClient, rpcSchema } from 'viem';
import { describe, expect, it } from 'vitest';


describe('createComposeConfig initialization', () => {
  it('should initialize compose config with rollup chains', () => {
    const wagmiConfig = createConfig({
      chains: [rollupA, rollupB],
      client(parameters) {
        return createPublicClient({
          chain: parameters.chain,
          transport: http(parameters.chain.rpcUrls.default.http[0]),
          rpcSchema: rpcSchema<ComposeRpcSchema>()
        });
      }
    });

    const config = createComposeConfig({
      wagmi: wagmiConfig,
      getPaymasterEndpoint({ chainId }) {
        if (chainId === 11113) {
          return 'https://paymaster.com/rpc/v1/11113';
        } else if (chainId === 22224) {
          return 'https://paymaster.com/rpc/v1/22224';
        }
        return '';
      },
      accountAbstractionContracts: {
        [rollupA.id]: rollupsAccountAbstractionContracts,
        [rollupB.id]: rollupsAccountAbstractionContracts
      }
    });

    expect(config).toBeDefined();
    expect(config.getPaymasterEndpoint).toBeDefined();
    expect(config.getPaymasterEndpoint?.({ method: 'pm_getPaymasterStubData', chainId: rollupA.id })).toBe(
      'https://paymaster.com/rpc/v1/11113'
    );
    expect(config.getPaymasterEndpoint?.({ method: 'pm_getPaymasterStubData', chainId: rollupB.id })).toBe(
      'https://paymaster.com/rpc/v1/22224'
    );
    expect(config.getPublicClient(rollupA.id)).toBeDefined();
    expect(config.getPublicClient(rollupB.id)).toBeDefined();
    expect(config.accountAbstractionContracts).toBeDefined();
    expect(config.accountAbstractionContracts?.[rollupA.id]).toEqual(rollupsAccountAbstractionContracts);
    expect(config.accountAbstractionContracts?.[rollupB.id]).toEqual(rollupsAccountAbstractionContracts);
  });
});
