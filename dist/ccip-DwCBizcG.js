"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const react = require("./index-O5NlRrkT.js");
const index = require("./index-B1vmfg89.js");
function decodeFunctionData(parameters) {
  const { abi, data } = parameters;
  const signature = index.slice(data, 0, 4);
  const description = abi.find((x) => x.type === "function" && signature === react.toFunctionSelector(react.formatAbiItem(x)));
  if (!description)
    throw new react.AbiFunctionSignatureNotFoundError(signature, {
      docsPath: "/docs/contract/decodeFunctionData"
    });
  return {
    functionName: description.name,
    args: "inputs" in description && description.inputs && description.inputs.length > 0 ? react.decodeAbiParameters(description.inputs, index.slice(data, 4)) : void 0
  };
}
const docsPath$1 = "/docs/contract/encodeErrorResult";
function encodeErrorResult(parameters) {
  const { abi, errorName, args } = parameters;
  let abiItem = abi[0];
  if (errorName) {
    const item = react.getAbiItem({ abi, args, name: errorName });
    if (!item)
      throw new react.AbiErrorNotFoundError(errorName, { docsPath: docsPath$1 });
    abiItem = item;
  }
  if (abiItem.type !== "error")
    throw new react.AbiErrorNotFoundError(void 0, { docsPath: docsPath$1 });
  const definition = react.formatAbiItem(abiItem);
  const signature = react.toFunctionSelector(definition);
  let data = "0x";
  if (args && args.length > 0) {
    if (!abiItem.inputs)
      throw new react.AbiErrorInputsNotFoundError(abiItem.name, { docsPath: docsPath$1 });
    data = react.encodeAbiParameters(abiItem.inputs, args);
  }
  return index.concatHex([signature, data]);
}
const docsPath = "/docs/contract/encodeFunctionResult";
function encodeFunctionResult(parameters) {
  const { abi, functionName, result } = parameters;
  let abiItem = abi[0];
  if (functionName) {
    const item = react.getAbiItem({ abi, name: functionName });
    if (!item)
      throw new react.AbiFunctionNotFoundError(functionName, { docsPath });
    abiItem = item;
  }
  if (abiItem.type !== "function")
    throw new react.AbiFunctionNotFoundError(void 0, { docsPath });
  if (!abiItem.outputs)
    throw new react.AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath });
  const values = (() => {
    if (abiItem.outputs.length === 0)
      return [];
    if (abiItem.outputs.length === 1)
      return [result];
    if (Array.isArray(result))
      return result;
    throw new react.InvalidArrayError(result);
  })();
  return react.encodeAbiParameters(abiItem.outputs, values);
}
class OffchainLookupError extends index.BaseError {
  constructor({ callbackSelector, cause, data, extraData, sender, urls }) {
    super(cause.shortMessage || "An error occurred while fetching for an offchain result.", {
      cause,
      metaMessages: [
        ...cause.metaMessages || [],
        cause.metaMessages?.length ? "" : [],
        "Offchain Gateway Call:",
        urls && [
          "  Gateway URL(s):",
          ...urls.map((url) => `    ${react.getUrl(url)}`)
        ],
        `  Sender: ${sender}`,
        `  Data: ${data}`,
        `  Callback selector: ${callbackSelector}`,
        `  Extra data: ${extraData}`
      ].flat(),
      name: "OffchainLookupError"
    });
  }
}
class OffchainLookupResponseMalformedError extends index.BaseError {
  constructor({ result, url }) {
    super("Offchain gateway response is malformed. Response data must be a hex value.", {
      metaMessages: [
        `Gateway URL: ${react.getUrl(url)}`,
        `Response: ${react.stringify(result)}`
      ],
      name: "OffchainLookupResponseMalformedError"
    });
  }
}
class OffchainLookupSenderMismatchError extends index.BaseError {
  constructor({ sender, to }) {
    super("Reverted sender address does not match target contract address (`to`).", {
      metaMessages: [
        `Contract address: ${to}`,
        `OffchainLookup sender address: ${sender}`
      ],
      name: "OffchainLookupSenderMismatchError"
    });
  }
}
const localBatchGatewayUrl = "x-batch-gateway:true";
async function localBatchGatewayRequest(parameters) {
  const { data, ccipRequest: ccipRequest2 } = parameters;
  const { args: [queries] } = decodeFunctionData({ abi: react.batchGatewayAbi, data });
  const failures = [];
  const responses = [];
  await Promise.all(queries.map(async (query, i) => {
    try {
      responses[i] = query.urls.includes(localBatchGatewayUrl) ? await localBatchGatewayRequest({ data: query.data, ccipRequest: ccipRequest2 }) : await ccipRequest2(query);
      failures[i] = false;
    } catch (err) {
      failures[i] = true;
      responses[i] = encodeError(err);
    }
  }));
  return encodeFunctionResult({
    abi: react.batchGatewayAbi,
    functionName: "query",
    result: [failures, responses]
  });
}
function encodeError(error) {
  if (error.name === "HttpRequestError" && error.status)
    return encodeErrorResult({
      abi: react.batchGatewayAbi,
      errorName: "HttpError",
      args: [error.status, error.shortMessage]
    });
  return encodeErrorResult({
    abi: [react.solidityError],
    errorName: "Error",
    args: ["shortMessage" in error ? error.shortMessage : error.message]
  });
}
const offchainLookupSignature = "0x556f1830";
const offchainLookupAbiItem = {
  name: "OffchainLookup",
  type: "error",
  inputs: [
    {
      name: "sender",
      type: "address"
    },
    {
      name: "urls",
      type: "string[]"
    },
    {
      name: "callData",
      type: "bytes"
    },
    {
      name: "callbackFunction",
      type: "bytes4"
    },
    {
      name: "extraData",
      type: "bytes"
    }
  ]
};
async function offchainLookup(client, { blockNumber, blockTag, data, to }) {
  const { args } = react.decodeErrorResult({
    data,
    abi: [offchainLookupAbiItem]
  });
  const [sender, urls, callData, callbackSelector, extraData] = args;
  const { ccipRead } = client;
  const ccipRequest_ = ccipRead && typeof ccipRead?.request === "function" ? ccipRead.request : ccipRequest;
  try {
    if (!react.isAddressEqual(to, sender))
      throw new OffchainLookupSenderMismatchError({ sender, to });
    const result = urls.includes(localBatchGatewayUrl) ? await localBatchGatewayRequest({
      data: callData,
      ccipRequest: ccipRequest_
    }) : await ccipRequest_({ data: callData, sender, urls });
    const { data: data_ } = await react.call(client, {
      blockNumber,
      blockTag,
      data: index.concat([
        callbackSelector,
        react.encodeAbiParameters([{ type: "bytes" }, { type: "bytes" }], [result, extraData])
      ]),
      to
    });
    return data_;
  } catch (err) {
    throw new OffchainLookupError({
      callbackSelector,
      cause: err,
      data,
      extraData,
      sender,
      urls
    });
  }
}
async function ccipRequest({ data, sender, urls }) {
  let error = new Error("An unknown error occurred.");
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const method = url.includes("{data}") ? "GET" : "POST";
    const body = method === "POST" ? { data, sender } : void 0;
    const headers = method === "POST" ? { "Content-Type": "application/json" } : {};
    try {
      const response = await fetch(url.replace("{sender}", sender.toLowerCase()).replace("{data}", data), {
        body: JSON.stringify(body),
        headers,
        method
      });
      let result;
      if (response.headers.get("Content-Type")?.startsWith("application/json")) {
        result = (await response.json()).data;
      } else {
        result = await response.text();
      }
      if (!response.ok) {
        error = new react.HttpRequestError({
          body,
          details: result?.error ? react.stringify(result.error) : response.statusText,
          headers: response.headers,
          status: response.status,
          url
        });
        continue;
      }
      if (!index.isHex(result)) {
        error = new OffchainLookupResponseMalformedError({
          result,
          url
        });
        continue;
      }
      return result;
    } catch (err) {
      error = new react.HttpRequestError({
        body,
        details: err.message,
        url
      });
    }
  }
  throw error;
}
exports.ccipRequest = ccipRequest;
exports.offchainLookup = offchainLookup;
exports.offchainLookupAbiItem = offchainLookupAbiItem;
exports.offchainLookupSignature = offchainLookupSignature;
