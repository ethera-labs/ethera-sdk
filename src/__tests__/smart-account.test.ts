import { createSmartAccount } from '@/utils/smart-account/create';
import { rollupsAccountAbstractionContracts } from '@/config/defaults';
import type { EtheraConfigReturnType } from '@/types';
import type { EtheraRpcSchema } from '@/types/ethera';
import { toMultiChainECDSAValidator } from '@zerodev/multi-chain-ecdsa-validator';
import { createKernelAccount } from '@zerodev/sdk';
import type { Chain, PublicClient, Transport } from 'viem';
import type { SmartAccount } from 'viem/account-abstraction';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@zerodev/multi-chain-ecdsa-validator', () => ({
  toMultiChainECDSAValidator: vi.fn()
}));

vi.mock('@zerodev/sdk', () => ({
  createKernelAccount: vi.fn()
}));

describe('createSmartAccount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fails before smart-account creation when required contracts are missing', async () => {
    const publicClient = {
      chain: { id: 1 }
    } as unknown as PublicClient<Transport, Chain, SmartAccount, EtheraRpcSchema>;

    const config: EtheraConfigReturnType = {
      getPublicClient: vi.fn(() => publicClient),
      getEntryPoint: vi.fn(() => ({} as never)),
      hasPaymaster: false,
      getPaymasterEndpoint: undefined,
      accountAbstractionContracts: {},
      entryPoint: {} as never
    };

    await expect(
      createSmartAccount({ signer: {} as never, chainId: 1 }, config)
    ).rejects.toMatchObject({
      code: 'ACCOUNT_ABSTRACTION_CONTRACTS_MISSING',
      details: { chainId: 1 }
    });

    expect(toMultiChainECDSAValidator).not.toHaveBeenCalled();
    expect(createKernelAccount).not.toHaveBeenCalled();
  });

  it('uses the configured entry point for validator and kernel account creation', async () => {
    const publicClient = {
      chain: { id: 1 }
    } as unknown as PublicClient<Transport, Chain, SmartAccount, EtheraRpcSchema>;
    const entryPoint = { address: '0xentrypoint' } as never;
    const validator = { type: 'validator' };
    const kernelAccount = {
      address: '0x0000000000000000000000000000000000000001',
      client: { chain: { id: 1 } },
      encodeCalls: vi.fn()
    };

    vi.mocked(toMultiChainECDSAValidator).mockResolvedValue(validator as never);
    vi.mocked(createKernelAccount).mockResolvedValue(kernelAccount as never);

    const config: EtheraConfigReturnType = {
      getPublicClient: vi.fn(() => publicClient),
      getEntryPoint: vi.fn(() => entryPoint),
      hasPaymaster: false,
      getPaymasterEndpoint: undefined,
      accountAbstractionContracts: {
        1: rollupsAccountAbstractionContracts
      },
      entryPoint
    };

    await createSmartAccount({ signer: {} as never, chainId: 1, multiChainIds: [1, 2] }, config);

    expect(config.getEntryPoint).toHaveBeenCalledWith(1);
    expect(toMultiChainECDSAValidator).toHaveBeenCalledWith(
      publicClient,
      expect.objectContaining({
        entryPoint,
        validatorAddress: rollupsAccountAbstractionContracts.multichainValidator,
        multiChainIds: [1, 2]
      })
    );
    expect(createKernelAccount).toHaveBeenCalledWith(
      publicClient,
      expect.objectContaining({
        entryPoint,
        plugins: { sudo: validator },
        accountImplementationAddress: rollupsAccountAbstractionContracts.kernelImpl,
        factoryAddress: rollupsAccountAbstractionContracts.kernelFactory
      })
    );
  });
});
