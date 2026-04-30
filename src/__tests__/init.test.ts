import { rollupA, rollupB } from '@/config/chains';
import { createEtheraConfig } from '@/config/create';
import { rollupsAccountAbstractionContracts } from '@/config/defaults';
import type { EtheraError } from '@/errors';
import type { EtheraRpcSchema } from '@/types/ethera';
import { createConfig, http } from '@wagmi/core';
import { createPublicClient, rpcSchema } from 'viem';
import { describe, expect, it } from 'vitest';

describe('createEtheraConfig initialization', () => {
  const wagmiConfig = createConfig({
    chains: [rollupA, rollupB],
    client(parameters) {
      return createPublicClient({
        chain: parameters.chain,
        transport: http(parameters.chain.rpcUrls.default.http[0]),
        rpcSchema: rpcSchema<EtheraRpcSchema>()
      });
    }
  });

  it('should initialize Ethera config with rollup chains', () => {
    const config = createEtheraConfig({
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
    expect(config.getEntryPoint(rollupA.id)).toBe(config.entryPoint);
    expect(config.getEntryPoint(rollupB.id)).toBe(config.entryPoint);
    expect(config.accountAbstractionContracts).toBeDefined();
    expect(config.accountAbstractionContracts?.[rollupA.id]).toEqual(rollupsAccountAbstractionContracts);
    expect(config.accountAbstractionContracts?.[rollupB.id]).toEqual(rollupsAccountAbstractionContracts);
  });

  it('supports global and per-chain entry point configuration', () => {
    const globalEntryPoint = { address: '0xglobal' } as never;
    const rollupBEntryPoint = { address: '0xrollupB' } as never;

    const config = createEtheraConfig({
      wagmi: wagmiConfig,
      entryPoint: globalEntryPoint,
      entryPoints: {
        [rollupB.id]: rollupBEntryPoint
      },
      accountAbstractionContracts: {
        [rollupA.id]: rollupsAccountAbstractionContracts,
        [rollupB.id]: rollupsAccountAbstractionContracts
      }
    });

    expect(config.entryPoint).toBe(globalEntryPoint);
    expect(config.entryPoints?.[rollupB.id]).toBe(rollupBEntryPoint);
    expect(config.getEntryPoint(rollupA.id)).toBe(globalEntryPoint);
    expect(config.getEntryPoint(rollupB.id)).toBe(rollupBEntryPoint);
  });

  it('fails fast when contracts are missing for a configured chain', () => {
    expect(() =>
      createEtheraConfig({
        wagmi: wagmiConfig,
        accountAbstractionContracts: {
          [rollupA.id]: rollupsAccountAbstractionContracts
        }
      })
    ).toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'ACCOUNT_ABSTRACTION_CONTRACTS_MISSING',
        details: { chainId: rollupB.id }
      })
    );
  });

  it('fails fast when a required contract field is missing', () => {
    expect(() =>
      createEtheraConfig({
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
      expect.objectContaining<Partial<EtheraError>>({
        code: 'ACCOUNT_ABSTRACTION_CONTRACT_FIELD_MISSING',
        details: { chainId: rollupA.id, field: 'kernelFactory' }
      })
    );
  });

  it('fails fast when a contract address is invalid', () => {
    expect(() =>
      createEtheraConfig({
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
      expect.objectContaining<Partial<EtheraError>>({
        code: 'ACCOUNT_ABSTRACTION_CONTRACT_ADDRESS_INVALID',
        details: { chainId: rollupA.id, field: 'kernelImpl', value: '0x1234' }
      })
    );
  });
});
