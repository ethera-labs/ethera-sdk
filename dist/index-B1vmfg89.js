"use strict";
const viem = require("viem");
const version = "2.38.4";
let errorConfig = {
  getDocsUrl: ({ docsBaseUrl, docsPath = "", docsSlug }) => docsPath ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
  version: `viem@${version}`
};
class BaseError extends Error {
  constructor(shortMessage, args = {}) {
    const details = (() => {
      if (args.cause instanceof BaseError)
        return args.cause.details;
      if (args.cause?.message)
        return args.cause.message;
      return args.details;
    })();
    const docsPath = (() => {
      if (args.cause instanceof BaseError)
        return args.cause.docsPath || args.docsPath;
      return args.docsPath;
    })();
    const docsUrl = errorConfig.getDocsUrl?.({ ...args, docsPath });
    const message2 = [
      shortMessage || "An error occurred.",
      "",
      ...args.metaMessages ? [...args.metaMessages, ""] : [],
      ...docsUrl ? [`Docs: ${docsUrl}`] : [],
      ...details ? [`Details: ${details}`] : [],
      ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
    ].join("\n");
    super(message2, args.cause ? { cause: args.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "metaMessages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    this.details = details;
    this.docsPath = docsPath;
    this.metaMessages = args.metaMessages;
    this.name = args.name ?? this.name;
    this.shortMessage = shortMessage;
    this.version = version;
  }
  walk(fn) {
    return walk(this, fn);
  }
}
function walk(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause !== void 0)
    return walk(err.cause, fn);
  return fn ? null : err;
}
class IntegerOutOfRangeError extends BaseError {
  constructor({ max, min, signed, size: size2, value }) {
    super(`Number "${value}" is not in safe ${size2 ? `${size2 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
  }
}
class InvalidBytesBooleanError extends BaseError {
  constructor(bytes) {
    super(`Bytes value "${bytes}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`, {
      name: "InvalidBytesBooleanError"
    });
  }
}
class SizeOverflowError extends BaseError {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
  }
}
function isHex(value, { strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
function size(value) {
  if (isHex(value, { strict: false }))
    return Math.ceil((value.length - 2) / 2);
  return value.length;
}
function trim$1(hexOrBytes, { dir = "left" } = {}) {
  let data = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
  let sliceLength = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (typeof hexOrBytes === "string") {
    if (data.length === 1 && dir === "right")
      data = `${data}0`;
    return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
  }
  return data;
}
class SliceOffsetOutOfBoundsError extends BaseError {
  constructor({ offset, position, size: size2 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset "${offset}" is out-of-bounds (size: ${size2}).`, { name: "SliceOffsetOutOfBoundsError" });
  }
}
class SizeExceedsPaddingSizeError extends BaseError {
  constructor({ size: size2, targetSize, type: type2 }) {
    super(`${type2.charAt(0).toUpperCase()}${type2.slice(1).toLowerCase()} size (${size2}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
  }
}
class InvalidBytesLengthError extends BaseError {
  constructor({ size: size2, targetSize, type: type2 }) {
    super(`${type2.charAt(0).toUpperCase()}${type2.slice(1).toLowerCase()} is expected to be ${targetSize} ${type2} long, but is ${size2} ${type2} long.`, { name: "InvalidBytesLengthError" });
  }
}
function pad(hexOrBytes, { dir, size: size2 = 32 } = {}) {
  if (typeof hexOrBytes === "string")
    return padHex(hexOrBytes, { dir, size: size2 });
  return padBytes(hexOrBytes, { dir, size: size2 });
}
function padHex(hex_, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size2,
      type: "hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
function padBytes(bytes, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return bytes;
  if (bytes.length > size2)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size2,
      type: "bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i = 0; i < size2; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size2 - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
  }
  return paddedBytes;
}
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
function toHex(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToHex(value, opts);
  if (typeof value === "string") {
    return stringToHex(value, opts);
  }
  if (typeof value === "boolean")
    return boolToHex(value, opts);
  return bytesToHex$1(value, opts);
}
function boolToHex(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { size: opts.size });
  }
  return hex;
}
function bytesToHex$1(value, opts = {}) {
  let string = "";
  for (let i = 0; i < value.length; i++) {
    string += hexes[value[i]];
  }
  const hex = `0x${string}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex(value_, opts = {}) {
  const { signed, size: size2 } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value_}${suffix}`
    });
  }
  const hex = `0x${(signed && value < 0 ? (1n << BigInt(size2 * 8)) + BigInt(value) : value).toString(16)}`;
  if (size2)
    return pad(hex, { size: size2 });
  return hex;
}
const encoder$1 = /* @__PURE__ */ new TextEncoder();
function stringToHex(value_, opts = {}) {
  const value = encoder$1.encode(value_);
  return bytesToHex$1(value, opts);
}
const encoder = /* @__PURE__ */ new TextEncoder();
function toBytes$1(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToBytes(value, opts);
  if (typeof value === "boolean")
    return boolToBytes(value, opts);
  if (isHex(value))
    return hexToBytes(value, opts);
  return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { size: opts.size });
  }
  return bytes;
}
const charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function hexToBytes(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = pad(hex, { dir: "right", size: opts.size });
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function numberToBytes(value, opts) {
  const hex = numberToHex(value, opts);
  return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
  const bytes = encoder.encode(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { dir: "right", size: opts.size });
  }
  return bytes;
}
function assertSize(hexOrBytes, { size: size$1 }) {
  if (size(hexOrBytes) > size$1)
    throw new SizeOverflowError({
      givenSize: size(hexOrBytes),
      maxSize: size$1
    });
}
function hexToBigInt(hex, opts = {}) {
  const { signed } = opts;
  if (opts.size)
    assertSize(hex, { size: opts.size });
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size2 = (hex.length - 2) / 2;
  const max = (1n << BigInt(size2) * 8n - 1n) - 1n;
  if (value <= max)
    return value;
  return value - BigInt(`0x${"f".padStart(size2 * 2, "f")}`) - 1n;
}
function hexToNumber(hex, opts = {}) {
  return Number(hexToBigInt(hex, opts));
}
const maxUint256 = 2n ** 256n - 1n;
function concat(values) {
  if (typeof values[0] === "string")
    return concatHex(values);
  return concatBytes$1(values);
}
function concatBytes$1(values) {
  let length = 0;
  for (const arr of values) {
    length += arr.length;
  }
  const result = new Uint8Array(length);
  let offset = 0;
  for (const arr of values) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}
function concatHex(values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}
class NegativeOffsetError extends BaseError {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`, {
      name: "NegativeOffsetError"
    });
  }
}
class PositionOutOfBoundsError extends BaseError {
  constructor({ length, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`, { name: "PositionOutOfBoundsError" });
  }
}
class RecursiveReadLimitExceededError extends BaseError {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`, { name: "RecursiveReadLimitExceededError" });
  }
}
const staticCursor = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new RecursiveReadLimitExceededError({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(position) {
    if (position < 0 || position > this.bytes.length - 1)
      throw new PositionOutOfBoundsError({
        length: this.bytes.length,
        position
      });
  },
  decrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position - offset;
    this.assertPosition(position);
    this.position = position;
  },
  getReadCount(position) {
    return this.positionReadCount.get(position || this.position) || 0;
  },
  incrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position + offset;
    this.assertPosition(position);
    this.position = position;
  },
  inspectByte(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectBytes(length, position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + length - 1);
    return this.bytes.subarray(position, position + length);
  },
  inspectUint8(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectUint16(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 1);
    return this.dataView.getUint16(position);
  },
  inspectUint24(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 2);
    return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
  },
  inspectUint32(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 3);
    return this.dataView.getUint32(position);
  },
  pushByte(byte) {
    this.assertPosition(this.position);
    this.bytes[this.position] = byte;
    this.position++;
  },
  pushBytes(bytes) {
    this.assertPosition(this.position + bytes.length - 1);
    this.bytes.set(bytes, this.position);
    this.position += bytes.length;
  },
  pushUint8(value) {
    this.assertPosition(this.position);
    this.bytes[this.position] = value;
    this.position++;
  },
  pushUint16(value) {
    this.assertPosition(this.position + 1);
    this.dataView.setUint16(this.position, value);
    this.position += 2;
  },
  pushUint24(value) {
    this.assertPosition(this.position + 2);
    this.dataView.setUint16(this.position, value >> 8);
    this.dataView.setUint8(this.position + 2, value & 255);
    this.position += 3;
  },
  pushUint32(value) {
    this.assertPosition(this.position + 3);
    this.dataView.setUint32(this.position, value);
    this.position += 4;
  },
  readByte() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectByte();
    this.position++;
    return value;
  },
  readBytes(length, size2) {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectBytes(length);
    this.position += size2 ?? length;
    return value;
  },
  readUint8() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint8();
    this.position += 1;
    return value;
  },
  readUint16() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint16();
    this.position += 2;
    return value;
  },
  readUint24() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint24();
    this.position += 3;
    return value;
  },
  readUint32() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint32();
    this.position += 4;
    return value;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(position) {
    const oldPosition = this.position;
    this.assertPosition(position);
    this.position = position;
    return () => this.position = oldPosition;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const count = this.getReadCount();
    this.positionReadCount.set(this.position, count + 1);
    if (count > 0)
      this.recursiveReadCount++;
  }
};
function createCursor(bytes, { recursiveReadLimit = 8192 } = {}) {
  const cursor = Object.create(staticCursor);
  cursor.bytes = bytes;
  cursor.dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  cursor.positionReadCount = /* @__PURE__ */ new Map();
  cursor.recursiveReadLimit = recursiveReadLimit;
  return cursor;
}
function toRlp(bytes, to = "hex") {
  const encodable = getEncodable(bytes);
  const cursor = createCursor(new Uint8Array(encodable.length));
  encodable.encode(cursor);
  if (to === "hex")
    return bytesToHex$1(cursor.bytes);
  return cursor.bytes;
}
function getEncodable(bytes) {
  if (Array.isArray(bytes))
    return getEncodableList(bytes.map((x) => getEncodable(x)));
  return getEncodableBytes(bytes);
}
function getEncodableList(list) {
  const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
  const sizeOfBodyLength = getSizeOfLength(bodyLength);
  const length = (() => {
    if (bodyLength <= 55)
      return 1 + bodyLength;
    return 1 + sizeOfBodyLength + bodyLength;
  })();
  return {
    length,
    encode(cursor) {
      if (bodyLength <= 55) {
        cursor.pushByte(192 + bodyLength);
      } else {
        cursor.pushByte(192 + 55 + sizeOfBodyLength);
        if (sizeOfBodyLength === 1)
          cursor.pushUint8(bodyLength);
        else if (sizeOfBodyLength === 2)
          cursor.pushUint16(bodyLength);
        else if (sizeOfBodyLength === 3)
          cursor.pushUint24(bodyLength);
        else
          cursor.pushUint32(bodyLength);
      }
      for (const { encode: encode3 } of list) {
        encode3(cursor);
      }
    }
  };
}
function getEncodableBytes(bytesOrHex) {
  const bytes = typeof bytesOrHex === "string" ? hexToBytes(bytesOrHex) : bytesOrHex;
  const sizeOfBytesLength = getSizeOfLength(bytes.length);
  const length = (() => {
    if (bytes.length === 1 && bytes[0] < 128)
      return 1;
    if (bytes.length <= 55)
      return 1 + bytes.length;
    return 1 + sizeOfBytesLength + bytes.length;
  })();
  return {
    length,
    encode(cursor) {
      if (bytes.length === 1 && bytes[0] < 128) {
        cursor.pushBytes(bytes);
      } else if (bytes.length <= 55) {
        cursor.pushByte(128 + bytes.length);
        cursor.pushBytes(bytes);
      } else {
        cursor.pushByte(128 + 55 + sizeOfBytesLength);
        if (sizeOfBytesLength === 1)
          cursor.pushUint8(bytes.length);
        else if (sizeOfBytesLength === 2)
          cursor.pushUint16(bytes.length);
        else if (sizeOfBytesLength === 3)
          cursor.pushUint24(bytes.length);
        else
          cursor.pushUint32(bytes.length);
        cursor.pushBytes(bytes);
      }
    }
  };
}
function getSizeOfLength(length) {
  if (length < 2 ** 8)
    return 1;
  if (length < 2 ** 16)
    return 2;
  if (length < 2 ** 24)
    return 3;
  if (length < 2 ** 32)
    return 4;
  throw new BaseError("Length is too large.");
}
const etherUnits = {
  gwei: 9,
  wei: 18
};
const gweiUnits = {
  ether: -9,
  wei: 9
};
function formatUnits(value, decimals) {
  let display = value.toString();
  const negative = display.startsWith("-");
  if (negative)
    display = display.slice(1);
  display = display.padStart(decimals, "0");
  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals)
  ];
  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
}
function formatGwei(wei, unit = "wei") {
  return formatUnits(wei, gweiUnits[unit]);
}
function prettyPrint(args) {
  const entries = Object.entries(args).map(([key, value]) => {
    if (value === void 0 || value === false)
      return null;
    return [key, value];
  }).filter(Boolean);
  const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
  return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
}
class FeeConflictError extends BaseError {
  constructor() {
    super([
      "Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.",
      "Use `maxFeePerGas`/`maxPriorityFeePerGas` for EIP-1559 compatible networks, and `gasPrice` for others."
    ].join("\n"), { name: "FeeConflictError" });
  }
}
class InvalidLegacyVError extends BaseError {
  constructor({ v }) {
    super(`Invalid \`v\` value "${v}". Expected 27 or 28.`, {
      name: "InvalidLegacyVError"
    });
  }
}
class InvalidSerializableTransactionError extends BaseError {
  constructor({ transaction }) {
    super("Cannot infer a transaction type from provided transaction.", {
      metaMessages: [
        "Provided Transaction:",
        "{",
        prettyPrint(transaction),
        "}",
        "",
        "To infer the type, either provide:",
        "- a `type` to the Transaction, or",
        "- an EIP-1559 Transaction with `maxFeePerGas`, or",
        "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
        "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
        "- an EIP-7702 Transaction with `authorizationList`, or",
        "- a Legacy Transaction with `gasPrice`"
      ],
      name: "InvalidSerializableTransactionError"
    });
  }
}
class InvalidStorageKeySizeError extends BaseError {
  constructor({ storageKey }) {
    super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${Math.floor((storageKey.length - 2) / 2)} bytes.`, { name: "InvalidStorageKeySizeError" });
  }
}
const crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function ahash(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash should be wrapped by utils.createHasher");
  anumber(h.outputLen);
  anumber(h.blockLen);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
const isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
  return arr;
}
const swap32IfBE = isLE ? (u) => u : byteSwap32;
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad2 = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad2);
    pad2 += a.length;
  }
  return res;
}
class Hash {
}
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto && typeof crypto.getRandomValues === "function") {
    return crypto.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto && typeof crypto.randomBytes === "function") {
    return Uint8Array.from(crypto.randomBytes(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
const rotlSH = (h, l, s) => h << s | l >>> 32 - s;
const rotlSL = (h, l, s) => l << s | h >>> 32 - s;
const rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
const rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
class InvalidAddressError extends BaseError {
  constructor({ address }) {
    super(`Address "${address}" is invalid.`, {
      metaMessages: [
        "- Address must be a hex value of 20 bytes (40 hex characters).",
        "- Address must match its checksum counterpart."
      ],
      name: "InvalidAddressError"
    });
  }
}
class ChainDoesNotSupportContract extends BaseError {
  constructor({ blockNumber, chain, contract }) {
    super(`Chain "${chain.name}" does not support contract "${contract.name}".`, {
      metaMessages: [
        "This could be due to any of the following:",
        ...blockNumber && contract.blockCreated && contract.blockCreated > blockNumber ? [
          `- The contract "${contract.name}" was not deployed until block ${contract.blockCreated} (current block ${blockNumber}).`
        ] : [
          `- The chain does not have the contract "${contract.name}" configured.`
        ]
      ],
      name: "ChainDoesNotSupportContract"
    });
  }
}
class ClientChainNotConfiguredError extends BaseError {
  constructor() {
    super("No chain was provided to the Client.", {
      name: "ClientChainNotConfiguredError"
    });
  }
}
class InvalidChainIdError extends BaseError {
  constructor({ chainId }) {
    super(typeof chainId === "number" ? `Chain ID "${chainId}" is invalid.` : "Chain ID is invalid.", { name: "InvalidChainIdError" });
  }
}
class ExecutionRevertedError extends BaseError {
  constructor({ cause, message: message2 } = {}) {
    const reason = message2?.replace("execution reverted: ", "")?.replace("execution reverted", "");
    super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
      cause,
      name: "ExecutionRevertedError"
    });
  }
}
Object.defineProperty(ExecutionRevertedError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 3
});
Object.defineProperty(ExecutionRevertedError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /execution reverted/
});
class FeeCapTooHighError extends BaseError {
  constructor({ cause, maxFeePerGas } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
      cause,
      name: "FeeCapTooHighError"
    });
  }
}
Object.defineProperty(FeeCapTooHighError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
});
class FeeCapTooLowError extends BaseError {
  constructor({ cause, maxFeePerGas } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)}` : ""} gwei) cannot be lower than the block base fee.`, {
      cause,
      name: "FeeCapTooLowError"
    });
  }
}
Object.defineProperty(FeeCapTooLowError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
});
class NonceTooHighError extends BaseError {
  constructor({ cause, nonce } = {}) {
    super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is higher than the next one expected.`, { cause, name: "NonceTooHighError" });
  }
}
Object.defineProperty(NonceTooHighError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /nonce too high/
});
class NonceTooLowError extends BaseError {
  constructor({ cause, nonce } = {}) {
    super([
      `Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is lower than the current nonce of the account.`,
      "Try increasing the nonce or find the latest nonce with `getTransactionCount`."
    ].join("\n"), { cause, name: "NonceTooLowError" });
  }
}
Object.defineProperty(NonceTooLowError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /nonce too low|transaction already imported|already known/
});
class NonceMaxValueError extends BaseError {
  constructor({ cause, nonce } = {}) {
    super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}exceeds the maximum allowed nonce.`, { cause, name: "NonceMaxValueError" });
  }
}
Object.defineProperty(NonceMaxValueError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /nonce has max value/
});
class InsufficientFundsError extends BaseError {
  constructor({ cause } = {}) {
    super([
      "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
    ].join("\n"), {
      cause,
      metaMessages: [
        "This error could arise when the account does not have enough funds to:",
        " - pay for the total gas fee,",
        " - pay for the value to send.",
        " ",
        "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
        " - `gas` is the amount of gas needed for transaction to execute,",
        " - `gas fee` is the gas fee,",
        " - `value` is the amount of ether to send to the recipient."
      ],
      name: "InsufficientFundsError"
    });
  }
}
Object.defineProperty(InsufficientFundsError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /insufficient funds|exceeds transaction sender account balance/
});
class IntrinsicGasTooHighError extends BaseError {
  constructor({ cause, gas } = {}) {
    super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
      cause,
      name: "IntrinsicGasTooHighError"
    });
  }
}
Object.defineProperty(IntrinsicGasTooHighError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /intrinsic gas too high|gas limit reached/
});
class IntrinsicGasTooLowError extends BaseError {
  constructor({ cause, gas } = {}) {
    super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction is too low.`, {
      cause,
      name: "IntrinsicGasTooLowError"
    });
  }
}
Object.defineProperty(IntrinsicGasTooLowError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /intrinsic gas too low/
});
class TransactionTypeNotSupportedError extends BaseError {
  constructor({ cause }) {
    super("The transaction type is not supported for this chain.", {
      cause,
      name: "TransactionTypeNotSupportedError"
    });
  }
}
Object.defineProperty(TransactionTypeNotSupportedError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /transaction type not valid/
});
class TipAboveFeeCapError extends BaseError {
  constructor({ cause, maxPriorityFeePerGas, maxFeePerGas } = {}) {
    super([
      `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${formatGwei(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}).`
    ].join("\n"), {
      cause,
      name: "TipAboveFeeCapError"
    });
  }
}
Object.defineProperty(TipAboveFeeCapError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
});
class UnknownNodeError extends BaseError {
  constructor({ cause }) {
    super(`An error occurred while executing: ${cause?.shortMessage}`, {
      cause,
      name: "UnknownNodeError"
    });
  }
}
class LruMap extends Map {
  constructor(size2) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size2;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
}
const _0n = BigInt(0);
const _1n = BigInt(1);
const _2n = BigInt(2);
const _7n = BigInt(7);
const _256n = BigInt(256);
const _0x71n = BigInt(113);
const SHA3_PI = [];
const SHA3_ROTL = [];
const _SHA3_IOTA = [];
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
  [x, y] = [y, (2 * x + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n)
      t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
const IOTAS = split(_SHA3_IOTA, true);
const SHA3_IOTA_H = IOTAS[0];
const SHA3_IOTA_L = IOTAS[1];
const rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
const rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  clean(B);
}
class Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    this.enableXOF = false;
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    anumber(outputLen);
    if (!(0 < blockLen && blockLen < 200))
      throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    swap32IfBE(this.state32);
    keccakP(this.state32, this.rounds);
    swap32IfBE(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { blockLen, state } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0; i < take; i++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists(this, false);
    abytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes) {
    anumber(bytes);
    return this.xofInto(new Uint8Array(bytes));
  }
  digestInto(out) {
    aoutput(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    clean(this.state);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
}
const gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
const keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();
function keccak256(value, to_) {
  const to = to_ || "hex";
  const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes$1(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}
const checksumAddressCache = /* @__PURE__ */ new LruMap(8192);
function checksumAddress(address_, chainId) {
  if (checksumAddressCache.has(`${address_}.${chainId}`))
    return checksumAddressCache.get(`${address_}.${chainId}`);
  const hexAddress = address_.substring(2).toLowerCase();
  const hash = keccak256(stringToBytes(hexAddress), "bytes");
  const address = hexAddress.split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash[i >> 1] >> 4 >= 8 && address[i]) {
      address[i] = address[i].toUpperCase();
    }
    if ((hash[i >> 1] & 15) >= 8 && address[i + 1]) {
      address[i + 1] = address[i + 1].toUpperCase();
    }
  }
  const result = `0x${address.join("")}`;
  checksumAddressCache.set(`${address_}.${chainId}`, result);
  return result;
}
function getAddress(address, chainId) {
  if (!isAddress(address, { strict: false }))
    throw new InvalidAddressError({ address });
  return checksumAddress(address, chainId);
}
const addressRegex = /^0x[a-fA-F0-9]{40}$/;
const isAddressCache = /* @__PURE__ */ new LruMap(8192);
function isAddress(address, options) {
  const { strict = true } = options ?? {};
  const cacheKey = `${address}.${strict}`;
  if (isAddressCache.has(cacheKey))
    return isAddressCache.get(cacheKey);
  const result = (() => {
    if (!addressRegex.test(address))
      return false;
    if (address.toLowerCase() === address)
      return true;
    if (strict)
      return checksumAddress(address) === address;
    return true;
  })();
  isAddressCache.set(cacheKey, result);
  return result;
}
function slice(value, start, end2, { strict } = {}) {
  if (isHex(value, { strict: false }))
    return sliceHex(value, start, end2, {
      strict
    });
  return sliceBytes(value, start, end2, {
    strict
  });
}
function assertStartOffset(value, start) {
  if (typeof start === "number" && start > 0 && start > size(value) - 1)
    throw new SliceOffsetOutOfBoundsError({
      offset: start,
      position: "start",
      size: size(value)
    });
}
function assertEndOffset(value, start, end2) {
  if (typeof start === "number" && typeof end2 === "number" && size(value) !== end2 - start) {
    throw new SliceOffsetOutOfBoundsError({
      offset: end2,
      position: "end",
      size: size(value)
    });
  }
}
function sliceBytes(value_, start, end2, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = value_.slice(start, end2);
  if (strict)
    assertEndOffset(value, start, end2);
  return value;
}
function sliceHex(value_, start, end2, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = `0x${value_.replace("0x", "").slice((start ?? 0) * 2, (end2 ?? value_.length) * 2)}`;
  if (strict)
    assertEndOffset(value, start, end2);
  return value;
}
const entryPoint07Address = "0x0000000071727De22E5E9d8BAf0edAc6f37da032";
const MAGIC_VALUE_SIG_REPLAYABLE = "0x0555ad2729e8da1777a4e5020806f8bf7601c3db6bfe402f410a34958363a95a";
const FACTORY_ADDRESS_V0_6 = "0x5de4839a76cf55d0c90e2061ef4386d962E15ae3";
const FACTORY_ADDRESS_V0_6_INIT_CODE_HASH = "0xee9d8350bd899dd261db689aafd87eb8a30f085adbaff48152399438ff4eed73";
const KernelVersionToAddressesMap = {
  "0.0.2": {
    accountImplementationAddress: viem.zeroAddress,
    factoryAddress: "0xaee9762ce625e0a8f7b184670fb57c37bfe1d0f1"
  },
  "0.2.2": {
    accountImplementationAddress: "0x0DA6a956B9488eD4dd761E59f52FDc6c8068E6B5",
    factoryAddress: FACTORY_ADDRESS_V0_6,
    initCodeHash: FACTORY_ADDRESS_V0_6_INIT_CODE_HASH
  },
  "0.2.3": {
    accountImplementationAddress: "0xD3F582F6B4814E989Ee8E96bc3175320B5A540ab",
    factoryAddress: FACTORY_ADDRESS_V0_6,
    initCodeHash: FACTORY_ADDRESS_V0_6_INIT_CODE_HASH
  },
  "0.2.4": {
    accountImplementationAddress: "0xd3082872F8B06073A021b4602e022d5A070d7cfC",
    factoryAddress: FACTORY_ADDRESS_V0_6,
    initCodeHash: FACTORY_ADDRESS_V0_6_INIT_CODE_HASH
  },
  "0.3.0": {
    accountImplementationAddress: "0x94F097E1ebEB4ecA3AAE54cabb08905B239A7D27",
    factoryAddress: "0x6723b44Abeec4E71eBE3232BD5B455805baDD22f",
    metaFactoryAddress: "0xd703aaE79538628d27099B8c4f621bE4CCd142d5",
    initCodeHash: "0x6fe6e6ea30eddce942b9618033ab8429f9ddac594053bec8a6744fffc71976e2"
  },
  "0.3.1": {
    accountImplementationAddress: "0xBAC849bB641841b44E965fB01A4Bf5F074f84b4D",
    factoryAddress: "0xaac5D4240AF87249B3f71BC8E4A2cae074A3E419",
    metaFactoryAddress: "0xd703aaE79538628d27099B8c4f621bE4CCd142d5",
    initCodeHash: "0x85d96aa1c9a65886d094915d76ccae85f14027a02c1647dde659f869460f03e6"
  },
  "0.3.2": {
    accountImplementationAddress: "0xD830D15D3dc0C269F3dBAa0F3e8626d33CFdaBe1",
    factoryAddress: "0x7a1dBAB750f12a90EB1B60D2Ae3aD17D4D81EfFe",
    metaFactoryAddress: "0xd703aaE79538628d27099B8c4f621bE4CCd142d5",
    initCodeHash: "0xc7c48c9dd12de68b8a4689b6f8c8c07b61d4d6fa4ddecdd86a6980d045fa67eb"
  },
  "0.3.3": {
    accountImplementationAddress: "0xd6CEDDe84be40893d153Be9d467CD6aD37875b28",
    factoryAddress: "0x2577507b78c2008Ff367261CB6285d44ba5eF2E9",
    metaFactoryAddress: "0xd703aaE79538628d27099B8c4f621bE4CCd142d5",
    initCodeHash: "0xc452397f1e7518f8cea0566ac057e243bb1643f6298aba8eec8cdee78ee3b3dd"
    //"0x1fefe62c5b9c14c4661af2e04e4a2fa10205066cae5f629d304d483f5fa9e5fc"
  }
};
const KERNEL_V3_1 = "0.3.1";
const KERNEL_NAME = "Kernel";
const VALIDATOR_TYPE = {
  SUDO: "0x00",
  SECONDARY: "0x01",
  PERMISSION: "0x02",
  EIP7702: "0x00"
};
exports.VALIDATOR_MODE = void 0;
(function(VALIDATOR_MODE) {
  VALIDATOR_MODE["DEFAULT"] = "0x00";
  VALIDATOR_MODE["ENABLE"] = "0x01";
})(exports.VALIDATOR_MODE || (exports.VALIDATOR_MODE = {}));
exports.CALL_TYPE = void 0;
(function(CALL_TYPE) {
  CALL_TYPE["SINGLE"] = "0x00";
  CALL_TYPE["BATCH"] = "0x01";
  CALL_TYPE["DELEGATE_CALL"] = "0xFF";
})(exports.CALL_TYPE || (exports.CALL_TYPE = {}));
exports.EXEC_TYPE = void 0;
(function(EXEC_TYPE) {
  EXEC_TYPE["DEFAULT"] = "0x00";
  EXEC_TYPE["TRY_EXEC"] = "0x01";
})(exports.EXEC_TYPE || (exports.EXEC_TYPE = {}));
const safeCreateCallAddress = "0x9b35Af71d77eaf8d7e40252370304687390A1A52";
const getEntryPoint = (entryPointVersion) => {
  return {
    address: entryPoint07Address,
    version: entryPointVersion
  };
};
const entryPointV07 = getEntryPoint("0.7");
const rollupsAccountAbstractionContracts = {
  kernelImpl: "0x317A2D4564778A585BAd21376dC1ca65b75ccC6a",
  kernelFactory: "0xdEF4343958B5dE047bddEFaB5Fa8F9Ff898890e5",
  multichainValidator: "0x8aB3f6935399e1c10419cA2C93d60901a256b7e3",
  metaFactory: "0x54db674c515e5fdec3f91345bc2fdafafd8b3b8a"
};
const composeRollupsContracts = {
  tokens: {
    WETH: "0x29dDf1a92069c4c170A63032C93c2aE66C359Bf9",
    USDC: "0x0F5808d4776E7fB10293f2DCd6dA3073b8Dad970",
    SSV: "0x969b0ad5ffa2376E8C0f5e413D510a056416D627"
  },
  bridge: "0x1388C9619aCCcd1dfff0234626EDDA61413Be74e"
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var indexLight = { exports: {} };
var indexMinimal = {};
var minimal = {};
var aspromise = asPromise$1;
function asPromise$1(fn, ctx) {
  var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
  while (index < arguments.length)
    params[offset++] = arguments[index++];
  return new Promise(function executor(resolve, reject) {
    params[offset] = function callback(err) {
      if (pending) {
        pending = false;
        if (err)
          reject(err);
        else {
          var params2 = new Array(arguments.length - 1), offset2 = 0;
          while (offset2 < params2.length)
            params2[offset2++] = arguments[offset2];
          resolve.apply(null, params2);
        }
      }
    };
    try {
      fn.apply(ctx || null, params);
    } catch (err) {
      if (pending) {
        pending = false;
        reject(err);
      }
    }
  });
}
var base64$1 = {};
(function(exports2) {
  var base642 = exports2;
  base642.length = function length(string) {
    var p = string.length;
    if (!p)
      return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
      ++n;
    return Math.ceil(string.length * 3) / 4 - n;
  };
  var b64 = new Array(64);
  var s64 = new Array(123);
  for (var i = 0; i < 64; )
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
  base642.encode = function encode3(buffer, start, end2) {
    var parts = null, chunk = [];
    var i2 = 0, j = 0, t;
    while (start < end2) {
      var b = buffer[start++];
      switch (j) {
        case 0:
          chunk[i2++] = b64[b >> 2];
          t = (b & 3) << 4;
          j = 1;
          break;
        case 1:
          chunk[i2++] = b64[t | b >> 4];
          t = (b & 15) << 2;
          j = 2;
          break;
        case 2:
          chunk[i2++] = b64[t | b >> 6];
          chunk[i2++] = b64[b & 63];
          j = 0;
          break;
      }
      if (i2 > 8191) {
        (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
        i2 = 0;
      }
    }
    if (j) {
      chunk[i2++] = b64[t];
      chunk[i2++] = 61;
      if (j === 1)
        chunk[i2++] = 61;
    }
    if (parts) {
      if (i2)
        parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
      return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i2));
  };
  var invalidEncoding = "invalid encoding";
  base642.decode = function decode2(string, buffer, offset) {
    var start = offset;
    var j = 0, t;
    for (var i2 = 0; i2 < string.length; ) {
      var c = string.charCodeAt(i2++);
      if (c === 61 && j > 1)
        break;
      if ((c = s64[c]) === void 0)
        throw Error(invalidEncoding);
      switch (j) {
        case 0:
          t = c;
          j = 1;
          break;
        case 1:
          buffer[offset++] = t << 2 | (c & 48) >> 4;
          t = c;
          j = 2;
          break;
        case 2:
          buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
          t = c;
          j = 3;
          break;
        case 3:
          buffer[offset++] = (t & 3) << 6 | c;
          j = 0;
          break;
      }
    }
    if (j === 1)
      throw Error(invalidEncoding);
    return offset - start;
  };
  base642.test = function test2(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
  };
})(base64$1);
var eventemitter = EventEmitter;
function EventEmitter() {
  this._listeners = {};
}
EventEmitter.prototype.on = function on(evt, fn, ctx) {
  (this._listeners[evt] || (this._listeners[evt] = [])).push({
    fn,
    ctx: ctx || this
  });
  return this;
};
EventEmitter.prototype.off = function off(evt, fn) {
  if (evt === void 0)
    this._listeners = {};
  else {
    if (fn === void 0)
      this._listeners[evt] = [];
    else {
      var listeners = this._listeners[evt];
      for (var i = 0; i < listeners.length; )
        if (listeners[i].fn === fn)
          listeners.splice(i, 1);
        else
          ++i;
    }
  }
  return this;
};
EventEmitter.prototype.emit = function emit(evt) {
  var listeners = this._listeners[evt];
  if (listeners) {
    var args = [], i = 1;
    for (; i < arguments.length; )
      args.push(arguments[i++]);
    for (i = 0; i < listeners.length; )
      listeners[i].fn.apply(listeners[i++].ctx, args);
  }
  return this;
};
var float = factory$1(factory$1);
function factory$1(exports2) {
  if (typeof Float32Array !== "undefined") (function() {
    var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
    function writeFloat_f32_cpy(val, buf, pos) {
      f32[0] = val;
      buf[pos] = f8b[0];
      buf[pos + 1] = f8b[1];
      buf[pos + 2] = f8b[2];
      buf[pos + 3] = f8b[3];
    }
    function writeFloat_f32_rev(val, buf, pos) {
      f32[0] = val;
      buf[pos] = f8b[3];
      buf[pos + 1] = f8b[2];
      buf[pos + 2] = f8b[1];
      buf[pos + 3] = f8b[0];
    }
    exports2.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
    exports2.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
    function readFloat_f32_cpy(buf, pos) {
      f8b[0] = buf[pos];
      f8b[1] = buf[pos + 1];
      f8b[2] = buf[pos + 2];
      f8b[3] = buf[pos + 3];
      return f32[0];
    }
    function readFloat_f32_rev(buf, pos) {
      f8b[3] = buf[pos];
      f8b[2] = buf[pos + 1];
      f8b[1] = buf[pos + 2];
      f8b[0] = buf[pos + 3];
      return f32[0];
    }
    exports2.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
    exports2.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
  })();
  else (function() {
    function writeFloat_ieee754(writeUint, val, buf, pos) {
      var sign = val < 0 ? 1 : 0;
      if (sign)
        val = -val;
      if (val === 0)
        writeUint(1 / val > 0 ? (
          /* positive */
          0
        ) : (
          /* negative 0 */
          2147483648
        ), buf, pos);
      else if (isNaN(val))
        writeUint(2143289344, buf, pos);
      else if (val > 34028234663852886e22)
        writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
      else if (val < 11754943508222875e-54)
        writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
      else {
        var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
        writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
      }
    }
    exports2.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
    exports2.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
    function readFloat_ieee754(readUint, buf, pos) {
      var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
      return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
    }
    exports2.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
    exports2.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
  })();
  if (typeof Float64Array !== "undefined") (function() {
    var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
    function writeDouble_f64_cpy(val, buf, pos) {
      f64[0] = val;
      buf[pos] = f8b[0];
      buf[pos + 1] = f8b[1];
      buf[pos + 2] = f8b[2];
      buf[pos + 3] = f8b[3];
      buf[pos + 4] = f8b[4];
      buf[pos + 5] = f8b[5];
      buf[pos + 6] = f8b[6];
      buf[pos + 7] = f8b[7];
    }
    function writeDouble_f64_rev(val, buf, pos) {
      f64[0] = val;
      buf[pos] = f8b[7];
      buf[pos + 1] = f8b[6];
      buf[pos + 2] = f8b[5];
      buf[pos + 3] = f8b[4];
      buf[pos + 4] = f8b[3];
      buf[pos + 5] = f8b[2];
      buf[pos + 6] = f8b[1];
      buf[pos + 7] = f8b[0];
    }
    exports2.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
    exports2.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
    function readDouble_f64_cpy(buf, pos) {
      f8b[0] = buf[pos];
      f8b[1] = buf[pos + 1];
      f8b[2] = buf[pos + 2];
      f8b[3] = buf[pos + 3];
      f8b[4] = buf[pos + 4];
      f8b[5] = buf[pos + 5];
      f8b[6] = buf[pos + 6];
      f8b[7] = buf[pos + 7];
      return f64[0];
    }
    function readDouble_f64_rev(buf, pos) {
      f8b[7] = buf[pos];
      f8b[6] = buf[pos + 1];
      f8b[5] = buf[pos + 2];
      f8b[4] = buf[pos + 3];
      f8b[3] = buf[pos + 4];
      f8b[2] = buf[pos + 5];
      f8b[1] = buf[pos + 6];
      f8b[0] = buf[pos + 7];
      return f64[0];
    }
    exports2.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
    exports2.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
  })();
  else (function() {
    function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
      var sign = val < 0 ? 1 : 0;
      if (sign)
        val = -val;
      if (val === 0) {
        writeUint(0, buf, pos + off0);
        writeUint(1 / val > 0 ? (
          /* positive */
          0
        ) : (
          /* negative 0 */
          2147483648
        ), buf, pos + off1);
      } else if (isNaN(val)) {
        writeUint(0, buf, pos + off0);
        writeUint(2146959360, buf, pos + off1);
      } else if (val > 17976931348623157e292) {
        writeUint(0, buf, pos + off0);
        writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
      } else {
        var mantissa;
        if (val < 22250738585072014e-324) {
          mantissa = val / 5e-324;
          writeUint(mantissa >>> 0, buf, pos + off0);
          writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
        } else {
          var exponent = Math.floor(Math.log(val) / Math.LN2);
          if (exponent === 1024)
            exponent = 1023;
          mantissa = val * Math.pow(2, -exponent);
          writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
          writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
        }
      }
    }
    exports2.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
    exports2.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
    function readDouble_ieee754(readUint, off0, off1, buf, pos) {
      var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
      var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
      return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
    }
    exports2.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
    exports2.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
  })();
  return exports2;
}
function writeUintLE(val, buf, pos) {
  buf[pos] = val & 255;
  buf[pos + 1] = val >>> 8 & 255;
  buf[pos + 2] = val >>> 16 & 255;
  buf[pos + 3] = val >>> 24;
}
function writeUintBE(val, buf, pos) {
  buf[pos] = val >>> 24;
  buf[pos + 1] = val >>> 16 & 255;
  buf[pos + 2] = val >>> 8 & 255;
  buf[pos + 3] = val & 255;
}
function readUintLE(buf, pos) {
  return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
}
function readUintBE(buf, pos) {
  return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
}
var inquire_1 = inquire$1;
function inquire$1(moduleName) {
  try {
    var mod = eval("quire".replace(/^/, "re"))(moduleName);
    if (mod && (mod.length || Object.keys(mod).length))
      return mod;
  } catch (e) {
  }
  return null;
}
var utf8$2 = {};
(function(exports2) {
  var utf82 = exports2;
  utf82.length = function utf8_length(string) {
    var len = 0, c = 0;
    for (var i = 0; i < string.length; ++i) {
      c = string.charCodeAt(i);
      if (c < 128)
        len += 1;
      else if (c < 2048)
        len += 2;
      else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
        ++i;
        len += 4;
      } else
        len += 3;
    }
    return len;
  };
  utf82.read = function utf8_read(buffer, start, end2) {
    var len = end2 - start;
    if (len < 1)
      return "";
    var parts = null, chunk = [], i = 0, t;
    while (start < end2) {
      t = buffer[start++];
      if (t < 128)
        chunk[i++] = t;
      else if (t > 191 && t < 224)
        chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
      else if (t > 239 && t < 365) {
        t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
        chunk[i++] = 55296 + (t >> 10);
        chunk[i++] = 56320 + (t & 1023);
      } else
        chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
      if (i > 8191) {
        (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
        i = 0;
      }
    }
    if (parts) {
      if (i)
        parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
      return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
  };
  utf82.write = function utf8_write(string, buffer, offset) {
    var start = offset, c1, c2;
    for (var i = 0; i < string.length; ++i) {
      c1 = string.charCodeAt(i);
      if (c1 < 128) {
        buffer[offset++] = c1;
      } else if (c1 < 2048) {
        buffer[offset++] = c1 >> 6 | 192;
        buffer[offset++] = c1 & 63 | 128;
      } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
        c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
        ++i;
        buffer[offset++] = c1 >> 18 | 240;
        buffer[offset++] = c1 >> 12 & 63 | 128;
        buffer[offset++] = c1 >> 6 & 63 | 128;
        buffer[offset++] = c1 & 63 | 128;
      } else {
        buffer[offset++] = c1 >> 12 | 224;
        buffer[offset++] = c1 >> 6 & 63 | 128;
        buffer[offset++] = c1 & 63 | 128;
      }
    }
    return offset - start;
  };
})(utf8$2);
var pool_1 = pool;
function pool(alloc2, slice2, size2) {
  var SIZE = size2 || 8192;
  var MAX = SIZE >>> 1;
  var slab = null;
  var offset = SIZE;
  return function pool_alloc(size3) {
    if (size3 < 1 || size3 > MAX)
      return alloc2(size3);
    if (offset + size3 > SIZE) {
      slab = alloc2(SIZE);
      offset = 0;
    }
    var buf = slice2.call(slab, offset, offset += size3);
    if (offset & 7)
      offset = (offset | 7) + 1;
    return buf;
  };
}
var longbits;
var hasRequiredLongbits;
function requireLongbits() {
  if (hasRequiredLongbits) return longbits;
  hasRequiredLongbits = 1;
  longbits = LongBits2;
  var util2 = requireMinimal();
  function LongBits2(lo, hi) {
    this.lo = lo >>> 0;
    this.hi = hi >>> 0;
  }
  var zero = LongBits2.zero = new LongBits2(0, 0);
  zero.toNumber = function() {
    return 0;
  };
  zero.zzEncode = zero.zzDecode = function() {
    return this;
  };
  zero.length = function() {
    return 1;
  };
  var zeroHash = LongBits2.zeroHash = "\0\0\0\0\0\0\0\0";
  LongBits2.fromNumber = function fromNumber(value) {
    if (value === 0)
      return zero;
    var sign = value < 0;
    if (sign)
      value = -value;
    var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
      hi = ~hi >>> 0;
      lo = ~lo >>> 0;
      if (++lo > 4294967295) {
        lo = 0;
        if (++hi > 4294967295)
          hi = 0;
      }
    }
    return new LongBits2(lo, hi);
  };
  LongBits2.from = function from(value) {
    if (typeof value === "number")
      return LongBits2.fromNumber(value);
    if (util2.isString(value)) {
      if (util2.Long)
        value = util2.Long.fromString(value);
      else
        return LongBits2.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits2(value.low >>> 0, value.high >>> 0) : zero;
  };
  LongBits2.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
      var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
      if (!lo)
        hi = hi + 1 >>> 0;
      return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
  };
  LongBits2.prototype.toLong = function toLong(unsigned) {
    return util2.Long ? new util2.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
  };
  var charCodeAt = String.prototype.charCodeAt;
  LongBits2.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
      return zero;
    return new LongBits2(
      (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
      (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
    );
  };
  LongBits2.prototype.toHash = function toHash() {
    return String.fromCharCode(
      this.lo & 255,
      this.lo >>> 8 & 255,
      this.lo >>> 16 & 255,
      this.lo >>> 24,
      this.hi & 255,
      this.hi >>> 8 & 255,
      this.hi >>> 16 & 255,
      this.hi >>> 24
    );
  };
  LongBits2.prototype.zzEncode = function zzEncode() {
    var mask = this.hi >> 31;
    this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo = (this.lo << 1 ^ mask) >>> 0;
    return this;
  };
  LongBits2.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi = (this.hi >>> 1 ^ mask) >>> 0;
    return this;
  };
  LongBits2.prototype.length = function length() {
    var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
    return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
  };
  return longbits;
}
var hasRequiredMinimal;
function requireMinimal() {
  if (hasRequiredMinimal) return minimal;
  hasRequiredMinimal = 1;
  (function(exports2) {
    var util2 = exports2;
    util2.asPromise = aspromise;
    util2.base64 = base64$1;
    util2.EventEmitter = eventemitter;
    util2.float = float;
    util2.inquire = inquire_1;
    util2.utf8 = utf8$2;
    util2.pool = pool_1;
    util2.LongBits = requireLongbits();
    util2.isNode = Boolean(typeof commonjsGlobal !== "undefined" && commonjsGlobal && commonjsGlobal.process && commonjsGlobal.process.versions && commonjsGlobal.process.versions.node);
    util2.global = util2.isNode && commonjsGlobal || typeof window !== "undefined" && window || typeof self !== "undefined" && self || commonjsGlobal;
    util2.emptyArray = Object.freeze ? Object.freeze([]) : (
      /* istanbul ignore next */
      []
    );
    util2.emptyObject = Object.freeze ? Object.freeze({}) : (
      /* istanbul ignore next */
      {}
    );
    util2.isInteger = Number.isInteger || /* istanbul ignore next */
    function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util2.isString = function isString2(value) {
      return typeof value === "string" || value instanceof String;
    };
    util2.isObject = function isObject2(value) {
      return value && typeof value === "object";
    };
    util2.isset = /**
     * Checks if a property on a message is considered to be present.
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    util2.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util2.Buffer = function() {
      try {
        var Buffer2 = util2.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : (
          /* istanbul ignore next */
          null
        );
      } catch (e) {
        return null;
      }
    }();
    util2._Buffer_from = null;
    util2._Buffer_allocUnsafe = null;
    util2.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util2.Buffer ? util2._Buffer_allocUnsafe(sizeOrArray) : new util2.Array(sizeOrArray) : util2.Buffer ? util2._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util2.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util2.Long = /* istanbul ignore next */
    util2.global.dcodeIO && /* istanbul ignore next */
    util2.global.dcodeIO.Long || /* istanbul ignore next */
    util2.global.Long || util2.inquire("long");
    util2.key2Re = /^true|false|0|1$/;
    util2.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util2.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util2.longToHash = function longToHash(value) {
      return value ? util2.LongBits.from(value).toHash() : util2.LongBits.zeroHash;
    };
    util2.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util2.LongBits.fromHash(hash);
      if (util2.Long)
        return util2.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge2(dst, src, ifNotSet) {
      for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src[keys[i]];
      return dst;
    }
    util2.merge = merge2;
    util2.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name) {
      function CustomError(message2, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message2, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message2;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge2(this, properties);
      }
      CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
          value: CustomError,
          writable: true,
          enumerable: false,
          configurable: true
        },
        name: {
          get: function get() {
            return name;
          },
          set: void 0,
          enumerable: false,
          // configurable: false would accurately preserve the behavior of
          // the original, but I'm guessing that was not intentional.
          // For an actual error subclass, this property would
          // be configurable.
          configurable: true
        },
        toString: {
          value: function value() {
            return this.name + ": " + this.message;
          },
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      return CustomError;
    }
    util2.newError = newError;
    util2.ProtocolError = newError("ProtocolError");
    util2.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util2.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util2.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util2._configure = function() {
      var Buffer2 = util2.Buffer;
      if (!Buffer2) {
        util2._Buffer_from = util2._Buffer_allocUnsafe = null;
        return;
      }
      util2._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
      function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util2._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
      function Buffer_allocUnsafe(size2) {
        return new Buffer2(size2);
      };
    };
  })(minimal);
  return minimal;
}
var writer = Writer$1;
var util$6 = requireMinimal();
var BufferWriter$1;
var LongBits$1 = util$6.LongBits, base64 = util$6.base64, utf8$1 = util$6.utf8;
function Op(fn, len, val) {
  this.fn = fn;
  this.len = len;
  this.next = void 0;
  this.val = val;
}
function noop$1() {
}
function State(writer2) {
  this.head = writer2.head;
  this.tail = writer2.tail;
  this.len = writer2.len;
  this.next = writer2.states;
}
function Writer$1() {
  this.len = 0;
  this.head = new Op(noop$1, 0, 0);
  this.tail = this.head;
  this.states = null;
}
var create$1 = function create2() {
  return util$6.Buffer ? function create_buffer_setup() {
    return (Writer$1.create = function create_buffer() {
      return new BufferWriter$1();
    })();
  } : function create_array3() {
    return new Writer$1();
  };
};
Writer$1.create = create$1();
Writer$1.alloc = function alloc(size2) {
  return new util$6.Array(size2);
};
if (util$6.Array !== Array)
  Writer$1.alloc = util$6.pool(Writer$1.alloc, util$6.Array.prototype.subarray);
Writer$1.prototype._push = function push(fn, len, val) {
  this.tail = this.tail.next = new Op(fn, len, val);
  this.len += len;
  return this;
};
function writeByte(val, buf, pos) {
  buf[pos] = val & 255;
}
function writeVarint32(val, buf, pos) {
  while (val > 127) {
    buf[pos++] = val & 127 | 128;
    val >>>= 7;
  }
  buf[pos] = val;
}
function VarintOp(len, val) {
  this.len = len;
  this.next = void 0;
  this.val = val;
}
VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;
Writer$1.prototype.uint32 = function write_uint32(value) {
  this.len += (this.tail = this.tail.next = new VarintOp(
    (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
    value
  )).len;
  return this;
};
Writer$1.prototype.int32 = function write_int32(value) {
  return value < 0 ? this._push(writeVarint64, 10, LongBits$1.fromNumber(value)) : this.uint32(value);
};
Writer$1.prototype.sint32 = function write_sint32(value) {
  return this.uint32((value << 1 ^ value >> 31) >>> 0);
};
function writeVarint64(val, buf, pos) {
  while (val.hi) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
    val.hi >>>= 7;
  }
  while (val.lo > 127) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = val.lo >>> 7;
  }
  buf[pos++] = val.lo;
}
Writer$1.prototype.uint64 = function write_uint64(value) {
  var bits = LongBits$1.from(value);
  return this._push(writeVarint64, bits.length(), bits);
};
Writer$1.prototype.int64 = Writer$1.prototype.uint64;
Writer$1.prototype.sint64 = function write_sint64(value) {
  var bits = LongBits$1.from(value).zzEncode();
  return this._push(writeVarint64, bits.length(), bits);
};
Writer$1.prototype.bool = function write_bool(value) {
  return this._push(writeByte, 1, value ? 1 : 0);
};
function writeFixed32(val, buf, pos) {
  buf[pos] = val & 255;
  buf[pos + 1] = val >>> 8 & 255;
  buf[pos + 2] = val >>> 16 & 255;
  buf[pos + 3] = val >>> 24;
}
Writer$1.prototype.fixed32 = function write_fixed32(value) {
  return this._push(writeFixed32, 4, value >>> 0);
};
Writer$1.prototype.sfixed32 = Writer$1.prototype.fixed32;
Writer$1.prototype.fixed64 = function write_fixed64(value) {
  var bits = LongBits$1.from(value);
  return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};
Writer$1.prototype.sfixed64 = Writer$1.prototype.fixed64;
Writer$1.prototype.float = function write_float(value) {
  return this._push(util$6.float.writeFloatLE, 4, value);
};
Writer$1.prototype.double = function write_double(value) {
  return this._push(util$6.float.writeDoubleLE, 8, value);
};
var writeBytes = util$6.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
  buf.set(val, pos);
} : function writeBytes_for(val, buf, pos) {
  for (var i = 0; i < val.length; ++i)
    buf[pos + i] = val[i];
};
Writer$1.prototype.bytes = function write_bytes(value) {
  var len = value.length >>> 0;
  if (!len)
    return this._push(writeByte, 1, 0);
  if (util$6.isString(value)) {
    var buf = Writer$1.alloc(len = base64.length(value));
    base64.decode(value, buf, 0);
    value = buf;
  }
  return this.uint32(len)._push(writeBytes, len, value);
};
Writer$1.prototype.string = function write_string(value) {
  var len = utf8$1.length(value);
  return len ? this.uint32(len)._push(utf8$1.write, len, value) : this._push(writeByte, 1, 0);
};
Writer$1.prototype.fork = function fork() {
  this.states = new State(this);
  this.head = this.tail = new Op(noop$1, 0, 0);
  this.len = 0;
  return this;
};
Writer$1.prototype.reset = function reset() {
  if (this.states) {
    this.head = this.states.head;
    this.tail = this.states.tail;
    this.len = this.states.len;
    this.states = this.states.next;
  } else {
    this.head = this.tail = new Op(noop$1, 0, 0);
    this.len = 0;
  }
  return this;
};
Writer$1.prototype.ldelim = function ldelim() {
  var head = this.head, tail = this.tail, len = this.len;
  this.reset().uint32(len);
  if (len) {
    this.tail.next = head.next;
    this.tail = tail;
    this.len += len;
  }
  return this;
};
Writer$1.prototype.finish = function finish() {
  var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
  while (head) {
    head.fn(head.val, buf, pos);
    pos += head.len;
    head = head.next;
  }
  return buf;
};
Writer$1._configure = function(BufferWriter_) {
  BufferWriter$1 = BufferWriter_;
  Writer$1.create = create$1();
  BufferWriter$1._configure();
};
var writer_buffer = BufferWriter;
var Writer = writer;
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
var util$5 = requireMinimal();
function BufferWriter() {
  Writer.call(this);
}
BufferWriter._configure = function() {
  BufferWriter.alloc = util$5._Buffer_allocUnsafe;
  BufferWriter.writeBytesBuffer = util$5.Buffer && util$5.Buffer.prototype instanceof Uint8Array && util$5.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
    buf.set(val, pos);
  } : function writeBytesBuffer_copy(val, buf, pos) {
    if (val.copy)
      val.copy(buf, pos, 0, val.length);
    else for (var i = 0; i < val.length; )
      buf[pos++] = val[i++];
  };
};
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
  if (util$5.isString(value))
    value = util$5._Buffer_from(value, "base64");
  var len = value.length >>> 0;
  this.uint32(len);
  if (len)
    this._push(BufferWriter.writeBytesBuffer, len, value);
  return this;
};
function writeStringBuffer(val, buf, pos) {
  if (val.length < 40)
    util$5.utf8.write(val, buf, pos);
  else if (buf.utf8Write)
    buf.utf8Write(val, pos);
  else
    buf.write(val, pos);
}
BufferWriter.prototype.string = function write_string_buffer(value) {
  var len = util$5.Buffer.byteLength(value);
  this.uint32(len);
  if (len)
    this._push(writeStringBuffer, len, value);
  return this;
};
BufferWriter._configure();
var reader = Reader$1;
var util$4 = requireMinimal();
var BufferReader$1;
var LongBits = util$4.LongBits, utf8 = util$4.utf8;
function indexOutOfRange(reader2, writeLength) {
  return RangeError("index out of range: " + reader2.pos + " + " + (writeLength || 1) + " > " + reader2.len);
}
function Reader$1(buffer) {
  this.buf = buffer;
  this.pos = 0;
  this.len = buffer.length;
}
var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
  if (buffer instanceof Uint8Array || Array.isArray(buffer))
    return new Reader$1(buffer);
  throw Error("illegal buffer");
} : function create_array2(buffer) {
  if (Array.isArray(buffer))
    return new Reader$1(buffer);
  throw Error("illegal buffer");
};
var create = function create3() {
  return util$4.Buffer ? function create_buffer_setup(buffer) {
    return (Reader$1.create = function create_buffer(buffer2) {
      return util$4.Buffer.isBuffer(buffer2) ? new BufferReader$1(buffer2) : create_array(buffer2);
    })(buffer);
  } : create_array;
};
Reader$1.create = create();
Reader$1.prototype._slice = util$4.Array.prototype.subarray || /* istanbul ignore next */
util$4.Array.prototype.slice;
Reader$1.prototype.uint32 = /* @__PURE__ */ function read_uint32_setup() {
  var value = 4294967295;
  return function read_uint32() {
    value = (this.buf[this.pos] & 127) >>> 0;
    if (this.buf[this.pos++] < 128) return value;
    value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
    if (this.buf[this.pos++] < 128) return value;
    value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
    if (this.buf[this.pos++] < 128) return value;
    value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
    if (this.buf[this.pos++] < 128) return value;
    value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
    if (this.buf[this.pos++] < 128) return value;
    if ((this.pos += 5) > this.len) {
      this.pos = this.len;
      throw indexOutOfRange(this, 10);
    }
    return value;
  };
}();
Reader$1.prototype.int32 = function read_int32() {
  return this.uint32() | 0;
};
Reader$1.prototype.sint32 = function read_sint32() {
  var value = this.uint32();
  return value >>> 1 ^ -(value & 1) | 0;
};
function readLongVarint() {
  var bits = new LongBits(0, 0);
  var i = 0;
  if (this.len - this.pos > 4) {
    for (; i < 4; ++i) {
      bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
    bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
    bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
    if (this.buf[this.pos++] < 128)
      return bits;
    i = 0;
  } else {
    for (; i < 3; ++i) {
      if (this.pos >= this.len)
        throw indexOutOfRange(this);
      bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
    bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
    return bits;
  }
  if (this.len - this.pos > 4) {
    for (; i < 5; ++i) {
      bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
  } else {
    for (; i < 5; ++i) {
      if (this.pos >= this.len)
        throw indexOutOfRange(this);
      bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
      if (this.buf[this.pos++] < 128)
        return bits;
    }
  }
  throw Error("invalid varint encoding");
}
Reader$1.prototype.bool = function read_bool() {
  return this.uint32() !== 0;
};
function readFixed32_end(buf, end2) {
  return (buf[end2 - 4] | buf[end2 - 3] << 8 | buf[end2 - 2] << 16 | buf[end2 - 1] << 24) >>> 0;
}
Reader$1.prototype.fixed32 = function read_fixed32() {
  if (this.pos + 4 > this.len)
    throw indexOutOfRange(this, 4);
  return readFixed32_end(this.buf, this.pos += 4);
};
Reader$1.prototype.sfixed32 = function read_sfixed32() {
  if (this.pos + 4 > this.len)
    throw indexOutOfRange(this, 4);
  return readFixed32_end(this.buf, this.pos += 4) | 0;
};
function readFixed64() {
  if (this.pos + 8 > this.len)
    throw indexOutOfRange(this, 8);
  return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}
Reader$1.prototype.float = function read_float() {
  if (this.pos + 4 > this.len)
    throw indexOutOfRange(this, 4);
  var value = util$4.float.readFloatLE(this.buf, this.pos);
  this.pos += 4;
  return value;
};
Reader$1.prototype.double = function read_double() {
  if (this.pos + 8 > this.len)
    throw indexOutOfRange(this, 4);
  var value = util$4.float.readDoubleLE(this.buf, this.pos);
  this.pos += 8;
  return value;
};
Reader$1.prototype.bytes = function read_bytes() {
  var length = this.uint32(), start = this.pos, end2 = this.pos + length;
  if (end2 > this.len)
    throw indexOutOfRange(this, length);
  this.pos += length;
  if (Array.isArray(this.buf))
    return this.buf.slice(start, end2);
  if (start === end2) {
    var nativeBuffer = util$4.Buffer;
    return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
  }
  return this._slice.call(this.buf, start, end2);
};
Reader$1.prototype.string = function read_string() {
  var bytes = this.bytes();
  return utf8.read(bytes, 0, bytes.length);
};
Reader$1.prototype.skip = function skip(length) {
  if (typeof length === "number") {
    if (this.pos + length > this.len)
      throw indexOutOfRange(this, length);
    this.pos += length;
  } else {
    do {
      if (this.pos >= this.len)
        throw indexOutOfRange(this);
    } while (this.buf[this.pos++] & 128);
  }
  return this;
};
Reader$1.prototype.skipType = function(wireType) {
  switch (wireType) {
    case 0:
      this.skip();
      break;
    case 1:
      this.skip(8);
      break;
    case 2:
      this.skip(this.uint32());
      break;
    case 3:
      while ((wireType = this.uint32() & 7) !== 4) {
        this.skipType(wireType);
      }
      break;
    case 5:
      this.skip(4);
      break;
    default:
      throw Error("invalid wire type " + wireType + " at offset " + this.pos);
  }
  return this;
};
Reader$1._configure = function(BufferReader_) {
  BufferReader$1 = BufferReader_;
  Reader$1.create = create();
  BufferReader$1._configure();
  var fn = util$4.Long ? "toLong" : (
    /* istanbul ignore next */
    "toNumber"
  );
  util$4.merge(Reader$1.prototype, {
    int64: function read_int64() {
      return readLongVarint.call(this)[fn](false);
    },
    uint64: function read_uint64() {
      return readLongVarint.call(this)[fn](true);
    },
    sint64: function read_sint64() {
      return readLongVarint.call(this).zzDecode()[fn](false);
    },
    fixed64: function read_fixed64() {
      return readFixed64.call(this)[fn](true);
    },
    sfixed64: function read_sfixed64() {
      return readFixed64.call(this)[fn](false);
    }
  });
};
var reader_buffer = BufferReader;
var Reader = reader;
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
var util$3 = requireMinimal();
function BufferReader(buffer) {
  Reader.call(this, buffer);
}
BufferReader._configure = function() {
  if (util$3.Buffer)
    BufferReader.prototype._slice = util$3.Buffer.prototype.slice;
};
BufferReader.prototype.string = function read_string_buffer() {
  var len = this.uint32();
  return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
};
BufferReader._configure();
var rpc = {};
var service$1 = Service;
var util$2 = requireMinimal();
(Service.prototype = Object.create(util$2.EventEmitter.prototype)).constructor = Service;
function Service(rpcImpl, requestDelimited, responseDelimited) {
  if (typeof rpcImpl !== "function")
    throw TypeError("rpcImpl must be a function");
  util$2.EventEmitter.call(this);
  this.rpcImpl = rpcImpl;
  this.requestDelimited = Boolean(requestDelimited);
  this.responseDelimited = Boolean(responseDelimited);
}
Service.prototype.rpcCall = function rpcCall(method2, requestCtor, responseCtor, request, callback) {
  if (!request)
    throw TypeError("request must be specified");
  var self2 = this;
  if (!callback)
    return util$2.asPromise(rpcCall, self2, method2, requestCtor, responseCtor, request);
  if (!self2.rpcImpl) {
    setTimeout(function() {
      callback(Error("already ended"));
    }, 0);
    return void 0;
  }
  try {
    return self2.rpcImpl(
      method2,
      requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
      function rpcCallback(err, response) {
        if (err) {
          self2.emit("error", err, method2);
          return callback(err);
        }
        if (response === null) {
          self2.end(
            /* endedByRPC */
            true
          );
          return void 0;
        }
        if (!(response instanceof responseCtor)) {
          try {
            response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
          } catch (err2) {
            self2.emit("error", err2, method2);
            return callback(err2);
          }
        }
        self2.emit("data", response, method2);
        return callback(null, response);
      }
    );
  } catch (err) {
    self2.emit("error", err, method2);
    setTimeout(function() {
      callback(err);
    }, 0);
    return void 0;
  }
};
Service.prototype.end = function end(endedByRPC) {
  if (this.rpcImpl) {
    if (!endedByRPC)
      this.rpcImpl(null, null, null);
    this.rpcImpl = null;
    this.emit("end").off();
  }
  return this;
};
(function(exports2) {
  var rpc2 = exports2;
  rpc2.Service = service$1;
})(rpc);
var roots = {};
(function(exports2) {
  var protobuf2 = exports2;
  protobuf2.build = "minimal";
  protobuf2.Writer = writer;
  protobuf2.BufferWriter = writer_buffer;
  protobuf2.Reader = reader;
  protobuf2.BufferReader = reader_buffer;
  protobuf2.util = requireMinimal();
  protobuf2.rpc = rpc;
  protobuf2.roots = roots;
  protobuf2.configure = configure;
  function configure() {
    protobuf2.util._configure();
    protobuf2.Writer._configure(protobuf2.BufferWriter);
    protobuf2.Reader._configure(protobuf2.BufferReader);
  }
  configure();
})(indexMinimal);
var types = {};
var util$1 = { exports: {} };
var codegen_1 = codegen;
function codegen(functionParams, functionName) {
  if (typeof functionParams === "string") {
    functionName = functionParams;
    functionParams = void 0;
  }
  var body = [];
  function Codegen(formatStringOrScope) {
    if (typeof formatStringOrScope !== "string") {
      var source = toString3();
      if (codegen.verbose)
        console.log("codegen: " + source);
      source = "return " + source;
      if (formatStringOrScope) {
        var scopeKeys = Object.keys(formatStringOrScope), scopeParams = new Array(scopeKeys.length + 1), scopeValues = new Array(scopeKeys.length), scopeOffset = 0;
        while (scopeOffset < scopeKeys.length) {
          scopeParams[scopeOffset] = scopeKeys[scopeOffset];
          scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
        }
        scopeParams[scopeOffset] = source;
        return Function.apply(null, scopeParams).apply(null, scopeValues);
      }
      return Function(source)();
    }
    var formatParams = new Array(arguments.length - 1), formatOffset = 0;
    while (formatOffset < formatParams.length)
      formatParams[formatOffset] = arguments[++formatOffset];
    formatOffset = 0;
    formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
      var value = formatParams[formatOffset++];
      switch ($1) {
        case "d":
        case "f":
          return String(Number(value));
        case "i":
          return String(Math.floor(value));
        case "j":
          return JSON.stringify(value);
        case "s":
          return String(value);
      }
      return "%";
    });
    if (formatOffset !== formatParams.length)
      throw Error("parameter count mismatch");
    body.push(formatStringOrScope);
    return Codegen;
  }
  function toString3(functionNameOverride) {
    return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
  }
  Codegen.toString = toString3;
  return Codegen;
}
codegen.verbose = false;
var fetch_1 = fetch$1;
var asPromise = aspromise, inquire = inquire_1;
var fs = inquire("fs");
function fetch$1(filename, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  } else if (!options)
    options = {};
  if (!callback)
    return asPromise(fetch$1, this, filename, options);
  if (!options.xhr && fs && fs.readFile)
    return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
      return err && typeof XMLHttpRequest !== "undefined" ? fetch$1.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
    });
  return fetch$1.xhr(filename, options, callback);
}
fetch$1.xhr = function fetch_xhr(filename, options, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function fetchOnReadyStateChange() {
    if (xhr.readyState !== 4)
      return void 0;
    if (xhr.status !== 0 && xhr.status !== 200)
      return callback(Error("status " + xhr.status));
    if (options.binary) {
      var buffer = xhr.response;
      if (!buffer) {
        buffer = [];
        for (var i = 0; i < xhr.responseText.length; ++i)
          buffer.push(xhr.responseText.charCodeAt(i) & 255);
      }
      return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
    }
    return callback(null, xhr.responseText);
  };
  if (options.binary) {
    if ("overrideMimeType" in xhr)
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
    xhr.responseType = "arraybuffer";
  }
  xhr.open("GET", filename);
  xhr.send();
};
var path = {};
(function(exports2) {
  var path2 = exports2;
  var isAbsolute = (
    /**
     * Tests if the specified path is absolute.
     * @param {string} path Path to test
     * @returns {boolean} `true` if path is absolute
     */
    path2.isAbsolute = function isAbsolute2(path3) {
      return /^(?:\/|\w+:)/.test(path3);
    }
  );
  var normalize = (
    /**
     * Normalizes the specified path.
     * @param {string} path Path to normalize
     * @returns {string} Normalized path
     */
    path2.normalize = function normalize2(path3) {
      path3 = path3.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
      var parts = path3.split("/"), absolute = isAbsolute(path3), prefix = "";
      if (absolute)
        prefix = parts.shift() + "/";
      for (var i = 0; i < parts.length; ) {
        if (parts[i] === "..") {
          if (i > 0 && parts[i - 1] !== "..")
            parts.splice(--i, 2);
          else if (absolute)
            parts.splice(i, 1);
          else
            ++i;
        } else if (parts[i] === ".")
          parts.splice(i, 1);
        else
          ++i;
      }
      return prefix + parts.join("/");
    }
  );
  path2.resolve = function resolve(originPath, includePath, alreadyNormalized) {
    if (!alreadyNormalized)
      includePath = normalize(includePath);
    if (isAbsolute(includePath))
      return includePath;
    if (!alreadyNormalized)
      originPath = normalize(originPath);
    return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
  };
})(path);
var namespace;
var hasRequiredNamespace;
function requireNamespace() {
  if (hasRequiredNamespace) return namespace;
  hasRequiredNamespace = 1;
  namespace = Namespace;
  var ReflectionObject = requireObject();
  ((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";
  var Field = requireField(), util2 = requireUtil(), OneOf = requireOneof();
  var Type, Service2, Enum;
  Namespace.fromJSON = function fromJSON(name, json) {
    return new Namespace(name, json.options).addJSON(json.nested);
  };
  function arrayToJSON(array, toJSONOptions) {
    if (!(array && array.length))
      return void 0;
    var obj = {};
    for (var i = 0; i < array.length; ++i)
      obj[array[i].name] = array[i].toJSON(toJSONOptions);
    return obj;
  }
  Namespace.arrayToJSON = arrayToJSON;
  Namespace.isReservedId = function isReservedId(reserved, id) {
    if (reserved) {
      for (var i = 0; i < reserved.length; ++i)
        if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] > id)
          return true;
    }
    return false;
  };
  Namespace.isReservedName = function isReservedName(reserved, name) {
    if (reserved) {
      for (var i = 0; i < reserved.length; ++i)
        if (reserved[i] === name)
          return true;
    }
    return false;
  };
  function Namespace(name, options) {
    ReflectionObject.call(this, name, options);
    this.nested = void 0;
    this._nestedArray = null;
    this._lookupCache = {};
    this._needsRecursiveFeatureResolution = true;
    this._needsRecursiveResolve = true;
  }
  function clearCache(namespace2) {
    namespace2._nestedArray = null;
    namespace2._lookupCache = {};
    var parent = namespace2;
    while (parent = parent.parent) {
      parent._lookupCache = {};
    }
    return namespace2;
  }
  Object.defineProperty(Namespace.prototype, "nestedArray", {
    get: function() {
      return this._nestedArray || (this._nestedArray = util2.toArray(this.nested));
    }
  });
  Namespace.prototype.toJSON = function toJSON3(toJSONOptions) {
    return util2.toObject([
      "options",
      this.options,
      "nested",
      arrayToJSON(this.nestedArray, toJSONOptions)
    ]);
  };
  Namespace.prototype.addJSON = function addJSON(nestedJson) {
    var ns = this;
    if (nestedJson) {
      for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
        nested = nestedJson[names[i]];
        ns.add(
          // most to least likely
          (nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service2.fromJSON : nested.id !== void 0 ? Field.fromJSON : Namespace.fromJSON)(names[i], nested)
        );
      }
    }
    return this;
  };
  Namespace.prototype.get = function get(name) {
    return this.nested && this.nested[name] || null;
  };
  Namespace.prototype.getEnum = function getEnum(name) {
    if (this.nested && this.nested[name] instanceof Enum)
      return this.nested[name].values;
    throw Error("no such enum: " + name);
  };
  Namespace.prototype.add = function add(object2) {
    if (!(object2 instanceof Field && object2.extend !== void 0 || object2 instanceof Type || object2 instanceof OneOf || object2 instanceof Enum || object2 instanceof Service2 || object2 instanceof Namespace))
      throw TypeError("object must be a valid nested object");
    if (!this.nested)
      this.nested = {};
    else {
      var prev = this.get(object2.name);
      if (prev) {
        if (prev instanceof Namespace && object2 instanceof Namespace && !(prev instanceof Type || prev instanceof Service2)) {
          var nested = prev.nestedArray;
          for (var i = 0; i < nested.length; ++i)
            object2.add(nested[i]);
          this.remove(prev);
          if (!this.nested)
            this.nested = {};
          object2.setOptions(prev.options, true);
        } else
          throw Error("duplicate name '" + object2.name + "' in " + this);
      }
    }
    this.nested[object2.name] = object2;
    if (!(this instanceof Type || this instanceof Service2 || this instanceof Enum || this instanceof Field)) {
      if (!object2._edition) {
        object2._edition = object2._defaultEdition;
      }
    }
    this._needsRecursiveFeatureResolution = true;
    this._needsRecursiveResolve = true;
    var parent = this;
    while (parent = parent.parent) {
      parent._needsRecursiveFeatureResolution = true;
      parent._needsRecursiveResolve = true;
    }
    object2.onAdd(this);
    return clearCache(this);
  };
  Namespace.prototype.remove = function remove(object2) {
    if (!(object2 instanceof ReflectionObject))
      throw TypeError("object must be a ReflectionObject");
    if (object2.parent !== this)
      throw Error(object2 + " is not a member of " + this);
    delete this.nested[object2.name];
    if (!Object.keys(this.nested).length)
      this.nested = void 0;
    object2.onRemove(this);
    return clearCache(this);
  };
  Namespace.prototype.define = function define(path2, json) {
    if (util2.isString(path2))
      path2 = path2.split(".");
    else if (!Array.isArray(path2))
      throw TypeError("illegal path");
    if (path2 && path2.length && path2[0] === "")
      throw Error("path must be relative");
    var ptr = this;
    while (path2.length > 0) {
      var part = path2.shift();
      if (ptr.nested && ptr.nested[part]) {
        ptr = ptr.nested[part];
        if (!(ptr instanceof Namespace))
          throw Error("path conflicts with non-namespace objects");
      } else
        ptr.add(ptr = new Namespace(part));
    }
    if (json)
      ptr.addJSON(json);
    return ptr;
  };
  Namespace.prototype.resolveAll = function resolveAll() {
    if (!this._needsRecursiveResolve) return this;
    this._resolveFeaturesRecursive(this._edition);
    var nested = this.nestedArray, i = 0;
    this.resolve();
    while (i < nested.length)
      if (nested[i] instanceof Namespace)
        nested[i++].resolveAll();
      else
        nested[i++].resolve();
    this._needsRecursiveResolve = false;
    return this;
  };
  Namespace.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
    if (!this._needsRecursiveFeatureResolution) return this;
    this._needsRecursiveFeatureResolution = false;
    edition = this._edition || edition;
    ReflectionObject.prototype._resolveFeaturesRecursive.call(this, edition);
    this.nestedArray.forEach((nested) => {
      nested._resolveFeaturesRecursive(edition);
    });
    return this;
  };
  Namespace.prototype.lookup = function lookup(path2, filterTypes, parentAlreadyChecked) {
    if (typeof filterTypes === "boolean") {
      parentAlreadyChecked = filterTypes;
      filterTypes = void 0;
    } else if (filterTypes && !Array.isArray(filterTypes))
      filterTypes = [filterTypes];
    if (util2.isString(path2) && path2.length) {
      if (path2 === ".")
        return this.root;
      path2 = path2.split(".");
    } else if (!path2.length)
      return this;
    var flatPath = path2.join(".");
    if (path2[0] === "")
      return this.root.lookup(path2.slice(1), filterTypes);
    var found = this.root._fullyQualifiedObjects && this.root._fullyQualifiedObjects["." + flatPath];
    if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) {
      return found;
    }
    found = this._lookupImpl(path2, flatPath);
    if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) {
      return found;
    }
    if (parentAlreadyChecked)
      return null;
    var current = this;
    while (current.parent) {
      found = current.parent._lookupImpl(path2, flatPath);
      if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) {
        return found;
      }
      current = current.parent;
    }
    return null;
  };
  Namespace.prototype._lookupImpl = function lookup(path2, flatPath) {
    if (Object.prototype.hasOwnProperty.call(this._lookupCache, flatPath)) {
      return this._lookupCache[flatPath];
    }
    var found = this.get(path2[0]);
    var exact = null;
    if (found) {
      if (path2.length === 1) {
        exact = found;
      } else if (found instanceof Namespace) {
        path2 = path2.slice(1);
        exact = found._lookupImpl(path2, path2.join("."));
      }
    } else {
      for (var i = 0; i < this.nestedArray.length; ++i)
        if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i]._lookupImpl(path2, flatPath)))
          exact = found;
    }
    this._lookupCache[flatPath] = exact;
    return exact;
  };
  Namespace.prototype.lookupType = function lookupType(path2) {
    var found = this.lookup(path2, [Type]);
    if (!found)
      throw Error("no such type: " + path2);
    return found;
  };
  Namespace.prototype.lookupEnum = function lookupEnum(path2) {
    var found = this.lookup(path2, [Enum]);
    if (!found)
      throw Error("no such Enum '" + path2 + "' in " + this);
    return found;
  };
  Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path2) {
    var found = this.lookup(path2, [Type, Enum]);
    if (!found)
      throw Error("no such Type or Enum '" + path2 + "' in " + this);
    return found;
  };
  Namespace.prototype.lookupService = function lookupService(path2) {
    var found = this.lookup(path2, [Service2]);
    if (!found)
      throw Error("no such Service '" + path2 + "' in " + this);
    return found;
  };
  Namespace._configure = function(Type_, Service_, Enum_) {
    Type = Type_;
    Service2 = Service_;
    Enum = Enum_;
  };
  return namespace;
}
var mapfield;
var hasRequiredMapfield;
function requireMapfield() {
  if (hasRequiredMapfield) return mapfield;
  hasRequiredMapfield = 1;
  mapfield = MapField;
  var Field = requireField();
  ((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";
  var types2 = requireTypes(), util2 = requireUtil();
  function MapField(name, id, keyType, type2, options, comment) {
    Field.call(this, name, id, type2, void 0, void 0, options, comment);
    if (!util2.isString(keyType))
      throw TypeError("keyType must be a string");
    this.keyType = keyType;
    this.resolvedKeyType = null;
    this.map = true;
  }
  MapField.fromJSON = function fromJSON(name, json) {
    return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
  };
  MapField.prototype.toJSON = function toJSON3(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util2.toObject([
      "keyType",
      this.keyType,
      "type",
      this.type,
      "id",
      this.id,
      "extend",
      this.extend,
      "options",
      this.options,
      "comment",
      keepComments ? this.comment : void 0
    ]);
  };
  MapField.prototype.resolve = function resolve() {
    if (this.resolved)
      return this;
    if (types2.mapKey[this.keyType] === void 0)
      throw Error("invalid key type: " + this.keyType);
    return Field.prototype.resolve.call(this);
  };
  MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {
    if (typeof fieldValueType === "function")
      fieldValueType = util2.decorateType(fieldValueType).name;
    else if (fieldValueType && typeof fieldValueType === "object")
      fieldValueType = util2.decorateEnum(fieldValueType).name;
    return function mapFieldDecorator(prototype2, fieldName) {
      util2.decorateType(prototype2.constructor).add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
    };
  };
  return mapfield;
}
var method;
var hasRequiredMethod;
function requireMethod() {
  if (hasRequiredMethod) return method;
  hasRequiredMethod = 1;
  method = Method;
  var ReflectionObject = requireObject();
  ((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";
  var util2 = requireUtil();
  function Method(name, type2, requestType, responseType, requestStream, responseStream, options, comment, parsedOptions) {
    if (util2.isObject(requestStream)) {
      options = requestStream;
      requestStream = responseStream = void 0;
    } else if (util2.isObject(responseStream)) {
      options = responseStream;
      responseStream = void 0;
    }
    if (!(type2 === void 0 || util2.isString(type2)))
      throw TypeError("type must be a string");
    if (!util2.isString(requestType))
      throw TypeError("requestType must be a string");
    if (!util2.isString(responseType))
      throw TypeError("responseType must be a string");
    ReflectionObject.call(this, name, options);
    this.type = type2 || "rpc";
    this.requestType = requestType;
    this.requestStream = requestStream ? true : void 0;
    this.responseType = responseType;
    this.responseStream = responseStream ? true : void 0;
    this.resolvedRequestType = null;
    this.resolvedResponseType = null;
    this.comment = comment;
    this.parsedOptions = parsedOptions;
  }
  Method.fromJSON = function fromJSON(name, json) {
    return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment, json.parsedOptions);
  };
  Method.prototype.toJSON = function toJSON3(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util2.toObject([
      "type",
      this.type !== "rpc" && /* istanbul ignore next */
      this.type || void 0,
      "requestType",
      this.requestType,
      "requestStream",
      this.requestStream,
      "responseType",
      this.responseType,
      "responseStream",
      this.responseStream,
      "options",
      this.options,
      "comment",
      keepComments ? this.comment : void 0,
      "parsedOptions",
      this.parsedOptions
    ]);
  };
  Method.prototype.resolve = function resolve() {
    if (this.resolved)
      return this;
    this.resolvedRequestType = this.parent.lookupType(this.requestType);
    this.resolvedResponseType = this.parent.lookupType(this.responseType);
    return ReflectionObject.prototype.resolve.call(this);
  };
  return method;
}
var service;
var hasRequiredService;
function requireService() {
  if (hasRequiredService) return service;
  hasRequiredService = 1;
  service = Service2;
  var Namespace = requireNamespace();
  ((Service2.prototype = Object.create(Namespace.prototype)).constructor = Service2).className = "Service";
  var Method = requireMethod(), util2 = requireUtil(), rpc$1 = rpc;
  function Service2(name, options) {
    Namespace.call(this, name, options);
    this.methods = {};
    this._methodsArray = null;
  }
  Service2.fromJSON = function fromJSON(name, json) {
    var service2 = new Service2(name, json.options);
    if (json.methods)
      for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i)
        service2.add(Method.fromJSON(names[i], json.methods[names[i]]));
    if (json.nested)
      service2.addJSON(json.nested);
    if (json.edition)
      service2._edition = json.edition;
    service2.comment = json.comment;
    service2._defaultEdition = "proto3";
    return service2;
  };
  Service2.prototype.toJSON = function toJSON3(toJSONOptions) {
    var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util2.toObject([
      "edition",
      this._editionToJSON(),
      "options",
      inherited && inherited.options || void 0,
      "methods",
      Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || /* istanbul ignore next */
      {},
      "nested",
      inherited && inherited.nested || void 0,
      "comment",
      keepComments ? this.comment : void 0
    ]);
  };
  Object.defineProperty(Service2.prototype, "methodsArray", {
    get: function() {
      return this._methodsArray || (this._methodsArray = util2.toArray(this.methods));
    }
  });
  function clearCache(service2) {
    service2._methodsArray = null;
    return service2;
  }
  Service2.prototype.get = function get(name) {
    return this.methods[name] || Namespace.prototype.get.call(this, name);
  };
  Service2.prototype.resolveAll = function resolveAll() {
    if (!this._needsRecursiveResolve) return this;
    Namespace.prototype.resolve.call(this);
    var methods = this.methodsArray;
    for (var i = 0; i < methods.length; ++i)
      methods[i].resolve();
    return this;
  };
  Service2.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
    if (!this._needsRecursiveFeatureResolution) return this;
    edition = this._edition || edition;
    Namespace.prototype._resolveFeaturesRecursive.call(this, edition);
    this.methodsArray.forEach((method2) => {
      method2._resolveFeaturesRecursive(edition);
    });
    return this;
  };
  Service2.prototype.add = function add(object2) {
    if (this.get(object2.name))
      throw Error("duplicate name '" + object2.name + "' in " + this);
    if (object2 instanceof Method) {
      this.methods[object2.name] = object2;
      object2.parent = this;
      return clearCache(this);
    }
    return Namespace.prototype.add.call(this, object2);
  };
  Service2.prototype.remove = function remove(object2) {
    if (object2 instanceof Method) {
      if (this.methods[object2.name] !== object2)
        throw Error(object2 + " is not a member of " + this);
      delete this.methods[object2.name];
      object2.parent = null;
      return clearCache(this);
    }
    return Namespace.prototype.remove.call(this, object2);
  };
  Service2.prototype.create = function create5(rpcImpl, requestDelimited, responseDelimited) {
    var rpcService = new rpc$1.Service(rpcImpl, requestDelimited, responseDelimited);
    for (var i = 0, method2; i < /* initializes */
    this.methodsArray.length; ++i) {
      var methodName = util2.lcFirst((method2 = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
      rpcService[methodName] = util2.codegen(["r", "c"], util2.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
        m: method2,
        q: method2.resolvedRequestType.ctor,
        s: method2.resolvedResponseType.ctor
      });
    }
    return rpcService;
  };
  return service;
}
var message = Message$1;
var util = requireMinimal();
function Message$1(properties) {
  if (properties)
    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
      this[keys[i]] = properties[keys[i]];
}
Message$1.create = function create4(properties) {
  return this.$type.create(properties);
};
Message$1.encode = function encode2(message2, writer2) {
  return this.$type.encode(message2, writer2);
};
Message$1.encodeDelimited = function encodeDelimited(message2, writer2) {
  return this.$type.encodeDelimited(message2, writer2);
};
Message$1.decode = function decode(reader2) {
  return this.$type.decode(reader2);
};
Message$1.decodeDelimited = function decodeDelimited(reader2) {
  return this.$type.decodeDelimited(reader2);
};
Message$1.verify = function verify(message2) {
  return this.$type.verify(message2);
};
Message$1.fromObject = function fromObject(object2) {
  return this.$type.fromObject(object2);
};
Message$1.toObject = function toObject(message2, options) {
  return this.$type.toObject(message2, options);
};
Message$1.prototype.toJSON = function toJSON() {
  return this.$type.toObject(this, util.toJSONOptions);
};
var decoder_1;
var hasRequiredDecoder;
function requireDecoder() {
  if (hasRequiredDecoder) return decoder_1;
  hasRequiredDecoder = 1;
  decoder_1 = decoder;
  var Enum = require_enum(), types2 = requireTypes(), util2 = requireUtil();
  function missing(field2) {
    return "missing required '" + field2.name + "'";
  }
  function decoder(mtype) {
    var gen2 = util2.codegen(["r", "l", "e"], mtype.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function(field3) {
      return field3.map;
    }).length ? ",k,value" : ""))("while(r.pos<c){")("var t=r.uint32()")("if(t===e)")("break")("switch(t>>>3){");
    var i = 0;
    for (; i < /* initializes */
    mtype.fieldsArray.length; ++i) {
      var field2 = mtype._fieldsArray[i].resolve(), type2 = field2.resolvedType instanceof Enum ? "int32" : field2.type, ref = "m" + util2.safeProp(field2.name);
      gen2("case %i: {", field2.id);
      if (field2.map) {
        gen2("if(%s===util.emptyObject)", ref)("%s={}", ref)("var c2 = r.uint32()+r.pos");
        if (types2.defaults[field2.keyType] !== void 0) gen2("k=%j", types2.defaults[field2.keyType]);
        else gen2("k=null");
        if (types2.defaults[type2] !== void 0) gen2("value=%j", types2.defaults[type2]);
        else gen2("value=null");
        gen2("while(r.pos<c2){")("var tag2=r.uint32()")("switch(tag2>>>3){")("case 1: k=r.%s(); break", field2.keyType)("case 2:");
        if (types2.basic[type2] === void 0) gen2("value=types[%i].decode(r,r.uint32())", i);
        else gen2("value=r.%s()", type2);
        gen2("break")("default:")("r.skipType(tag2&7)")("break")("}")("}");
        if (types2.long[field2.keyType] !== void 0) gen2('%s[typeof k==="object"?util.longToHash(k):k]=value', ref);
        else gen2("%s[k]=value", ref);
      } else if (field2.repeated) {
        gen2("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref);
        if (types2.packed[type2] !== void 0) gen2("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", ref, type2)("}else");
        if (types2.basic[type2] === void 0) gen2(field2.delimited ? "%s.push(types[%i].decode(r,undefined,((t&~7)|4)))" : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);
        else gen2("%s.push(r.%s())", ref, type2);
      } else if (types2.basic[type2] === void 0) gen2(field2.delimited ? "%s=types[%i].decode(r,undefined,((t&~7)|4))" : "%s=types[%i].decode(r,r.uint32())", ref, i);
      else gen2("%s=r.%s()", ref, type2);
      gen2("break")("}");
    }
    gen2("default:")("r.skipType(t&7)")("break")("}")("}");
    for (i = 0; i < mtype._fieldsArray.length; ++i) {
      var rfield = mtype._fieldsArray[i];
      if (rfield.required) gen2("if(!m.hasOwnProperty(%j))", rfield.name)("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
    }
    return gen2("return m");
  }
  return decoder_1;
}
var verifier_1;
var hasRequiredVerifier;
function requireVerifier() {
  if (hasRequiredVerifier) return verifier_1;
  hasRequiredVerifier = 1;
  verifier_1 = verifier;
  var Enum = require_enum(), util2 = requireUtil();
  function invalid(field2, expected) {
    return field2.name + ": " + expected + (field2.repeated && expected !== "array" ? "[]" : field2.map && expected !== "object" ? "{k:" + field2.keyType + "}" : "") + " expected";
  }
  function genVerifyValue(gen2, field2, fieldIndex, ref) {
    if (field2.resolvedType) {
      if (field2.resolvedType instanceof Enum) {
        gen2("switch(%s){", ref)("default:")("return%j", invalid(field2, "enum value"));
        for (var keys = Object.keys(field2.resolvedType.values), j = 0; j < keys.length; ++j) gen2("case %i:", field2.resolvedType.values[keys[j]]);
        gen2("break")("}");
      } else {
        gen2("{")("var e=types[%i].verify(%s);", fieldIndex, ref)("if(e)")("return%j+e", field2.name + ".")("}");
      }
    } else {
      switch (field2.type) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
          gen2("if(!util.isInteger(%s))", ref)("return%j", invalid(field2, "integer"));
          break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
          gen2("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)("return%j", invalid(field2, "integer|Long"));
          break;
        case "float":
        case "double":
          gen2('if(typeof %s!=="number")', ref)("return%j", invalid(field2, "number"));
          break;
        case "bool":
          gen2('if(typeof %s!=="boolean")', ref)("return%j", invalid(field2, "boolean"));
          break;
        case "string":
          gen2("if(!util.isString(%s))", ref)("return%j", invalid(field2, "string"));
          break;
        case "bytes":
          gen2('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', ref, ref, ref)("return%j", invalid(field2, "buffer"));
          break;
      }
    }
    return gen2;
  }
  function genVerifyKey(gen2, field2, ref) {
    switch (field2.keyType) {
      case "int32":
      case "uint32":
      case "sint32":
      case "fixed32":
      case "sfixed32":
        gen2("if(!util.key32Re.test(%s))", ref)("return%j", invalid(field2, "integer key"));
        break;
      case "int64":
      case "uint64":
      case "sint64":
      case "fixed64":
      case "sfixed64":
        gen2("if(!util.key64Re.test(%s))", ref)("return%j", invalid(field2, "integer|Long key"));
        break;
      case "bool":
        gen2("if(!util.key2Re.test(%s))", ref)("return%j", invalid(field2, "boolean key"));
        break;
    }
    return gen2;
  }
  function verifier(mtype) {
    var gen2 = util2.codegen(["m"], mtype.name + "$verify")('if(typeof m!=="object"||m===null)')("return%j", "object expected");
    var oneofs = mtype.oneofsArray, seenFirstField = {};
    if (oneofs.length) gen2("var p={}");
    for (var i = 0; i < /* initializes */
    mtype.fieldsArray.length; ++i) {
      var field2 = mtype._fieldsArray[i].resolve(), ref = "m" + util2.safeProp(field2.name);
      if (field2.optional) gen2("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field2.name);
      if (field2.map) {
        gen2("if(!util.isObject(%s))", ref)("return%j", invalid(field2, "object"))("var k=Object.keys(%s)", ref)("for(var i=0;i<k.length;++i){");
        genVerifyKey(gen2, field2, "k[i]");
        genVerifyValue(gen2, field2, i, ref + "[k[i]]")("}");
      } else if (field2.repeated) {
        gen2("if(!Array.isArray(%s))", ref)("return%j", invalid(field2, "array"))("for(var i=0;i<%s.length;++i){", ref);
        genVerifyValue(gen2, field2, i, ref + "[i]")("}");
      } else {
        if (field2.partOf) {
          var oneofProp = util2.safeProp(field2.partOf.name);
          if (seenFirstField[field2.partOf.name] === 1) gen2("if(p%s===1)", oneofProp)("return%j", field2.partOf.name + ": multiple values");
          seenFirstField[field2.partOf.name] = 1;
          gen2("p%s=1", oneofProp);
        }
        genVerifyValue(gen2, field2, i, ref);
      }
      if (field2.optional) gen2("}");
    }
    return gen2("return null");
  }
  return verifier_1;
}
var converter = {};
var hasRequiredConverter;
function requireConverter() {
  if (hasRequiredConverter) return converter;
  hasRequiredConverter = 1;
  (function(exports2) {
    var converter2 = exports2;
    var Enum = require_enum(), util2 = requireUtil();
    function genValuePartial_fromObject(gen2, field2, fieldIndex, prop) {
      var defaultAlreadyEmitted = false;
      if (field2.resolvedType) {
        if (field2.resolvedType instanceof Enum) {
          gen2("switch(d%s){", prop);
          for (var values = field2.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
            if (values[keys[i]] === field2.typeDefault && !defaultAlreadyEmitted) {
              gen2("default:")('if(typeof(d%s)==="number"){m%s=d%s;break}', prop, prop, prop);
              if (!field2.repeated) gen2("break");
              defaultAlreadyEmitted = true;
            }
            gen2("case%j:", keys[i])("case %i:", values[keys[i]])("m%s=%j", prop, values[keys[i]])("break");
          }
          gen2("}");
        } else gen2('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field2.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
      } else {
        var isUnsigned = false;
        switch (field2.type) {
          case "double":
          case "float":
            gen2("m%s=Number(d%s)", prop, prop);
            break;
          case "uint32":
          case "fixed32":
            gen2("m%s=d%s>>>0", prop, prop);
            break;
          case "int32":
          case "sint32":
          case "sfixed32":
            gen2("m%s=d%s|0", prop, prop);
            break;
          case "uint64":
            isUnsigned = true;
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen2("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)('else if(typeof d%s==="string")', prop)("m%s=parseInt(d%s,10)", prop, prop)('else if(typeof d%s==="number")', prop)("m%s=d%s", prop, prop)('else if(typeof d%s==="object")', prop)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
            break;
          case "bytes":
            gen2('if(typeof d%s==="string")', prop)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)("else if(d%s.length >= 0)", prop)("m%s=d%s", prop, prop);
            break;
          case "string":
            gen2("m%s=String(d%s)", prop, prop);
            break;
          case "bool":
            gen2("m%s=Boolean(d%s)", prop, prop);
            break;
        }
      }
      return gen2;
    }
    converter2.fromObject = function fromObject2(mtype) {
      var fields = mtype.fieldsArray;
      var gen2 = util2.codegen(["d"], mtype.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
      if (!fields.length) return gen2("return new this.ctor");
      gen2("var m=new this.ctor");
      for (var i = 0; i < fields.length; ++i) {
        var field2 = fields[i].resolve(), prop = util2.safeProp(field2.name);
        if (field2.map) {
          gen2("if(d%s){", prop)('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field2.fullName + ": object expected")("m%s={}", prop)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
          genValuePartial_fromObject(
            gen2,
            field2,
            /* not sorted */
            i,
            prop + "[ks[i]]"
          )("}")("}");
        } else if (field2.repeated) {
          gen2("if(d%s){", prop)("if(!Array.isArray(d%s))", prop)("throw TypeError(%j)", field2.fullName + ": array expected")("m%s=[]", prop)("for(var i=0;i<d%s.length;++i){", prop);
          genValuePartial_fromObject(
            gen2,
            field2,
            /* not sorted */
            i,
            prop + "[i]"
          )("}")("}");
        } else {
          if (!(field2.resolvedType instanceof Enum)) gen2("if(d%s!=null){", prop);
          genValuePartial_fromObject(
            gen2,
            field2,
            /* not sorted */
            i,
            prop
          );
          if (!(field2.resolvedType instanceof Enum)) gen2("}");
        }
      }
      return gen2("return m");
    };
    function genValuePartial_toObject(gen2, field2, fieldIndex, prop) {
      if (field2.resolvedType) {
        if (field2.resolvedType instanceof Enum) gen2("d%s=o.enums===String?(types[%i].values[m%s]===undefined?m%s:types[%i].values[m%s]):m%s", prop, fieldIndex, prop, prop, fieldIndex, prop, prop);
        else gen2("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
      } else {
        var isUnsigned = false;
        switch (field2.type) {
          case "double":
          case "float":
            gen2("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
            break;
          case "uint64":
            isUnsigned = true;
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen2('if(typeof m%s==="number")', prop)("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true" : "", prop);
            break;
          case "bytes":
            gen2("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
            break;
          default:
            gen2("d%s=m%s", prop, prop);
            break;
        }
      }
      return gen2;
    }
    converter2.toObject = function toObject2(mtype) {
      var fields = mtype.fieldsArray.slice().sort(util2.compareFieldsById);
      if (!fields.length)
        return util2.codegen()("return {}");
      var gen2 = util2.codegen(["m", "o"], mtype.name + "$toObject")("if(!o)")("o={}")("var d={}");
      var repeatedFields = [], mapFields = [], normalFields = [], i = 0;
      for (; i < fields.length; ++i)
        if (!fields[i].partOf)
          (fields[i].resolve().repeated ? repeatedFields : fields[i].map ? mapFields : normalFields).push(fields[i]);
      if (repeatedFields.length) {
        gen2("if(o.arrays||o.defaults){");
        for (i = 0; i < repeatedFields.length; ++i) gen2("d%s=[]", util2.safeProp(repeatedFields[i].name));
        gen2("}");
      }
      if (mapFields.length) {
        gen2("if(o.objects||o.defaults){");
        for (i = 0; i < mapFields.length; ++i) gen2("d%s={}", util2.safeProp(mapFields[i].name));
        gen2("}");
      }
      if (normalFields.length) {
        gen2("if(o.defaults){");
        for (i = 0; i < normalFields.length; ++i) {
          var field2 = normalFields[i], prop = util2.safeProp(field2.name);
          if (field2.resolvedType instanceof Enum) gen2("d%s=o.enums===String?%j:%j", prop, field2.resolvedType.valuesById[field2.typeDefault], field2.typeDefault);
          else if (field2.long) gen2("if(util.Long){")("var n=new util.Long(%i,%i,%j)", field2.typeDefault.low, field2.typeDefault.high, field2.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)("}else")("d%s=o.longs===String?%j:%i", prop, field2.typeDefault.toString(), field2.typeDefault.toNumber());
          else if (field2.bytes) {
            var arrayDefault = "[" + Array.prototype.slice.call(field2.typeDefault).join(",") + "]";
            gen2("if(o.bytes===String)d%s=%j", prop, String.fromCharCode.apply(String, field2.typeDefault))("else{")("d%s=%s", prop, arrayDefault)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)("}");
          } else gen2("d%s=%j", prop, field2.typeDefault);
        }
        gen2("}");
      }
      var hasKs2 = false;
      for (i = 0; i < fields.length; ++i) {
        var field2 = fields[i], index = mtype._fieldsArray.indexOf(field2), prop = util2.safeProp(field2.name);
        if (field2.map) {
          if (!hasKs2) {
            hasKs2 = true;
            gen2("var ks2");
          }
          gen2("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)("d%s={}", prop)("for(var j=0;j<ks2.length;++j){");
          genValuePartial_toObject(
            gen2,
            field2,
            /* sorted */
            index,
            prop + "[ks2[j]]"
          )("}");
        } else if (field2.repeated) {
          gen2("if(m%s&&m%s.length){", prop, prop)("d%s=[]", prop)("for(var j=0;j<m%s.length;++j){", prop);
          genValuePartial_toObject(
            gen2,
            field2,
            /* sorted */
            index,
            prop + "[j]"
          )("}");
        } else {
          gen2("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field2.name);
          genValuePartial_toObject(
            gen2,
            field2,
            /* sorted */
            index,
            prop
          );
          if (field2.partOf) gen2("if(o.oneofs)")("d%s=%j", util2.safeProp(field2.partOf.name), field2.name);
        }
        gen2("}");
      }
      return gen2("return d");
    };
  })(converter);
  return converter;
}
var wrappers = {};
(function(exports2) {
  var wrappers2 = exports2;
  var Message2 = message;
  wrappers2[".google.protobuf.Any"] = {
    fromObject: function(object2) {
      if (object2 && object2["@type"]) {
        var name = object2["@type"].substring(object2["@type"].lastIndexOf("/") + 1);
        var type2 = this.lookup(name);
        if (type2) {
          var type_url = object2["@type"].charAt(0) === "." ? object2["@type"].slice(1) : object2["@type"];
          if (type_url.indexOf("/") === -1) {
            type_url = "/" + type_url;
          }
          return this.create({
            type_url,
            value: type2.encode(type2.fromObject(object2)).finish()
          });
        }
      }
      return this.fromObject(object2);
    },
    toObject: function(message2, options) {
      var googleApi = "type.googleapis.com/";
      var prefix = "";
      var name = "";
      if (options && options.json && message2.type_url && message2.value) {
        name = message2.type_url.substring(message2.type_url.lastIndexOf("/") + 1);
        prefix = message2.type_url.substring(0, message2.type_url.lastIndexOf("/") + 1);
        var type2 = this.lookup(name);
        if (type2)
          message2 = type2.decode(message2.value);
      }
      if (!(message2 instanceof this.ctor) && message2 instanceof Message2) {
        var object2 = message2.$type.toObject(message2, options);
        var messageName = message2.$type.fullName[0] === "." ? message2.$type.fullName.slice(1) : message2.$type.fullName;
        if (prefix === "") {
          prefix = googleApi;
        }
        name = prefix + messageName;
        object2["@type"] = name;
        return object2;
      }
      return this.toObject(message2, options);
    }
  };
})(wrappers);
var type;
var hasRequiredType;
function requireType() {
  if (hasRequiredType) return type;
  hasRequiredType = 1;
  type = Type;
  var Namespace = requireNamespace();
  ((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";
  var Enum = require_enum(), OneOf = requireOneof(), Field = requireField(), MapField = requireMapfield(), Service2 = requireService(), Message2 = message, Reader2 = reader, Writer2 = writer, util2 = requireUtil(), encoder2 = requireEncoder(), decoder = requireDecoder(), verifier = requireVerifier(), converter2 = requireConverter(), wrappers$1 = wrappers;
  function Type(name, options) {
    Namespace.call(this, name, options);
    this.fields = {};
    this.oneofs = void 0;
    this.extensions = void 0;
    this.reserved = void 0;
    this.group = void 0;
    this._fieldsById = null;
    this._fieldsArray = null;
    this._oneofsArray = null;
    this._ctor = null;
  }
  Object.defineProperties(Type.prototype, {
    /**
     * Message fields by id.
     * @name Type#fieldsById
     * @type {Object.<number,Field>}
     * @readonly
     */
    fieldsById: {
      get: function() {
        if (this._fieldsById)
          return this._fieldsById;
        this._fieldsById = {};
        for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
          var field2 = this.fields[names[i]], id = field2.id;
          if (this._fieldsById[id])
            throw Error("duplicate id " + id + " in " + this);
          this._fieldsById[id] = field2;
        }
        return this._fieldsById;
      }
    },
    /**
     * Fields of this message as an array for iteration.
     * @name Type#fieldsArray
     * @type {Field[]}
     * @readonly
     */
    fieldsArray: {
      get: function() {
        return this._fieldsArray || (this._fieldsArray = util2.toArray(this.fields));
      }
    },
    /**
     * Oneofs of this message as an array for iteration.
     * @name Type#oneofsArray
     * @type {OneOf[]}
     * @readonly
     */
    oneofsArray: {
      get: function() {
        return this._oneofsArray || (this._oneofsArray = util2.toArray(this.oneofs));
      }
    },
    /**
     * The registered constructor, if any registered, otherwise a generic constructor.
     * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
     * @name Type#ctor
     * @type {Constructor<{}>}
     */
    ctor: {
      get: function() {
        return this._ctor || (this.ctor = Type.generateConstructor(this)());
      },
      set: function(ctor) {
        var prototype2 = ctor.prototype;
        if (!(prototype2 instanceof Message2)) {
          (ctor.prototype = new Message2()).constructor = ctor;
          util2.merge(ctor.prototype, prototype2);
        }
        ctor.$type = ctor.prototype.$type = this;
        util2.merge(ctor, Message2, true);
        this._ctor = ctor;
        var i = 0;
        for (; i < /* initializes */
        this.fieldsArray.length; ++i)
          this._fieldsArray[i].resolve();
        var ctorProperties = {};
        for (i = 0; i < /* initializes */
        this.oneofsArray.length; ++i)
          ctorProperties[this._oneofsArray[i].resolve().name] = {
            get: util2.oneOfGetter(this._oneofsArray[i].oneof),
            set: util2.oneOfSetter(this._oneofsArray[i].oneof)
          };
        if (i)
          Object.defineProperties(ctor.prototype, ctorProperties);
      }
    }
  });
  Type.generateConstructor = function generateConstructor(mtype) {
    var gen2 = util2.codegen(["p"], mtype.name);
    for (var i = 0, field2; i < mtype.fieldsArray.length; ++i)
      if ((field2 = mtype._fieldsArray[i]).map) gen2("this%s={}", util2.safeProp(field2.name));
      else if (field2.repeated) gen2("this%s=[]", util2.safeProp(field2.name));
    return gen2("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]");
  };
  function clearCache(type2) {
    type2._fieldsById = type2._fieldsArray = type2._oneofsArray = null;
    delete type2.encode;
    delete type2.decode;
    delete type2.verify;
    return type2;
  }
  Type.fromJSON = function fromJSON(name, json) {
    var type2 = new Type(name, json.options);
    type2.extensions = json.extensions;
    type2.reserved = json.reserved;
    var names = Object.keys(json.fields), i = 0;
    for (; i < names.length; ++i)
      type2.add(
        (typeof json.fields[names[i]].keyType !== "undefined" ? MapField.fromJSON : Field.fromJSON)(names[i], json.fields[names[i]])
      );
    if (json.oneofs)
      for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i)
        type2.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
    if (json.nested)
      for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
        var nested = json.nested[names[i]];
        type2.add(
          // most to least likely
          (nested.id !== void 0 ? Field.fromJSON : nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service2.fromJSON : Namespace.fromJSON)(names[i], nested)
        );
      }
    if (json.extensions && json.extensions.length)
      type2.extensions = json.extensions;
    if (json.reserved && json.reserved.length)
      type2.reserved = json.reserved;
    if (json.group)
      type2.group = true;
    if (json.comment)
      type2.comment = json.comment;
    if (json.edition)
      type2._edition = json.edition;
    type2._defaultEdition = "proto3";
    return type2;
  };
  Type.prototype.toJSON = function toJSON3(toJSONOptions) {
    var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util2.toObject([
      "edition",
      this._editionToJSON(),
      "options",
      inherited && inherited.options || void 0,
      "oneofs",
      Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
      "fields",
      Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) {
        return !obj.declaringField;
      }), toJSONOptions) || {},
      "extensions",
      this.extensions && this.extensions.length ? this.extensions : void 0,
      "reserved",
      this.reserved && this.reserved.length ? this.reserved : void 0,
      "group",
      this.group || void 0,
      "nested",
      inherited && inherited.nested || void 0,
      "comment",
      keepComments ? this.comment : void 0
    ]);
  };
  Type.prototype.resolveAll = function resolveAll() {
    if (!this._needsRecursiveResolve) return this;
    Namespace.prototype.resolveAll.call(this);
    var oneofs = this.oneofsArray;
    i = 0;
    while (i < oneofs.length)
      oneofs[i++].resolve();
    var fields = this.fieldsArray, i = 0;
    while (i < fields.length)
      fields[i++].resolve();
    return this;
  };
  Type.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
    if (!this._needsRecursiveFeatureResolution) return this;
    edition = this._edition || edition;
    Namespace.prototype._resolveFeaturesRecursive.call(this, edition);
    this.oneofsArray.forEach((oneof2) => {
      oneof2._resolveFeatures(edition);
    });
    this.fieldsArray.forEach((field2) => {
      field2._resolveFeatures(edition);
    });
    return this;
  };
  Type.prototype.get = function get(name) {
    return this.fields[name] || this.oneofs && this.oneofs[name] || this.nested && this.nested[name] || null;
  };
  Type.prototype.add = function add(object2) {
    if (this.get(object2.name))
      throw Error("duplicate name '" + object2.name + "' in " + this);
    if (object2 instanceof Field && object2.extend === void 0) {
      if (this._fieldsById ? (
        /* istanbul ignore next */
        this._fieldsById[object2.id]
      ) : this.fieldsById[object2.id])
        throw Error("duplicate id " + object2.id + " in " + this);
      if (this.isReservedId(object2.id))
        throw Error("id " + object2.id + " is reserved in " + this);
      if (this.isReservedName(object2.name))
        throw Error("name '" + object2.name + "' is reserved in " + this);
      if (object2.parent)
        object2.parent.remove(object2);
      this.fields[object2.name] = object2;
      object2.message = this;
      object2.onAdd(this);
      return clearCache(this);
    }
    if (object2 instanceof OneOf) {
      if (!this.oneofs)
        this.oneofs = {};
      this.oneofs[object2.name] = object2;
      object2.onAdd(this);
      return clearCache(this);
    }
    return Namespace.prototype.add.call(this, object2);
  };
  Type.prototype.remove = function remove(object2) {
    if (object2 instanceof Field && object2.extend === void 0) {
      if (!this.fields || this.fields[object2.name] !== object2)
        throw Error(object2 + " is not a member of " + this);
      delete this.fields[object2.name];
      object2.parent = null;
      object2.onRemove(this);
      return clearCache(this);
    }
    if (object2 instanceof OneOf) {
      if (!this.oneofs || this.oneofs[object2.name] !== object2)
        throw Error(object2 + " is not a member of " + this);
      delete this.oneofs[object2.name];
      object2.parent = null;
      object2.onRemove(this);
      return clearCache(this);
    }
    return Namespace.prototype.remove.call(this, object2);
  };
  Type.prototype.isReservedId = function isReservedId(id) {
    return Namespace.isReservedId(this.reserved, id);
  };
  Type.prototype.isReservedName = function isReservedName(name) {
    return Namespace.isReservedName(this.reserved, name);
  };
  Type.prototype.create = function create5(properties) {
    return new this.ctor(properties);
  };
  Type.prototype.setup = function setup() {
    var fullName = this.fullName, types2 = [];
    for (var i = 0; i < /* initializes */
    this.fieldsArray.length; ++i)
      types2.push(this._fieldsArray[i].resolve().resolvedType);
    this.encode = encoder2(this)({
      Writer: Writer2,
      types: types2,
      util: util2
    });
    this.decode = decoder(this)({
      Reader: Reader2,
      types: types2,
      util: util2
    });
    this.verify = verifier(this)({
      types: types2,
      util: util2
    });
    this.fromObject = converter2.fromObject(this)({
      types: types2,
      util: util2
    });
    this.toObject = converter2.toObject(this)({
      types: types2,
      util: util2
    });
    var wrapper = wrappers$1[fullName];
    if (wrapper) {
      var originalThis = Object.create(this);
      originalThis.fromObject = this.fromObject;
      this.fromObject = wrapper.fromObject.bind(originalThis);
      originalThis.toObject = this.toObject;
      this.toObject = wrapper.toObject.bind(originalThis);
    }
    return this;
  };
  Type.prototype.encode = function encode_setup(message2, writer2) {
    return this.setup().encode(message2, writer2);
  };
  Type.prototype.encodeDelimited = function encodeDelimited2(message2, writer2) {
    return this.encode(message2, writer2 && writer2.len ? writer2.fork() : writer2).ldelim();
  };
  Type.prototype.decode = function decode_setup(reader2, length) {
    return this.setup().decode(reader2, length);
  };
  Type.prototype.decodeDelimited = function decodeDelimited2(reader2) {
    if (!(reader2 instanceof Reader2))
      reader2 = Reader2.create(reader2);
    return this.decode(reader2, reader2.uint32());
  };
  Type.prototype.verify = function verify_setup(message2) {
    return this.setup().verify(message2);
  };
  Type.prototype.fromObject = function fromObject2(object2) {
    return this.setup().fromObject(object2);
  };
  Type.prototype.toObject = function toObject2(message2, options) {
    return this.setup().toObject(message2, options);
  };
  Type.d = function decorateType(typeName) {
    return function typeDecorator(target) {
      util2.decorateType(target, typeName);
    };
  };
  return type;
}
var root$1;
var hasRequiredRoot;
function requireRoot() {
  if (hasRequiredRoot) return root$1;
  hasRequiredRoot = 1;
  root$1 = Root;
  var Namespace = requireNamespace();
  ((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";
  var Field = requireField(), Enum = require_enum(), OneOf = requireOneof(), util2 = requireUtil();
  var Type, parse, common;
  function Root(options) {
    Namespace.call(this, "", options);
    this.deferred = [];
    this.files = [];
    this._edition = "proto2";
    this._fullyQualifiedObjects = {};
  }
  Root.fromJSON = function fromJSON(json, root2) {
    if (!root2)
      root2 = new Root();
    if (json.options)
      root2.setOptions(json.options);
    return root2.addJSON(json.nested).resolveAll();
  };
  Root.prototype.resolvePath = util2.path.resolve;
  Root.prototype.fetch = util2.fetch;
  function SYNC() {
  }
  Root.prototype.load = function load2(filename, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = void 0;
    }
    var self2 = this;
    if (!callback) {
      return util2.asPromise(load2, self2, filename, options);
    }
    var sync = callback === SYNC;
    function finish2(err, root2) {
      if (!callback) {
        return;
      }
      if (sync) {
        throw err;
      }
      if (root2) {
        root2.resolveAll();
      }
      var cb = callback;
      callback = null;
      cb(err, root2);
    }
    function getBundledFileName(filename2) {
      var idx = filename2.lastIndexOf("google/protobuf/");
      if (idx > -1) {
        var altname = filename2.substring(idx);
        if (altname in common) return altname;
      }
      return null;
    }
    function process2(filename2, source) {
      try {
        if (util2.isString(source) && source.charAt(0) === "{")
          source = JSON.parse(source);
        if (!util2.isString(source))
          self2.setOptions(source.options).addJSON(source.nested);
        else {
          parse.filename = filename2;
          var parsed = parse(source, self2, options), resolved2, i2 = 0;
          if (parsed.imports) {
            for (; i2 < parsed.imports.length; ++i2)
              if (resolved2 = getBundledFileName(parsed.imports[i2]) || self2.resolvePath(filename2, parsed.imports[i2]))
                fetch2(resolved2);
          }
          if (parsed.weakImports) {
            for (i2 = 0; i2 < parsed.weakImports.length; ++i2)
              if (resolved2 = getBundledFileName(parsed.weakImports[i2]) || self2.resolvePath(filename2, parsed.weakImports[i2]))
                fetch2(resolved2, true);
          }
        }
      } catch (err) {
        finish2(err);
      }
      if (!sync && !queued) {
        finish2(null, self2);
      }
    }
    function fetch2(filename2, weak) {
      filename2 = getBundledFileName(filename2) || filename2;
      if (self2.files.indexOf(filename2) > -1) {
        return;
      }
      self2.files.push(filename2);
      if (filename2 in common) {
        if (sync) {
          process2(filename2, common[filename2]);
        } else {
          ++queued;
          setTimeout(function() {
            --queued;
            process2(filename2, common[filename2]);
          });
        }
        return;
      }
      if (sync) {
        var source;
        try {
          source = util2.fs.readFileSync(filename2).toString("utf8");
        } catch (err) {
          if (!weak)
            finish2(err);
          return;
        }
        process2(filename2, source);
      } else {
        ++queued;
        self2.fetch(filename2, function(err, source2) {
          --queued;
          if (!callback) {
            return;
          }
          if (err) {
            if (!weak)
              finish2(err);
            else if (!queued)
              finish2(null, self2);
            return;
          }
          process2(filename2, source2);
        });
      }
    }
    var queued = 0;
    if (util2.isString(filename)) {
      filename = [filename];
    }
    for (var i = 0, resolved; i < filename.length; ++i)
      if (resolved = self2.resolvePath("", filename[i]))
        fetch2(resolved);
    if (sync) {
      self2.resolveAll();
      return self2;
    }
    if (!queued) {
      finish2(null, self2);
    }
    return self2;
  };
  Root.prototype.loadSync = function loadSync2(filename, options) {
    if (!util2.isNode)
      throw Error("not supported");
    return this.load(filename, options, SYNC);
  };
  Root.prototype.resolveAll = function resolveAll() {
    if (!this._needsRecursiveResolve) return this;
    if (this.deferred.length)
      throw Error("unresolvable extensions: " + this.deferred.map(function(field2) {
        return "'extend " + field2.extend + "' in " + field2.parent.fullName;
      }).join(", "));
    return Namespace.prototype.resolveAll.call(this);
  };
  var exposeRe = /^[A-Z]/;
  function tryHandleExtension(root2, field2) {
    var extendedType = field2.parent.lookup(field2.extend);
    if (extendedType) {
      var sisterField = new Field(field2.fullName, field2.id, field2.type, field2.rule, void 0, field2.options);
      if (extendedType.get(sisterField.name)) {
        return true;
      }
      sisterField.declaringField = field2;
      field2.extensionField = sisterField;
      extendedType.add(sisterField);
      return true;
    }
    return false;
  }
  Root.prototype._handleAdd = function _handleAdd(object2) {
    if (object2 instanceof Field) {
      if (
        /* an extension field (implies not part of a oneof) */
        object2.extend !== void 0 && /* not already handled */
        !object2.extensionField
      ) {
        if (!tryHandleExtension(this, object2))
          this.deferred.push(object2);
      }
    } else if (object2 instanceof Enum) {
      if (exposeRe.test(object2.name))
        object2.parent[object2.name] = object2.values;
    } else if (!(object2 instanceof OneOf)) {
      if (object2 instanceof Type)
        for (var i = 0; i < this.deferred.length; )
          if (tryHandleExtension(this, this.deferred[i]))
            this.deferred.splice(i, 1);
          else
            ++i;
      for (var j = 0; j < /* initializes */
      object2.nestedArray.length; ++j)
        this._handleAdd(object2._nestedArray[j]);
      if (exposeRe.test(object2.name))
        object2.parent[object2.name] = object2;
    }
    if (object2 instanceof Type || object2 instanceof Enum || object2 instanceof Field) {
      this._fullyQualifiedObjects[object2.fullName] = object2;
    }
  };
  Root.prototype._handleRemove = function _handleRemove(object2) {
    if (object2 instanceof Field) {
      if (
        /* an extension field */
        object2.extend !== void 0
      ) {
        if (
          /* already handled */
          object2.extensionField
        ) {
          object2.extensionField.parent.remove(object2.extensionField);
          object2.extensionField = null;
        } else {
          var index = this.deferred.indexOf(object2);
          if (index > -1)
            this.deferred.splice(index, 1);
        }
      }
    } else if (object2 instanceof Enum) {
      if (exposeRe.test(object2.name))
        delete object2.parent[object2.name];
    } else if (object2 instanceof Namespace) {
      for (var i = 0; i < /* initializes */
      object2.nestedArray.length; ++i)
        this._handleRemove(object2._nestedArray[i]);
      if (exposeRe.test(object2.name))
        delete object2.parent[object2.name];
    }
    delete this._fullyQualifiedObjects[object2.fullName];
  };
  Root._configure = function(Type_, parse_, common_) {
    Type = Type_;
    parse = parse_;
    common = common_;
  };
  return root$1;
}
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util$1.exports;
  hasRequiredUtil = 1;
  var util2 = util$1.exports = requireMinimal();
  var roots$1 = roots;
  var Type, Enum;
  util2.codegen = codegen_1;
  util2.fetch = fetch_1;
  util2.path = path;
  util2.fs = util2.inquire("fs");
  util2.toArray = function toArray2(object2) {
    if (object2) {
      var keys = Object.keys(object2), array = new Array(keys.length), index = 0;
      while (index < keys.length)
        array[index] = object2[keys[index++]];
      return array;
    }
    return [];
  };
  util2.toObject = function toObject2(array) {
    var object2 = {}, index = 0;
    while (index < array.length) {
      var key = array[index++], val = array[index++];
      if (val !== void 0)
        object2[key] = val;
    }
    return object2;
  };
  var safePropBackslashRe = /\\/g, safePropQuoteRe = /"/g;
  util2.isReserved = function isReserved(name) {
    return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name);
  };
  util2.safeProp = function safeProp(prop) {
    if (!/^[$\w_]+$/.test(prop) || util2.isReserved(prop))
      return '["' + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, '\\"') + '"]';
    return "." + prop;
  };
  util2.ucFirst = function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  };
  var camelCaseRe = /_([a-z])/g;
  util2.camelCase = function camelCase(str) {
    return str.substring(0, 1) + str.substring(1).replace(camelCaseRe, function($0, $1) {
      return $1.toUpperCase();
    });
  };
  util2.compareFieldsById = function compareFieldsById(a, b) {
    return a.id - b.id;
  };
  util2.decorateType = function decorateType(ctor, typeName) {
    if (ctor.$type) {
      if (typeName && ctor.$type.name !== typeName) {
        util2.decorateRoot.remove(ctor.$type);
        ctor.$type.name = typeName;
        util2.decorateRoot.add(ctor.$type);
      }
      return ctor.$type;
    }
    if (!Type)
      Type = requireType();
    var type2 = new Type(typeName || ctor.name);
    util2.decorateRoot.add(type2);
    type2.ctor = ctor;
    Object.defineProperty(ctor, "$type", { value: type2, enumerable: false });
    Object.defineProperty(ctor.prototype, "$type", { value: type2, enumerable: false });
    return type2;
  };
  var decorateEnumIndex = 0;
  util2.decorateEnum = function decorateEnum(object2) {
    if (object2.$type)
      return object2.$type;
    if (!Enum)
      Enum = require_enum();
    var enm = new Enum("Enum" + decorateEnumIndex++, object2);
    util2.decorateRoot.add(enm);
    Object.defineProperty(object2, "$type", { value: enm, enumerable: false });
    return enm;
  };
  util2.setProperty = function setProperty(dst, path2, value, ifNotSet) {
    function setProp(dst2, path3, value2) {
      var part = path3.shift();
      if (part === "__proto__" || part === "prototype") {
        return dst2;
      }
      if (path3.length > 0) {
        dst2[part] = setProp(dst2[part] || {}, path3, value2);
      } else {
        var prevValue = dst2[part];
        if (prevValue && ifNotSet)
          return dst2;
        if (prevValue)
          value2 = [].concat(prevValue).concat(value2);
        dst2[part] = value2;
      }
      return dst2;
    }
    if (typeof dst !== "object")
      throw TypeError("dst must be an object");
    if (!path2)
      throw TypeError("path must be specified");
    path2 = path2.split(".");
    return setProp(dst, path2, value);
  };
  Object.defineProperty(util2, "decorateRoot", {
    get: function() {
      return roots$1["decorated"] || (roots$1["decorated"] = new (requireRoot())());
    }
  });
  return util$1.exports;
}
var hasRequiredTypes;
function requireTypes() {
  if (hasRequiredTypes) return types;
  hasRequiredTypes = 1;
  (function(exports2) {
    var types2 = exports2;
    var util2 = requireUtil();
    var s = [
      "double",
      // 0
      "float",
      // 1
      "int32",
      // 2
      "uint32",
      // 3
      "sint32",
      // 4
      "fixed32",
      // 5
      "sfixed32",
      // 6
      "int64",
      // 7
      "uint64",
      // 8
      "sint64",
      // 9
      "fixed64",
      // 10
      "sfixed64",
      // 11
      "bool",
      // 12
      "string",
      // 13
      "bytes"
      // 14
    ];
    function bake(values, offset) {
      var i = 0, o = {};
      offset |= 0;
      while (i < values.length) o[s[i + offset]] = values[i++];
      return o;
    }
    types2.basic = bake([
      /* double   */
      1,
      /* float    */
      5,
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      5,
      /* sfixed32 */
      5,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1,
      /* bool     */
      0,
      /* string   */
      2,
      /* bytes    */
      2
    ]);
    types2.defaults = bake([
      /* double   */
      0,
      /* float    */
      0,
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      0,
      /* sfixed32 */
      0,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      0,
      /* sfixed64 */
      0,
      /* bool     */
      false,
      /* string   */
      "",
      /* bytes    */
      util2.emptyArray,
      /* message  */
      null
    ]);
    types2.long = bake([
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1
    ], 7);
    types2.mapKey = bake([
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      5,
      /* sfixed32 */
      5,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1,
      /* bool     */
      0,
      /* string   */
      2
    ], 2);
    types2.packed = bake([
      /* double   */
      1,
      /* float    */
      5,
      /* int32    */
      0,
      /* uint32   */
      0,
      /* sint32   */
      0,
      /* fixed32  */
      5,
      /* sfixed32 */
      5,
      /* int64    */
      0,
      /* uint64   */
      0,
      /* sint64   */
      0,
      /* fixed64  */
      1,
      /* sfixed64 */
      1,
      /* bool     */
      0
    ]);
  })(types);
  return types;
}
var field;
var hasRequiredField;
function requireField() {
  if (hasRequiredField) return field;
  hasRequiredField = 1;
  field = Field;
  var ReflectionObject = requireObject();
  ((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";
  var Enum = require_enum(), types2 = requireTypes(), util2 = requireUtil();
  var Type;
  var ruleRe = /^required|optional|repeated$/;
  Field.fromJSON = function fromJSON(name, json) {
    var field2 = new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
    if (json.edition)
      field2._edition = json.edition;
    field2._defaultEdition = "proto3";
    return field2;
  };
  function Field(name, id, type2, rule, extend2, options, comment) {
    if (util2.isObject(rule)) {
      comment = extend2;
      options = rule;
      rule = extend2 = void 0;
    } else if (util2.isObject(extend2)) {
      comment = options;
      options = extend2;
      extend2 = void 0;
    }
    ReflectionObject.call(this, name, options);
    if (!util2.isInteger(id) || id < 0)
      throw TypeError("id must be a non-negative integer");
    if (!util2.isString(type2))
      throw TypeError("type must be a string");
    if (rule !== void 0 && !ruleRe.test(rule = rule.toString().toLowerCase()))
      throw TypeError("rule must be a string rule");
    if (extend2 !== void 0 && !util2.isString(extend2))
      throw TypeError("extend must be a string");
    if (rule === "proto3_optional") {
      rule = "optional";
    }
    this.rule = rule && rule !== "optional" ? rule : void 0;
    this.type = type2;
    this.id = id;
    this.extend = extend2 || void 0;
    this.repeated = rule === "repeated";
    this.map = false;
    this.message = null;
    this.partOf = null;
    this.typeDefault = null;
    this.defaultValue = null;
    this.long = util2.Long ? types2.long[type2] !== void 0 : (
      /* istanbul ignore next */
      false
    );
    this.bytes = type2 === "bytes";
    this.resolvedType = null;
    this.extensionField = null;
    this.declaringField = null;
    this.comment = comment;
  }
  Object.defineProperty(Field.prototype, "required", {
    get: function() {
      return this._features.field_presence === "LEGACY_REQUIRED";
    }
  });
  Object.defineProperty(Field.prototype, "optional", {
    get: function() {
      return !this.required;
    }
  });
  Object.defineProperty(Field.prototype, "delimited", {
    get: function() {
      return this.resolvedType instanceof Type && this._features.message_encoding === "DELIMITED";
    }
  });
  Object.defineProperty(Field.prototype, "packed", {
    get: function() {
      return this._features.repeated_field_encoding === "PACKED";
    }
  });
  Object.defineProperty(Field.prototype, "hasPresence", {
    get: function() {
      if (this.repeated || this.map) {
        return false;
      }
      return this.partOf || // oneofs
      this.declaringField || this.extensionField || // extensions
      this._features.field_presence !== "IMPLICIT";
    }
  });
  Field.prototype.setOption = function setOption(name, value, ifNotSet) {
    return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
  };
  Field.prototype.toJSON = function toJSON3(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util2.toObject([
      "edition",
      this._editionToJSON(),
      "rule",
      this.rule !== "optional" && this.rule || void 0,
      "type",
      this.type,
      "id",
      this.id,
      "extend",
      this.extend,
      "options",
      this.options,
      "comment",
      keepComments ? this.comment : void 0
    ]);
  };
  Field.prototype.resolve = function resolve() {
    if (this.resolved)
      return this;
    if ((this.typeDefault = types2.defaults[this.type]) === void 0) {
      this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
      if (this.resolvedType instanceof Type)
        this.typeDefault = null;
      else
        this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]];
    } else if (this.options && this.options.proto3_optional) {
      this.typeDefault = null;
    }
    if (this.options && this.options["default"] != null) {
      this.typeDefault = this.options["default"];
      if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string")
        this.typeDefault = this.resolvedType.values[this.typeDefault];
    }
    if (this.options) {
      if (this.options.packed !== void 0 && this.resolvedType && !(this.resolvedType instanceof Enum))
        delete this.options.packed;
      if (!Object.keys(this.options).length)
        this.options = void 0;
    }
    if (this.long) {
      this.typeDefault = util2.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");
      if (Object.freeze)
        Object.freeze(this.typeDefault);
    } else if (this.bytes && typeof this.typeDefault === "string") {
      var buf;
      if (util2.base64.test(this.typeDefault))
        util2.base64.decode(this.typeDefault, buf = util2.newBuffer(util2.base64.length(this.typeDefault)), 0);
      else
        util2.utf8.write(this.typeDefault, buf = util2.newBuffer(util2.utf8.length(this.typeDefault)), 0);
      this.typeDefault = buf;
    }
    if (this.map)
      this.defaultValue = util2.emptyObject;
    else if (this.repeated)
      this.defaultValue = util2.emptyArray;
    else
      this.defaultValue = this.typeDefault;
    if (this.parent instanceof Type)
      this.parent.ctor.prototype[this.name] = this.defaultValue;
    return ReflectionObject.prototype.resolve.call(this);
  };
  Field.prototype._inferLegacyProtoFeatures = function _inferLegacyProtoFeatures(edition) {
    if (edition !== "proto2" && edition !== "proto3") {
      return {};
    }
    var features = {};
    if (this.rule === "required") {
      features.field_presence = "LEGACY_REQUIRED";
    }
    if (this.parent && types2.defaults[this.type] === void 0) {
      var type2 = this.parent.get(this.type.split(".").pop());
      if (type2 && type2 instanceof Type && type2.group) {
        features.message_encoding = "DELIMITED";
      }
    }
    if (this.getOption("packed") === true) {
      features.repeated_field_encoding = "PACKED";
    } else if (this.getOption("packed") === false) {
      features.repeated_field_encoding = "EXPANDED";
    }
    return features;
  };
  Field.prototype._resolveFeatures = function _resolveFeatures(edition) {
    return ReflectionObject.prototype._resolveFeatures.call(this, this._edition || edition);
  };
  Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {
    if (typeof fieldType === "function")
      fieldType = util2.decorateType(fieldType).name;
    else if (fieldType && typeof fieldType === "object")
      fieldType = util2.decorateEnum(fieldType).name;
    return function fieldDecorator(prototype2, fieldName) {
      util2.decorateType(prototype2.constructor).add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
    };
  };
  Field._configure = function configure(Type_) {
    Type = Type_;
  };
  return field;
}
var oneof;
var hasRequiredOneof;
function requireOneof() {
  if (hasRequiredOneof) return oneof;
  hasRequiredOneof = 1;
  oneof = OneOf;
  var ReflectionObject = requireObject();
  ((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";
  var Field = requireField(), util2 = requireUtil();
  function OneOf(name, fieldNames, options, comment) {
    if (!Array.isArray(fieldNames)) {
      options = fieldNames;
      fieldNames = void 0;
    }
    ReflectionObject.call(this, name, options);
    if (!(fieldNames === void 0 || Array.isArray(fieldNames)))
      throw TypeError("fieldNames must be an Array");
    this.oneof = fieldNames || [];
    this.fieldsArray = [];
    this.comment = comment;
  }
  OneOf.fromJSON = function fromJSON(name, json) {
    return new OneOf(name, json.oneof, json.options, json.comment);
  };
  OneOf.prototype.toJSON = function toJSON3(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util2.toObject([
      "options",
      this.options,
      "oneof",
      this.oneof,
      "comment",
      keepComments ? this.comment : void 0
    ]);
  };
  function addFieldsToParent(oneof2) {
    if (oneof2.parent) {
      for (var i = 0; i < oneof2.fieldsArray.length; ++i)
        if (!oneof2.fieldsArray[i].parent)
          oneof2.parent.add(oneof2.fieldsArray[i]);
    }
  }
  OneOf.prototype.add = function add(field2) {
    if (!(field2 instanceof Field))
      throw TypeError("field must be a Field");
    if (field2.parent && field2.parent !== this.parent)
      field2.parent.remove(field2);
    this.oneof.push(field2.name);
    this.fieldsArray.push(field2);
    field2.partOf = this;
    addFieldsToParent(this);
    return this;
  };
  OneOf.prototype.remove = function remove(field2) {
    if (!(field2 instanceof Field))
      throw TypeError("field must be a Field");
    var index = this.fieldsArray.indexOf(field2);
    if (index < 0)
      throw Error(field2 + " is not a member of " + this);
    this.fieldsArray.splice(index, 1);
    index = this.oneof.indexOf(field2.name);
    if (index > -1)
      this.oneof.splice(index, 1);
    field2.partOf = null;
    return this;
  };
  OneOf.prototype.onAdd = function onAdd(parent) {
    ReflectionObject.prototype.onAdd.call(this, parent);
    var self2 = this;
    for (var i = 0; i < this.oneof.length; ++i) {
      var field2 = parent.get(this.oneof[i]);
      if (field2 && !field2.partOf) {
        field2.partOf = self2;
        self2.fieldsArray.push(field2);
      }
    }
    addFieldsToParent(this);
  };
  OneOf.prototype.onRemove = function onRemove(parent) {
    for (var i = 0, field2; i < this.fieldsArray.length; ++i)
      if ((field2 = this.fieldsArray[i]).parent)
        field2.parent.remove(field2);
    ReflectionObject.prototype.onRemove.call(this, parent);
  };
  Object.defineProperty(OneOf.prototype, "isProto3Optional", {
    get: function() {
      if (this.fieldsArray == null || this.fieldsArray.length !== 1) {
        return false;
      }
      var field2 = this.fieldsArray[0];
      return field2.options != null && field2.options["proto3_optional"] === true;
    }
  });
  OneOf.d = function decorateOneOf() {
    var fieldNames = new Array(arguments.length), index = 0;
    while (index < arguments.length)
      fieldNames[index] = arguments[index++];
    return function oneOfDecorator(prototype2, oneofName) {
      util2.decorateType(prototype2.constructor).add(new OneOf(oneofName, fieldNames));
      Object.defineProperty(prototype2, oneofName, {
        get: util2.oneOfGetter(fieldNames),
        set: util2.oneOfSetter(fieldNames)
      });
    };
  };
  return oneof;
}
var object;
var hasRequiredObject;
function requireObject() {
  if (hasRequiredObject) return object;
  hasRequiredObject = 1;
  object = ReflectionObject;
  ReflectionObject.className = "ReflectionObject";
  const OneOf = requireOneof();
  var util2 = requireUtil();
  var Root;
  var editions2023Defaults = { enum_type: "OPEN", field_presence: "EXPLICIT", json_format: "ALLOW", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "PACKED", utf8_validation: "VERIFY" };
  var proto2Defaults = { enum_type: "CLOSED", field_presence: "EXPLICIT", json_format: "LEGACY_BEST_EFFORT", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "EXPANDED", utf8_validation: "NONE" };
  var proto3Defaults = { enum_type: "OPEN", field_presence: "IMPLICIT", json_format: "ALLOW", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "PACKED", utf8_validation: "VERIFY" };
  function ReflectionObject(name, options) {
    if (!util2.isString(name))
      throw TypeError("name must be a string");
    if (options && !util2.isObject(options))
      throw TypeError("options must be an object");
    this.options = options;
    this.parsedOptions = null;
    this.name = name;
    this._edition = null;
    this._defaultEdition = "proto2";
    this._features = {};
    this._featuresResolved = false;
    this.parent = null;
    this.resolved = false;
    this.comment = null;
    this.filename = null;
  }
  Object.defineProperties(ReflectionObject.prototype, {
    /**
     * Reference to the root namespace.
     * @name ReflectionObject#root
     * @type {Root}
     * @readonly
     */
    root: {
      get: function() {
        var ptr = this;
        while (ptr.parent !== null)
          ptr = ptr.parent;
        return ptr;
      }
    },
    /**
     * Full name including leading dot.
     * @name ReflectionObject#fullName
     * @type {string}
     * @readonly
     */
    fullName: {
      get: function() {
        var path2 = [this.name], ptr = this.parent;
        while (ptr) {
          path2.unshift(ptr.name);
          ptr = ptr.parent;
        }
        return path2.join(".");
      }
    }
  });
  ReflectionObject.prototype.toJSON = /* istanbul ignore next */
  function toJSON3() {
    throw Error();
  };
  ReflectionObject.prototype.onAdd = function onAdd(parent) {
    if (this.parent && this.parent !== parent)
      this.parent.remove(this);
    this.parent = parent;
    this.resolved = false;
    var root2 = parent.root;
    if (root2 instanceof Root)
      root2._handleAdd(this);
  };
  ReflectionObject.prototype.onRemove = function onRemove(parent) {
    var root2 = parent.root;
    if (root2 instanceof Root)
      root2._handleRemove(this);
    this.parent = null;
    this.resolved = false;
  };
  ReflectionObject.prototype.resolve = function resolve() {
    if (this.resolved)
      return this;
    if (this.root instanceof Root)
      this.resolved = true;
    return this;
  };
  ReflectionObject.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
    return this._resolveFeatures(this._edition || edition);
  };
  ReflectionObject.prototype._resolveFeatures = function _resolveFeatures(edition) {
    if (this._featuresResolved) {
      return;
    }
    var defaults2 = {};
    if (!edition) {
      throw new Error("Unknown edition for " + this.fullName);
    }
    var protoFeatures = Object.assign(
      this.options ? Object.assign({}, this.options.features) : {},
      this._inferLegacyProtoFeatures(edition)
    );
    if (this._edition) {
      if (edition === "proto2") {
        defaults2 = Object.assign({}, proto2Defaults);
      } else if (edition === "proto3") {
        defaults2 = Object.assign({}, proto3Defaults);
      } else if (edition === "2023") {
        defaults2 = Object.assign({}, editions2023Defaults);
      } else {
        throw new Error("Unknown edition: " + edition);
      }
      this._features = Object.assign(defaults2, protoFeatures || {});
      this._featuresResolved = true;
      return;
    }
    if (this.partOf instanceof OneOf) {
      var lexicalParentFeaturesCopy = Object.assign({}, this.partOf._features);
      this._features = Object.assign(lexicalParentFeaturesCopy, protoFeatures || {});
    } else if (this.declaringField) ;
    else if (this.parent) {
      var parentFeaturesCopy = Object.assign({}, this.parent._features);
      this._features = Object.assign(parentFeaturesCopy, protoFeatures || {});
    } else {
      throw new Error("Unable to find a parent for " + this.fullName);
    }
    if (this.extensionField) {
      this.extensionField._features = this._features;
    }
    this._featuresResolved = true;
  };
  ReflectionObject.prototype._inferLegacyProtoFeatures = function _inferLegacyProtoFeatures() {
    return {};
  };
  ReflectionObject.prototype.getOption = function getOption(name) {
    if (this.options)
      return this.options[name];
    return void 0;
  };
  ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
    if (!this.options)
      this.options = {};
    if (/^features\./.test(name)) {
      util2.setProperty(this.options, name, value, ifNotSet);
    } else if (!ifNotSet || this.options[name] === void 0) {
      if (this.getOption(name) !== value) this.resolved = false;
      this.options[name] = value;
    }
    return this;
  };
  ReflectionObject.prototype.setParsedOption = function setParsedOption(name, value, propName) {
    if (!this.parsedOptions) {
      this.parsedOptions = [];
    }
    var parsedOptions = this.parsedOptions;
    if (propName) {
      var opt = parsedOptions.find(function(opt2) {
        return Object.prototype.hasOwnProperty.call(opt2, name);
      });
      if (opt) {
        var newValue = opt[name];
        util2.setProperty(newValue, propName, value);
      } else {
        opt = {};
        opt[name] = util2.setProperty({}, propName, value);
        parsedOptions.push(opt);
      }
    } else {
      var newOpt = {};
      newOpt[name] = value;
      parsedOptions.push(newOpt);
    }
    return this;
  };
  ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
    if (options)
      for (var keys = Object.keys(options), i = 0; i < keys.length; ++i)
        this.setOption(keys[i], options[keys[i]], ifNotSet);
    return this;
  };
  ReflectionObject.prototype.toString = function toString3() {
    var className = this.constructor.className, fullName = this.fullName;
    if (fullName.length)
      return className + " " + fullName;
    return className;
  };
  ReflectionObject.prototype._editionToJSON = function _editionToJSON() {
    if (!this._edition || this._edition === "proto3") {
      return void 0;
    }
    return this._edition;
  };
  ReflectionObject._configure = function(Root_) {
    Root = Root_;
  };
  return object;
}
var _enum;
var hasRequired_enum;
function require_enum() {
  if (hasRequired_enum) return _enum;
  hasRequired_enum = 1;
  _enum = Enum;
  var ReflectionObject = requireObject();
  ((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";
  var Namespace = requireNamespace(), util2 = requireUtil();
  function Enum(name, values, options, comment, comments, valuesOptions) {
    ReflectionObject.call(this, name, options);
    if (values && typeof values !== "object")
      throw TypeError("values must be an object");
    this.valuesById = {};
    this.values = Object.create(this.valuesById);
    this.comment = comment;
    this.comments = comments || {};
    this.valuesOptions = valuesOptions;
    this._valuesFeatures = {};
    this.reserved = void 0;
    if (values) {
      for (var keys = Object.keys(values), i = 0; i < keys.length; ++i)
        if (typeof values[keys[i]] === "number")
          this.valuesById[this.values[keys[i]] = values[keys[i]]] = keys[i];
    }
  }
  Enum.prototype._resolveFeatures = function _resolveFeatures(edition) {
    edition = this._edition || edition;
    ReflectionObject.prototype._resolveFeatures.call(this, edition);
    Object.keys(this.values).forEach((key) => {
      var parentFeaturesCopy = Object.assign({}, this._features);
      this._valuesFeatures[key] = Object.assign(parentFeaturesCopy, this.valuesOptions && this.valuesOptions[key] && this.valuesOptions[key].features);
    });
    return this;
  };
  Enum.fromJSON = function fromJSON(name, json) {
    var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
    enm.reserved = json.reserved;
    if (json.edition)
      enm._edition = json.edition;
    enm._defaultEdition = "proto3";
    return enm;
  };
  Enum.prototype.toJSON = function toJSON3(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util2.toObject([
      "edition",
      this._editionToJSON(),
      "options",
      this.options,
      "valuesOptions",
      this.valuesOptions,
      "values",
      this.values,
      "reserved",
      this.reserved && this.reserved.length ? this.reserved : void 0,
      "comment",
      keepComments ? this.comment : void 0,
      "comments",
      keepComments ? this.comments : void 0
    ]);
  };
  Enum.prototype.add = function add(name, id, comment, options) {
    if (!util2.isString(name))
      throw TypeError("name must be a string");
    if (!util2.isInteger(id))
      throw TypeError("id must be an integer");
    if (this.values[name] !== void 0)
      throw Error("duplicate name '" + name + "' in " + this);
    if (this.isReservedId(id))
      throw Error("id " + id + " is reserved in " + this);
    if (this.isReservedName(name))
      throw Error("name '" + name + "' is reserved in " + this);
    if (this.valuesById[id] !== void 0) {
      if (!(this.options && this.options.allow_alias))
        throw Error("duplicate id " + id + " in " + this);
      this.values[name] = id;
    } else
      this.valuesById[this.values[name] = id] = name;
    if (options) {
      if (this.valuesOptions === void 0)
        this.valuesOptions = {};
      this.valuesOptions[name] = options || null;
    }
    this.comments[name] = comment || null;
    return this;
  };
  Enum.prototype.remove = function remove(name) {
    if (!util2.isString(name))
      throw TypeError("name must be a string");
    var val = this.values[name];
    if (val == null)
      throw Error("name '" + name + "' does not exist in " + this);
    delete this.valuesById[val];
    delete this.values[name];
    delete this.comments[name];
    if (this.valuesOptions)
      delete this.valuesOptions[name];
    return this;
  };
  Enum.prototype.isReservedId = function isReservedId(id) {
    return Namespace.isReservedId(this.reserved, id);
  };
  Enum.prototype.isReservedName = function isReservedName(name) {
    return Namespace.isReservedName(this.reserved, name);
  };
  return _enum;
}
var encoder_1;
var hasRequiredEncoder;
function requireEncoder() {
  if (hasRequiredEncoder) return encoder_1;
  hasRequiredEncoder = 1;
  encoder_1 = encoder2;
  var Enum = require_enum(), types2 = requireTypes(), util2 = requireUtil();
  function genTypePartial(gen2, field2, fieldIndex, ref) {
    return field2.delimited ? gen2("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field2.id << 3 | 3) >>> 0, (field2.id << 3 | 4) >>> 0) : gen2("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field2.id << 3 | 2) >>> 0);
  }
  function encoder2(mtype) {
    var gen2 = util2.codegen(["m", "w"], mtype.name + "$encode")("if(!w)")("w=Writer.create()");
    var i, ref;
    var fields = (
      /* initializes */
      mtype.fieldsArray.slice().sort(util2.compareFieldsById)
    );
    for (var i = 0; i < fields.length; ++i) {
      var field2 = fields[i].resolve(), index = mtype._fieldsArray.indexOf(field2), type2 = field2.resolvedType instanceof Enum ? "int32" : field2.type, wireType = types2.basic[type2];
      ref = "m" + util2.safeProp(field2.name);
      if (field2.map) {
        gen2("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", ref, field2.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field2.id << 3 | 2) >>> 0, 8 | types2.mapKey[field2.keyType], field2.keyType);
        if (wireType === void 0) gen2("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref);
        else gen2(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type2, ref);
        gen2("}")("}");
      } else if (field2.repeated) {
        gen2("if(%s!=null&&%s.length){", ref, ref);
        if (field2.packed && types2.packed[type2] !== void 0) {
          gen2("w.uint32(%i).fork()", (field2.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", ref)("w.%s(%s[i])", type2, ref)("w.ldelim()");
        } else {
          gen2("for(var i=0;i<%s.length;++i)", ref);
          if (wireType === void 0)
            genTypePartial(gen2, field2, index, ref + "[i]");
          else gen2("w.uint32(%i).%s(%s[i])", (field2.id << 3 | wireType) >>> 0, type2, ref);
        }
        gen2("}");
      } else {
        if (field2.optional) gen2("if(%s!=null&&Object.hasOwnProperty.call(m,%j))", ref, field2.name);
        if (wireType === void 0)
          genTypePartial(gen2, field2, index, ref);
        else gen2("w.uint32(%i).%s(%s)", (field2.id << 3 | wireType) >>> 0, type2, ref);
      }
    }
    return gen2("return w");
  }
  return encoder_1;
}
var protobuf$1 = indexLight.exports = indexMinimal;
protobuf$1.build = "light";
function load(filename, root2, callback) {
  if (typeof root2 === "function") {
    callback = root2;
    root2 = new protobuf$1.Root();
  } else if (!root2)
    root2 = new protobuf$1.Root();
  return root2.load(filename, callback);
}
protobuf$1.load = load;
function loadSync(filename, root2) {
  if (!root2)
    root2 = new protobuf$1.Root();
  return root2.loadSync(filename);
}
protobuf$1.loadSync = loadSync;
protobuf$1.encoder = requireEncoder();
protobuf$1.decoder = requireDecoder();
protobuf$1.verifier = requireVerifier();
protobuf$1.converter = requireConverter();
protobuf$1.ReflectionObject = requireObject();
protobuf$1.Namespace = requireNamespace();
protobuf$1.Root = requireRoot();
protobuf$1.Enum = require_enum();
protobuf$1.Type = requireType();
protobuf$1.Field = requireField();
protobuf$1.OneOf = requireOneof();
protobuf$1.MapField = requireMapfield();
protobuf$1.Service = requireService();
protobuf$1.Method = requireMethod();
protobuf$1.Message = message;
protobuf$1.wrappers = wrappers;
protobuf$1.types = requireTypes();
protobuf$1.util = requireUtil();
protobuf$1.ReflectionObject._configure(protobuf$1.Root);
protobuf$1.Namespace._configure(protobuf$1.Type, protobuf$1.Service, protobuf$1.Enum);
protobuf$1.Root._configure(protobuf$1.Type);
protobuf$1.Field._configure(protobuf$1.Type);
var indexLightExports = indexLight.exports;
var light = indexLightExports;
const protobuf = /* @__PURE__ */ getDefaultExportFromCjs(light);
const rootJson = {
  nested: {
    rollup: {
      nested: {
        v1: {
          nested: {
            TransactionRequest: {
              fields: {
                chain_id: { type: "bytes", id: 1 },
                transaction: { rule: "repeated", type: "bytes", id: 2 }
              }
            },
            XTRequest: {
              fields: {
                transactions: {
                  rule: "repeated",
                  type: "TransactionRequest",
                  id: 1
                }
              }
            },
            Message: {
              fields: {
                sender_id: { type: "string", id: 1 },
                xt_request: { type: "XTRequest", id: 2 }
              },
              oneofs: {
                payload: { oneof: ["xt_request"] }
              }
            }
          }
        }
      }
    }
  }
};
const root = protobuf.Root.fromJSON(rootJson);
const Message = root.lookupType("rollup.v1.Message");
const XTRequest = root.lookupType("rollup.v1.XTRequest");
const TransactionRequest = root.lookupType("rollup.v1.TransactionRequest");
function encodeXtMessage(params) {
  const txs = params.entries.map(({ chainId, rawTx }) => {
    const chainBytes = toBigEndianBytes(chainId);
    const txBytes = viem.hexToBytes(rawTx);
    return TransactionRequest.create({
      chain_id: chainBytes,
      transaction: [txBytes]
    });
  });
  const xt = XTRequest.create({ transactions: txs });
  const msg = Message.create({
    sender_id: params.senderId ?? "client",
    xt_request: xt
  });
  console.log("msg:", msg);
  const bytes = Message.encode(msg).finish();
  return "0x" + bytesToHex(bytes);
}
function toBigEndianBytes(id) {
  let v = BigInt(id);
  if (v === 0n) return new Uint8Array([0]);
  const out = [];
  while (v > 0n) {
    out.push(Number(v & 0xffn));
    v >>= 8n;
  }
  out.reverse();
  return Uint8Array.from(out);
}
function bytesToHex(u8) {
  const hex = new Array(u8.length);
  for (let i = 0; i < u8.length; i++) {
    const h = u8[i].toString(16).padStart(2, "0");
    hex[i] = h;
  }
  return hex.join("");
}
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type2) => {
  type2 = type2.toLowerCase();
  return (thing) => kindOf(thing) === type2;
};
const typeOfTest = (type2) => (thing) => typeof thing === type2;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction$1 = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    return false;
  }
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction$1(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction$1(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless, skipUndefined } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction$1(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction$1(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction$1(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction$1(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
function AxiosError$1(message2, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message2;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON2() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  const msg = error && error.message ? error.message : "Error";
  const errCode = code == null && error ? error.code : code;
  AxiosError$1.call(axiosError, msg, errCode, config, request, response);
  if (error && axiosError.cause == null) {
    Object.defineProperty(axiosError, "cause", { value: error, configurable: true });
  }
  axiosError.name = error && error.name || "Error";
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path2, key, dots) {
  if (!path2) return key;
  return path2.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path2) {
    let arr = value;
    if (value && !path2 && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path2, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path2) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path2.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path2,
        exposedHelpers
      );
      if (result === true) {
        build(el, path2 ? path2.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder2) {
  const _encode = encoder2 ? function(value) {
    return encoder2.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path2, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path2, value, target, index) {
    let name = path2[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path2.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path2, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder2) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder2 || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data);
    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$1.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data, this.parseReviver);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method2) => {
  defaults.headers[method2] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders2 {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message2, config, request) {
  AxiosError$1.call(this, message2 == null ? "canceled" : message2, AxiosError$1.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push2(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path2, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path2) && cookie.push("path=" + path2);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig$1({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if (utils$1.isFunction(data.getHeaders)) {
      const formHeaders = data.getHeaders();
      const allowedHeaders = ["content-type", "content-length"];
      Object.entries(formHeaders).forEach(([key, val]) => {
        if (allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, val);
        }
      });
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError(event) {
      const msg = event && event.message ? event.message : "Network Error";
      const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request);
      err.event = event || null;
      reject(err);
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end2;
  while (pos < len) {
    end2 = pos + chunkSize;
    yield chunk.slice(pos, end2);
    pos = end2;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader2 = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader2.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader2.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const { isFunction } = utils$1;
const globalFetchAPI = (({ Request, Response }) => ({
  Request,
  Response
}))(utils$1.global);
const {
  ReadableStream: ReadableStream$1,
  TextEncoder: TextEncoder$1
} = utils$1.global;
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const factory = (env) => {
  env = utils$1.merge.call({
    skipUndefined: true
  }, globalFetchAPI, env);
  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);
  if (!isFetchSupported) {
    return false;
  }
  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream$1);
  const encodeText = isFetchSupported && (typeof TextEncoder$1 === "function" ? /* @__PURE__ */ ((encoder2) => (str) => encoder2.encode(str))(new TextEncoder$1()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream$1(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  });
  const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && (() => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type2) => {
      !resolvers[type2] && (resolvers[type2] = (res, config) => {
        let method2 = res && res[type2];
        if (method2) {
          return method2.call(res);
        }
        throw new AxiosError$1(`Response type '${type2}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
      });
    });
  })();
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  return async (config) => {
    let {
      url,
      method: method2,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig(config);
    let _fetch = envFetch || fetch;
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
    let request = null;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method2 !== "get" && method2 !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method2.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      };
      request = isRequestSupported && new Request(url, resolvedOptions);
      let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError$1.from(err, err && err.code, config, request);
    }
  };
};
const seedCache = /* @__PURE__ */ new Map();
const getFetch = (config) => {
  let env = config ? config.env : {};
  const { fetch: fetch2, Request, Response } = env;
  const seeds = [
    Request,
    Response,
    fetch2
  ];
  let len = seeds.length, i = len, seed, target, map = seedCache;
  while (i--) {
    seed = seeds[i];
    target = map.get(seed);
    target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
    map = target;
  }
  return target;
};
getFetch();
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: {
    get: getFetch
  }
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2, config) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError$1(`Unknown adapter '${id}'`);
        }
      }
      if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION$1 = "1.12.2";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type2, i) => {
  validators$1[type2] = function validator2(thing) {
    return typeof thing === type2 || "a" + (i < 1 ? "n " : " ") + type2;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version2, message2) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message2 ? ". " + message2 : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version2 && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version2 + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios2 {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method2) => {
        delete headers[method2];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method2) {
  Axios$1.prototype[method2] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method: method2,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method2) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig$1(config || {}, {
        method: method2,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios$1.prototype[method2] = generateHTTPMethod();
  Axios$1.prototype[method2 + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken2 {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message2, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message2, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken2(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create5(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all2(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken,
  VERSION,
  all,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios;
const api = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "web-app-source": true
  }
});
api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
const hexify = (n) => n ? viem.numberToHex(n) : void 0;
const getPaymasterDataForChain = async ({
  params,
  method: method2,
  getPaymasterEndpoint
}) => {
  ({
    callData: params.callData,
    initCode: params.initCode,
    callGasLimit: hexify(params.callGasLimit),
    factory: params.factory,
    factoryData: params.factoryData,
    maxFeePerGas: hexify(params.maxFeePerGas || 0),
    maxPriorityFeePerGas: hexify(params.maxPriorityFeePerGas || 0),
    nonce: hexify(params.nonce),
    sender: params.sender,
    preVerificationGas: hexify(params.preVerificationGas || 0),
    verificationGasLimit: hexify(params.verificationGasLimit || 0),
    paymasterPostOpGasLimit: hexify(params.paymasterPostOpGasLimit || 0),
    paymasterVerificationGasLimit: hexify(params.paymasterVerificationGasLimit || 0)
  });
  {
    throw new Error("VITE_PAYMASTER_URL is not set - Paymaster Service URL - set it in .env to support paymaster");
  }
};
const FALLBACK_CALL_GAS_LIMIT = 900000n;
const MIN_VERIFICATION_GAS_LIMIT = 1200000n;
const PRE_VERIFICATION_GAS = 90000n;
const withMargin = (value, marginPct = 25n) => value + value * marginPct / 100n;
const createUserOp = async (config, account, calls) => {
  const chainId = account.client.chain.id;
  const publicClient = config.getPublicClient(chainId);
  if (!publicClient) {
    throw new Error(`Public client not found for chain ${chainId}`);
  }
  account.client.chain?.id;
  const callGasEstimates = await Promise.all(
    calls.map(
      (call) => publicClient.estimateGas({
        account,
        to: call.to,
        data: call.data,
        value: call.value
      }).then(withMargin).catch((error) => {
        console.warn(
          `Gas estimation failed for call to ${call.to}, falling back`,
          "message" in error ? error.message : "Unknown error"
        );
        return FALLBACK_CALL_GAS_LIMIT;
      })
    )
  );
  const callGasLimit = callGasEstimates.reduce((acc, gas) => acc + gas, 0n);
  const verificationGasLimit = callGasLimit + PRE_VERIFICATION_GAS > MIN_VERIFICATION_GAS_LIMIT ? callGasLimit + PRE_VERIFICATION_GAS : MIN_VERIFICATION_GAS_LIMIT;
  const gasEstimate = await publicClient.estimateFeesPerGas();
  const paymaster = config.hasPaymaster ? {
    getPaymasterData: (parameters) => {
      return getPaymasterDataForChain({
        params: parameters,
        method: "pm_sponsorUserOperation",
        getPaymasterEndpoint: config.getPaymasterEndpoint
      });
    },
    getPaymasterStubData: (parameters) => {
      return getPaymasterDataForChain({
        params: parameters,
        method: "pm_getPaymasterStubData",
        getPaymasterEndpoint: config.getPaymasterEndpoint
      });
    }
  } : void 0;
  const callData = await account.encodeCalls(calls);
  return {
    account,
    chainId,
    callData,
    callGasLimit,
    verificationGasLimit,
    preVerificationGas: PRE_VERIFICATION_GAS,
    maxFeePerGas: gasEstimate.maxFeePerGas,
    maxPriorityFeePerGas: gasEstimate.maxPriorityFeePerGas,
    paymaster
  };
};
exports.BaseError = BaseError;
exports.ChainDoesNotSupportContract = ChainDoesNotSupportContract;
exports.ClientChainNotConfiguredError = ClientChainNotConfiguredError;
exports.ExecutionRevertedError = ExecutionRevertedError;
exports.FeeCapTooHighError = FeeCapTooHighError;
exports.FeeCapTooLowError = FeeCapTooLowError;
exports.FeeConflictError = FeeConflictError;
exports.Hash = Hash;
exports.InsufficientFundsError = InsufficientFundsError;
exports.IntegerOutOfRangeError = IntegerOutOfRangeError;
exports.IntrinsicGasTooHighError = IntrinsicGasTooHighError;
exports.IntrinsicGasTooLowError = IntrinsicGasTooLowError;
exports.InvalidAddressError = InvalidAddressError;
exports.InvalidBytesBooleanError = InvalidBytesBooleanError;
exports.InvalidBytesLengthError = InvalidBytesLengthError;
exports.InvalidChainIdError = InvalidChainIdError;
exports.InvalidLegacyVError = InvalidLegacyVError;
exports.InvalidSerializableTransactionError = InvalidSerializableTransactionError;
exports.InvalidStorageKeySizeError = InvalidStorageKeySizeError;
exports.KERNEL_NAME = KERNEL_NAME;
exports.KERNEL_V3_1 = KERNEL_V3_1;
exports.KernelVersionToAddressesMap = KernelVersionToAddressesMap;
exports.LruMap = LruMap;
exports.MAGIC_VALUE_SIG_REPLAYABLE = MAGIC_VALUE_SIG_REPLAYABLE;
exports.NonceMaxValueError = NonceMaxValueError;
exports.NonceTooHighError = NonceTooHighError;
exports.NonceTooLowError = NonceTooLowError;
exports.TipAboveFeeCapError = TipAboveFeeCapError;
exports.TransactionTypeNotSupportedError = TransactionTypeNotSupportedError;
exports.UnknownNodeError = UnknownNodeError;
exports.VALIDATOR_TYPE = VALIDATOR_TYPE;
exports.abytes = abytes;
exports.aexists = aexists;
exports.ahash = ahash;
exports.anumber = anumber;
exports.aoutput = aoutput;
exports.assertSize = assertSize;
exports.boolToHex = boolToHex;
exports.bytesToHex = bytesToHex$1;
exports.checksumAddress = checksumAddress;
exports.clean = clean;
exports.commonjsGlobal = commonjsGlobal;
exports.composeRollupsContracts = composeRollupsContracts;
exports.concat = concat;
exports.concatBytes = concatBytes;
exports.concatHex = concatHex;
exports.createCursor = createCursor;
exports.createHasher = createHasher;
exports.createUserOp = createUserOp;
exports.createView = createView;
exports.encodeXtMessage = encodeXtMessage;
exports.entryPoint07Address = entryPoint07Address;
exports.entryPointV07 = entryPointV07;
exports.etherUnits = etherUnits;
exports.formatGwei = formatGwei;
exports.formatUnits = formatUnits;
exports.getAddress = getAddress;
exports.getAugmentedNamespace = getAugmentedNamespace;
exports.hexToBigInt = hexToBigInt;
exports.hexToBytes = hexToBytes;
exports.hexToNumber = hexToNumber;
exports.isAddress = isAddress;
exports.isHex = isHex;
exports.keccak256 = keccak256;
exports.maxUint256 = maxUint256;
exports.numberToHex = numberToHex;
exports.pad = pad;
exports.padHex = padHex;
exports.prettyPrint = prettyPrint;
exports.randomBytes = randomBytes;
exports.rollupsAccountAbstractionContracts = rollupsAccountAbstractionContracts;
exports.rotr = rotr;
exports.safeCreateCallAddress = safeCreateCallAddress;
exports.size = size;
exports.slice = slice;
exports.sliceBytes = sliceBytes;
exports.stringToHex = stringToHex;
exports.toBytes = toBytes$1;
exports.toBytes$1 = toBytes;
exports.toHex = toHex;
exports.toRlp = toRlp;
exports.trim = trim$1;
