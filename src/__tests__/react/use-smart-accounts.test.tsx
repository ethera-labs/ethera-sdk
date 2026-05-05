import { EtheraError } from '@/errors';
import { EtheraProvider } from '@/libs/react';
import { useSmartAccounts } from '@/libs/react/hooks/use-smart-accounts';
import type { EtheraConfigReturnType } from '@/types';
import { createSmartAccount } from '@/utils/smart-account/create';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { Config } from '@wagmi/core';
import React from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('wagmi', () => ({
  useAccount: vi.fn(),
  useWalletClient: vi.fn()
}));

vi.mock('@/utils/smart-account/create', () => ({
  createSmartAccount: vi.fn()
}));

const walletClient = { account: { address: '0x0000000000000000000000000000000000000001' } };

const config = {
  getPublicClient: vi.fn(),
  getEntryPoint: vi.fn(),
  hasPaymaster: false,
  getPaymasterEndpoint: undefined,
  accountAbstractionContracts: {},
  entryPoint: {} as never
} as EtheraConfigReturnType<Config>;

const makeWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <EtheraProvider config={config}>{children}</EtheraProvider>
    </QueryClientProvider>
  );
};

describe('useSmartAccounts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns chain-keyed accounts on success', async () => {
    const mockAccount = { account: { address: '0xabc' } };
    vi.mocked(useAccount).mockReturnValue({ isConnected: true } as never);
    vi.mocked(useWalletClient).mockReturnValue({ data: walletClient } as never);
    vi.mocked(createSmartAccount).mockResolvedValue(mockAccount as never);

    const { result } = renderHook(() => useSmartAccounts({ chainIds: [1, 2] }), { wrapper: makeWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.accounts[1].data).toBe(mockAccount);
    expect(result.current.accounts[2].data).toBe(mockAccount);
    expect(result.current.isError).toBe(false);
    expect(result.current.errors).toHaveLength(0);
  });

  it('defaults multiChainIds to chainIds when not provided', async () => {
    vi.mocked(useAccount).mockReturnValue({ isConnected: true } as never);
    vi.mocked(useWalletClient).mockReturnValue({ data: walletClient } as never);
    vi.mocked(createSmartAccount).mockResolvedValue({} as never);

    const { result } = renderHook(() => useSmartAccounts({ chainIds: [1, 2] }), { wrapper: makeWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(createSmartAccount).toHaveBeenCalledWith(
      { signer: walletClient, chainId: 1, multiChainIds: [1, 2] },
      config
    );
  });

  it('uses explicit multiChainIds when provided', async () => {
    vi.mocked(useAccount).mockReturnValue({ isConnected: true } as never);
    vi.mocked(useWalletClient).mockReturnValue({ data: walletClient } as never);
    vi.mocked(createSmartAccount).mockResolvedValue({} as never);

    const { result } = renderHook(
      () => useSmartAccounts({ chainIds: [1], multiChainIds: [1, 2, 3] }),
      { wrapper: makeWrapper() }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(createSmartAccount).toHaveBeenCalledWith(
      { signer: walletClient, chainId: 1, multiChainIds: [1, 2, 3] },
      config
    );
  });

  it('reports aggregate error state when one chain fails', async () => {
    const etheraError = new EtheraError('ACCOUNT_ABSTRACTION_CONTRACTS_MISSING', 'Missing contracts.', {
      details: { chainId: 2 }
    });

    vi.mocked(useAccount).mockReturnValue({ isConnected: true } as never);
    vi.mocked(useWalletClient).mockReturnValue({ data: walletClient } as never);
    vi.mocked(createSmartAccount)
      .mockResolvedValueOnce({} as never)
      .mockRejectedValueOnce(etheraError);

    const { result } = renderHook(() => useSmartAccounts({ chainIds: [1, 2] }), { wrapper: makeWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isError).toBe(true);
    expect(result.current.errors).toContain(etheraError);
    expect(result.current.accounts[1].isError).toBe(false);
    expect(result.current.accounts[2].isError).toBe(true);
  });

  it('does not query when wallet is not connected', () => {
    vi.mocked(useAccount).mockReturnValue({ isConnected: false } as never);
    vi.mocked(useWalletClient).mockReturnValue({ data: undefined } as never);

    const { result } = renderHook(() => useSmartAccounts({ chainIds: [1, 2] }), { wrapper: makeWrapper() });

    expect(result.current.isLoading).toBe(false);
    expect(createSmartAccount).not.toHaveBeenCalled();
  });
});
