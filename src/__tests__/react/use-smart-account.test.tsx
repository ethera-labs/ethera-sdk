import { EtheraError } from '@/errors';
import { EtheraProvider } from '@/libs/react';
import { useSmartAccount } from '@/libs/react/hooks/use-smart-account';
import type { EtheraConfigReturnType } from '@/types';
import { createSmartAccount } from '@/utils/smart-account/create';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { Config } from '@wagmi/core';
import { useAccount, useWalletClient } from 'wagmi';
import { describe, expect, it, vi } from 'vitest';

vi.mock('wagmi', () => ({
  useAccount: vi.fn(),
  useWalletClient: vi.fn()
}));

vi.mock('@/utils/smart-account/create', () => ({
  createSmartAccount: vi.fn()
}));

describe('useSmartAccount', () => {
  it('surfaces structured errors instead of silently disabling the query', async () => {
    const walletClient = { account: { address: '0x0000000000000000000000000000000000000001' } };
    const etheraError = new EtheraError(
      'ACCOUNT_ABSTRACTION_CONTRACTS_MISSING',
      'Account abstraction contracts not found for chain 1.',
      { details: { chainId: 1 } }
    );

    vi.mocked(useAccount).mockReturnValue({ isConnected: true } as never);
    vi.mocked(useWalletClient).mockReturnValue({ data: walletClient } as never);
    vi.mocked(createSmartAccount).mockRejectedValue(etheraError);

    const config = {
      getPublicClient: vi.fn(),
      getEntryPoint: vi.fn(),
      hasPaymaster: false,
      getPaymasterEndpoint: undefined,
      accountAbstractionContracts: {},
      entryPoint: {} as never
    } as EtheraConfigReturnType<Config>;

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <EtheraProvider config={config}>{children}</EtheraProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useSmartAccount({ chainId: 1 }), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(createSmartAccount).toHaveBeenCalledWith({ signer: walletClient, chainId: 1, multiChainIds: [] }, config);
    expect(result.current.error).toBe(etheraError);
  });
});
