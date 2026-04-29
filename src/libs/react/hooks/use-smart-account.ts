import { useAccount, useWalletClient } from 'wagmi';

import { EtheraError, isEtheraError } from '@/errors';
import { useEtheraConfig } from '@/libs/react/ethera-provider';
import { createSmartAccount } from '@/utils/smart-account/create';
import { useQuery } from '@tanstack/react-query';

type Props = {
  chainId: number;
  multiChainIds?: number[];
};
export const useSmartAccount = ({ chainId, multiChainIds = [] }: Props) => {
  const account = useAccount();
  const etheraConfig = useEtheraConfig();
  const walletClient = useWalletClient();

  return useQuery({
    queryKey: ['smart-account', walletClient.data?.account.address, chainId, multiChainIds],
    queryFn: async () => {
      if (!walletClient.data) {
        throw new EtheraError('WALLET_CLIENT_NOT_AVAILABLE', `Wallet client not available for chain ${chainId}.`, {
          details: { chainId }
        });
      }

      return createSmartAccount({ signer: walletClient.data, chainId, multiChainIds }, etheraConfig);
    },
    enabled: account.isConnected && !!walletClient.data,
    retry: (failureCount, error) => !isEtheraError(error) && failureCount < 3
  });
};
