import { api } from '@/api/api-client';
import { getPaymasterDataForChain } from '@/api/paymaster';
import type { EtheraError } from '@/errors';
import type { Address, Hex } from 'viem';
import type { GetPaymasterDataParameters } from 'viem/account-abstraction';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/api/api-client', () => ({
  api: {
    post: vi.fn()
  }
}));

const createPaymasterParams = (chainId = 1) =>
  ({
    chainId,
    entryPointAddress: '0x0000000000000000000000000000000000000001' as Address,
    sender: '0x0000000000000000000000000000000000000002' as Address,
    nonce: 0n,
    callData: '0x' as Hex,
    callGasLimit: 1n,
    verificationGasLimit: 1n,
    maxFeePerGas: 1n,
    maxPriorityFeePerGas: 1n,
    preVerificationGas: 1n
  }) as GetPaymasterDataParameters;

describe('getPaymasterDataForChain', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects empty paymaster endpoints before making a network request', async () => {
    await expect(
      getPaymasterDataForChain({
        params: createPaymasterParams(5),
        method: 'pm_sponsorUserOperation',
        getPaymasterEndpoint: vi.fn(() => '')
      })
    ).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'PAYMASTER_ENDPOINT_INVALID',
        details: { method: 'pm_sponsorUserOperation', chainId: 5, value: '' }
      })
    );

    expect(api.post).not.toHaveBeenCalled();
  });

  it('rejects malformed paymaster endpoints before making a network request', async () => {
    await expect(
      getPaymasterDataForChain({
        params: createPaymasterParams(6),
        method: 'pm_getPaymasterStubData',
        getPaymasterEndpoint: vi.fn(() => 'not-a-url')
      })
    ).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'PAYMASTER_ENDPOINT_INVALID',
        details: { method: 'pm_getPaymasterStubData', chainId: 6, value: 'not-a-url' }
      })
    );

    expect(api.post).not.toHaveBeenCalled();
  });

  it('posts to validated paymaster endpoints', async () => {
    vi.mocked(api.post).mockResolvedValue({
      result: {
        paymaster: '0x0000000000000000000000000000000000000003',
        paymasterData: '0x',
        paymasterPostOpGasLimit: '0x1',
        paymasterVerificationGasLimit: '0x2',
        preVerificationGas: '0x1',
        callGasLimit: '0x1',
        verificationGasLimit: '0x1'
      }
    });

    const result = await getPaymasterDataForChain({
      params: createPaymasterParams(7),
      method: 'pm_getPaymasterData',
      getPaymasterEndpoint: vi.fn(() => 'https://paymaster.test/rpc')
    });

    expect(api.post).toHaveBeenCalledWith(
      'https://paymaster.test/rpc',
      expect.objectContaining({
        method: 'pm_getPaymasterData'
      }),
      expect.any(Object)
    );
    expect(result.paymasterPostOpGasLimit).toBe(1n);
    expect(result.paymasterVerificationGasLimit).toBe(2n);
  });
});
