import type * as PaymasterImportType from '@/api/paymaster';
import { getPaymasterDataForChain } from '@/api/paymaster';
import type { CreatedUserOp, EtheraConfigReturnType, EtheraRpcSchema, SignedUserOps, UserOpCall } from '@/types';
import type { EtheraError } from '@/errors';
import {
  composePreparedUserOps,
  composeSignedUserOps,
  composeUnpreparedUserOps,
  composeUserOps,
  createUserOps,
  validateComposePlan
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

vi.mock('@/api/paymaster', async () => {
  const actual = await vi.importActual<typeof PaymasterImportType>('@/api/paymaster');

  return {
    ...actual,
    getPaymasterDataForChain: vi.fn()
  };
});

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
  } as unknown as PublicClient<Transport, Chain, SmartAccount, EtheraRpcSchema>;
};

const baseConfig: EtheraConfigReturnType = {
  getPublicClient: () => undefined as never,
  getEntryPoint: () => ({}) as never,
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

    const config: EtheraConfigReturnType = {
      ...baseConfig,
      getPublicClient: vi.fn(() => publicClient),
      hasPaymaster: false
    };

    const calls: UserOpCall[] = [
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

  it('rejects empty calls arrays', async () => {
    const account = createMockAccount(11);
    const config: EtheraConfigReturnType = {
      ...baseConfig,
      getPublicClient: vi.fn(() => undefined as never)
    };

    await expect(createUserOps(config, account, [])).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'CALLS_EMPTY',
        details: { method: 'createUserOps' }
      })
    );
  });

  it('surfaces a structured error when the public client is missing', async () => {
    const account = createMockAccount(11);
    const config: EtheraConfigReturnType = {
      ...baseConfig,
      getPublicClient: vi.fn(() => undefined as never)
    };

    await expect(
      createUserOps(config, account, [
        { to: '0x0000000000000000000000000000000000000011' as Address, value: 0n, data: '0x' as Hex }
      ])
    ).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'PUBLIC_CLIENT_NOT_FOUND',
        details: { method: 'createUserOps', chainId: 11 }
      })
    );
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
    const config: EtheraConfigReturnType = {
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

    const calls: UserOpCall[] = [
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

  const buildOperationsForComposition = () => {
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
          } as CreatedUserOp
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
          } as CreatedUserOp
        }
      ]
    };
  };

  it('signs and composes unprepared user operations', async () => {
    const { publicClientA, publicClientB, operations } = buildOperationsForComposition();
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
    expect(result.sessionId).toMatch(/^compose-/);
    expect(result.operations).toEqual([
      expect.objectContaining({
        operationIndex: 0,
        chainId: 1,
        hash: '0xhash1',
        explorerUrl: 'https://explorer.a/tx/0xhash1',
        sessionId: result.sessionId,
        operationId: `${result.sessionId}:0:1`
      }),
      expect.objectContaining({
        operationIndex: 1,
        chainId: 2,
        hash: '0xhash2',
        explorerUrl: 'https://explorer.b/tx/0xhash2',
        sessionId: result.sessionId,
        operationId: `${result.sessionId}:1:2`
      })
    ]);
  });

  it('emits lifecycle callbacks in a stable order with normalized payloads', async () => {
    const { operations } = buildOperationsForComposition();
    (prepareAndSignUserOperations as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
      { sig: 'a' },
      { sig: 'b' }
    ]);

    const events: string[] = [];
    const onSign = vi.fn((payload) => {
      events.push(`sign:${payload.operationIndex}:${payload.chainId}`);
    });
    const onSigned = vi.fn(() => {
      events.push('signed');
    });
    const onBuild = vi.fn((payload) => {
      events.push(`build:${payload.operationIndex}:${payload.chainId}`);
    });
    const onComposed = vi.fn(() => {
      events.push('composed');
    });
    const onPayloadEncoded = vi.fn(() => {
      events.push('payload');
    });
    const onSubmit = vi.fn((payload) => {
      events.push(`submit:${payload.hashes.join(',')}`);
    });
    const onReceipt = vi.fn((payload) => {
      events.push(`receipt:${payload.operationIndex}:${payload.chainId}`);
    });

    const result = await composeUnpreparedUserOps(operations, {
      onSign,
      onSigned,
      onBuild,
      onComposed,
      onPayloadEncoded,
      onSubmit,
      onReceipt
    });
    const sendResult = await result.send();
    await sendResult.wait();

    expect(events).toEqual([
      'sign:0:1',
      'sign:1:2',
      'signed',
      'build:0:1',
      'build:1:2',
      'composed',
      'payload',
      'submit:0xhash1,0xhash2',
      'receipt:0:1',
      'receipt:1:2'
    ]);

    expect(onSign).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        operationIndex: 0,
        chainId: 1,
        signedUserOp: createCanonical('a'),
        sessionId: result.sessionId,
        operationId: `${result.sessionId}:0:1`
      })
    );
    expect(onBuild).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        operationIndex: 1,
        chainId: 2,
        hash: '0xhash2',
        explorerUrl: 'https://explorer.b/tx/0xhash2',
        sessionId: result.sessionId,
        operationId: `${result.sessionId}:1:2`,
        build: { hash: '0xhash2', raw: '0xraw2' }
      })
    );
    expect(onSubmit).toHaveBeenCalledWith({
      sessionId: result.sessionId,
      payload: '0xencoded',
      hashes: ['0xhash1', '0xhash2'],
      operations: result.operations
    });
    expect(onReceipt).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        operationIndex: 0,
        chainId: 1,
        hash: '0xhash1',
        receipt: { status: 'success' }
      })
    );
  });

  it('creates and composes user operations from smart accounts', async () => {
    const { publicClientA, operations } = buildOperationsForComposition();
    (prepareAndSignUserOperations as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([{ sig: 'a' }]);
    const createUserOp = vi.fn().mockResolvedValue(operations[0]);

    const result = await composeUserOps([
      {
        smartAccount: {
          account: {
            client: { chain: { id: 1 } },
            createUserOp
          },
          publicClient: createMockPublicClient(1)
        },
        calls: [{ to: '0x0000000000000000000000000000000000000011' as Address, value: 0n, data: '0x' as Hex }]
      }
    ]);

    expect(createUserOp).toHaveBeenCalledWith([
      { to: '0x0000000000000000000000000000000000000011', value: 0n, data: '0x' }
    ]);
    expect(prepareAndSignUserOperations).toHaveBeenCalledWith(
      [publicClientA as unknown as Client<Transport, Chain, SmartAccount>],
      [operations[0].userOp]
    );
    expect(result.payload).toBe('0xencoded');
  });

  it('defaults omitted composeUserOps call values to zero', async () => {
    const { operations } = buildOperationsForComposition();
    (prepareAndSignUserOperations as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([{ sig: 'a' }]);
    const createUserOp = vi.fn().mockResolvedValue(operations[0]);

    await composeUserOps([
      {
        smartAccount: {
          account: {
            client: { chain: { id: 1 } },
            createUserOp
          },
          publicClient: createMockPublicClient(1)
        },
        calls: [{ to: '0x0000000000000000000000000000000000000011' as Address, data: '0x' as Hex }]
      }
    ]);

    expect(createUserOp).toHaveBeenCalledWith([
      { to: '0x0000000000000000000000000000000000000011', value: 0n, data: '0x' }
    ]);
  });

  it('signs prepared user operations with a shared account', async () => {
    const { publicClientA, publicClientB, operations } = buildOperationsForComposition();
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

  it('rejects empty unprepared operations arrays', async () => {
    await expect(composeUnpreparedUserOps([])).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'OPERATIONS_EMPTY',
        details: { method: 'composeUnpreparedUserOps' }
      })
    );
  });

  it('rejects empty prepared operations arrays', async () => {
    await expect(composePreparedUserOps([])).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'OPERATIONS_EMPTY',
        details: { method: 'composePreparedUserOps' }
      })
    );
  });

  it('rejects empty signed operations arrays', async () => {
    await expect(composeSignedUserOps([])).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'OPERATIONS_EMPTY',
        details: { method: 'composeSignedUserOps' }
      })
    );
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
    ] as SignedUserOps;

    const onComposed = vi.fn();
    const onPayloadEncoded = vi.fn();

    const result = await composeSignedUserOps(operations, { onComposed, onPayloadEncoded });

    expect(encodeXtMessage).toHaveBeenCalledWith({
      senderId: 'client',
      entries: [
        { chainId: 3, rawTx: '0xraw1' },
        { chainId: 4, rawTx: '0xraw2' }
      ]
    });
    expect(result.payload).toBe('0xencoded');
    expect(result.explorerUrls).toEqual(['https://explorer.a/tx/0xhash1', 'https://explorer.b/tx/0xhash2']);
    expect(onPayloadEncoded).toHaveBeenCalledWith('0xencoded');
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
    expect(sendResult.sessionId).toBe(result.sessionId);
    expect(sendResult.operations).toEqual(result.operations);

    await sendResult.wait();
    expect(publicClientA.waitForTransactionReceipt).toHaveBeenCalledWith({ hash: '0xhash1' });
    expect(publicClientB.waitForTransactionReceipt).toHaveBeenCalledWith({ hash: '0xhash2' });
  });

  it('validates compose plans locally and reports paymaster readiness', () => {
    const result = validateComposePlan(
      [
        {
          smartAccount: {
            account: {
              address: '0x00000000000000000000000000000000000000a1',
              client: { chain: { id: 1 } },
              createUserOp: vi.fn()
            },
            publicClient: createMockPublicClient(1)
          },
          calls: [
            { to: '0x0000000000000000000000000000000000000011' as Address, data: '0x' as Hex },
            { to: '0x0000000000000000000000000000000000000022' as Address, value: 1n, data: '0x12' as Hex }
          ]
        }
      ],
      {
        config: {
          hasPaymaster: true,
          getPaymasterEndpoint: ({ method, chainId }) => `https://paymaster.test/${chainId}/${method}`
        }
      }
    );

    expect(result.sessionId).toMatch(/^compose-/);
    expect(result.hasPaymaster).toBe(true);
    expect(result.operations).toEqual([
      {
        operationIndex: 0,
        operationId: `${result.sessionId}:0:1`,
        sessionId: result.sessionId,
        chainId: 1,
        accountAddress: '0x00000000000000000000000000000000000000a1',
        callCount: 2,
        paymasterEndpoints: {
          sponsorUserOperation: 'https://paymaster.test/1/pm_sponsorUserOperation',
          getPaymasterStubData: 'https://paymaster.test/1/pm_getPaymasterStubData'
        }
      }
    ]);
  });

  it('rejects invalid paymaster endpoints during validateComposePlan', () => {
    expect(() =>
      validateComposePlan(
        [
          {
            smartAccount: {
              account: {
                address: '0x00000000000000000000000000000000000000a1',
                client: { chain: { id: 1 } },
                createUserOp: vi.fn()
              },
              publicClient: createMockPublicClient(1)
            },
            calls: [{ to: '0x0000000000000000000000000000000000000011' as Address, data: '0x' as Hex }]
          }
        ],
        {
          config: {
            hasPaymaster: true,
            getPaymasterEndpoint: () => 'not-a-url'
          }
        }
      )
    ).toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'PAYMASTER_ENDPOINT_INVALID',
        details: {
          method: 'pm_sponsorUserOperation',
          chainId: 1,
          value: 'not-a-url'
        }
      })
    );
  });

  it('falls back to transaction hashes when explorer metadata is missing', async () => {
    const publicClient = createMockPublicClient(7);
    publicClient.chain = { id: 7 } as Chain;
    (publicClient.request as unknown as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({ hash: '0xhash1', raw: '0xraw1' })
      .mockResolvedValueOnce(undefined);

    const result = await composeSignedUserOps([
      { publicClient, signedCanonicalOps: createCanonical('a') }
    ] as SignedUserOps);

    expect(result.explorerUrls).toEqual(['0xhash1']);
  });

  it('rejects empty composeUserOps operations arrays', async () => {
    await expect(composeUserOps([])).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'OPERATIONS_EMPTY',
        details: { method: 'composeUserOps' }
      })
    );
  });

  it('rejects composeUserOps operations with empty calls', async () => {
    await expect(
      composeUserOps([
        {
          smartAccount: {
            account: {
              client: { chain: { id: 1 } },
              createUserOp: vi.fn()
            },
            publicClient: createMockPublicClient(1)
          },
          calls: []
        }
      ])
    ).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'CALLS_EMPTY',
        details: { method: 'composeUserOps', operationIndex: 0 }
      })
    );
  });

  it('rejects composeUserOps operations without a compatible smart account', async () => {
    await expect(
      composeUserOps([
        {
          smartAccount: {
            account: {
              client: { chain: { id: 1 } }
            }
          } as never,
          calls: [{ to: '0x0000000000000000000000000000000000000011' as Address, value: 0n, data: '0x' as Hex }]
        }
      ])
    ).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'SMART_ACCOUNT_INVALID',
        details: { method: 'composeUserOps', operationIndex: 0 }
      })
    );
  });

  it('rejects composeUserOps operations with mismatched chain ids', async () => {
    await expect(
      composeUserOps([
        {
          smartAccount: {
            account: {
              client: { chain: { id: 1 } },
              createUserOp: vi.fn()
            },
            publicClient: createMockPublicClient(2)
          },
          calls: [{ to: '0x0000000000000000000000000000000000000011' as Address, value: 0n, data: '0x' as Hex }]
        }
      ])
    ).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'CHAIN_ID_MISMATCH',
        details: {
          method: 'composeUserOps',
          operationIndex: 0,
          chainId: 2,
          expected: '2',
          received: '1'
        }
      })
    );
  });

  it('rejects duplicate composeUserOps operations for the same chain and account', async () => {
    const accountAddress = '0x00000000000000000000000000000000000000a1' as Address;

    await expect(
      composeUserOps([
        {
          smartAccount: {
            account: {
              address: accountAddress,
              client: { chain: { id: 1 } },
              createUserOp: vi.fn()
            },
            publicClient: createMockPublicClient(1)
          },
          calls: [{ to: '0x0000000000000000000000000000000000000011' as Address, value: 0n, data: '0x' as Hex }]
        },
        {
          smartAccount: {
            account: {
              address: accountAddress,
              client: { chain: { id: 1 } },
              createUserOp: vi.fn()
            },
            publicClient: createMockPublicClient(1)
          },
          calls: [{ to: '0x0000000000000000000000000000000000000022' as Address, value: 0n, data: '0x' as Hex }]
        }
      ])
    ).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'COMPOSE_OPERATION_DUPLICATE',
        details: {
          method: 'composeUserOps',
          operationIndex: 1,
          duplicateOperationIndex: 0,
          chainId: 1,
          accountAddress
        }
      })
    );
  });

  it('rejects ambiguous same-chain composeUserOps operations without account addresses', async () => {
    await expect(
      composeUserOps([
        {
          smartAccount: {
            account: {
              client: { chain: { id: 1 } },
              createUserOp: vi.fn()
            },
            publicClient: createMockPublicClient(1)
          },
          calls: [{ to: '0x0000000000000000000000000000000000000011' as Address, value: 0n, data: '0x' as Hex }]
        },
        {
          smartAccount: {
            account: {
              client: { chain: { id: 1 } },
              createUserOp: vi.fn()
            },
            publicClient: createMockPublicClient(1)
          },
          calls: [{ to: '0x0000000000000000000000000000000000000022' as Address, value: 0n, data: '0x' as Hex }]
        }
      ])
    ).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'COMPOSE_OPERATION_AMBIGUOUS',
        details: {
          method: 'composeUserOps',
          operationIndex: 1,
          duplicateOperationIndex: 0,
          chainId: 1
        }
      })
    );
  });
});

describe('structured error wrapping', () => {
  const publicClient = createMockPublicClient(1);
  const signedOp = {
    publicClient,
    account: createMockAccount(1),
    signedCanonicalOps: createCanonical()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('wraps compose_buildSignedUserOpsTx failure as COMPOSE_BUILD_FAILURE with cause', async () => {
    const rootCause = new Error('rpc error');
    (publicClient.request as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(rootCause);

    await expect(composeSignedUserOps([signedOp])).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'COMPOSE_BUILD_FAILURE',
        cause: rootCause,
        details: expect.objectContaining({ method: 'composeSignedUserOpsInternal', operationIndex: 0, chainId: 1 })
      })
    );
  });

  it('wraps encodeXtMessage failure as PAYLOAD_ENCODING_FAILURE with cause', async () => {
    const rootCause = new Error('encode error');
    (publicClient.request as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      hash: '0xabc' as Hex,
      raw: '0xraw'
    });
    vi.mocked(encodeXtMessage).mockImplementation(() => { throw rootCause; });

    await expect(composeSignedUserOps([signedOp])).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'PAYLOAD_ENCODING_FAILURE',
        cause: rootCause
      })
    );
  });

  it('wraps eth_sendXTransaction failure as SEND_FAILURE with cause', async () => {
    const rootCause = new Error('send error');
    vi.mocked(encodeXtMessage).mockReturnValue('0xpayload' as Hex);
    (publicClient.request as unknown as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({ hash: '0xabc' as Hex, raw: '0xraw' })
      .mockRejectedValueOnce(rootCause);

    const result = await composeSignedUserOps([signedOp]);

    await expect(result.send()).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'SEND_FAILURE',
        cause: rootCause
      })
    );
  });

  it('wraps prepareAndSignUserOperations failure as SIGNING_FAILURE with cause', async () => {
    const rootCause = new Error('signing failed');
    vi.mocked(prepareAndSignUserOperations).mockRejectedValue(rootCause);

    const unpreparedOp = {
      publicClient,
      account: createMockAccount(1),
      userOp: {} as never,
      signer: {} as never,
      chainId: 1
    };

    await expect(composeUnpreparedUserOps([unpreparedOp])).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'SIGNING_FAILURE',
        cause: rootCause,
        details: expect.objectContaining({ method: 'composeUnpreparedUserOps' })
      })
    );
  });

  it('wraps signUserOperations failure as SIGNING_FAILURE with cause', async () => {
    const rootCause = new Error('signing failed');
    vi.mocked(signUserOperations).mockRejectedValue(rootCause);

    const preparedOp = {
      publicClient,
      account: createMockAccount(1),
      userOp: {} as never
    };

    await expect(composePreparedUserOps([preparedOp])).rejects.toThrowError(
      expect.objectContaining<Partial<EtheraError>>({
        code: 'SIGNING_FAILURE',
        cause: rootCause,
        details: expect.objectContaining({ method: 'composePreparedUserOps' })
      })
    );
  });
});
