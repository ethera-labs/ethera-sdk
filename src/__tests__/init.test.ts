import { rollupA, rollupB } from '@/config/chains';
import { createComposeConfig } from '@/config/create';
import { rollupsAccountAbstractionContracts } from '@/config/defaults';
import { ComposeError } from '@/errors';
import type { ComposeRpcSchema } from '@/types/compose';
import { createConfig, http } from '@wagmi/core';
import { createPublicClient, rpcSchema } from 'viem';
import { describe, expect, it } from 'vitest';

describe('createComposeConfig initialization', () => {
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

  it('should initialize compose config with rollup chains', () => {
    const config = createComposeConfig({
      wagmi: wagmiConfig,
      getPaymasterEndpoint({ chainId }) {
        if (chainId === 555555) {
          return 'https://paymaster.com/rpc/v1/555555';
        } else if (chainId === 666666) {
          return 'https://paymaster.com/rpc/v1/666666';
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
      'https://paymaster.com/rpc/v1/555555'
    );
    expect(config.getPaymasterEndpoint?.({ method: 'pm_getPaymasterStubData', chainId: rollupB.id })).toBe(
      'https://paymaster.com/rpc/v1/666666'
    );
    expect(config.getPublicClient(rollupA.id)).toBeDefined();
    expect(config.getPublicClient(rollupB.id)).toBeDefined();
    expect(config.accountAbstractionContracts).toBeDefined();
    expect(config.accountAbstractionContracts?.[rollupA.id]).toEqual(rollupsAccountAbstractionContracts);
    expect(config.accountAbstractionContracts?.[rollupB.id]).toEqual(rollupsAccountAbstractionContracts);
  });

  it('fails fast when contracts are missing for a configured chain', () => {
    expect(() =>
      createComposeConfig({
        wagmi: wagmiConfig,
        accountAbstractionContracts: {
          [rollupA.id]: rollupsAccountAbstractionContracts
        }
      })
    ).toThrowError(
      expect.objectContaining<Partial<ComposeError>>({
        code: 'ACCOUNT_ABSTRACTION_CONTRACTS_MISSING',
        details: { chainId: rollupB.id }
      })
    );
  });

  it('fails fast when a required contract field is missing', () => {
    expect(() =>
      createComposeConfig({
        wagmi: wagmiConfig,
        accountAbstractionContracts: {
          [rollupA.id]: {
            kernelImpl: rollupsAccountAbstractionContracts.kernelImpl,
            multichainValidator: rollupsAccountAbstractionContracts.multichainValidator
          } as never,
          [rollupB.id]: rollupsAccountAbstractionContracts
        }
      })
    ).toThrowError(
      expect.objectContaining<Partial<ComposeError>>({
        code: 'ACCOUNT_ABSTRACTION_CONTRACT_FIELD_MISSING',
        details: { chainId: rollupA.id, field: 'kernelFactory' }
      })
    );
  });

  it('fails fast when a contract address is invalid', () => {
    expect(() =>
      createComposeConfig({
        wagmi: wagmiConfig,
        accountAbstractionContracts: {
          [rollupA.id]: {
            ...rollupsAccountAbstractionContracts,
            kernelImpl: '0x1234'
          },
          [rollupB.id]: rollupsAccountAbstractionContracts
        }
      })
    ).toThrowError(
      expect.objectContaining<Partial<ComposeError>>({
        code: 'ACCOUNT_ABSTRACTION_CONTRACT_ADDRESS_INVALID',
        details: { chainId: rollupA.id, field: 'kernelImpl', value: '0x1234' }
      })
    );
  });
});
