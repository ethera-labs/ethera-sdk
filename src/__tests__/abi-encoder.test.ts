import { createAbiEncoder, extractAbiFunction, paramsToArray } from '@/utils/abi';
import type { Abi } from 'abitype';
import { encodeFunctionData } from 'viem';
import { describe, expect, it, vi } from 'vitest';

describe('createAbiEncoder', () => {
  const mockAbi = [
    {
      type: 'function',
      name: 'transfer',
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
      outputs: [],
      stateMutability: 'nonpayable'
    },
    {
      type: 'function',
      name: 'approve',
      inputs: [
        { name: 'spender', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
      outputs: [{ type: 'bool' }],
      stateMutability: 'nonpayable'
    },
    {
      type: 'function',
      name: 'balanceOf',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ type: 'uint256' }],
      stateMutability: 'view'
    },
    {
      type: 'function',
      name: 'totalSupply',
      inputs: [],
      outputs: [{ type: 'uint256' }],
      stateMutability: 'view'
    },
    {
      type: 'function',
      name: 'mint',
      inputs: [{ name: 'amount', type: 'uint256' }],
      outputs: [],
      stateMutability: 'payable'
    },
    {
      type: 'function',
      name: 'pureFunction',
      inputs: [],
      outputs: [{ type: 'uint256' }],
      stateMutability: 'pure'
    }
  ] as const;

  it('should create encoder with only write functions (nonpayable and payable)', () => {
    const encoder = createAbiEncoder(mockAbi);

    expect(encoder).toHaveProperty('transfer');
    expect(encoder).toHaveProperty('approve');
    expect(encoder).toHaveProperty('mint');

    // Should not include view or pure functions
    expect(encoder).not.toHaveProperty('balanceOf');
    expect(encoder).not.toHaveProperty('totalSupply');
    expect(encoder).not.toHaveProperty('pureFunction');
  });

  it('should encode function call with parameters', () => {
    const encoder = createAbiEncoder(mockAbi);

    const encoded = encoder.transfer({
      to: '0x1234567890123456789012345678901234567890',
      amount: 1000n
    });

    expect(typeof encoded).toBe('string');
    expect(encoded.startsWith('0x')).toBe(true);
    expect(encoded.length).toBeGreaterThan(2);
  });

  it('should encode function call without parameters', () => {
    const encoder = createAbiEncoder(mockAbi);

    const encoded = encoder.mint({ amount: 500n });

    expect(typeof encoded).toBe('string');
    expect(encoded.startsWith('0x')).toBe(true);
  });

  it('should handle empty ABI', () => {
    const encoder = createAbiEncoder([]);

    expect(encoder).toEqual({});
  });

  it('should handle ABI with only view functions', () => {
    const viewOnlyAbi: Abi = [
      {
        type: 'function',
        name: 'balanceOf',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ type: 'uint256' }],
        stateMutability: 'view'
      },
      {
        type: 'function',
        name: 'totalSupply',
        inputs: [],
        outputs: [{ type: 'uint256' }],
        stateMutability: 'pure'
      }
    ];

    const encoder = createAbiEncoder(viewOnlyAbi);

    expect(encoder).toEqual({});
  });

  it('should handle function with no inputs', () => {
    const noInputsAbi = [
      {
        type: 'function',
        name: 'renounceOwnership',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable'
      }
    ] as const;

    const encoder = createAbiEncoder(noInputsAbi);

    const encoded = encoder.renounceOwnership();

    expect(typeof encoded).toBe('string');
    expect(encoded.startsWith('0x')).toBe(true);
  });

  it('should handle complex parameter types', () => {
    const complexAbi = [
      {
        type: 'function',
        name: 'complexFunction',
        inputs: [
          { name: 'addresses', type: 'address[]' },
          { name: 'values', type: 'uint256[]' },
          { name: 'data', type: 'bytes' }
        ],
        outputs: [],
        stateMutability: 'payable'
      }
    ] as const;

    const encoder = createAbiEncoder(complexAbi);

    const encoded = encoder.complexFunction({
      addresses: ['0x1234567890123456789012345678901234567890', '0x0987654321098765432109876543210987654321'],
      values: [100n, 200n],
      data: '0xdeadbeef'
    });

    expect(typeof encoded).toBe('string');
    expect(encoded.startsWith('0x')).toBe(true);
  });

  it('should produce the same result as viem encodeFunctionData', () => {
    const testAbi = [
      {
        type: 'function',
        name: 'transfer',
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'amount', type: 'uint256' }
        ],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        type: 'function',
        name: 'mint',
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'amount', type: 'uint256' },
          { name: 'data', type: 'bytes' }
        ],
        outputs: [],
        stateMutability: 'payable'
      }
    ] as const;

    const encoder = createAbiEncoder(testAbi);

    // Test transfer function
    const transferParams = {
      to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' as const,
      amount: 123456789012345678901234567890n
    };

    const customEncoded = encoder.transfer(transferParams);
    const viemEncoded = encodeFunctionData({
      abi: testAbi,
      functionName: 'transfer',
      args: [transferParams.to, transferParams.amount]
    });

    expect(customEncoded).toBe(viemEncoded);

    // Test mint function with complex parameters
    const mintParams = {
      to: '0x1234567890123456789012345678901234567890' as const,
      amount: 5000000000000000000n,
      data: '0xdeadbeef' as const
    };

    const customMintEncoded = encoder.mint(mintParams);
    const viemMintEncoded = encodeFunctionData({
      abi: testAbi,
      functionName: 'mint',
      args: [mintParams.to, mintParams.amount, mintParams.data]
    });

    expect(customMintEncoded).toBe(viemMintEncoded);

    // Test function with no parameters (using a different ABI for this)
    const noParamAbi = [
      {
        type: 'function',
        name: 'renounceOwnership',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable'
      }
    ] as const;

    const noParamEncoder = createAbiEncoder(noParamAbi);

    const customNoParamEncoded = noParamEncoder.renounceOwnership();
    const viemNoParamEncoded = encodeFunctionData({
      abi: noParamAbi,
      functionName: 'renounceOwnership',
      args: []
    });

    expect(customNoParamEncoded).toBe(viemNoParamEncoded);
  });

  it('should handle function with struct/tuple parameters', () => {
    const structAbi = [
      {
        type: 'function',
        name: 'createProposal',
        inputs: [
          {
            name: 'proposal',
            type: 'tuple',
            components: [
              { name: 'title', type: 'string' },
              { name: 'description', type: 'string' },
              { name: 'amount', type: 'uint256' },
              { name: 'recipient', type: 'address' }
            ]
          },
          { name: 'deadline', type: 'uint256' }
        ],
        outputs: [{ type: 'uint256' }],
        stateMutability: 'nonpayable'
      }
    ] as const;

    const encoder = createAbiEncoder(structAbi);

    const proposalParams = {
      proposal: {
        title: 'Upgrade Contract',
        description: 'Upgrade to version 2.0',
        amount: 1000000000000000000n, // 1 ETH
        recipient: '0x1234567890123456789012345678901234567890' as const
      },
      deadline: 1704067200n // Unix timestamp
    };

    const customEncoded = encoder.createProposal(proposalParams);
    const viemEncoded = encodeFunctionData({
      abi: structAbi,
      functionName: 'createProposal',
      args: [
        {
          title: 'Upgrade Contract',
          description: 'Upgrade to version 2.0',
          amount: 1000000000000000000n,
          recipient: '0x1234567890123456789012345678901234567890'
        },
        1704067200n
      ]
    });

    expect(customEncoded).toBe(viemEncoded);
    expect(typeof customEncoded).toBe('string');
    expect(customEncoded.startsWith('0x')).toBe(true);
  });

  it('should handle function with nested struct parameters', () => {
    const nestedStructAbi = [
      {
        type: 'function',
        name: 'complexOperation',
        inputs: [
          {
            name: 'config',
            type: 'tuple',
            components: [
              { name: 'enabled', type: 'bool' },
              {
                name: 'settings',
                type: 'tuple',
                components: [
                  { name: 'maxAmount', type: 'uint256' },
                  { name: 'minAmount', type: 'uint256' },
                  { name: 'fee', type: 'uint256' }
                ]
              },
              { name: 'authorizedUsers', type: 'address[]' }
            ]
          }
        ],
        outputs: [],
        stateMutability: 'payable'
      }
    ] as const;

    const encoder = createAbiEncoder(nestedStructAbi);

    const configParams = {
      config: {
        enabled: true,
        settings: {
          maxAmount: 1000000000000000000000n, // 1000 ETH
          minAmount: 1000000000000000000n, // 1 ETH
          fee: 10000000000000000n // 0.01 ETH
        },
        authorizedUsers: [
          '0x1234567890123456789012345678901234567890' as const,
          '0x0987654321098765432109876543210987654321' as const
        ]
      }
    };

    const customEncoded = encoder.complexOperation(configParams);
    const viemEncoded = encodeFunctionData({
      abi: nestedStructAbi,
      functionName: 'complexOperation',
      args: [
        {
          enabled: true,
          settings: {
            maxAmount: 1000000000000000000000n,
            minAmount: 1000000000000000000n,
            fee: 10000000000000000n
          },
          authorizedUsers: [
            '0x1234567890123456789012345678901234567890',
            '0x0987654321098765432109876543210987654321'
          ]
        }
      ]
    });

    expect(customEncoded).toBe(viemEncoded);
    expect(typeof customEncoded).toBe('string');
    expect(customEncoded.startsWith('0x')).toBe(true);
  });

  it('skips non-function items (events, errors, constructor)', () => {
    const mixedAbi = [
      {
        type: 'event',
        name: 'Transfer',
        inputs: [
          { name: 'from', type: 'address', indexed: true },
          { name: 'to', type: 'address', indexed: true },
          { name: 'value', type: 'uint256', indexed: false }
        ]
      },
      {
        type: 'error',
        name: 'InsufficientBalance',
        inputs: [{ name: 'available', type: 'uint256' }]
      },
      {
        type: 'constructor',
        inputs: [{ name: 'owner', type: 'address' }],
        stateMutability: 'nonpayable'
      },
      {
        type: 'function',
        name: 'burn',
        inputs: [{ name: 'amount', type: 'uint256' }],
        outputs: [],
        stateMutability: 'nonpayable'
      }
    ] as const;

    const encoder = createAbiEncoder(mixedAbi);

    expect(Object.keys(encoder)).toEqual(['burn']);
  });

  it('skips fallback and receive items', () => {
    const withFallbackAbi = [
      { type: 'fallback', stateMutability: 'nonpayable' },
      { type: 'receive', stateMutability: 'payable' },
      {
        type: 'function',
        name: 'withdraw',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable'
      }
    ] as const;

    const encoder = createAbiEncoder(withFallbackAbi);

    expect(Object.keys(encoder)).toEqual(['withdraw']);
  });

  it('produces correct 4-byte selector for transfer(address,uint256)', () => {
    const transferAbi = [
      {
        type: 'function',
        name: 'transfer',
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'amount', type: 'uint256' }
        ],
        outputs: [],
        stateMutability: 'nonpayable'
      }
    ] as const;

    const encoder = createAbiEncoder(transferAbi);
    const encoded = encoder.transfer({
      to: '0x0000000000000000000000000000000000000001',
      amount: 0n
    });

    expect(encoded.slice(0, 10)).toBe('0xa9059cbb');
  });
});

describe('paramsToArray', () => {
  const transferFn = {
    type: 'function',
    name: 'transfer',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  } as const;

  it('maps named params to array in ABI input order', () => {
    const result = paramsToArray({
      params: {
        to: '0x1234567890123456789012345678901234567890' as const,
        amount: 42n
      },
      abiFunction: transferFn
    });

    expect(result).toEqual(['0x1234567890123456789012345678901234567890', '42']);
  });

  it('warns and inserts undefined for NaN values', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const singleNumFn = {
      type: 'function',
      name: 'setFee',
      inputs: [{ name: 'fee', type: 'uint256' }],
      outputs: [],
      stateMutability: 'nonpayable'
    } as const;

    paramsToArray({
      params: { fee: NaN as unknown as bigint },
      abiFunction: singleNumFn
    });

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[fee]'));
    warnSpy.mockRestore();
  });

  it('skips inputs without a name', () => {
    const unnamedFn = {
      type: 'function',
      name: 'anon',
      inputs: [
        { name: '', type: 'uint256' },
        { name: 'value', type: 'uint256' }
      ],
      outputs: [],
      stateMutability: 'nonpayable'
    } as const;

    const result = paramsToArray({
      params: { value: 7n } as Record<string, bigint>,
      abiFunction: unnamedFn
    });

    expect(result).toEqual(['7']);
  });
});

describe('extractAbiFunction', () => {
  const multiAbi = [
    {
      type: 'event',
      name: 'Transfer',
      inputs: [],
      anonymous: false
    },
    {
      type: 'function',
      name: 'approve',
      inputs: [
        { name: 'spender', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
      outputs: [{ type: 'bool' }],
      stateMutability: 'nonpayable'
    },
    {
      type: 'function',
      name: 'transfer',
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
      outputs: [],
      stateMutability: 'nonpayable'
    }
  ] as const;

  it('returns the matching ABI function', () => {
    const fn = extractAbiFunction(multiAbi, 'transfer');

    expect(fn.name).toBe('transfer');
    expect(fn.type).toBe('function');
    expect(fn.inputs).toHaveLength(2);
  });

  it('skips non-function items with same name', () => {
    const fn = extractAbiFunction(multiAbi, 'approve');

    expect(fn.name).toBe('approve');
    expect(fn.type).toBe('function');
  });
});
