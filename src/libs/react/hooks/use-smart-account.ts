import { useAccount, useWalletClient } from 'wagmi';

import { ComposeError, isComposeError } from '@/errors';
import { useComposeConfig } from '@/libs/react/compose-provider';
import { createSmartAccount } from '@/utils/smart-account/create';
import { useQuery } from '@tanstack/react-query';

type Props = {
  chainId: number;
  multiChainIds?: number[];
};
export const useSmartAccount = ({ chainId, multiChainIds = [] }: Props) => {
  const account = useAccount();
  const composeConfig = useComposeConfig();
  const walletClient = useWalletClient();

  return useQuery({
    queryKey: ['smart-account', walletClient.data?.account.address, chainId, multiChainIds],
    queryFn: async () => {
      if (!walletClient.data) {
        throw new ComposeError('WALLET_CLIENT_NOT_AVAILABLE', `Wallet client not available for chain ${chainId}.`, {
          details: { chainId }
        });
      }

      return createSmartAccount({ signer: walletClient.data, chainId, multiChainIds }, composeConfig);
    },
    enabled: account.isConnected && !!walletClient.data,
    retry: (failureCount, error) => !isComposeError(error) && failureCount < 3
  });
};
