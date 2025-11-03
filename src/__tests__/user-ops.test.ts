import { rollupA, rollupB } from '@/config/chains';
import { createComposeConfig } from '@/config/create';
import { composeRollupsContracts, rollupsAccountAbstractionContracts } from '@/config/defaults';
import type { ComposeRpcSchema } from '@/types/compose';
import { composeUserOps, createAbiEncoder } from '@/utils';
import { createSmartAccount } from '@/utils/smart-account/create';
import { createConfig, http } from '@wagmi/core';
import { createPublicClient, erc20Abi, rpcSchema } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { describe, expect, it } from 'vitest';

describe('createComposeConfig initialization', () => {
  it.skipIf(!import.meta.env.VITE_PRIVATE_KEY)('should initialize compose config with rollup chains', async () => {
    const wagmiConfig = createConfig({
      chains: [rollupA, rollupB],
      client(parameters) {
        return createPublicClient({
          chain: parameters.chain,
          transport: http(parameters.chain.rpcUrls.default.http[0]),
          rpcSchema: rpcSchema<ComposeRpcSchema>()
        });
      }
    });

    const config = createComposeConfig({
      wagmi: wagmiConfig,
      accountAbstractionContracts: {
        [rollupA.id]: rollupsAccountAbstractionContracts,
        [rollupB.id]: rollupsAccountAbstractionContracts
      }
    });

    const account = privateKeyToAccount(import.meta.env.VITE_PRIVATE_KEY);

    const smartAccountA = await createSmartAccount(
      {
        signer: account,
        chainId: rollupA.id,
        multiChainIds: [rollupA.id, rollupB.id]
      },
      config
    );

    const smartAccountB = await createSmartAccount(
      {
        signer: account,
        chainId: rollupB.id,
        multiChainIds: [rollupA.id, rollupB.id]
      },
      config
    );

    expect(smartAccountA).toBeDefined();
    expect(smartAccountB).toBeDefined();

    expect(smartAccountA.account?.address).toBe('0x4d589Ff4d708463509b1447A7355D9b45a1A3123');
    expect(smartAccountB.account?.address).toBe('0x4d589Ff4d708463509b1447A7355D9b45a1A3123');

    const erc20 = createAbiEncoder(erc20Abi);

    const userOpA = await smartAccountA.account?.createUserOp([
      {
        to: composeRollupsContracts.tokens.WETH,
        value: 0n,
        data: erc20.approve({
          amount: 10000000000000000000n,
          spender: '0x4d589Ff4d708463509b1447A7355D9b45a1A3123'
        })
      }
    ]);
    const userOpB = await smartAccountB.account?.createUserOp([
      {
        to: composeRollupsContracts.tokens.WETH,
        value: 0n,
        data: erc20.approve({
          amount: 10000000000000000000n,
          spender: '0x4d589Ff4d708463509b1447A7355D9b45a1A3123'
        })
      }
    ]);
    expect(userOpA).toBeDefined();
    expect(userOpB).toBeDefined();
    expect(userOpA.chainId).toBe(rollupA.id);
    expect(userOpB.chainId).toBe(rollupB.id);
    expect(userOpA.account.address).toBe(smartAccountA.account?.address);
    expect(userOpB.account.address).toBe(smartAccountB.account?.address);

    

    const data = await composeUserOps([
      {
        account: smartAccountA.account,
        publicClient: smartAccountA.publicClient,
        userOp: await smartAccountA.account?.createUserOp([
          {
            to: composeRollupsContracts.tokens.WETH,
            value: 0n,
            data: erc20.approve({
              amount: 10000000000000000000n,
              spender: '0x4d589Ff4d708463509b1447A7355D9b45a1A3123'
            })
          }
        ])
      },
      {
        account: smartAccountB.account,
        publicClient: smartAccountB.publicClient,
        userOp: await smartAccountB.account?.createUserOp([
          {
            to: composeRollupsContracts.tokens.WETH,
            value: 0n,
            data: erc20.approve({
              amount: 10000000000000000000n,
              spender: '0x4d589Ff4d708463509b1447A7355D9b45a1A3123'
            })
          }
        ])
      }
    ]);
    expect(data).toBeDefined();
    // expect(data.builds.length).toBe(1);
    // expect(data.builds[0].chainId).toBe(rollupA.id);
    // expect(data.builds[0].hash).toMatch(/^0x/);
    // console.log('data:', data);
  });
});
