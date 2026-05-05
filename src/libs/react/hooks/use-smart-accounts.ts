import { useAccount, useWalletClient } from 'wagmi';

import { EtheraError, isEtheraError } from '@/errors';
import { useEtheraConfig } from '@/libs/react/ethera-provider';
import { createSmartAccount } from '@/utils/smart-account/create';
import { useQueries } from '@tanstack/react-query';

type Props = {
  chainIds: number[];
  multiChainIds?: number[];
};

export const useSmartAccounts = ({ chainIds, multiChainIds }: Props) => {
  const account = useAccount();
  const etheraConfig = useEtheraConfig();
  const walletClient = useWalletClient();

  const resolvedMultiChainIds = multiChainIds ?? chainIds;

  const results = useQueries({
    queries: chainIds.map((chainId) => ({
      queryKey: ['smart-account', walletClient.data?.account.address, chainId, resolvedMultiChainIds],
      queryFn: async () => {
        if (!walletClient.data) {
          throw new EtheraError('WALLET_CLIENT_NOT_AVAILABLE', `Wallet client not available for chain ${chainId}.`, {
            details: { chainId }
          });
        }

        return createSmartAccount(
          { signer: walletClient.data, chainId, multiChainIds: resolvedMultiChainIds },
          etheraConfig
        );
      },
      enabled: account.isConnected && !!walletClient.data,
      retry: (failureCount: number, error: unknown) => !isEtheraError(error) && failureCount < 3
    }))
  });

  const accounts = Object.fromEntries(chainIds.map((chainId, index) => [chainId, results[index]])) as Record<
    number,
    (typeof results)[number]
  >;

  return {
    accounts,
    isLoading: results.some((r) => r.isLoading),
    isError: results.some((r) => r.isError),
    errors: results.map((r) => r.error).filter(Boolean)
  };
};
