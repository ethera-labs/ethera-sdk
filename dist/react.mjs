import { jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { u as createSmartAccount } from "./xt-BIgtj6Se.mjs";
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
  if (!composeConfig.accountAbstractionContracts?.[chainId]) {
    console.error(`Account abstraction contracts not found for chain ${chainId}`);
  }
  return useQuery({
    queryKey: ["smart-account", walletClient.data?.account.address, chainId, multiChainIds],
    queryFn: async () => createSmartAccount({ signer: walletClient.data, chainId, multiChainIds }, composeConfig),
    enabled: account.isConnected && !!walletClient.data && !!composeConfig.accountAbstractionContracts?.[chainId]
  });
};
export {
  ComposeProvider,
  useComposeConfig,
  useSmartAccount
};
