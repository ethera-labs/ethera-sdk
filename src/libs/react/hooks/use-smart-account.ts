import { useAccount, useWalletClient } from 'wagmi';

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

  if (!composeConfig.accountAbstractionContracts?.[chainId]) {
    console.error(`Account abstraction contracts not fou  nd for chain ${chainId}`);
  }

  return useQuery({
    queryKey: ['smart-account', walletClient.data?.account.address, chainId, multiChainIds],
    queryFn: async () => createSmartAccount({ signer: walletClient.data!, chainId, multiChainIds }, composeConfig),
    enabled: account.isConnected && !!walletClient.data && !!composeConfig.accountAbstractionContracts?.[chainId]
  });
};
