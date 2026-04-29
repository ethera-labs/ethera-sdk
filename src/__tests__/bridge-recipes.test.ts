import type { EtheraError } from '@/errors';
import { createAbiEncoder } from '@/utils/abi';
import { composeBridgeTransfer, createBridgeTransferOperations } from '@/utils/recipes';
import { composeUserOps } from '@/utils/user-operations';
import type { ComposableSmartAccount } from '@/types';
import type { Address } from 'viem';
import { erc20Abi } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/utils/user-operations', () => ({
  composeUserOps: vi.fn()
}));

const erc20 = createAbiEncoder(erc20Abi);
const sourceAccount = '0x00000000000000000000000000000000000000a1' as Address;
const destinationAccount = '0x00000000000000000000000000000000000000b1' as Address;
const recipient = '0x00000000000000000000000000000000000000c1' as Address;
const sourceBridge = '0x00000000000000000000000000000000000000d1' as Address;
const destinationBridge = '0x00000000000000000000000000000000000000d2' as Address;

describe('bridge recipes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const sourceSmartAccount = {
    account: {
      address: sourceAccount,
      client: { chain: { id: 1 } },
      createUserOp: vi.fn()
    },
    publicClient: {
      chain: { id: 1 }
    }
  } as unknown as ComposableSmartAccount;

  const destinationSmartAccount = {
    account: {
      address: destinationAccount,
      client: { chain: { id: 2 } },
      createUserOp: vi.fn()
    },
    publicClient: {
      chain: { id: 2 }
    }
  } as unknown as ComposableSmartAccount;

  it('creates ERC20 bridge operations with source pull and destination payout', () => {
    const operations = createBridgeTransferOperations({
      sourceSmartAccount,
      destinationSmartAccount,
      sourceBridge,
      destinationBridge,
      sessionId: 9n,
      recipient,
      asset: {
        kind: 'erc20',
        token: '0x00000000000000000000000000000000000000e1' as Address,
        amount: 42n,
        sourceOwner: '0x00000000000000000000000000000000000000f1' as Address
      }
    });

    expect(operations).toEqual([
      {
        smartAccount: sourceSmartAccount,
        calls: [
          {
            to: '0x00000000000000000000000000000000000000e1',
            value: 0n,
            data: erc20.transferFrom({
              sender: '0x00000000000000000000000000000000000000f1',
              recipient: sourceAccount,
              amount: 42n
            })
          },
          {
            to: sourceBridge,
            value: 0n,
            data: expect.any(String)
          }
        ]
      },
      {
        smartAccount: destinationSmartAccount,
        calls: [
          {
            to: destinationBridge,
            value: 0n,
            data: expect.any(String)
          },
          {
            to: '0x00000000000000000000000000000000000000e1',
            value: 0n,
            data: erc20.transfer({
              recipient,
              amount: 42n
            })
          }
        ]
      }
    ]);
  });

  it('creates native bridge operations and leaves funds in the destination smart account by default', () => {
    const operations = createBridgeTransferOperations({
      sourceSmartAccount,
      destinationSmartAccount,
      sourceBridge,
      destinationBridge,
      sessionId: 11n,
      asset: {
        kind: 'native',
        amount: 5n,
        wrappedToken: '0x00000000000000000000000000000000000000ee' as Address
      }
    });

    expect(operations).toEqual([
      {
        smartAccount: sourceSmartAccount,
        calls: [
          {
            to: '0x00000000000000000000000000000000000000ee',
            value: 5n,
            data: expect.any(String)
          },
          {
            to: sourceBridge,
            value: 0n,
            data: expect.any(String)
          }
        ]
      },
      {
        smartAccount: destinationSmartAccount,
        calls: [
          {
            to: destinationBridge,
            value: 0n,
            data: expect.any(String)
          },
          {
            to: '0x00000000000000000000000000000000000000ee',
            value: 0n,
            data: expect.any(String)
          }
        ]
      }
    ]);
  });

  it('delegates composed bridge operations to composeUserOps', async () => {
    const expectedResult = { payload: '0xpayload' };
    (composeUserOps as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(expectedResult);

    const result = await composeBridgeTransfer(
      {
        sourceSmartAccount,
        destinationSmartAccount,
        sourceBridge,
        destinationBridge,
        sessionId: 12n,
        recipient,
        asset: {
          kind: 'erc20',
          token: '0x00000000000000000000000000000000000000e1' as Address,
          amount: 7n
        }
      },
      { onPayloadEncoded: vi.fn() }
    );

    expect(composeUserOps).toHaveBeenCalledWith(
      createBridgeTransferOperations({
        sourceSmartAccount,
        destinationSmartAccount,
        sourceBridge,
        destinationBridge,
        sessionId: 12n,
        recipient,
        asset: {
          kind: 'erc20',
          token: '0x00000000000000000000000000000000000000e1' as Address,
          amount: 7n
        }
      }),
      { onPayloadEncoded: expect.any(Function) }
    );
    expect(result).toBe(expectedResult);
  });

  it('rejects smart accounts without addresses', () => {
    expect(() =>
      createBridgeTransferOperations({
        sourceSmartAccount: {
          ...sourceSmartAccount,
          account: {
            ...sourceSmartAccount.account,
            address: undefined
          }
        },
        destinationSmartAccount,
        sourceBridge,
        destinationBridge,
        sessionId: 1n,
        asset: {
          kind: 'erc20',
          token: '0x00000000000000000000000000000000000000e1' as Address,
          amount: 1n
        }
      })
    ).toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'SMART_ACCOUNT_INVALID',
        details: { method: 'composeBridgeTransfer', chainId: 1 }
      })
    );
  });
});
