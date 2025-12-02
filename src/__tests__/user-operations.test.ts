import { getPaymasterDataForChain } from '@/api/paymaster';
import type { ComposeConfigReturnType } from '@/config/create';
import type { ComposeRpcSchema } from '@/types/compose';
import {
  composePreparedUserOps,
  composeSignedUserOps,
  type composeSignedUserOpsParams,
  composeUnpreparedUserOps,
  type CreateUserOPReturnType,
  createUserOps,
  type UserOPCall
} from '@/utils/user-operations';
import type { CreateKernelAccountReturnType } from '@zerodev/sdk';
import {
  prepareAndSignUserOperations,
  signUserOperations,
  type SignUserOperationsRequest
} from '@zerodev/multi-chain-ecdsa-validator';
import type { Address, Chain, Client, Hex, PublicClient, Transport } from 'viem';
import { encodeXtMessage, toRpcUserOpCanonical } from '@/main';
import type { GetPaymasterDataParameters, SmartAccount } from 'viem/account-abstraction';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@zerodev/multi-chain-ecdsa-validator', () => ({
  prepareAndSignUserOperations: vi.fn(),
  signUserOperations: vi.fn()
}));

vi.mock('@/api/paymaster', () => ({
  getPaymasterDataForChain: vi.fn()
}));

const createCanonical = (sig: string | undefined = undefined) => ({
  sender: '0x0000000000000000000000000000000000000000' as Address,
  nonce: '0x0' as Hex,
  initCode: '0x' as Hex,
  factory: undefined,
  factoryData: undefined,
  callData: '0x' as Hex,
  callGasLimit: '0x0' as Hex,
  verificationGasLimit: '0x0' as Hex,
  preVerificationGas: '0x0' as Hex,
  maxFeePerGas: '0x0' as Hex,
  maxPriorityFeePerGas: '0x0' as Hex,
  paymaster: undefined,
  paymasterData: undefined,
  paymasterVerificationGasLimit: '0x0' as Hex,
  paymasterPostOpGasLimit: '0x0' as Hex,
  signature: (sig ? (`0x${sig}` as Hex) : ('0x' as Hex)) as Hex
});

vi.mock('@/main', () => ({
  encodeXtMessage: vi.fn(),
  toRpcUserOpCanonical: vi.fn((op: { sig?: string }) => createCanonical(op?.sig))
}));

const createMockAccount = (chainId = 1, encodedCalls: Hex = '0xdeadbeef' as Hex) =>
  ({
    client: { chain: { id: chainId } },
    encodeCalls: vi.fn().mockResolvedValue(encodedCalls)
  }) as unknown as CreateKernelAccountReturnType<'0.7'>;

const createMockPublicClient = (chainId = 1, explorerUrl = 'https://explorer.test/') => {
  const request = vi.fn();
  const waitForTransactionReceipt = vi.fn().mockResolvedValue({ status: 'success' });

  return {
    chain: { id: chainId, blockExplorers: { default: { url: explorerUrl } } },
    request,
    waitForTransactionReceipt,
    estimateGas: vi.fn(),
    estimateFeesPerGas: vi.fn()
  } as unknown as PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
};

const baseConfig: ComposeConfigReturnType = {
  getPublicClient: () => undefined as never,
  hasPaymaster: false,
  getPaymasterEndpoint: undefined,
  accountAbstractionContracts: {},
  entryPoint: {} as never
};

describe('createUserOps', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calculates gas with margin and falls back on estimation errors', async () => {
    const account = createMockAccount(11, '0xcall-data' as Hex);
    const publicClient = createMockPublicClient(11);
    (publicClient.estimateGas as unknown as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce(100_000n)
      .mockRejectedValueOnce(new Error('estimation failed'));
    (publicClient.estimateFeesPerGas as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      maxFeePerGas: 10n,
      maxPriorityFeePerGas: 2n
    });

    const config: ComposeConfigReturnType = {
      ...baseConfig,
      getPublicClient: vi.fn(() => publicClient),
      hasPaymaster: false
    };

    const calls: UserOPCall[] = [
      { to: '0x0000000000000000000000000000000000000011' as Address, value: 1n, data: '0x1234' as Hex },
      { to: '0x0000000000000000000000000000000000000022' as Address, value: 0n, data: '0xabcd' as Hex }
    ];

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = await createUserOps(config, account, calls);

    expect(config.getPublicClient).toHaveBeenCalledWith(11);
    expect(publicClient.estimateGas).toHaveBeenCalledTimes(2);
    expect(publicClient.estimateGas).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ account, to: calls[0].to, data: calls[0].data, value: calls[0].value })
    );
    expect(publicClient.estimateFeesPerGas).toHaveBeenCalled();
    expect(result.callGasLimit).toBe(1_025_000n); // 100k with margin + fallback value
    expect(result.verificationGasLimit).toBe(1_200_000n); // min verification gas takes precedence
    expect(result.preVerificationGas).toBe(90_000n);
    expect(result.callData).toBe('0xcall-data');
    expect(result.paymaster).toBeUndefined();
    expect(warnSpy).toHaveBeenCalledTimes(1);

    warnSpy.mockRestore();
  });

  it('exposes paymaster actions when enabled', async () => {
    const account = createMockAccount(5);
    const publicClient = createMockPublicClient(5);
    (publicClient.estimateGas as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(50_000n);
    (publicClient.estimateFeesPerGas as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      maxFeePerGas: 3n,
      maxPriorityFeePerGas: 1n
    });

    const getPaymasterEndpoint = vi.fn(() => 'https://paymaster.test');
    const config: ComposeConfigReturnType = {
      ...baseConfig,
      getPublicClient: vi.fn(() => publicClient),
      hasPaymaster: true,
      getPaymasterEndpoint
    };

    const params = {
      chainId: 5,
      entryPointAddress: '0xentry' as Address,
      sender: '0xsender' as Address,
      nonce: 0n,
      callData: '0x',
      callGasLimit: 1n,
      verificationGasLimit: 1n,
      maxFeePerGas: 1n,
      maxPriorityFeePerGas: 1n,
      preVerificationGas: 1n
    } as unknown as GetPaymasterDataParameters;

    const calls: UserOPCall[] = [
      { to: '0x0000000000000000000000000000000000000005' as Address, value: 0n, data: '0x' as Hex }
    ];

    const paymasterReturn = {
      paymaster: '0xpaymaster',
      paymasterData: '0xdata',
      paymasterPostOpGasLimit: 1n,
      paymasterVerificationGasLimit: 2n,
      preVerificationGas: '0x1',
      callGasLimit: '0x1',
      verificationGasLimit: '0x1'
    };

    (getPaymasterDataForChain as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(paymasterReturn);

    const result = await createUserOps(config, account, calls);

    expect(result.paymaster).toBeDefined();
    await result.paymaster?.getPaymasterData(params);
    await result.paymaster?.getPaymasterStubData(params);

    expect(getPaymasterDataForChain).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'pm_sponsorUserOperation', getPaymasterEndpoint })
    );
    expect(getPaymasterDataForChain).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'pm_getPaymasterStubData', getPaymasterEndpoint })
    );
  });
});

describe('compose user operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (encodeXtMessage as unknown as ReturnType<typeof vi.fn>).mockReturnValue('0xencoded' as Hex);
  });

  const buildOperationsForCompose = () => {
    const publicClientA = createMockPublicClient(1, 'https://explorer.a/');
    const publicClientB = createMockPublicClient(2, 'https://explorer.b/');

    (publicClientA.request as unknown as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({ hash: '0xhash1', raw: '0xraw1' })
      .mockResolvedValueOnce(undefined);
    (publicClientB.request as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      hash: '0xhash2',
      raw: '0xraw2'
    });

    return {
      publicClientA,
      publicClientB,
      operations: [
        {
          account: {} as CreateKernelAccountReturnType,
          publicClient: publicClientA,
          userOp: {
            account: {} as CreateKernelAccountReturnType<'0.7'>,
            chainId: 1,
            callData: '0x' as Hex,
            callGasLimit: 1n,
            verificationGasLimit: 1n,
            preVerificationGas: 1n,
            maxFeePerGas: 1n,
            maxPriorityFeePerGas: 1n
          } as CreateUserOPReturnType
        },
        {
          account: {} as CreateKernelAccountReturnType,
          publicClient: publicClientB,
          userOp: {
            account: {} as CreateKernelAccountReturnType<'0.7'>,
            chainId: 2,
            callData: '0x' as Hex,
            callGasLimit: 1n,
            verificationGasLimit: 1n,
            preVerificationGas: 1n,
            maxFeePerGas: 1n,
            maxPriorityFeePerGas: 1n
          } as CreateUserOPReturnType
        }
      ]
    };
  };

  it('signs and composes unprepared user operations', async () => {
    const { publicClientA, publicClientB, operations } = buildOperationsForCompose();
    (prepareAndSignUserOperations as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
      { sig: 'a' },
      { sig: 'b' }
    ]);
    const onSigned = vi.fn();
    const onComposed = vi.fn();

    const result = await composeUnpreparedUserOps(operations, { onSigned, onComposed });

    expect(prepareAndSignUserOperations).toHaveBeenCalledWith(
      [
        publicClientA as unknown as Client<Transport, Chain, SmartAccount>,
        publicClientB as unknown as Client<Transport, Chain, SmartAccount>
      ],
      [operations[0].userOp, operations[1].userOp]
    );
    expect(toRpcUserOpCanonical).toHaveBeenCalledTimes(2);
    expect(onSigned).toHaveBeenCalledWith([createCanonical('a'), createCanonical('b')]);

    expect(publicClientA.request).toHaveBeenCalledWith({
      method: 'compose_buildSignedUserOpsTx',
      params: [[createCanonical('a')], { chainId: 1 }]
    });
    expect(publicClientB.request).toHaveBeenCalledWith({
      method: 'compose_buildSignedUserOpsTx',
      params: [[createCanonical('b')], { chainId: 2 }]
    });

    expect(onComposed).toHaveBeenCalledWith(
      [
        { hash: '0xhash1', raw: '0xraw1' },
        { hash: '0xhash2', raw: '0xraw2' }
      ],
      ['https://explorer.a/tx/0xhash1', 'https://explorer.b/tx/0xhash2']
    );
    expect(result.payload).toBe('0xencoded');
  });

  it('signs prepared user operations with a shared account', async () => {
    const { publicClientA, publicClientB, operations } = buildOperationsForCompose();
    (signUserOperations as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([{ sig: 'a' }, { sig: 'b' }]);

    const onSigned = vi.fn();

    const preparedOperations = [
      {
        ...operations[0],
        userOp: {
          sender: '0x0000000000000000000000000000000000000000',
          nonce: 0n,
          initCode: '0x',
          callData: '0x',
          callGasLimit: 1n,
          verificationGasLimit: 1n,
          preVerificationGas: 1n,
          maxFeePerGas: 1n,
          maxPriorityFeePerGas: 1n,
          paymasterAndData: '0x',
          signature: '0x'
        } as unknown as SignUserOperationsRequest
      },
      {
        ...operations[1],
        userOp: {
          sender: '0x0000000000000000000000000000000000000000',
          nonce: 0n,
          initCode: '0x',
          callData: '0x',
          callGasLimit: 1n,
          verificationGasLimit: 1n,
          preVerificationGas: 1n,
          maxFeePerGas: 1n,
          maxPriorityFeePerGas: 1n,
          paymasterAndData: '0x',
          signature: '0x'
        } as unknown as SignUserOperationsRequest
      }
    ];

    await composePreparedUserOps(preparedOperations, { onSigned });

    expect(signUserOperations).toHaveBeenCalledWith(publicClientA, {
      userOperations: [preparedOperations[0].userOp, preparedOperations[1].userOp],
      account: preparedOperations[0].account
    });
    expect(onSigned).toHaveBeenCalledWith([createCanonical('a'), createCanonical('b')]);
    expect(publicClientA.request).toHaveBeenCalledWith({
      method: 'compose_buildSignedUserOpsTx',
      params: [[createCanonical('a')], { chainId: 1 }]
    });
    expect(publicClientB.request).toHaveBeenCalledWith({
      method: 'compose_buildSignedUserOpsTx',
      params: [[createCanonical('b')], { chainId: 2 }]
    });
  });

  it('builds payloads and provides send helpers for signed user operations', async () => {
    const publicClientA = createMockPublicClient(3, 'https://explorer.a/');
    const publicClientB = createMockPublicClient(4, 'https://explorer.b/');

    (publicClientA.request as unknown as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({ hash: '0xhash1', raw: '0xraw1' })
      .mockResolvedValueOnce(undefined);
    (publicClientB.request as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      hash: '0xhash2',
      raw: '0xraw2'
    });

    const operations = [
      { publicClient: publicClientA, signedCanonicalOps: createCanonical('a') },
      { publicClient: publicClientB, signedCanonicalOps: createCanonical('b') }
    ] as composeSignedUserOpsParams;

    const onComposed = vi.fn();

    const result = await composeSignedUserOps(operations, { onComposed });

    expect(encodeXtMessage).toHaveBeenCalledWith({
      senderId: 'client',
      entries: [
        { chainId: 3, rawTx: '0xraw1' },
        { chainId: 4, rawTx: '0xraw2' }
      ]
    });
    expect(result.payload).toBe('0xencoded');
    expect(result.explorerUrls).toEqual(['https://explorer.a/tx/0xhash1', 'https://explorer.b/tx/0xhash2']);
    expect(onComposed).toHaveBeenCalledWith(
      [
        { hash: '0xhash1', raw: '0xraw1' },
        { hash: '0xhash2', raw: '0xraw2' }
      ],
      ['https://explorer.a/tx/0xhash1', 'https://explorer.b/tx/0xhash2']
    );

    const sendResult = await result.send();
    expect(publicClientA.request).toHaveBeenLastCalledWith({
      method: 'eth_sendXTransaction',
      params: [result.payload]
    });
    expect(sendResult.hashes).toEqual(['0xhash1', '0xhash2']);

    await sendResult.wait();
    expect(publicClientA.waitForTransactionReceipt).toHaveBeenCalledWith({ hash: '0xhash1' });
    expect(publicClientB.waitForTransactionReceipt).toHaveBeenCalledWith({ hash: '0xhash2' });
  });
});
