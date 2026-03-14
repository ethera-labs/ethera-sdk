"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const wagmi = require("wagmi");
const xt = require("./xt-BVW_TnLK.js");
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
  if (!composeConfig.accountAbstractionContracts?.[chainId]) {
    console.error(`Account abstraction contracts not found for chain ${chainId}`);
  }
  return reactQuery.useQuery({
    queryKey: ["smart-account", walletClient.data?.account.address, chainId, multiChainIds],
    queryFn: async () => xt.createSmartAccount({ signer: walletClient.data, chainId, multiChainIds }, composeConfig),
    enabled: account.isConnected && !!walletClient.data && !!composeConfig.accountAbstractionContracts?.[chainId]
  });
};
exports.ComposeProvider = ComposeProvider;
exports.useComposeConfig = useComposeConfig;
exports.useSmartAccount = useSmartAccount;
