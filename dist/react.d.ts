import { Address } from 'viem';
import { Chain } from 'viem';
import { Config } from '@wagmi/core';
import { CreateKernelAccountReturnType } from '@zerodev/sdk';
import { EntryPointType } from '@zerodev/sdk/types';
import { EntryPointVersion } from 'viem/account-abstraction';
import { Hex } from 'viem';
import { KernelValidator } from '@zerodev/sdk/types';
import { PaymasterActions } from 'viem/account-abstraction';
import { PrepareUserOperationReturnType } from 'viem/account-abstraction';
import { PublicClient } from 'viem';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { Signer } from '@zerodev/sdk/types';
import { SmartAccount } from 'viem/account-abstraction';
import { Transport } from 'viem';
import { UseQueryResult } from '@tanstack/react-query';

declare type AccountAbstractionContracts = {
    kernelImpl: `0x${string}`;
    kernelFactory: `0x${string}`;
    multichainValidator: `0x${string}`;
};

declare type ComposeConfigArgs<TConfig extends Config> = {
    wagmi: TConfig;
    getPaymasterEndpoint?: (args: PaymasterEndpointArgs<TConfig>) => string;
    accountAbstractionContracts: Partial<Record<TConfig['chains'][number]['id'], AccountAbstractionContracts>>;
};

declare type ComposeConfigReturnType<TConfig extends Config = Config> = {
    getPublicClient: (chainId: TConfig['chains'][number]['id']) => PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
    hasPaymaster: boolean;
    entryPoint: EntryPointType<EntryPointVersion>;
} & Pick<ComposeConfigArgs<TConfig>, 'getPaymasterEndpoint' | 'accountAbstractionContracts'>;

declare type ComposeContextValue<TConfig extends Config> = ComposeConfigReturnType<TConfig>;

declare interface ComposedSignedUserOpsTxReturnType {
    raw: Hex;
    hash: Hex;
    to: Address;
    chainId: number;
    gas: Hex;
    maxFeePerGas: Hex;
    maxPriorityFeePerGas: Hex;
    userOpHashes: Hex[];
}

export declare function ComposeProvider<TConfig extends Config>({ children, config }: ComposeProviderProps<TConfig>): ReactElement;

export declare interface ComposeProviderProps<TConfig extends Config> {
    children: ReactNode;
    config: ComposeConfigReturnType<TConfig>;
}

declare type ComposeRpcSchema = [
    {
    Method: 'eth_sendXTransaction';
    Parameters: [string];
    ReturnType: null;
},
    {
    Method: 'compose_buildSignedUserOpsTx';
    Parameters: [ReturnType<typeof toRpcUserOpCanonical>[], {
        chainId: number;
    }];
    ReturnType: ComposedSignedUserOpsTxReturnType;
}
];

declare type ComposeSmartAccount = CreateKernelAccountReturnType & {
    createUserOp: (calls: UserOPCall[]) => Promise<{
        account: CreateKernelAccountReturnType;
        signer: Signer;
        chainId: number;
        publicClient: PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
        userOp: Awaited<ReturnType<typeof createUserOps>>;
    }>;
};

declare interface CreateSmartAccountReturnType {
    validator: KernelValidator<'MultiChainECDSAValidator'>;
    account: ComposeSmartAccount;
    signer: Signer;
    publicClient: PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
}

declare const createUserOps: (config: ComposeConfigReturnType, account: CreateKernelAccountReturnType<"0.7">, calls: UserOPCall[]) => Promise<{
    paymaster?: PaymasterActions | undefined;
    account: CreateKernelAccountReturnType<"0.7">;
    chainId: number;
    callData: `0x${string}`;
    callGasLimit: bigint;
    verificationGasLimit: bigint;
    preVerificationGas: bigint;
    maxFeePerGas: bigint;
    maxPriorityFeePerGas: bigint;
}>;

declare type PaymasterEndpointArgs<TConfig extends Config> = {
    method: 'pm_getPaymasterStubData' | 'pm_getPaymasterData' | 'pm_sponsorUserOperation';
    chainId: TConfig['chains'][number]['id'];
};

declare type Props = {
    chainId: number;
    multiChainIds?: number[];
};

declare function toRpcUserOpCanonical(op: PrepareUserOperationReturnType): {
    sender: `0x${string}`;
    nonce: `0x${string}`;
    initCode: `0x${string}`;
    factory: `0x${string}` | undefined;
    factoryData: `0x${string}` | undefined;
    callData: `0x${string}`;
    callGasLimit: `0x${string}`;
    verificationGasLimit: `0x${string}`;
    preVerificationGas: `0x${string}`;
    maxFeePerGas: `0x${string}`;
    maxPriorityFeePerGas: `0x${string}`;
    paymaster: true | `0x${string}` | {
        getPaymasterData?: PaymasterActions["getPaymasterData"] | undefined;
        getPaymasterStubData?: PaymasterActions["getPaymasterStubData"] | undefined;
    } | ({
        getPaymasterData?: PaymasterActions["getPaymasterData"] | undefined;
        getPaymasterStubData?: PaymasterActions["getPaymasterStubData"] | undefined;
    } & `0x${string}`) | undefined;
    paymasterData: `0x${string}` | undefined;
    paymasterVerificationGasLimit: `0x${string}`;
    paymasterPostOpGasLimit: `0x${string}`;
    signature: `0x${string}`;
};

export declare function useComposeConfig<TConfig extends Config>(): ComposeContextValue<TConfig>;

declare type UserOPCall = {
    to: Address;
    value: bigint;
    data: Hex;
};

export declare const useSmartAccount: ({ chainId, multiChainIds }: Props) => UseQueryResult<CreateSmartAccountReturnType, Error>;

export { }
