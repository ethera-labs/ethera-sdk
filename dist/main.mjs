import { e as entryPointV07, s as stringifyBigints } from "./xt-BIgtj6Se.mjs";
import { c, b, l, k, g, i, j, t, z, f, A, y, u, x, w, h, n, m, o, p, r, a, d, q, v } from "./xt-BIgtj6Se.mjs";
import { getPublicClient } from "@wagmi/core";
import { encodeFunctionData, formatUnits } from "viem";
function createComposeConfig(props) {
  return {
    getPaymasterEndpoint: props.getPaymasterEndpoint,
    getPublicClient: (chainId) => getPublicClient(props.wagmi, { chainId }),
    accountAbstractionContracts: props.accountAbstractionContracts,
    hasPaymaster: Boolean(props.getPaymasterEndpoint),
    entryPoint: entryPointV07
  };
}
const globals = {
  MAX_WEI_AMOUNT: 115792089237316195423570985008687907853269984665640564039457584007913129639935n
};
const paramsToArray = ({
  params,
  abiFunction
}) => {
  return stringifyBigints(
    abiFunction.inputs.reduce(
      (acc, param) => {
        if (param.name) {
          const value = params[param.name];
          if (Number.isNaN(value)) {
            console.warn(`Passed NaN for the [${param.name}] parameter`);
            return [...acc, void 0];
          }
          return [...acc, value];
        }
        return acc;
      },
      []
    )
  );
};
const extractAbiFunction = (abi, functionName) => {
  return abi.find((abiFunction) => {
    if (abiFunction.type !== "function") return false;
    return abiFunction?.name === functionName;
  });
};
const createAbiEncoder = (abi) => {
  const writeFunctions = abi.filter(
    (item) => item.type === "function" && item.stateMutability !== "view" && item.stateMutability !== "pure"
  );
  return writeFunctions.reduce((acc, abiFn) => {
    return {
      ...acc,
      [abiFn.name]: (params) => {
        return encodeFunctionData({
          abi,
          functionName: abiFn.name,
          args: !params ? [] : paramsToArray({ params, abiFunction: abiFn })
        });
      }
    };
  }, {});
};
const numberFormatter = new Intl.NumberFormat("en-US", {
  useGrouping: true,
  maximumFractionDigits: 2
});
const _percentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 2
});
const percentageFormatter = {
  format: (value) => {
    if (!value) return "0%";
    return _percentageFormatter.format(value / 100);
  }
};
const bigintFormatter = new Intl.NumberFormat("en-US", {
  useGrouping: false,
  maximumFractionDigits: 7
});
const ethFormatter = new Intl.NumberFormat("en-US", {
  useGrouping: true,
  maximumFractionDigits: 4
});
const formatSSV = (num, decimals = 18) => ethFormatter.format(+formatUnits(num, decimals));
const formatBigintInput = (num, decimals = 18) => bigintFormatter.format(+formatUnits(num, decimals));
const units = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5,
  days: 864e5,
  weeks: 6048e5,
  months: 2629746e3,
  years: 31556952e3
};
const ms = (value, unit) => {
  return value * units[unit];
};
const sortNumbers = (numbers) => {
  return [...numbers].sort((a2, b2) => Number(a2) - Number(b2));
};
const tryCatch = (fn) => {
  try {
    return [fn(), null];
  } catch (e) {
    return [null, e];
  }
};
export {
  _percentageFormatter,
  c as arbitrum,
  b as base,
  l as bigintAbs,
  k as bigintFloor,
  bigintFormatter,
  g as bigintMax,
  i as bigintMin,
  j as bigintRound,
  t as bigintifyNumbers,
  z as composePreparedUserOps,
  f as composeRollupsContracts,
  A as composeSignedUserOps,
  y as composeUnpreparedUserOps,
  createAbiEncoder,
  createComposeConfig,
  u as createSmartAccount,
  x as createUserOps,
  w as encodeXtMessage,
  entryPointV07,
  ethFormatter,
  extractAbiFunction,
  formatBigintInput,
  formatSSV,
  globals,
  h as hoodi,
  n as isBigIntChanged,
  m as mainnet,
  ms,
  numberFormatter,
  o as optimism,
  paramsToArray,
  percentageFormatter,
  p as polygon,
  r as rollupA,
  a as rollupB,
  d as rollupsAccountAbstractionContracts,
  q as roundOperatorFee,
  sortNumbers,
  stringifyBigints,
  v as toRpcUserOpCanonical,
  tryCatch
};
