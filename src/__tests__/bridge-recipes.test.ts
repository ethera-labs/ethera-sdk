import type { EtheraError } from '@/errors';
import { createAbiEncoder } from '@/utils/abi';
import { composeBridgeTransfer, createBridgeTransferOperations } from '@/utils/recipes';
import { composeUserOps } from '@/utils/user-operations';
import type { ComposableSmartAccount } from '@/types';
import type { Address, Hex } from 'viem';
import { erc20Abi, maxUint256 } from 'viem';
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
const token = '0x00000000000000000000000000000000000000e1' as Address;
const wrappedToken = '0x00000000000000000000000000000000000000ee' as Address;

describe('bridge recipes', () => {
  const readContract = vi.fn().mockResolvedValue(0n);

  const sourceSmartAccount = {
    account: {
      address: sourceAccount,
      client: { chain: { id: 1 } },
      createUserOp: vi.fn()
    },
    publicClient: {
      chain: { id: 1 },
      readContract
    }
  } as unknown as ComposableSmartAccount;

  const destinationSmartAccount = {
    account: {
      address: destinationAccount,
      client: { chain: { id: 2 } },
      createUserOp: vi.fn()
    },
    publicClient: {
      chain: { id: 2 },
      readContract: vi.fn()
    }
  } as unknown as ComposableSmartAccount;

  beforeEach(() => {
    vi.clearAllMocks();
    readContract.mockResolvedValue(0n);
  });

  it('creates ERC20 bridge operations with source pull, exact approval, and destination payout', async () => {
    const operations = await createBridgeTransferOperations({
      sourceSmartAccount,
      destinationSmartAccount,
      sourceBridge,
      destinationBridge,
      sessionId: 9n,
      recipient,
      asset: {
        kind: 'erc20',
        token,
        amount: 42n,
        sourceOwner: '0x00000000000000000000000000000000000000f1' as Address
      }
    });

    expect(operations).toEqual([
      {
        smartAccount: sourceSmartAccount,
        calls: [
          {
            to: token,
            value: 0n,
            data: erc20.transferFrom({
              sender: '0x00000000000000000000000000000000000000f1',
              recipient: sourceAccount,
              amount: 42n
            })
          },
          {
            to: token,
            value: 0n,
            data: erc20.approve({ spender: sourceBridge, amount: 42n })
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
            to: token,
            value: 0n,
            data: erc20.transfer({ recipient, amount: 42n })
          }
        ]
      }
    ]);
  });

  it('creates native bridge operations with deposit, exact approval, and destination unwrap', async () => {
    const operations = await createBridgeTransferOperations({
      sourceSmartAccount,
      destinationSmartAccount,
      sourceBridge,
      destinationBridge,
      sessionId: 11n,
      asset: {
        kind: 'native',
        amount: 5n,
        wrappedToken
      }
    });

    expect(operations).toEqual([
      {
        smartAccount: sourceSmartAccount,
        calls: [
          {
            to: wrappedToken,
            value: 5n,
            data: expect.any(String)
          },
          {
            to: wrappedToken,
            value: 0n,
            data: erc20.approve({ spender: sourceBridge, amount: 5n })
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
            to: wrappedToken,
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
        asset: { kind: 'erc20', token, amount: 7n }
      },
      { onPayloadEncoded: vi.fn() }
    );

    expect(composeUserOps).toHaveBeenCalledOnce();
    expect(composeUserOps).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          smartAccount: sourceSmartAccount,
          calls: expect.arrayContaining([
            expect.objectContaining({ to: token, value: 0n }),
            expect.objectContaining({ to: sourceBridge, value: 0n })
          ])
        }),
        expect.objectContaining({
          smartAccount: destinationSmartAccount,
          calls: expect.arrayContaining([
            expect.objectContaining({ to: destinationBridge, value: 0n }),
            expect.objectContaining({ to: token, value: 0n })
          ])
        })
      ],
      { onPayloadEncoded: expect.any(Function) }
    );
    const [[ops]] = (composeUserOps as unknown as ReturnType<typeof vi.fn>).mock.calls;
    expect(ops[0].calls).toHaveLength(2);
    expect(ops[1].calls).toHaveLength(2);
    expect(result).toBe(expectedResult);
  });

  it('rejects zero-amount transfers', async () => {
    await expect(
      createBridgeTransferOperations({
        sourceSmartAccount,
        destinationSmartAccount,
        sourceBridge,
        destinationBridge,
        sessionId: 1n,
        asset: { kind: 'erc20', token, amount: 0n }
      })
    ).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'BRIDGE_AMOUNT_INVALID',
        details: { method: 'createBridgeTransferOperations' }
      })
    );
  });

  it('rejects smart accounts without addresses', async () => {
    await expect(
      createBridgeTransferOperations({
        sourceSmartAccount: {
          ...sourceSmartAccount,
          account: { ...sourceSmartAccount.account, address: undefined }
        },
        destinationSmartAccount,
        sourceBridge,
        destinationBridge,
        sessionId: 1n,
        asset: { kind: 'erc20', token, amount: 1n }
      })
    ).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'SMART_ACCOUNT_INVALID',
        details: { method: 'composeBridgeTransfer', chainId: 1 }
      })
    );
  });

  it('skips approval when strategy is none', async () => {
    const operations = await createBridgeTransferOperations({
      sourceSmartAccount,
      destinationSmartAccount,
      sourceBridge,
      destinationBridge,
      sessionId: 1n,
      asset: { kind: 'erc20', token, amount: 10n, allowancePolicy: { strategy: 'none' } }
    });

    expect(readContract).not.toHaveBeenCalled();
    expect(operations[0].calls).toHaveLength(1);
    expect(operations[0].calls[0].to).toBe(sourceBridge);
  });

  it('approves maxUint256 when strategy is max', async () => {
    const operations = await createBridgeTransferOperations({
      sourceSmartAccount,
      destinationSmartAccount,
      sourceBridge,
      destinationBridge,
      sessionId: 1n,
      asset: { kind: 'erc20', token, amount: 10n, allowancePolicy: { strategy: 'max' } }
    });

    expect(operations[0].calls).toHaveLength(2);
    expect(operations[0].calls[0]).toEqual({
      to: token,
      value: 0n,
      data: erc20.approve({ spender: sourceBridge, amount: maxUint256 })
    });
  });

  it('approves custom amount when strategy is custom', async () => {
    const operations = await createBridgeTransferOperations({
      sourceSmartAccount,
      destinationSmartAccount,
      sourceBridge,
      destinationBridge,
      sessionId: 1n,
      asset: { kind: 'erc20', token, amount: 10n, allowancePolicy: { strategy: 'custom', amount: 999n } }
    });

    expect(operations[0].calls[0]).toEqual({
      to: token,
      value: 0n,
      data: erc20.approve({ spender: sourceBridge, amount: 999n })
    });
  });

  it('skips approval when existing allowance is sufficient', async () => {
    readContract.mockResolvedValue(100n);

    const operations = await createBridgeTransferOperations({
      sourceSmartAccount,
      destinationSmartAccount,
      sourceBridge,
      destinationBridge,
      sessionId: 1n,
      asset: { kind: 'erc20', token, amount: 10n }
    });

    expect(operations[0].calls).toHaveLength(1);
    expect(operations[0].calls[0].to).toBe(sourceBridge);
  });

  it('uses custom bridge encoding functions when provided', async () => {
    const customSendData = '0xcustomsend' as Hex;
    const customReceiveData = '0xcustomreceive' as Hex;
    const encodeSend = vi.fn().mockReturnValue(customSendData);
    const encodeReceiveTokens = vi.fn().mockReturnValue(customReceiveData);

    const operations = await createBridgeTransferOperations({
      sourceSmartAccount,
      destinationSmartAccount,
      sourceBridge,
      destinationBridge,
      sessionId: 5n,
      asset: { kind: 'erc20', token, amount: 1n, allowancePolicy: { strategy: 'none' } },
      bridgeConfig: { encodeSend, encodeReceiveTokens }
    });

    expect(encodeSend).toHaveBeenCalledOnce();
    expect(encodeReceiveTokens).toHaveBeenCalledOnce();
    expect(operations[0].calls[0].data).toBe(customSendData);
    expect(operations[1].calls[0].data).toBe(customReceiveData);
  });
});
