<p align="center">
  <img src="https://ssv.network/wp-content/uploads/2024/06/full_logo_white.svg" alt="SSV Network" width="300"/>
</p>

<h1 align="center">Ethera SDK</h1>

<p align="center">
  <a href="https://codecov.io/gh/ssvlabs/ssv-sdk">
    <img src="https://codecov.io/gh/ssvlabs/ssv-sdk/graph/badge.svg?token=2j2HCF1fSb" alt="codecov"/>
  </a>
</p>

> **⚠️ Development Notice**: This SDK is currently under active development and testing. It is not recommended for production use at this time.

## Overview

The Ethera SDK is a **React-first** TypeScript library for Account Abstraction (AA) that enables multi-chain atomic user operations. Built on top of [ZeroDev Kernel V3.1](https://zerodev.app/), it provides React hooks and components for easily creating smart accounts and executing cross-chain transactions atomically in your React applications.

## Features

- **React-First Design**: Built specifically for React applications with hooks and context providers
- **Multi-chain Smart Accounts**: Create smart accounts that work across multiple chains simultaneously
- **Atomic Cross-Chain Operations**: Execute user operations across multiple chains atomically
- **ZeroDev Integration**: Built on ZeroDev Kernel V3.1 with EntryPoint 0.7 support
- **Paymaster Support**: Optional gasless transactions via paymaster integration
- **TypeScript**: Full TypeScript support with comprehensive type definitions
- **Gas Estimation**: Automatic gas estimation with fallback mechanisms
- **ABI Encoding Utilities**: Helper functions for encoding contract function calls
- **Bridge Recipe Helper**: `composeBridgeTransfer` for scoped coordinated cross chain bridge flows across source and destination smart accounts

## Installation

```bash
# Using npm
npm install @ssv-labs/ethera-sdk

# Using yarn
yarn add @ssv-labs/ethera-sdk

# Using pnpm
pnpm add @ssv-labs/ethera-sdk
```

For direct GitHub installs, the package now builds during installation via the package `prepare` script, so `dist/` does not need to be committed:

```bash
pnpm add github:ethera-labs/compose-sdk
```

This changes the install requirements for Git-based usage:

- The consumer must install with a Node.js version that satisfies this repo's engine requirement (`>=22`).
- The package manager must be able to install the repository's `devDependencies`, because `vite` and the TypeScript declaration tooling are needed during `prepare`.
- Installation will take longer than consuming a prebuilt package from a registry, because the build runs on the consumer machine.
- Build failures in the consumer environment will now fail the install itself instead of being caught earlier in CI.

This only affects direct installs from the GitHub repository. Registry consumers still receive the published package artifacts and do not build the SDK during installation.

### Peer Dependencies

The SDK requires the following peer dependencies:

```bash
npm install @wagmi/core wagmi viem @tanstack/react-query react
```

## Quick Start

### 1. Setup Configuration

First, create your Ethera configuration:

```typescript
// config.ts
import { createEtheraConfig } from '@ssv-labs/ethera-sdk';
import { createConfig, http } from '@wagmi/core';
import { createPublicClient, rpcSchema } from 'viem';
import { rollupA, rollupB, rollupsAccountAbstractionContracts } from '@ssv-labs/ethera-sdk';
import type { EtheraRpcSchema } from '@ssv-labs/ethera-sdk';

// Create wagmi config
export const wagmiConfig = createConfig({
  chains: [rollupA, rollupB],
  client(parameters) {
    return createPublicClient({
      chain: parameters.chain,
      transport: http(parameters.chain.rpcUrls.default.http[0]),
      rpcSchema: rpcSchema<EtheraRpcSchema>()
    });
  }
});

// Create Ethera config
export const etheraConfig = createEtheraConfig({
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
    // },
  }
});
```

### 2. Setup React Providers

Wrap your app with the required providers:

```tsx
// App.tsx
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EtheraProvider } from '@ssv-labs/ethera-sdk/react';
import { wagmiConfig, etheraConfig } from './config';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <EtheraProvider config={etheraConfig}>
          <YourApp />
        </EtheraProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### 3. Use the Smart Account Hook

Use the `useSmartAccount` hook in your components:

```tsx
// MyComponent.tsx
import { useSmartAccount } from '@ssv-labs/ethera-sdk/react';
import { rollupA, rollupB } from '@ssv-labs/ethera-sdk';

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

The `createEtheraConfig` function sets up the SDK with your wagmi configuration and account abstraction contracts. It requires:

- **wagmi**: Your wagmi config instance
- **accountAbstractionContracts**: A mapping of chain IDs to their account abstraction contract addresses
- **getPaymasterEndpoint** (optional): Function to get paymaster endpoint URLs for gasless transactions

### React Hooks

The SDK provides React hooks for easy integration:

- **`useEtheraConfig`**: Access the Ethera configuration from context
- **`useSmartAccount`**: Create and access a smart account for a specific chain

### User Operations

User operations are created via the `createUserOp` method on smart accounts returned by `useSmartAccount`. This method:

- Accepts an array of calls (to, value, data)
- Automatically estimates gas for each call
- Handles paymaster integration if configured
- Returns a fully prepared user operation ready for signing

## Usage Examples

### Basic Smart Account Usage

```tsx
import { useSmartAccount } from '@ssv-labs/ethera-sdk/react';
import { rollupA } from '@ssv-labs/ethera-sdk';
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

```tsx
import { useSmartAccount } from '@ssv-labs/ethera-sdk/react';
import { composeUserOps, createAbiEncoder, isEtheraError, validateComposePlan } from '@ssv-labs/ethera-sdk';
import { erc20Abi } from 'viem';
import { rollupA, rollupB } from '@ssv-labs/ethera-sdk';
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

      const plan = [
        {
          smartAccount: smartAccountA,
          calls: [
            {
              to: '0x...', // Token address on chain A
              data: erc20.approve({
                spender: '0x...',
                amount: 10000000000000000000n
              })
            },
            {
              to: '0x...', // Bridge or vault contract on chain A
              value: 0n,
              data: '0x...'
            }
          ]
        },
        {
          smartAccount: smartAccountB,
          calls: [
            {
              to: '0x...', // Token address on chain B
              value: 0n,
              data: erc20.approve({
                spender: '0x...',
                amount: 10000000000000000000n
              })
            }
          ]
        }
      ] as const;

      validateComposePlan(plan);

      const composed = await composeUserOps(plan, {
        onBuild: ({ operationIndex, chainId, hash }) => {
          console.log('Built', operationIndex, chainId, hash);
        },
        onSubmit: ({ sessionId, hashes }) => {
          console.log('Submitted', sessionId, hashes);
        }
      });

      // Send the composed transactions
      const result = await composed.send();

      // Get transaction hashes
      console.log('Transaction hashes:', result.hashes);

      // Optionally wait for transaction receipts
      const receipts = await result.wait();
      console.log('Transaction receipts:', receipts);

      return { sessionId: composed.sessionId, hashes: result.hashes, explorerUrls: composed.explorerUrls, receipts };
    } catch (error) {
      if (isEtheraError(error)) {
        console.error(error.code, error.details);
      }

      throw error;
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

```tsx
import { useSmartAccount } from '@ssv-labs/ethera-sdk/react';
import { rollupA, rollupB } from '@ssv-labs/ethera-sdk';

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

### Using useEtheraConfig

Access the Ethera configuration directly if needed:

```tsx
import { useEtheraConfig } from '@ssv-labs/ethera-sdk/react';

function ConfigInfo() {
  const config = useEtheraConfig();

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

```tsx
import { useSmartAccount } from '@ssv-labs/ethera-sdk/react';
import { composeUserOps, createAbiEncoder } from '@ssv-labs/ethera-sdk';
import { erc20Abi } from 'viem';
import { rollupA } from '@ssv-labs/ethera-sdk';
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

      // Compose and send the user operation
      const composed = await composeUserOps([
        {
          smartAccount,
          calls: [
            {
              to: '0x...', // Token address
              value: 0n,
              data: erc20.transfer({
                to: '0x...', // Recipient
                amount: 1000000000000000000n // 1 token
              })
            }
          ]
        }
      ]);

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

### Bridge Recipe for Coordinated Cross Chain Smart-Account Flows

Use `composeBridgeTransfer` when your bridge flow follows this pattern:

- A source smart account gathers or wraps the asset, then calls a source bridge contract.
- A destination smart account calls a destination bridge contract to finalize receipt.
- The destination smart account optionally pays the bridged asset out to a recipient.

This matches bridge designs where both sides participate in one composed cross-chain operation instead of treating bridging as a single contract call on the source chain.

```tsx
import { composeBridgeTransfer } from '@ssv-labs/ethera-sdk';
import { useSmartAccount } from '@ssv-labs/ethera-sdk/react';

function BridgeExample() {
  const { data: sourceSmartAccount } = useSmartAccount({ chainId: 1, multiChainIds: [1, 2] });
  const { data: destinationSmartAccount } = useSmartAccount({ chainId: 2, multiChainIds: [1, 2] });

  const send = async () => {
    if (!sourceSmartAccount || !destinationSmartAccount) {
      throw new Error('Smart accounts not ready');
    }

    const composed = await composeBridgeTransfer({
      sourceSmartAccount,
      destinationSmartAccount,
      sourceBridge: '0xSourceBridge',
      destinationBridge: '0xDestinationBridge',
      sessionId: 123n,
      recipient: '0xRecipient',
      asset: {
        kind: 'erc20',
        token: '0xToken',
        amount: 1_000_000n,
        sourceOwner: '0xUserEoa'
      }
    });

    return composed.send();
  };

  return <button onClick={send}>Bridge</button>;
}
```

Bridge caveats:

- `composeBridgeTransfer` is intentionally narrow. It targets bridges that expose paired `send(...)` and `receiveTokens(...)` entrypoints across source and destination chains. If your bridge ABI differs, use `composeUserOps` directly.
- More specifically, the helper assumes:
  - a source-side `send(otherChainId, token, sender, receiver, amount, sessionId, destBridge)` function
  - a destination-side `receiveTokens(otherChainId, sender, receiver, sessionId, srcBridge)` function
  - optional wrapped-native `deposit()` and `withdraw(uint256)` calls when bridging native assets
- If your bridge contracts use different function names, parameter ordering, extra payload fields, different receiver semantics, or direct-recipient settlement instead of destination-smart-account settlement, this helper is not the right abstraction. Build the operations manually with `composeUserOps`.
- For ERC20 bridging with `sourceOwner`, the required token allowance is from the owner EOA to the source smart account, not to the bridge. The helper does not submit that prerequisite approval transaction.
- For native bridging, the source smart account must already hold enough native token to wrap and bridge. Funding the smart account is a separate prerequisite transaction.
- The helper assumes the bridge contract semantics used by this recipe: the source side sends into the source bridge, the destination side finalizes with `receiveTokens(...)`, and the bridged funds are first credited to the destination smart account before any optional payout.
- By default (`allowancePolicy` omitted or `{ strategy: 'exact' }`), the helper adds an ERC20 `approve` call for the transfer amount. The call is skipped if the existing on-chain allowance already covers the amount. Callers that were pre-approving externally and relying on no SDK-generated approval should pass `{ strategy: 'none' }` explicitly.
- For every strategy except `none`, the helper reads the current on-chain allowance at compose time — one `eth_call` round-trip per bridge operation. If you have already issued a `maxUint256` approval and want to skip that round-trip, pass `{ strategy: 'none' }`. The allowance is checked at compose time, not execution time: a concurrent transaction or another `composeBridgeTransfer` call in the same session can deplete it before the bundle executes, and multiple calls for the same token are not coalesced.
- Only the composed source/destination user operations are atomic together. Any prerequisite approval or funding transaction happens outside that atomic bundle.
- Failure semantics are split across two stages:
  - If a prerequisite approval or funding transaction fails, the composed bridge transaction is never submitted.
  - If the composed bridge transaction is submitted but one of the source or destination user operations fails during execution, the overall composed bundle should be treated as failed. Callers should not assume the optional destination payout happened unless the composed transaction succeeds and the destination-side effects are confirmed.
- `composeBridgeTransfer` only builds the call plan. It does not inspect bridge acknowledgements, decode bridge-specific events, or add any post-execution recovery logic.

### Private-Key / Backend Flow with `encodeXtMessage`

`encodeXtMessage` is exported from the package root and can be used directly when your backend already has signed raw transactions and only needs to build the `eth_sendXTransaction` payload.

```typescript
import { encodeXtMessage } from '@ssv-labs/ethera-sdk';

const payload = encodeXtMessage({
  senderId: 'backend-service',
  entries: [
    { chainId: 42161, rawTx: '0xSignedRawTxOnArbitrum' },
    { chainId: 8453, rawTx: '0xSignedRawTxOnBase' }
  ]
});

await publicClient.request({
  method: 'eth_sendXTransaction',
  params: [payload]
});
```

## API Reference

### `createEtheraConfig`

Creates an Ethera configuration instance.

```typescript
import { createEtheraConfig } from '@ssv-labs/ethera-sdk';

function createEtheraConfig<TConfig extends Config>(
  props: EtheraConfigArgs<TConfig>
): EtheraConfigReturnType<TConfig>;
```

**Parameters:**

- `wagmi`: Wagmi config instance
- `accountAbstractionContracts`: Mapping of chain IDs to contract addresses
- `getPaymasterEndpoint?`: Optional function to get paymaster endpoints

**Returns:** Ethera configuration object

### React Hooks

#### `EtheraProvider`

React context provider for Ethera configuration. Must wrap your app to use other hooks.

```typescript
import { EtheraProvider } from '@ssv-labs/ethera-sdk/react';

function EtheraProvider<TConfig extends Config>({ children, config }: EtheraProviderProps<TConfig>): ReactElement;
```

**Props:**

- `config`: Ethera configuration object created with `createEtheraConfig`
- `children`: React children

#### `useEtheraConfig`

Hook to access Ethera configuration from context. Must be used within an `EtheraProvider`.

```typescript
import { useEtheraConfig } from '@ssv-labs/ethera-sdk/react';

function useEtheraConfig<TConfig extends Config>(): EtheraConfigReturnType<TConfig>;
```

**Returns:** Ethera configuration object

**Throws:** Error if used outside of `EtheraProvider`

### `composeBridgeTransfer`

Scoped recipe for Compose-style bridge flows that build source and destination user operations together.

```typescript
import { composeBridgeTransfer } from '@ssv-labs/ethera-sdk';

await composeBridgeTransfer({
  sourceSmartAccount,
  destinationSmartAccount,
  sourceBridge: '0x...',
  destinationBridge: '0x...',
  sessionId: 1n,
  recipient: '0x...', // optional, defaults to the destination smart account
  asset: {
    kind: 'erc20',
    token: '0x...',
    amount: 1n,
    sourceOwner: '0x...' // optional, adds transferFrom(owner -> source smart account)
  }
});
```

For native assets, pass:

```typescript
asset: {
  kind: 'native',
  amount: 1n,
  wrappedToken: '0x...'
}
```

### `encodeXtMessage`

Low-level utility that encodes multiple signed raw transactions into the XT payload consumed by `eth_sendXTransaction`.

```typescript
import { encodeXtMessage } from '@ssv-labs/ethera-sdk';

const payload = encodeXtMessage({
  senderId: 'client',
  entries: [{ chainId: 1, rawTx: '0x...' }]
});
```

#### `useSmartAccount`

Hook to create and access a smart account. Returns a React Query result with the smart account data.

```typescript
import { useSmartAccount } from '@ssv-labs/ethera-sdk/react';

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
import { createAbiEncoder } from '@ssv-labs/ethera-sdk';
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

Default high-level helper for atomic single-chain or cross-chain execution.

```typescript
import { composeUserOps } from '@ssv-labs/ethera-sdk';

const composed = await composeUserOps([
  {
    smartAccount: smartAccountA,
    calls: [
      {
        to: '0x...',
        data: '0x...'
      },
      {
        to: '0x...',
        value: 0n,
        data: '0x...'
      }
    ]
  },
  {
    smartAccount: smartAccountB,
    calls: [
      {
        to: '0x...',
        value: 0n,
        data: '0x...'
      }
    ]
  }
]);

const result = await composed.send();
const receipts = await result.wait();
```

`composeUserOps` is the recommended default entrypoint. Use it when you have smart accounts and want the SDK to handle user-op creation, signing, XT payload encoding, and submission in one path.

**Parameters:**

- `operations`: Array of operations to compose. Each operation contains:
  - `smartAccount`: Object returned by `createSmartAccount` or `useSmartAccount`
  - `calls`: Array of calls for that chain. `value` is optional and defaults to `0n`.
- `options?`: Optional callbacks:
  - `onBuild?`: Called per built transaction with normalized operation metadata and build output
  - `onSign?`: Called per signed user operation with normalized operation metadata
  - `onSigned?`: Called when operations are signed
  - `onComposed?`: Called when transactions are built
  - `onPayloadEncoded?`: Called when the XT payload is encoded
  - `onSubmit?`: Called after `eth_sendXTransaction` accepts the payload
  - `onReceipt?`: Called per transaction receipt after `wait()`

**Validation:**

- Rejects empty operation arrays with `OPERATIONS_EMPTY`
- Rejects operations without calls with `CALLS_EMPTY`
- Rejects non-compatible smart account objects with `SMART_ACCOUNT_INVALID`
- Rejects chain mismatches between account and public client with `CHAIN_ID_MISMATCH`
- Rejects duplicate same-chain same-account plans with `COMPOSE_OPERATION_DUPLICATE`
- Rejects ambiguous same-chain plans without distinct account addresses with `COMPOSE_OPERATION_AMBIGUOUS`

**Returns:** Same base return shape as `composeUnpreparedUserOps`, plus:

- `sessionId`: Stable identifier for this compose session
- `operations`: Normalized per-operation metadata with `operationIndex`, `chainId`, `hash`, `explorerUrl`, and `operationId`

**Structured error handling:**

```typescript
import { composeUserOps, isEtheraError } from '@ssv-labs/ethera-sdk';

try {
  const composed = await composeUserOps(plan);
  await (await composed.send()).wait();
} catch (error) {
  if (isEtheraError(error)) {
    console.error(error.code, error.details);
  }

  throw error;
}
```

**Callback example:**

```typescript
const composed = await composeUserOps(plan, {
  onSign: ({ operationIndex, chainId }) => {
    console.log('Signed', operationIndex, chainId);
  },
  onBuild: ({ operationIndex, hash }) => {
    console.log('Built', operationIndex, hash);
  },
  onSubmit: ({ sessionId, hashes }) => {
    console.log('Submitted', sessionId, hashes);
  },
  onReceipt: ({ operationIndex, receipt }) => {
    console.log('Receipt', operationIndex, receipt.status);
  }
});
```

#### `validateComposePlan`

Pure local preflight for the default `composeUserOps` path.

```typescript
import { validateComposePlan } from '@ssv-labs/ethera-sdk';

const preflight = validateComposePlan(plan, {
  config: etheraConfig
});

console.log(preflight.sessionId);
console.log(preflight.operations);
```

It validates account readiness, chain readiness, duplicate/ambiguous plans, and paymaster endpoint readiness without estimating gas, signing, or sending network requests. A `simulateCompose` helper is intentionally not exposed yet because stateful sponsorship and execution simulation would introduce different RPC-side behavior than the actual compose flow.

#### `composeUnpreparedUserOps`

Lower-level helper for composing objects already returned by `createUserOp`.

Composes multiple user operations for atomic cross-chain execution.

```typescript
import { composeUnpreparedUserOps } from '@ssv-labs/ethera-sdk';

// Create user operations first
const userOp1 = await smartAccountA.account.createUserOp([/* calls */]);
const userOp2 = await smartAccountB.account.createUserOp([/* calls */]);

// Then compose them - createUserOp returns everything needed (account, publicClient, userOp, etc.)
const composed = await composeUnpreparedUserOps([userOp1, userOp2]);

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
  - `onBuild?`: Called per built transaction
  - `onSign?`: Called per signed user operation
  - `onSigned?`: Called when operations are signed
  - `onComposed?`: Called when transactions are built
  - `onPayloadEncoded?`: Called when payload is encoded
  - `onSubmit?`: Called after submission
  - `onReceipt?`: Called per receipt

**Returns:** Object with:

- `sessionId`: Stable identifier for this compose session
- `payload`: Encoded XT message
- `builds`: Array of transaction builds
- `explorerUrls`: Array of explorer URLs for each transaction
- `operations`: Normalized per-operation metadata
- `send()`: Function that sends the transactions and returns:
  - `sessionId`: Stable identifier for this compose session
  - `hashes`: Array of transaction hashes
  - `operations`: Normalized per-operation metadata
  - `wait()`: Function that waits for all transaction receipts

## Configuration Details

### Account Abstraction Contracts

Each chain requires the following contract addresses:

```typescript
type AccountAbstractionContracts = {
  kernelImpl: `0x${string}`; // Kernel implementation address
  kernelFactory: `0x${string}`; // Kernel factory address
  multichainValidator: `0x${string}`; // Multi-chain validator address
};
```

### Paymaster Setup

To enable paymaster support, provide a `getPaymasterEndpoint` function:

```typescript
const etheraConfig = createEtheraConfig({
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

- `rollupA` (Chain ID: 555555)
- `rollupB` (Chain ID: 666666)

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
import { createAbiEncoder } from '@ssv-labs/ethera-sdk';
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

- [`src/__tests__/react/ethera-provider.test.tsx`](src/__tests__/react/ethera-provider.test.tsx) - React integration example

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
