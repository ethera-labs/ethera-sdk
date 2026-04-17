"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const xt = require("./xt-DZWvNwP8.js");
const wagmi = require("wagmi");
const reactQuery = require("@tanstack/react-query");
const ComposeContext = react.createContext(null);
function ComposeProvider({
  children,
  config
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(ComposeContext.Provider, { value: config, children });
}
function useComposeConfig() {
  const context = react.useContext(ComposeContext);
  if (!context) {
    throw new Error("useCompose must be used within a ComposeProvider");
  }
  return context;
}
const useSmartAccount = ({ chainId, multiChainIds = [] }) => {
  const account = wagmi.useAccount();
  const composeConfig = useComposeConfig();
  const walletClient = wagmi.useWalletClient();
  return reactQuery.useQuery({
    queryKey: ["smart-account", walletClient.data?.account.address, chainId, multiChainIds],
    queryFn: async () => {
      if (!walletClient.data) {
        throw new xt.ComposeError("WALLET_CLIENT_NOT_AVAILABLE", `Wallet client not available for chain ${chainId}.`, {
          details: { chainId }
        });
      }
      return xt.createSmartAccount({ signer: walletClient.data, chainId, multiChainIds }, composeConfig);
    },
    enabled: account.isConnected && !!walletClient.data,
    retry: (failureCount, error) => !xt.isComposeError(error) && failureCount < 3
  });
};
exports.ComposeError = xt.ComposeError;
exports.isComposeError = xt.isComposeError;
exports.ComposeProvider = ComposeProvider;
exports.useComposeConfig = useComposeConfig;
exports.useSmartAccount = useSmartAccount;
