import { createSmartAccount } from '@/utils/smart-account/create';
import type { EtheraConfigReturnType } from '@/types';
import type { EtheraRpcSchema } from '@/types/ethera';
import { toMultiChainECDSAValidator } from '@zerodev/multi-chain-ecdsa-validator';
import { createKernelAccount } from '@zerodev/sdk';
import type { Chain, PublicClient, Transport } from 'viem';
import type { SmartAccount } from 'viem/account-abstraction';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@zerodev/multi-chain-ecdsa-validator', () => ({
  toMultiChainECDSAValidator: vi.fn()
}));

vi.mock('@zerodev/sdk', () => ({
  createKernelAccount: vi.fn()
}));

describe('createSmartAccount', () => {
  it('fails before smart-account creation when required contracts are missing', async () => {
    const publicClient = {
      chain: { id: 1 }
    } as unknown as PublicClient<Transport, Chain, SmartAccount, EtheraRpcSchema>;

    const config: EtheraConfigReturnType = {
      getPublicClient: vi.fn(() => publicClient),
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
});
