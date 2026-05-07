import type { EtheraError } from '@/errors';
import { createAbiEncoder } from '@/utils/abi';
import {
  composeUniversalBridgeTransfer,
  createUniversalBridgeTransferOperations
} from '@/utils/recipes';
import { composeUnpreparedUserOps, composeUserOps } from '@/utils/user-operations';
import type { ComposableSmartAccount } from '@/types';
import type { Address } from 'viem';
import { erc20Abi } from 'viem';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/utils/user-operations', () => ({
  composeUserOps: vi.fn(),
  composeUnpreparedUserOps: vi.fn()
}));

const erc20 = createAbiEncoder(erc20Abi);

const sourceAccount  = '0x00000000000000000000000000000000000000a1' as Address;
const destAccount    = '0x00000000000000000000000000000000000000b1' as Address;
const recipient      = '0x00000000000000000000000000000000000000c1' as Address;
const sourceBridge   = '0x00000000000000000000000000000000000000d1' as Address;
const destBridge     = '0x00000000000000000000000000000000000000d2' as Address;
const token          = '0x00000000000000000000000000000000000000e1' as Address;
const cetToken       = '0x00000000000000000000000000000000000000f1' as Address;
const remoteAsset    = '0x0000000000000000000000000000000000001111' as Address;
const cetFactory     = '0x0000000000000000000000000000000000002222' as Address;
const predictedCet   = '0x0000000000000000000000000000000000003333' as Address;
const ZERO_ADDRESS   = '0x0000000000000000000000000000000000000000' as Address;

describe('universal bridge recipes', () => {
  const sourceReadContract = vi.fn();
  const destReadContract = vi.fn();
  const createUserOp = vi.fn();

  const sourceSmartAccount = {
    account: { address: sourceAccount, client: { chain: { id: 1 } }, createUserOp },
    publicClient: { chain: { id: 1 }, readContract: sourceReadContract }
  } as unknown as ComposableSmartAccount;

  const destSmartAccount = {
    account: { address: destAccount, client: { chain: { id: 2 } }, createUserOp },
    publicClient: { chain: { id: 2 }, readContract: destReadContract }
  } as unknown as ComposableSmartAccount;

  const baseParams = {
    sourceSmartAccount,
    destinationSmartAccount: destSmartAccount,
    sourceBridge,
    destinationBridge: destBridge,
    sessionId: 42n
  };

  // resetAllMocks clears both call history AND the mockResolvedValueOnce queue,
  // preventing unconsumed mocks from one test bleeding into the next.
  beforeEach(() => {
    vi.resetAllMocks();
    sourceReadContract.mockResolvedValue(0n);
    destReadContract.mockResolvedValue(0n);
    createUserOp.mockResolvedValue({
      userOp: { callGasLimit: 100n, verificationGasLimit: 200n, preVerificationGas: 50n }
    });
  });

  // ── Zero-amount guard ──────────────────────────────────────────────────────

  it('rejects zero-amount transfers', async () => {
    await expect(
      createUniversalBridgeTransferOperations({ ...baseParams, asset: { kind: 'erc20', token, amount: 0n } })
    ).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({ code: 'BRIDGE_AMOUNT_INVALID' })
    );
  });

  // ── ERC20 path ─────────────────────────────────────────────────────────────

  it('ERC20: includes approval when allowance is zero (exact default)', async () => {
    sourceReadContract.mockResolvedValue(0n); // allowance = 0

    const ops = await createUniversalBridgeTransferOperations({
      ...baseParams,
      asset: { kind: 'erc20', token, amount: 10n }
    });

    expect(ops[0].calls).toHaveLength(2);
    expect(ops[0].calls[0]).toEqual({
      to: token,
      value: 0n,
      data: erc20.approve({ spender: sourceBridge, amount: 10n })
    });
    expect(ops[0].calls[1].to).toBe(sourceBridge);
  });

  it('ERC20: skips approval when existing allowance is sufficient', async () => {
    sourceReadContract.mockResolvedValue(100n); // allowance > amount

    const ops = await createUniversalBridgeTransferOperations({
      ...baseParams,
      asset: { kind: 'erc20', token, amount: 10n }
    });

    expect(ops[0].calls).toHaveLength(1);
    expect(ops[0].calls[0].to).toBe(sourceBridge);
  });

  it('ERC20: skips approval when strategy is none', async () => {
    const ops = await createUniversalBridgeTransferOperations({
      ...baseParams,
      asset: { kind: 'erc20', token, amount: 10n, allowancePolicy: { strategy: 'none' } }
    });

    expect(sourceReadContract).not.toHaveBeenCalled();
    expect(ops[0].calls).toHaveLength(1);
    expect(ops[0].calls[0].to).toBe(sourceBridge);
  });

  it('ERC20: no destination transfer when recipient equals destination SA', async () => {
    const ops = await createUniversalBridgeTransferOperations({
      ...baseParams,
      // no recipient → defaults to destAccount
      asset: { kind: 'erc20', token, amount: 10n, allowancePolicy: { strategy: 'none' } }
    });

    expect(ops[1].calls).toHaveLength(1);
    expect(ops[1].calls[0].to).toBe(destBridge);
  });

  it('ERC20: appends destination transfer when recipient differs from destination SA', async () => {
    const ops = await createUniversalBridgeTransferOperations({
      ...baseParams,
      recipient,
      asset: { kind: 'erc20', token, amount: 10n, allowancePolicy: { strategy: 'none' } }
    });

    expect(ops[1].calls).toHaveLength(2);
    expect(ops[1].calls[1]).toEqual({
      to: token,
      value: 0n,
      data: erc20.transfer({ recipient, amount: 10n })
    });
  });

  // ── CET explicit path ──────────────────────────────────────────────────────
  // Source read order for CET: remoteAsset() → remoteChainID() → allowance (if needed)
  // These happen because resolveDestinationCetToken runs before buildAllowanceCall.

  it('CET explicit: uses bridgeCETTo on source (not bridgeERC20To)', async () => {
    // remoteChainId matches destination → no factory reads needed
    sourceReadContract
      .mockResolvedValueOnce(remoteAsset) // remoteAsset()
      .mockResolvedValueOnce(BigInt(2));  // remoteChainID() === destChainId

    // no recipient → default, no dest transfer → ops[1].calls = 1

    const ops = await createUniversalBridgeTransferOperations({
      ...baseParams,
      asset: { kind: 'cet', token: cetToken, amount: 5n, allowancePolicy: { strategy: 'none' } }
    });

    expect(ops[0].calls).toHaveLength(1);
    expect(ops[0].calls[0].to).toBe(sourceBridge);
    // 7ac23fee is the keccak selector for bridgeCETTo(uint256,address,uint256,address,uint256)
    expect(ops[0].calls[0].data).toEqual(expect.stringContaining('7ac23fee'));
  });

  it('CET: resolves destination token directly when remoteChainId matches destination', async () => {
    sourceReadContract
      .mockResolvedValueOnce(remoteAsset) // remoteAsset()
      .mockResolvedValueOnce(BigInt(2))   // remoteChainID() === destChainId (2)
      .mockResolvedValueOnce(0n);          // allowance

    const ops = await createUniversalBridgeTransferOperations({
      ...baseParams,
      recipient,
      asset: { kind: 'cet', token: cetToken, amount: 5n }
    });

    expect(ops[1].calls[1].to).toBe(remoteAsset);
  });

  it('CET: resolves destination token via factory when remoteChainId differs', async () => {
    sourceReadContract
      .mockResolvedValueOnce(remoteAsset) // remoteAsset()
      .mockResolvedValueOnce(BigInt(99))  // remoteChainID() !== destChainId
      .mockResolvedValueOnce(0n);          // allowance

    destReadContract
      .mockRejectedValueOnce(new Error('no cetType')) // cetType() reverts
      .mockResolvedValueOnce(cetFactory)               // cetFactory()
      .mockResolvedValueOnce(predictedCet);            // predictAddress()

    const ops = await createUniversalBridgeTransferOperations({
      ...baseParams,
      recipient,
      asset: { kind: 'cet', token: cetToken, amount: 5n }
    });

    expect(ops[1].calls[1].to).toBe(predictedCet);
  });

  it('CET: throws UNIVERSAL_BRIDGE_TOKEN_RESOLUTION_FAILED when factory returns zero address', async () => {
    sourceReadContract
      .mockResolvedValueOnce(remoteAsset) // remoteAsset()
      .mockResolvedValueOnce(BigInt(99)); // remoteChainID() !== destChainId

    destReadContract
      .mockRejectedValueOnce(new Error('no cetType'))
      .mockResolvedValueOnce(cetFactory)
      .mockResolvedValueOnce(ZERO_ADDRESS); // predictAddress() → zero

    await expect(
      createUniversalBridgeTransferOperations({
        ...baseParams,
        recipient,
        asset: { kind: 'cet', token: cetToken, amount: 5n }
      })
    ).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({ code: 'UNIVERSAL_BRIDGE_TOKEN_RESOLUTION_FAILED' })
    );
  });

  // ── Auto-detection path ────────────────────────────────────────────────────
  // For auto, supportsInterface is consumed FIRST from source, then CET/ERC20 reads follow.

  it('auto: supportsInterface true → uses CET path, resolves destination token', async () => {
    sourceReadContract
      .mockResolvedValueOnce(true)        // supportsInterface → CET
      .mockResolvedValueOnce(remoteAsset) // remoteAsset()
      .mockResolvedValueOnce(BigInt(2));  // remoteChainID() === destChainId

    // strategy: none → no allowance read; no recipient → no dest transfer
    const ops = await createUniversalBridgeTransferOperations({
      ...baseParams,
      asset: { kind: 'auto', token: cetToken, amount: 5n, allowancePolicy: { strategy: 'none' } }
    });

    // Should have the bridge call (CETTo, not ERC20To) on source
    expect(ops[0].calls).toHaveLength(1);
    expect(ops[0].calls[0].to).toBe(sourceBridge);
    // Destination: receiveTokens only (no payout since recipient === destAccount)
    expect(ops[1].calls).toHaveLength(1);
    expect(ops[1].calls[0].to).toBe(destBridge);
  });

  it('auto: supportsInterface false → uses ERC20 path', async () => {
    sourceReadContract
      .mockResolvedValueOnce(false) // supportsInterface → ERC20
      .mockResolvedValueOnce(0n);   // allowance

    const ops = await createUniversalBridgeTransferOperations({
      ...baseParams,
      asset: { kind: 'auto', token, amount: 5n }
    });

    expect(ops[0].calls).toHaveLength(2); // approval + bridge
    expect(ops[0].calls[1].to).toBe(sourceBridge);
  });

  it('auto: supportsInterface revert → falls back to ERC20 path', async () => {
    sourceReadContract
      .mockRejectedValueOnce(new Error('not implemented')) // supportsInterface reverts
      .mockResolvedValueOnce(0n);                          // allowance

    const ops = await createUniversalBridgeTransferOperations({
      ...baseParams,
      asset: { kind: 'auto', token, amount: 5n }
    });

    expect(ops[0].calls).toHaveLength(2);
    expect(ops[0].calls[1].to).toBe(sourceBridge);
  });

  // ── Native path ────────────────────────────────────────────────────────────

  it('native: uses bridgeEthTo with value=amount, no approval, receiveETH + native send', async () => {
    const ops = await createUniversalBridgeTransferOperations({
      ...baseParams,
      recipient,
      asset: { kind: 'native', amount: 3n }
    });

    expect(sourceReadContract).not.toHaveBeenCalled();

    // Source: single payable call
    expect(ops[0].calls).toHaveLength(1);
    expect(ops[0].calls[0].to).toBe(sourceBridge);
    expect(ops[0].calls[0].value).toBe(3n);

    // Destination: receiveETH + native forward to recipient
    expect(ops[1].calls).toHaveLength(2);
    expect(ops[1].calls[0].to).toBe(destBridge);
    expect(ops[1].calls[1]).toEqual({ to: recipient, value: 3n, data: '0x' });
  });

  // ── msgHeader sender ───────────────────────────────────────────────────────

  it('msgHeader encodes sourceBridge as sender (not source smart account address)', async () => {
    const ops = await createUniversalBridgeTransferOperations({
      ...baseParams,
      asset: { kind: 'native', amount: 1n }
    });

    const receiveCallData = ops[1].calls[0].data as string;

    // sourceBridge address must appear in encoded msgHeader
    expect(receiveCallData.toLowerCase()).toContain(sourceBridge.slice(2).toLowerCase());
    // sourceAccount address must NOT appear as the msgHeader sender
    // (it IS the source SA but the bridge contract is the on-chain message sender)
    expect(receiveCallData.toLowerCase()).not.toContain(sourceAccount.slice(2).toLowerCase());
  });

  // ── Gas overrides ──────────────────────────────────────────────────────────

  it('routes to composeUserOps when no gasOverrides provided', async () => {
    vi.mocked(composeUserOps).mockResolvedValue({ payload: '0x' } as never);

    await composeUniversalBridgeTransfer({
      ...baseParams,
      asset: { kind: 'erc20', token, amount: 1n, allowancePolicy: { strategy: 'none' } }
    });

    expect(composeUserOps).toHaveBeenCalledOnce();
    expect(composeUnpreparedUserOps).not.toHaveBeenCalled();
  });

  it('routes to composeUnpreparedUserOps with patched gas when gasOverrides provided', async () => {
    vi.mocked(composeUnpreparedUserOps).mockResolvedValue({ payload: '0x' } as never);

    const sourceOp = { userOp: { callGasLimit: 100n, verificationGasLimit: 200n, preVerificationGas: 50n } };
    const destOp   = { userOp: { callGasLimit: 100n, verificationGasLimit: 200n, preVerificationGas: 50n } };
    createUserOp.mockResolvedValueOnce(sourceOp).mockResolvedValueOnce(destOp);

    await composeUniversalBridgeTransfer({
      ...baseParams,
      asset: { kind: 'erc20', token, amount: 1n, allowancePolicy: { strategy: 'none' } },
      gasOverrides: {
        source:      { callGasLimit: 999n },
        destination: { verificationGasLimit: 777n }
      }
    });

    expect(composeUserOps).not.toHaveBeenCalled();
    expect(composeUnpreparedUserOps).toHaveBeenCalledOnce();

    const [[ops]] = vi.mocked(composeUnpreparedUserOps).mock.calls;
    expect(ops[0].userOp.callGasLimit).toBe(999n);
    expect(ops[0].userOp.verificationGasLimit).toBe(200n); // unchanged
    expect(ops[1].userOp.verificationGasLimit).toBe(777n);
    expect(ops[1].userOp.callGasLimit).toBe(100n);          // unchanged
  });
});
