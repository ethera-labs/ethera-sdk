import { encodeXtMessage } from '@/main';
import type { Hex } from 'viem';
import { describe, expect, it } from 'vitest';

describe('encodeXtMessage', () => {
  it('encodes a single-chain entry with known test vector', () => {
    const payload = encodeXtMessage({
      senderId: 'test',
      entries: [{ chainId: 1, rawTx: '0xdeadbeef' as Hex }]
    });

    expect(payload).toBe('0x0a0474657374120b0a090a01011204deadbeef');
  });

  it('encodes multi-chain entries with known test vector', () => {
    const payload = encodeXtMessage({
      senderId: 'backend',
      entries: [
        { chainId: 1, rawTx: '0xaabb' as Hex },
        { chainId: 2, rawTx: '0xccdd' as Hex }
      ]
    });

    expect(payload).toBe('0x0a076261636b656e6412120a070a01011202aabb0a070a01021202ccdd');
  });

  it('defaults senderId to "client" when omitted', () => {
    const withDefault = encodeXtMessage({ entries: [{ chainId: 1, rawTx: '0xaa' as Hex }] });
    const withExplicit = encodeXtMessage({ senderId: 'client', entries: [{ chainId: 1, rawTx: '0xaa' as Hex }] });

    expect(withDefault).toBe(withExplicit);
  });

  it('handles bigint chainId', () => {
    const fromNumber = encodeXtMessage({ senderId: 'x', entries: [{ chainId: 1, rawTx: '0xff' as Hex }] });
    const fromBigint = encodeXtMessage({ senderId: 'x', entries: [{ chainId: 1n, rawTx: '0xff' as Hex }] });

    expect(fromNumber).toBe(fromBigint);
  });

  it('handles chainId: 0', () => {
    const payload = encodeXtMessage({ senderId: 'x', entries: [{ chainId: 0, rawTx: '0x' as Hex }] });

    expect(payload).toMatch(/^0x/);
    expect(payload.length).toBeGreaterThan(2);
  });

  it('output is a hex-prefixed string', () => {
    const payload = encodeXtMessage({
      senderId: 'client',
      entries: [{ chainId: 555555, rawTx: '0x1234' as Hex }]
    });

    expect(payload).toMatch(/^0x[0-9a-f]+$/);
  });
});
