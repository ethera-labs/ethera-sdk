import { Abi } from 'abitype';
import { AbiFunction } from 'abitype';
import { AbiParameter } from 'abitype';
import { AbiParametersToPrimitiveTypes } from 'abitype';
import { AbiParameterToPrimitiveType } from 'abitype';
import { AbiType } from 'abitype';
import { AbiTypeToPrimitiveType } from 'abitype';
import { Address } from 'viem';
import { Chain } from 'viem';
import { ChainContract } from 'viem';
import { ChainFees } from 'viem';
import { ChainSerializers } from 'viem';
import { Config } from '@wagmi/core';
import { CreateKernelAccountReturnType } from '@zerodev/sdk';
import { EntryPointType } from '@zerodev/sdk/types';
import { EntryPointVersion } from 'viem/account-abstraction';
import { ExtractAbiFunction } from 'abitype';
import { ExtractAbiFunctionNames } from 'abitype';
import { ExtractAbiFunctions } from 'abitype';
import { Hex } from 'viem';
import { KernelValidator } from '@zerodev/sdk/types';
import { PaymasterActions } from 'viem/account-abstraction';
import { PrepareUserOperationReturnType } from 'viem/account-abstraction';
import { PublicClient } from 'viem';
import { Signer } from '@zerodev/sdk/types';
import { SignUserOperationsRequest } from '@zerodev/multi-chain-ecdsa-validator';
import { SmartAccount } from 'viem/account-abstraction';
import { TransactionReceipt } from 'viem';
import { TransactionSerializable } from 'viem';
import { Transport } from 'viem';

export declare type AbiEncoder<T extends AbiFunction[]> = {
    [Fn in T[number] as Fn['name']]: Fn['inputs'] extends readonly [] ? () => Hex : (params: AbiInputsToParams<Fn['inputs']>) => Hex;
};

export declare type AbiInputsToParams<T extends readonly AbiParameter[]> = {
    [K in T[number] as K['name'] extends string ? K['name'] : never]: AbiParameterToPrimitiveType<K>;
};

export declare const ACCOUNT_ABSTRACTION_CONTRACT_FIELDS: readonly ["kernelImpl", "kernelFactory", "multichainValidator"];

export declare type AccountAbstractionContractField = (typeof ACCOUNT_ABSTRACTION_CONTRACT_FIELDS)[number];

export declare type AccountAbstractionContracts = Record<AccountAbstractionContractField, `0x${string}`>;

export declare const bigintAbs: (n: bigint) => bigint;

export declare const bigintFloor: (value: bigint, precision?: bigint) => bigint;

export declare const bigintFormatter: Intl.NumberFormat;

export declare const bigintifyNumbers: (numbers: readonly number[] | number[]) => bigint[];

export declare const bigintMax: (...args: bigint[]) => bigint;

export declare const bigintMin: (...args: bigint[]) => bigint;

export declare const bigintRound: (value: bigint, precision: bigint) => bigint;

declare type ComposeConfigArgs<TConfig extends Config> = {
    wagmi: TConfig;
    getPaymasterEndpoint?: (args: PaymasterEndpointArgs<TConfig>) => string;
    accountAbstractionContracts: Partial<Record<TConfig['chains'][number]['id'], AccountAbstractionContracts>>;
};

export declare type ComposeConfigReturnType<TConfig extends Config = Config> = {
    getPublicClient: (chainId: TConfig['chains'][number]['id']) => PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
    hasPaymaster: boolean;
    entryPoint: EntryPointType<EntryPointVersion>;
} & Pick<ComposeConfigArgs<TConfig>, 'getPaymasterEndpoint' | 'accountAbstractionContracts'>;

export declare interface ComposedSignedUserOpsTxReturnType {
    raw: Hex;
    hash: Hex;
    to: Address;
    chainId: number;
    gas: Hex;
    maxFeePerGas: Hex;
    maxPriorityFeePerGas: Hex;
    userOpHashes: Hex[];
}

export declare class ComposeError extends Error {
    readonly code: ComposeErrorCode;
    readonly details?: ComposeErrorDetails;
    readonly cause?: unknown;
    constructor(code: ComposeErrorCode, message: string, options?: ComposeErrorOptions);
}

export declare type ComposeErrorCode = 'ACCOUNT_ABSTRACTION_CONTRACTS_MISSING' | 'ACCOUNT_ABSTRACTION_CONTRACT_FIELD_MISSING' | 'ACCOUNT_ABSTRACTION_CONTRACT_ADDRESS_INVALID' | 'OPERATIONS_EMPTY' | 'PUBLIC_CLIENT_NOT_FOUND' | 'WALLET_CLIENT_NOT_AVAILABLE';

export declare type ComposeErrorDetails = {
    chainId?: number;
    field?: string;
    method?: string;
    value?: string;
};

declare type ComposeErrorOptions = {
    cause?: unknown;
    details?: ComposeErrorDetails;
};

export declare const composePreparedUserOps: (operations: ComposePreparedUserOpsParams, options?: ComposeUserOpsOptions) => Promise<{
    payload: `0x${string}`;
    builds: ComposedSignedUserOpsTxReturnType[];
    explorerUrls: string[];
    send: () => Promise<{
        hashes: `0x${string}`[];
        wait: () => Promise<TransactionReceipt[]>;
    }>;
}>;

declare type ComposePreparedUserOpsParams = {
    account: CreateKernelAccountReturnType;
    publicClient: PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
    userOp: SignUserOperationsRequest;
}[];

export declare type ComposeRpcSchema = [
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

export declare const composeSignedUserOps: (operations: composeSignedUserOpsParams, options?: ComposeUserOpsOptions) => Promise<{
    payload: `0x${string}`;
    builds: ComposedSignedUserOpsTxReturnType[];
    explorerUrls: string[];
    send: () => Promise<{
        hashes: `0x${string}`[];
        wait: () => Promise<TransactionReceipt[]>;
    }>;
}>;

export declare type composeSignedUserOpsParams = {
    signedCanonicalOps: ReturnType<typeof toRpcUserOpCanonical>;
    publicClient: PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
}[];

export declare type ComposeSmartAccount = CreateKernelAccountReturnType & {
    createUserOp: (calls: UserOPCall[]) => Promise<{
        account: CreateKernelAccountReturnType;
        signer: Signer;
        chainId: number;
        publicClient: PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
        userOp: Awaited<ReturnType<typeof createUserOps>>;
    }>;
};

export declare const composeUnpreparedUserOps: (operations: ComposeUnpreparedUserOpsParams, options?: ComposeUserOpsOptions) => Promise<{
    payload: `0x${string}`;
    builds: ComposedSignedUserOpsTxReturnType[];
    explorerUrls: string[];
    send: () => Promise<{
        hashes: `0x${string}`[];
        wait: () => Promise<TransactionReceipt[]>;
    }>;
}>;

declare type ComposeUnpreparedUserOpsParams = {
    account: CreateKernelAccountReturnType;
    publicClient: PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
    userOp: CreateUserOPReturnType;
}[];

export declare type ComposeUserOpsOptions = {
    onSigned?: (signedOps: ReturnType<typeof toRpcUserOpCanonical>[]) => void;
    onComposed?: (builds: ComposedSignedUserOpsTxReturnType[], explorerUrls: string[]) => void;
    onPayloadEncoded?: (payload: Hex) => void;
};

declare type ContractsByChain<TChainId extends number = number> = Partial<Record<TChainId, Partial<Record<AccountAbstractionContractField, `0x${string}`>>>>;

export declare const createAbiEncoder: <T extends Abi = Abi>(abi: T) => AbiEncoder<ExtractAbiFunctions<T, "nonpayable" | "payable">[]>;

export declare function createComposeConfig<TConfig extends Config>(props: ComposeConfigArgs<TConfig>): ComposeConfigReturnType<TConfig>;

export declare const createSmartAccount: ({ signer, chainId, multiChainIds }: Props, config: ComposeConfigReturnType) => Promise<CreateSmartAccountReturnType>;

export declare interface CreateSmartAccountReturnType {
    validator: KernelValidator<'MultiChainECDSAValidator'>;
    account: ComposeSmartAccount;
    signer: Signer;
    publicClient: PublicClient<Transport, Chain, SmartAccount, ComposeRpcSchema>;
}

export declare type CreateUserOPReturnType = Awaited<ReturnType<typeof createUserOps>>;

export declare const createUserOps: (config: ComposeConfigReturnType, account: CreateKernelAccountReturnType<"0.7">, calls: UserOPCall[]) => Promise<{
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

export declare function encodeXtMessage(params: {
    senderId?: string;
    entries: Array<{
        chainId: number | bigint;
        rawTx: Hex;
    }>;
}): Hex;

export declare const entryPointV07: EntryPointType<"0.7">;

export declare const ethFormatter: Intl.NumberFormat;

export declare const extractAbiFunction: <abi extends Abi, functionName extends ExtractAbiFunctionNames<abi>>(abi: abi, functionName: functionName) => ExtractAbiFunction<abi, functionName>;

export declare const formatBigintInput: (num: bigint, decimals?: number) => string;

export declare const formatSSV: (num: bigint, decimals?: number) => string;

export declare const getAccountAbstractionContractsForChain: <TChainId extends number>(accountAbstractionContracts: ContractsByChain<TChainId>, chainId: TChainId) => AccountAbstractionContracts;

export declare const globals: {
    MAX_WEI_AMOUNT: bigint;
};

/**
 * Checks if the difference between two bigints exceeds a specified tolerance.
 *
 * @param {bigint} a - The first bigint value.
 * @param {bigint} b - The second bigint value.
 * @param {bigint} [tolerance] - default is `parseUnits("0.0001", 18)`.
 */
export declare const isBigIntChanged: (a: bigint, b: bigint, tolerance?: bigint) => boolean;

export declare const isComposeError: (error: unknown) => error is ComposeError;

export declare const ms: (value: number, unit: keyof typeof units) => number;

declare type NoBigints<T> = {
    [K in keyof T]: T[K] extends bigint ? string : T[K] extends bigint ? NoBigints<T[K]> : T[K];
};

export declare const numberFormatter: Intl.NumberFormat;

export declare const paramsToArray: <Fn extends AbiFunction, Params extends Record<string, AbiTypeToPrimitiveType<AbiType>>>({ params, abiFunction }: {
    params: Params;
    abiFunction: Fn;
}) => AbiParametersToPrimitiveTypes<Fn["inputs"]>;

declare type PaymasterEndpointArgs<TConfig extends Config> = {
    method: 'pm_getPaymasterStubData' | 'pm_getPaymasterData' | 'pm_sponsorUserOperation';
    chainId: TConfig['chains'][number]['id'];
};

export declare const percentageFormatter: {
    format: (value?: number) => string;
};

export declare const _percentageFormatter: Intl.NumberFormat;

export declare type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

declare type Props = {
    chainId: number;
    multiChainIds?: number[];
    signer: Signer;
};

export declare const rollupA: {
    blockExplorers: {
        readonly default: {
            readonly name: "Rollup A";
            readonly url: "https://rollup-a-altda.explorer.sepolia.ethera-labs.io/";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts?: {
        [x: string]: ChainContract | {
            [sourceId: number]: ChainContract | undefined;
        } | undefined;
        ensRegistry?: ChainContract | undefined;
        ensUniversalResolver?: ChainContract | undefined;
        multicall3?: ChainContract | undefined;
        erc6492Verifier?: ChainContract | undefined;
    } | undefined;
    ensTlds?: readonly string[] | undefined;
    id: 555555;
    name: "Rollup A";
    nativeCurrency: {
        readonly name: "Ethereum";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-a-altda.sepolia.ethera-labs.io/"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: ChainSerializers<undefined, TransactionSerializable> | undefined;
    readonly iconBackground: "none";
    readonly iconUrl: "/images/networks/light.svg";
};

export declare const rollupB: {
    blockExplorers: {
        readonly default: {
            readonly name: "Rollup B";
            readonly url: "https://rollup-b-altda.explorer.sepolia.ethera-labs.io/";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts?: {
        [x: string]: ChainContract | {
            [sourceId: number]: ChainContract | undefined;
        } | undefined;
        ensRegistry?: ChainContract | undefined;
        ensUniversalResolver?: ChainContract | undefined;
        multicall3?: ChainContract | undefined;
        erc6492Verifier?: ChainContract | undefined;
    } | undefined;
    ensTlds?: readonly string[] | undefined;
    id: 666666;
    name: "Rollup B";
    nativeCurrency: {
        readonly name: "Ethereum";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-b-altda.sepolia.ethera-labs.io/"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: ChainSerializers<undefined, TransactionSerializable> | undefined;
    readonly iconBackground: "none";
    readonly iconUrl: "/images/networks/light.svg";
};

export declare const rollupsAccountAbstractionContracts: {
    readonly kernelImpl: "0xBAC849bB641841b44E965fB01A4Bf5F074f84b4D";
    readonly kernelFactory: "0xaac5D4240AF87249B3f71BC8E4A2cae074A3E419";
    readonly multichainValidator: "0x37CE732412539644b3d0E959925a4f89edd463c9";
};

export declare const roundOperatorFee: (fee: bigint, precision?: bigint) => bigint;

export declare const sortNumbers: <T extends bigint | number>(numbers: T[]) => T[];

/**
 * Converts bigints to strings in an object or array.
 * @param anything - The object or array to convert.
 * @returns A new object or array with bigints converted to strings.
 * @example
 * stringifyBigints(1n) → "1"
 * stringifyBigints([1n]) → ["1"]
 * stringifyBigints({a: 1n, b: { c: 1n }}) → {a: "1", b: {c: "1"}}
 */
export declare const stringifyBigints: <T>(anything: T) => NoBigints<T>;

export declare function toRpcUserOpCanonical(op: PrepareUserOperationReturnType): {
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

export declare const tryCatch: <T>(fn: () => T) => [T | null, Error | null];

declare const units: {
    readonly seconds: 1000;
    readonly minutes: 60000;
    readonly hours: 3600000;
    readonly days: 86400000;
    readonly weeks: 604800000;
    readonly months: 2629746000;
    readonly years: 31556952000;
};

export declare type UserOPCall = {
    to: Address;
    value: bigint;
    data: Hex;
};

export declare const validateAccountAbstractionContracts: <TChainId extends number>(chainIds: readonly TChainId[], accountAbstractionContracts: ContractsByChain<TChainId>) => void;

export { }
