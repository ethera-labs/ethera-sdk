"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const xt = require("./xt-PtLG-JUV.js");
const core = require("@wagmi/core");
const viem = require("viem");
function createComposeConfig(props) {
  return {
    getPaymasterEndpoint: props.getPaymasterEndpoint,
    getPublicClient: (chainId) => core.getPublicClient(props.wagmi, { chainId }),
    accountAbstractionContracts: props.accountAbstractionContracts,
    hasPaymaster: Boolean(props.getPaymasterEndpoint),
    entryPoint: xt.entryPointV07
  };
}
const globals = {
  MAX_WEI_AMOUNT: 115792089237316195423570985008687907853269984665640564039457584007913129639935n
};
const paramsToArray = ({
  params,
  abiFunction
}) => {
  return xt.stringifyBigints(
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
        return viem.encodeFunctionData({
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
const formatSSV = (num, decimals = 18) => ethFormatter.format(+viem.formatUnits(num, decimals));
const formatBigintInput = (num, decimals = 18) => bigintFormatter.format(+viem.formatUnits(num, decimals));
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
  return [...numbers].sort((a, b) => Number(a) - Number(b));
};
const tryCatch = (fn) => {
  try {
    return [fn(), null];
  } catch (e) {
    return [null, e];
  }
};
exports.bigintAbs = xt.bigintAbs;
exports.bigintFloor = xt.bigintFloor;
exports.bigintMax = xt.bigintMax;
exports.bigintMin = xt.bigintMin;
exports.bigintRound = xt.bigintRound;
exports.bigintifyNumbers = xt.bigintifyNumbers;
exports.composePreparedUserOps = xt.composePreparedUserOps;
exports.composeSignedUserOps = xt.composeSignedUserOps;
exports.composeUnpreparedUserOps = xt.composeUnpreparedUserOps;
exports.createSmartAccount = xt.createSmartAccount;
exports.createUserOps = xt.createUserOps;
exports.encodeXtMessage = xt.encodeXtMessage;
exports.entryPointV07 = xt.entryPointV07;
exports.isBigIntChanged = xt.isBigIntChanged;
exports.rollupA = xt.rollupA;
exports.rollupB = xt.rollupB;
exports.rollupsAccountAbstractionContracts = xt.rollupsAccountAbstractionContracts;
exports.roundOperatorFee = xt.roundOperatorFee;
exports.stringifyBigints = xt.stringifyBigints;
exports.toRpcUserOpCanonical = xt.toRpcUserOpCanonical;
exports._percentageFormatter = _percentageFormatter;
exports.bigintFormatter = bigintFormatter;
exports.createAbiEncoder = createAbiEncoder;
exports.createComposeConfig = createComposeConfig;
exports.ethFormatter = ethFormatter;
exports.extractAbiFunction = extractAbiFunction;
exports.formatBigintInput = formatBigintInput;
exports.formatSSV = formatSSV;
exports.globals = globals;
exports.ms = ms;
exports.numberFormatter = numberFormatter;
exports.paramsToArray = paramsToArray;
exports.percentageFormatter = percentageFormatter;
exports.sortNumbers = sortNumbers;
exports.tryCatch = tryCatch;
