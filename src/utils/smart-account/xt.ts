"use client";

import type { INamespace } from "protobufjs/light";
import protobuf from "protobufjs/light";
import { hexToBytes, type Hex } from "viem";

// Minimal protobuf schema for the messages we need
const rootJson = {
  nested: {
    rollup: {
      nested: {
        v1: {
          nested: {
            TransactionRequest: {
              fields: {
                chain_id: { type: "bytes", id: 1 },
                transaction: { rule: "repeated", type: "bytes", id: 2 },
              },
            },
            XTRequest: {
              fields: {
                transactions: {
                  rule: "repeated",
                  type: "TransactionRequest",
                  id: 1,
                },
              },
            },
            Message: {
              fields: {
                sender_id: { type: "string", id: 1 },
                xt_request: { type: "XTRequest", id: 2 },
              },
              oneofs: {
                payload: { oneof: ["xt_request"] },
              },
            },
          },
        },
      },
    },
  },
} as const;

const root = protobuf.Root.fromJSON(rootJson as INamespace);
const Message = root.lookupType("rollup.v1.Message");
const XTRequest = root.lookupType("rollup.v1.XTRequest");
const TransactionRequest = root.lookupType("rollup.v1.TransactionRequest");

export function encodeXtMessage(params: {
  senderId?: string;
  entries: Array<{ chainId: number | bigint; rawTx: Hex }>;
}) {
  const txs = params.entries.map(({ chainId, rawTx }) => {
    const chainBytes = toBigEndianBytes(chainId);
    const txBytes = hexToBytes(rawTx);
    return TransactionRequest.create({
      chain_id: chainBytes,
      transaction: [txBytes],
    });
  });
  const xt = XTRequest.create({ transactions: txs });
  const msg = Message.create({
    sender_id: params.senderId ?? "client",
    xt_request: xt,
  });
  const bytes = Message.encode(msg).finish();
  // return btoa(String.fromCharCode(...bytes));
  return ("0x" + bytesToHex(bytes)) as Hex;
}

function toBigEndianBytes(id: number | bigint): Uint8Array {
  let v = BigInt(id);
  if (v === 0n) return new Uint8Array([0]);
  const out: number[] = [];
  while (v > 0n) {
    out.push(Number(v & 0xffn));
    v >>= 8n;
  }
  out.reverse();
  return Uint8Array.from(out);
}

function bytesToHex(u8: Uint8Array): string {
  const hex: string[] = new Array(u8.length);
  for (let i = 0; i < u8.length; i++) {
    const h = u8[i].toString(16).padStart(2, "0");
    hex[i] = h;
  }
  return hex.join("");
}
