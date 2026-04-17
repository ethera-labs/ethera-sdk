import { jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import { i as isComposeError, C as ComposeError, n as createSmartAccount } from "./xt-B02KMSXU.mjs";
import { useAccount, useWalletClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
const ComposeContext = createContext(null);
function ComposeProvider({
  children,
  config
}) {
  return /* @__PURE__ */ jsx(ComposeContext.Provider, { value: config, children });
}
function useComposeConfig() {
  const context = useContext(ComposeContext);
  if (!context) {
    throw new Error("useCompose must be used within a ComposeProvider");
  }
  return context;
}
const useSmartAccount = ({ chainId, multiChainIds = [] }) => {
  const account = useAccount();
  const composeConfig = useComposeConfig();
  const walletClient = useWalletClient();
  return useQuery({
    queryKey: ["smart-account", walletClient.data?.account.address, chainId, multiChainIds],
    queryFn: async () => {
      if (!walletClient.data) {
        throw new ComposeError("WALLET_CLIENT_NOT_AVAILABLE", `Wallet client not available for chain ${chainId}.`, {
          details: { chainId }
        });
      }
      return createSmartAccount({ signer: walletClient.data, chainId, multiChainIds }, composeConfig);
    },
    enabled: account.isConnected && !!walletClient.data,
    retry: (failureCount, error) => !isComposeError(error) && failureCount < 3
  });
};
export {
  ComposeError,
  ComposeProvider,
  isComposeError,
  useComposeConfig,
  useSmartAccount
};
