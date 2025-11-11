<p align="center">
  <img src="https://ssv.network/wp-content/uploads/2024/06/full_logo_white.svg" alt="SSV Network" width="300"/>
</p>

<h1 align="center">Compose SDK</h1>

<p align="center">
  <a href="https://codecov.io/gh/ssvlabs/ssv-sdk">
    <img src="https://codecov.io/gh/ssvlabs/ssv-sdk/graph/badge.svg?token=2j2HCF1fSb" alt="codecov"/>
  </a>
</p>

> **⚠️ Development Notice**: This SDK is currently under active development and testing. It is not recommended for production use at this time.

## Overview

The Compose SDK is a **React-first** TypeScript library for Account Abstraction (AA) that enables multi-chain atomic user operations. Built on top of [ZeroDev Kernel V3.1](https://zerodev.app/), it provides React hooks and components for easily creating smart accounts and executing cross-chain transactions atomically in your React applications.

## Features

- **React-First Design**: Built specifically for React applications with hooks and context providers
- **Multi-chain Smart Accounts**: Create smart accounts that work across multiple chains simultaneously
- **Atomic Cross-Chain Operations**: Execute user operations across multiple chains atomically
- **ZeroDev Integration**: Built on ZeroDev Kernel V3.1 with EntryPoint 0.7 support
- **Paymaster Support**: Optional gasless transactions via paymaster integration
- **TypeScript**: Full TypeScript support with comprehensive type definitions
- **Gas Estimation**: Automatic gas estimation with fallback mechanisms
- **ABI Encoding Utilities**: Helper functions for encoding contract function calls

## Installation

```bash
# Using npm
npm install @compose-network/sdk

# Using yarn
yarn add @compose-network/sdk

# Using pnpm
pnpm install @compose-network/sdk
```

### Peer Dependencies

The SDK requires the following peer dependencies:

```bash
npm install @wagmi/core wagmi viem @tanstack/react-query react
```

## Quick Start

### 1. Setup Configuration

First, create your compose configuration:

```typescript
// config.ts
import { createComposeConfig } from '@compose-network/sdk';
import { createConfig, http } from '@wagmi/core';
import { createPublicClient, rpcSchema } from 'viem';
import { rollupA, rollupB, rollupsAccountAbstractionContracts } from '@compose-network/sdk';
import type { ComposeRpcSchema } from '@compose-network/sdk';

// Create wagmi config
export const wagmiConfig = createConfig({
  chains: [rollupA, rollupB],
  client(parameters) {
    return createPublicClient({
      chain: parameters.chain,
      transport: http(parameters.chain.rpcUrls.default.http[0]),
      rpcSchema: rpcSchema<ComposeRpcSchema>()
    });
  }
});

// Create compose config
export const composeConfig = createComposeConfig({
  wagmi: wagmiConfig,
  accountAbstractionContracts: {
    // Use predefined contracts
    [rollupA.id]: rollupsAccountAbstractionContracts,
    [rollupB.id]: rollupsAccountAbstractionContracts
    // Or provide your own account abstraction contracts:
    // [rollupA.id]: {
    //   kernelImpl: '0x...',
    //   kernelFactory: '0x...',
    //   multichainValidator: '0x...',
    //   metaFactory: '0x...'
    // },
  }
});
```

### 2. Setup React Providers

Wrap your app with the required providers:

```typescript
// App.tsx
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComposeProvider } from '@compose-network/sdk/react';
import { wagmiConfig, composeConfig } from './config';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ComposeProvider config={composeConfig}>
          <YourApp />
        </ComposeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### 3. Use the Smart Account Hook

Use the `useSmartAccount` hook in your components:

```typescript
// MyComponent.tsx
import { useSmartAccount } from '@compose-network/sdk/react';
import { rollupA, rollupB } from '@compose-network/sdk';

function MyComponent() {
  const { data: smartAccount, isLoading, error } = useSmartAccount({
    chainId: rollupA.id,
    multiChainIds: [rollupA.id, rollupB.id]
  });

  if (isLoading) return <div>Loading smart account...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!smartAccount) return <div>Please connect your wallet</div>;

  return (
    <div>
      <p>Smart Account Address: {smartAccount.account.address}</p>
    </div>
  );
}
```

## Core Concepts

### Configuration

The `createComposeConfig` function sets up the SDK with your wagmi configuration and account abstraction contracts. It requires:

- **wagmi**: Your wagmi config instance
- **accountAbstractionContracts**: A mapping of chain IDs to their account abstraction contract addresses
- **getPaymasterEndpoint** (optional): Function to get paymaster endpoint URLs for gasless transactions

### React Hooks

The SDK provides React hooks for easy integration:

- **`useComposeConfig`**: Access the compose configuration from context
- **`useSmartAccount`**: Create and access a smart account for a specific chain

### User Operations

User operations are created via the `createUserOp` method on smart accounts returned by `useSmartAccount`. This method:

- Accepts an array of calls (to, value, data)
- Automatically estimates gas for each call
- Handles paymaster integration if configured
- Returns a fully prepared user operation ready for signing

## Usage Examples

### Basic Smart Account Usage

```typescript
import { useSmartAccount } from '@compose-network/sdk/react';
import { rollupA } from '@compose-network/sdk';
import { useAccount } from 'wagmi';

function SmartAccountDisplay() {
  const { isConnected } = useAccount();
  const { data: smartAccount, isLoading } = useSmartAccount({
    chainId: rollupA.id
  });

  if (!isConnected) {
    return <div>Please connect your wallet</div>;
  }

  if (isLoading) {
    return <div>Creating smart account...</div>;
  }

  return (
    <div>
      <h2>Your Smart Account</h2>
      <p>Address: {smartAccount?.account.address}</p>
    </div>
  );
}
```

### Creating and Sending User Operations

```typescript
import { useSmartAccount, useComposeConfig } from '@compose-network/sdk/react';
import { createAbiEncoder, composeUserOps } from '@compose-network/sdk';
import { erc20Abi } from 'viem';
import { rollupA, rollupB } from '@compose-network/sdk';
import { useMutation } from '@tanstack/react-query';

function TokenApproval() {
  const { data: smartAccountA } = useSmartAccount({
    chainId: rollupA.id,
    multiChainIds: [rollupA.id, rollupB.id]
  });
  const { data: smartAccountB } = useSmartAccount({
    chainId: rollupB.id,
    multiChainIds: [rollupA.id, rollupB.id]
  });

  const sendMutation = useMutation({
    mutationFn: async () => {
      if (!smartAccountA || !smartAccountB) {
        throw new Error('Smart accounts not ready');
      }

      // Create ABI encoder for ERC20
      const erc20 = createAbiEncoder(erc20Abi);

      // Create user operations for each chain
      const userOpA = await smartAccountA.account.createUserOp([
        {
          to: '0x...', // Token address on chain A
          value: 0n,
          data: erc20.approve({
            spender: '0x...',
            amount: 10000000000000000000n
          })
        }
      ]);

      const userOpB = await smartAccountB.account.createUserOp([
        {
          to: '0x...', // Token address on chain B
          value: 0n,
          data: erc20.approve({
            spender: '0x...',
            amount: 10000000000000000000n
          })
        }
      ]);

      // Compose user operations
      const composed = await composeUserOps([userOpA, userOpB]);

      // Send the composed transactions
      const result = await composed.send();

      // Get transaction hashes
      console.log('Transaction hashes:', result.hashes);

      // Optionally wait for transaction receipts
      const receipts = await result.wait();
      console.log('Transaction receipts:', receipts);

      return {
        hashes: result.hashes,
        explorerUrls: composed.explorerUrls,
        receipts
      };
    }
  });

  const handleApprove = () => {
    sendMutation.mutate();
  };

  return (
    <div>
      <button
        onClick={handleApprove}
        disabled={!smartAccountA || !smartAccountB || sendMutation.isPending}
      >
        {sendMutation.isPending ? 'Sending...' : 'Approve Token'}
      </button>

      {sendMutation.isSuccess && (
        <div>
          <p>Transactions sent!</p>
          <p>Hashes: {sendMutation.data.hashes.join(', ')}</p>
          <div>
            <p>View on explorer:</p>
            {sendMutation.data.explorerUrls.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                Chain {i + 1}
              </a>
            ))}
          </div>
        </div>
      )}

      {sendMutation.isError && (
        <p>Error: {sendMutation.error?.message}</p>
      )}
    </div>
  );
}
```

### Multi-Chain Smart Account

```typescript
import { useSmartAccount } from '@compose-network/sdk/react';
import { rollupA, rollupB } from '@compose-network/sdk';

function MultiChainComponent() {
  // Create smart account for chain A with multi-chain support
  const { data: smartAccountA } = useSmartAccount({
    chainId: rollupA.id,
    multiChainIds: [rollupA.id, rollupB.id]
  });

  // Create smart account for chain B with multi-chain support
  const { data: smartAccountB } = useSmartAccount({
    chainId: rollupB.id,
    multiChainIds: [rollupA.id, rollupB.id]
  });

  // Both accounts will have the same address
  const addressesMatch =
    smartAccountA?.account.address === smartAccountB?.account.address;

  return (
    <div>
      <p>Chain A Address: {smartAccountA?.account.address}</p>
      <p>Chain B Address: {smartAccountB?.account.address}</p>
      <p>Addresses match: {addressesMatch ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### Using useComposeConfig

Access the compose configuration directly if needed:

```typescript
import { useComposeConfig } from '@compose-network/sdk/react';

function ConfigInfo() {
  const config = useComposeConfig();

  // Access configuration properties
  const hasPaymaster = config.hasPaymaster;
  const entryPoint = config.entryPoint;

  return (
    <div>
      <p>Paymaster enabled: {hasPaymaster ? 'Yes' : 'No'}</p>
      <p>Entry Point: {entryPoint.address}</p>
    </div>
  );
}
```

### Complete Example with ABI Encoding

```typescript
import { useSmartAccount } from '@compose-network/sdk/react';
import { createAbiEncoder, composeUserOps } from '@compose-network/sdk';
import { erc20Abi } from 'viem';
import { rollupA } from '@compose-network/sdk';
import { useMutation } from '@tanstack/react-query';

function CompleteExample() {
  const { data: smartAccount, isLoading } = useSmartAccount({
    chainId: rollupA.id
  });

  const transferMutation = useMutation({
    mutationFn: async () => {
      if (!smartAccount) {
        throw new Error('Smart account not ready');
      }

      // Create ABI encoder
      const erc20 = createAbiEncoder(erc20Abi);

      // Create user operation
      const userOp = await smartAccount.account.createUserOp([
        {
          to: '0x...', // Token address
          value: 0n,
          data: erc20.transfer({
            to: '0x...', // Recipient
            amount: 1000000000000000000n // 1 token
          })
        }
      ]);

      // Compose and send the user operation
      const composed = await composeUserOps([userOp]);

      // Send the transaction
      const result = await composed.send();

      // Wait for transaction receipt
      const receipts = await result.wait();

      return {
        hashes: result.hashes,
        explorerUrls: composed.explorerUrls,
        receipts
      };
    }
  });

  const handleTransfer = () => {
    transferMutation.mutate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Smart Account: {smartAccount?.account.address}</p>
      <button
        onClick={handleTransfer}
        disabled={!smartAccount || transferMutation.isPending}
      >
        {transferMutation.isPending ? 'Sending...' : 'Transfer Token'}
      </button>

      {transferMutation.isSuccess && (
        <div>
          <p>Transaction sent! Hash: {transferMutation.data.hashes[0]}</p>
          <a
            href={transferMutation.data.explorerUrls[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on explorer
          </a>
        </div>
      )}

      {transferMutation.isError && (
        <p>Error: {transferMutation.error?.message}</p>
      )}
    </div>
  );
}
```

## API Reference

### `createComposeConfig`

Creates a compose configuration instance.

```typescript
import { createComposeConfig } from '@compose-network/sdk';

function createComposeConfig<TConfig extends Config>(
  props: ComposeConfigArgs<TConfig>
): ComposeConfigReturnType<TConfig>;
```

**Parameters:**

- `wagmi`: Wagmi config instance
- `accountAbstractionContracts`: Mapping of chain IDs to contract addresses
- `getPaymasterEndpoint?`: Optional function to get paymaster endpoints

**Returns:** Compose configuration object

### React Hooks

#### `ComposeProvider`

React context provider for compose configuration. Must wrap your app to use other hooks.

```typescript
import { ComposeProvider } from '@compose-network/sdk/react';

function ComposeProvider<TConfig extends Config>({ children, config }: ComposeProviderProps<TConfig>): ReactElement;
```

**Props:**

- `config`: Compose configuration object created with `createComposeConfig`
- `children`: React children

#### `useComposeConfig`

Hook to access compose configuration from context. Must be used within a `ComposeProvider`.

```typescript
import { useComposeConfig } from '@compose-network/sdk/react';

function useComposeConfig<TConfig extends Config>(): ComposeConfigReturnType<TConfig>;
```

**Returns:** Compose configuration object

**Throws:** Error if used outside of `ComposeProvider`

#### `useSmartAccount`

Hook to create and access a smart account. Returns a React Query result with the smart account data.

```typescript
import { useSmartAccount } from '@compose-network/sdk/react';

function useSmartAccount({
  chainId,
  multiChainIds
}: {
  chainId: number;
  multiChainIds?: number[];
}): UseQueryResult<SmartAccountResult>;
```

**Parameters:**

- `chainId`: Chain ID for the primary chain
- `multiChainIds`: Optional array of chain IDs for multi-chain support

**Returns:** React Query result object with:

- `data`: Smart account object containing `account`, `validator`, `signer`, and `publicClient`
- `isLoading`: Boolean indicating if the account is being created
- `error`: Error object if creation failed
- `isError`: Boolean indicating if an error occurred

**Note:** The hook automatically enables/disables based on wallet connection status.

### Helper Functions

#### `createAbiEncoder`

Creates an ABI encoder for easy contract function call encoding.

```typescript
import { createAbiEncoder } from '@compose-network/sdk';
import { erc20Abi } from 'viem';

const erc20 = createAbiEncoder(erc20Abi);

// Encode function calls
const approveData = erc20.approve({
  spender: '0x...',
  amount: 10000000000000000000n
});
```

**Parameters:**

- `abi`: Contract ABI (from viem or custom)

**Returns:** Encoder object with methods for each function in the ABI

#### `composeUserOps`

Composes multiple user operations for atomic cross-chain execution.

```typescript
import { composeUserOps } from '@compose-network/sdk';

// Create user operations first
const userOp1 = await smartAccountA.account.createUserOp([/* calls */]);
const userOp2 = await smartAccountB.account.createUserOp([/* calls */]);

// Then compose them - createUserOp returns everything needed (account, publicClient, userOp, etc.)
const composed = await composeUserOps([userOp1, userOp2]);

// Send the composed transactions
const result = await composed.send();

// Get transaction hashes
const hashes = result.hashes;

// Optionally wait for transaction receipts
const receipts = await result.wait();
```

**Parameters:**

- `operations`: Array of objects returned by `createUserOp`. Each object contains:
  - `account`: Smart account instance
  - `publicClient`: Public client for the chain
  - `userOp`: User operation data
  - `chainId`: Chain ID
  - `signer`: Signer instance
- `options?`: Optional callbacks:
  - `onSigned?`: Called when operations are signed
  - `onComposed?`: Called when transactions are built
  - `onPayloadEncoded?`: Called when payload is encoded

**Returns:** Object with:

- `payload`: Encoded XT message
- `builds`: Array of transaction builds
- `explorerUrls`: Array of explorer URLs for each transaction
- `send()`: Function that sends the transactions and returns:
  - `hashes`: Array of transaction hashes
  - `wait()`: Function that waits for all transaction receipts

## Configuration Details

### Account Abstraction Contracts

Each chain requires the following contract addresses:

```typescript
type AccountAbstractionContracts = {
  kernelImpl: `0x${string}`; // Kernel implementation address
  kernelFactory: `0x${string}`; // Kernel factory address
  multichainValidator: `0x${string}`; // Multi-chain validator address
  metaFactory: `0x${string}`; // Meta factory address
};
```

### Paymaster Setup

To enable paymaster support, provide a `getPaymasterEndpoint` function:

```typescript
const composeConfig = createComposeConfig({
  wagmi: wagmiConfig,
  accountAbstractionContracts: {
    /* ... */
  },
  getPaymasterEndpoint: ({ method, chainId }) => {
    return `https://paymaster.example.com/${chainId}/${method}`;
  }
});
```

The paymaster endpoint should support the following methods:

- `pm_sponsorUserOperation`
- `pm_getPaymasterStubData`
- `pm_getPaymasterData`

### Chain Configuration

The SDK includes predefined chain configurations:

- `rollupA` (Chain ID: 11113)
- `rollupB` (Chain ID: 22224)
- `hoodi` (Chain ID: 560048)
- `mainnet`, `polygon`, `base`, `arbitrum`, `optimism`

You can also use custom chains by defining them with viem's `defineChain`.

## Advanced Usage

### Multi-Chain Validator Setup

When using `useSmartAccount` with multiple chains, ensure all chains share the same multi-chain validator configuration:

```typescript
// Both hooks should use the same multiChainIds array
const { data: accountA } = useSmartAccount({
  chainId: rollupA.id,
  multiChainIds: [rollupA.id, rollupB.id]
});

const { data: accountB } = useSmartAccount({
  chainId: rollupB.id,
  multiChainIds: [rollupA.id, rollupB.id]
});

// Both accounts will have the same address
```

### Gas Estimation

The SDK automatically estimates gas for user operations:

- Individual call gas limits are estimated with a 25% margin
- Falls back to 900,000 gas if estimation fails
- Verification gas limit is calculated based on call gas limits
- Pre-verification gas is set to 90,000

### ABI Encoding Utilities

The SDK provides utilities for encoding ABI function calls:

```typescript
import { createAbiEncoder } from '@compose-network/sdk';
import { erc20Abi } from 'viem';

const erc20 = createAbiEncoder(erc20Abi);

// Encode function calls with type safety
const approveData = erc20.approve({
  spender: '0x...',
  amount: 10000000000000000000n
});

const transferData = erc20.transfer({
  to: '0x...',
  amount: 5000000000000000000n
});

// Use in user operations
const userOp = await smartAccount.account.createUserOp([
  {
    to: tokenAddress,
    value: 0n,
    data: approveData
  },
  {
    to: tokenAddress,
    value: 0n,
    data: transferData
  }
]);
```

## Examples

For complete working examples, see the test files:

- [`src/__tests__/react/compose-provider.test.tsx`](src/__tests__/react/compose-provider.test.tsx) - React integration example

## Development

### Build

```bash
pnpm build
```

### Watch Mode

```bash
pnpm build:watch
```

### Test

```bash
pnpm test
```

### Type Check

```bash
pnpm type-check
```

### Lint

```bash
pnpm lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

SEE LICENSE IN LICENSE FILE
