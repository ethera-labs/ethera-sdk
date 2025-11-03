import { Abi } from 'abitype';
import { AbiFunction } from 'abitype';
import { AbiParameter } from 'abitype';
import { AbiParametersToPrimitiveTypes } from 'abitype';
import { AbiParameterToPrimitiveType } from 'abitype';
import { AbiType } from 'abitype';
import { AbiTypeToPrimitiveType } from 'abitype';
import { AccessList } from 'viem';
import { Address } from 'viem';
import { ChainContract } from 'viem';
import { ChainFees } from 'viem';
import { ChainSerializers } from 'viem';
import { Config } from '@wagmi/core';
import { CreateKernelAccountReturnType } from '@zerodev/sdk';
import { EntryPointType } from '@zerodev/sdk/types';
import { ExtractAbiFunction } from 'abitype';
import { ExtractAbiFunctionNames } from 'abitype';
import { ExtractAbiFunctions } from 'abitype';
import { Hash } from 'viem';
import { Hex } from 'viem';
import { Log } from 'viem';
import { OpStackRpcBlock } from 'viem/chains';
import { OpStackRpcTransaction } from 'viem/chains';
import { OpStackRpcTransactionReceipt } from 'viem/chains';
import { OpStackTransaction } from 'viem/chains';
import { PaymasterActions } from 'viem/account-abstraction';
import { PrepareUserOperationReturnType } from 'viem/account-abstraction';
import { PublicClient } from 'viem';
import { serializeTransactionOpStack } from 'viem/chains';
import { SignedAuthorizationList } from 'viem';
import { TransactionSerializable } from 'viem';
import { TransactionType } from 'viem';
import { Withdrawal } from 'viem';

export declare type AbiEncoder<T extends AbiFunction[]> = {
    [Fn in T[number] as Fn['name']]: Fn['inputs'] extends readonly [] ? () => Hex : (params: AbiInputsToParams<Fn['inputs']>) => Hex;
};

export declare type AbiInputsToParams<T extends readonly AbiParameter[]> = {
    [K in T[number] as K['name'] extends string ? K['name'] : never]: AbiParameterToPrimitiveType<K>;
};

declare type AccountAbstractionContracts = {
    kernelImpl: `0x${string}`;
    kernelFactory: `0x${string}`;
    multichainValidator: `0x${string}`;
    metaFactory: `0x${string}`;
};

export declare const arbitrum: {
    rpcUrls: {
        default: {
            http: string[];
        };
    };
    blockExplorers: {
        readonly default: {
            readonly name: "Arbiscan";
            readonly url: "https://arbiscan.io";
            readonly apiUrl: "https://api.arbiscan.io/api";
        };
    };
    blockTime: 250;
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 7654707;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 42161;
    name: "Arbitrum One";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: ChainSerializers<undefined, TransactionSerializable> | undefined;
};

export declare const base: {
    rpcUrls: {
        default: {
            http: string[];
        };
    };
    blockExplorers: {
        readonly default: {
            readonly name: "Basescan";
            readonly url: "https://basescan.org";
            readonly apiUrl: "https://api.basescan.org/api";
        };
    };
    blockTime: 2000;
    contracts: {
        readonly disputeGameFactory: {
            readonly 1: {
                readonly address: "0x43edB88C4B80fDD2AdFF2412A7BebF9dF42cB40e";
            };
        };
        readonly l2OutputOracle: {
            readonly 1: {
                readonly address: "0x56315b90c40730925ec5485cf004d835058518A0";
            };
        };
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 5022;
        };
        readonly portal: {
            readonly 1: {
                readonly address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e";
                readonly blockCreated: 17482143;
            };
        };
        readonly l1StandardBridge: {
            readonly 1: {
                readonly address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35";
                readonly blockCreated: 17482143;
            };
        };
        readonly gasPriceOracle: {
            readonly address: "0x420000000000000000000000000000000000000F";
        };
        readonly l1Block: {
            readonly address: "0x4200000000000000000000000000000000000015";
        };
        readonly l2CrossDomainMessenger: {
            readonly address: "0x4200000000000000000000000000000000000007";
        };
        readonly l2Erc721Bridge: {
            readonly address: "0x4200000000000000000000000000000000000014";
        };
        readonly l2StandardBridge: {
            readonly address: "0x4200000000000000000000000000000000000010";
        };
        readonly l2ToL1MessagePasser: {
            readonly address: "0x4200000000000000000000000000000000000016";
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 8453;
    name: "Base";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    sourceId: 1;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: ChainFees<undefined> | undefined;
    formatters: {
        readonly block: {
            exclude: [] | undefined;
            format: (args: OpStackRpcBlock, action?: string | undefined) => {
                baseFeePerGas: bigint | null;
                blobGasUsed: bigint;
                difficulty: bigint;
                excessBlobGas: bigint;
                extraData: Hex;
                gasLimit: bigint;
                gasUsed: bigint;
                hash: `0x${string}` | null;
                logsBloom: `0x${string}` | null;
                miner: Address;
                mixHash: Hash;
                nonce: `0x${string}` | null;
                number: bigint | null;
                parentBeaconBlockRoot?: `0x${string}` | undefined;
                parentHash: Hash;
                receiptsRoot: Hex;
                sealFields: Hex[];
                sha3Uncles: Hash;
                size: bigint;
                stateRoot: Hash;
                timestamp: bigint;
                totalDifficulty: bigint | null;
                transactions: `0x${string}`[] | OpStackTransaction<boolean>[];
                transactionsRoot: Hash;
                uncles: Hash[];
                withdrawals?: Withdrawal[] | undefined | undefined;
                withdrawalsRoot?: `0x${string}` | undefined;
            } & {};
            type: "block";
        };
        readonly transaction: {
            exclude: [] | undefined;
            format: (args: OpStackRpcTransaction, action?: string | undefined) => ({
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: Address;
                gas: bigint;
                hash: Hash;
                input: Hex;
                nonce: number;
                r: Hex;
                s: Hex;
                to: Address | null;
                transactionIndex: number | null;
                typeHex: Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                gasPrice?: undefined | undefined;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                isSystemTx?: boolean;
                mint?: bigint | undefined | undefined;
                sourceHash: Hex;
                type: "deposit";
            } | {
                r: Hex;
                s: Hex;
                v: bigint;
                value: bigint;
                gas: bigint;
                to: Address | null;
                from: Address;
                nonce: number;
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                transactionIndex: number | null;
                hash: Hash;
                input: Hex;
                typeHex: Hex | null;
                accessList?: undefined | undefined;
                authorizationList?: undefined | undefined;
                blobVersionedHashes?: undefined | undefined;
                chainId?: number | undefined;
                yParity?: undefined | undefined;
                type: "legacy";
                gasPrice: bigint;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas?: undefined | undefined;
                maxPriorityFeePerGas?: undefined | undefined;
                isSystemTx?: undefined | undefined;
                mint?: undefined | undefined;
                sourceHash?: undefined | undefined;
            } | {
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: Address;
                gas: bigint;
                hash: Hash;
                input: Hex;
                nonce: number;
                r: Hex;
                s: Hex;
                to: Address | null;
                transactionIndex: number | null;
                typeHex: Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                accessList: AccessList;
                authorizationList?: undefined | undefined;
                blobVersionedHashes?: undefined | undefined;
                chainId: number;
                type: "eip2930";
                gasPrice: bigint;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas?: undefined | undefined;
                maxPriorityFeePerGas?: undefined | undefined;
                isSystemTx?: undefined | undefined;
                mint?: undefined | undefined;
                sourceHash?: undefined | undefined;
            } | {
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: Address;
                gas: bigint;
                hash: Hash;
                input: Hex;
                nonce: number;
                r: Hex;
                s: Hex;
                to: Address | null;
                transactionIndex: number | null;
                typeHex: Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                accessList: AccessList;
                authorizationList?: undefined | undefined;
                blobVersionedHashes?: undefined | undefined;
                chainId: number;
                type: "eip1559";
                gasPrice?: undefined | undefined;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                isSystemTx?: undefined | undefined;
                mint?: undefined | undefined;
                sourceHash?: undefined | undefined;
            } | {
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: Address;
                gas: bigint;
                hash: Hash;
                input: Hex;
                nonce: number;
                r: Hex;
                s: Hex;
                to: Address | null;
                transactionIndex: number | null;
                typeHex: Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                accessList: AccessList;
                authorizationList?: undefined | undefined;
                blobVersionedHashes: readonly Hex[];
                chainId: number;
                type: "eip4844";
                gasPrice?: undefined | undefined;
                maxFeePerBlobGas: bigint;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                isSystemTx?: undefined | undefined;
                mint?: undefined | undefined;
                sourceHash?: undefined | undefined;
            } | {
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: Address;
                gas: bigint;
                hash: Hash;
                input: Hex;
                nonce: number;
                r: Hex;
                s: Hex;
                to: Address | null;
                transactionIndex: number | null;
                typeHex: Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                accessList: AccessList;
                authorizationList: SignedAuthorizationList;
                blobVersionedHashes?: undefined | undefined;
                chainId: number;
                type: "eip7702";
                gasPrice?: undefined | undefined;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                isSystemTx?: undefined | undefined;
                mint?: undefined | undefined;
                sourceHash?: undefined | undefined;
            }) & {};
            type: "transaction";
        };
        readonly transactionReceipt: {
            exclude: [] | undefined;
            format: (args: OpStackRpcTransactionReceipt, action?: string | undefined) => {
                blobGasPrice?: bigint | undefined;
                blobGasUsed?: bigint | undefined;
                blockHash: Hash;
                blockNumber: bigint;
                contractAddress: Address | null | undefined;
                cumulativeGasUsed: bigint;
                effectiveGasPrice: bigint;
                from: Address;
                gasUsed: bigint;
                logs: Log<bigint, number, false>[];
                logsBloom: Hex;
                root?: `0x${string}` | undefined;
                status: "success" | "reverted";
                to: Address | null;
                transactionHash: Hash;
                transactionIndex: number;
                type: TransactionType;
                l1GasPrice: bigint | null;
                l1GasUsed: bigint | null;
                l1Fee: bigint | null;
                l1FeeScalar: number | null;
            } & {};
            type: "transactionReceipt";
        };
    };
    serializers: {
        readonly transaction: serializeTransactionOpStack;
    };
};

export declare const bigintAbs: (n: bigint) => bigint;

export declare const bigintFloor: (value: bigint, precision?: bigint) => bigint;

export declare const bigintFormatter: Intl.NumberFormat;

export declare const bigintifyNumbers: (numbers: readonly number[] | number[]) => bigint[];

export declare const bigintMax: (...args: bigint[]) => bigint;

export declare const bigintMin: (...args: bigint[]) => bigint;

export declare const bigintRound: (value: bigint, precision: bigint) => bigint;

declare type Call = {
    to: Address;
    value: bigint;
    data: Hex;
};

declare type ComposeConfigArgs<TConfig extends Config> = {
    wagmi: TConfig;
    getPaymasterEndpoint?: (args: PaymasterEndpointArgs<TConfig>) => string;
    accountAbstractionContracts?: Record<TConfig['chains'][number]['id'], AccountAbstractionContracts>;
};

export declare type ComposeConfigReturnType<TConfig extends Config = Config> = {
    getPublicClient: (chainId: TConfig['chains'][number]['id']) => PublicClient;
    hasPaymaster: boolean;
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

export declare const composeRollupsContracts: {
    readonly tokens: {
        readonly WETH: "0x29dDf1a92069c4c170A63032C93c2aE66C359Bf9";
        readonly USDC: "0x0F5808d4776E7fB10293f2DCd6dA3073b8Dad970";
        readonly SSV: "0x969b0ad5ffa2376E8C0f5e413D510a056416D627";
    };
    readonly bridge: "0x1388C9619aCCcd1dfff0234626EDDA61413Be74e";
};

export declare const createAbiEncoder: <T extends Abi = Abi>(abi: T) => AbiEncoder<ExtractAbiFunctions<T, "nonpayable" | "payable">[]>;

export declare function createComposeConfig<TConfig extends Config>(props: ComposeConfigArgs<TConfig>): ComposeConfigReturnType<TConfig>;

export declare const createUserOp: (config: ComposeConfigReturnType, account: CreateKernelAccountReturnType<"0.7">, calls: Call[]) => Promise<{
    account: CreateKernelAccountReturnType<"0.7">;
    chainId: number;
    callData: `0x${string}`;
    callGasLimit: bigint;
    verificationGasLimit: bigint;
    preVerificationGas: bigint;
    maxFeePerGas: bigint;
    maxPriorityFeePerGas: bigint;
    paymaster: PaymasterActions | undefined;
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

export declare const globals: {
    MAX_WEI_AMOUNT: bigint;
};

export declare const hoodi: {
    blockExplorers: {
        readonly default: {
            readonly name: "Etherscan";
            readonly url: "https://hoodi.etherscan.io";
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
    id: 560048;
    name: "Hoodi";
    nativeCurrency: {
        readonly name: "Hoodi";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://ethereum-hoodi-rpc.publicnode.com/d8a2cc6e7483872e917d7899f9403d738b001c80e37d66834f4e40e9efb54a27"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    fees?: ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: ChainSerializers<undefined, TransactionSerializable> | undefined;
    readonly network: "hoodi";
    readonly iconBackground: "none";
    readonly iconUrl: "/images/networks/light.svg";
};

/**
 * Checks if the difference between two bigints exceeds a specified tolerance.
 *
 * @param {bigint} a - The first bigint value.
 * @param {bigint} b - The second bigint value.
 * @param {bigint} [tolerance] - default is `parseUnits("0.0001", 18)`.
 */
export declare const isBigIntChanged: (a: bigint, b: bigint, tolerance?: bigint) => boolean;

export declare const mainnet: {
    rpcUrls: {
        default: {
            http: string[];
        };
    };
    blockExplorers: {
        readonly default: {
            readonly name: "Etherscan";
            readonly url: "https://etherscan.io";
            readonly apiUrl: "https://api.etherscan.io/api";
        };
    };
    blockTime: 12000;
    contracts: {
        readonly ensUniversalResolver: {
            readonly address: "0xeeeeeeee14d718c2b47d9923deab1335e144eeee";
            readonly blockCreated: 23085558;
        };
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 14353601;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 1;
    name: "Ethereum";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: ChainSerializers<undefined, TransactionSerializable> | undefined;
};

export declare const ms: (value: number, unit: keyof typeof units) => number;

declare type NoBigints<T> = {
    [K in keyof T]: T[K] extends bigint ? string : T[K] extends bigint ? NoBigints<T[K]> : T[K];
};

export declare const numberFormatter: Intl.NumberFormat;

export declare const optimism: {
    rpcUrls: {
        default: {
            http: string[];
        };
    };
    blockExplorers: {
        readonly default: {
            readonly name: "Optimism Explorer";
            readonly url: "https://optimistic.etherscan.io";
            readonly apiUrl: "https://api-optimistic.etherscan.io/api";
        };
    };
    blockTime: 2000;
    contracts: {
        readonly disputeGameFactory: {
            readonly 1: {
                readonly address: "0xe5965Ab5962eDc7477C8520243A95517CD252fA9";
            };
        };
        readonly l2OutputOracle: {
            readonly 1: {
                readonly address: "0xdfe97868233d1aa22e815a266982f2cf17685a27";
            };
        };
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 4286263;
        };
        readonly portal: {
            readonly 1: {
                readonly address: "0xbEb5Fc579115071764c7423A4f12eDde41f106Ed";
            };
        };
        readonly l1StandardBridge: {
            readonly 1: {
                readonly address: "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1";
            };
        };
        readonly gasPriceOracle: {
            readonly address: "0x420000000000000000000000000000000000000F";
        };
        readonly l1Block: {
            readonly address: "0x4200000000000000000000000000000000000015";
        };
        readonly l2CrossDomainMessenger: {
            readonly address: "0x4200000000000000000000000000000000000007";
        };
        readonly l2Erc721Bridge: {
            readonly address: "0x4200000000000000000000000000000000000014";
        };
        readonly l2StandardBridge: {
            readonly address: "0x4200000000000000000000000000000000000010";
        };
        readonly l2ToL1MessagePasser: {
            readonly address: "0x4200000000000000000000000000000000000016";
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 10;
    name: "OP Mainnet";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    sourceId: 1;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: ChainFees<undefined> | undefined;
    formatters: {
        readonly block: {
            exclude: [] | undefined;
            format: (args: OpStackRpcBlock, action?: string | undefined) => {
                baseFeePerGas: bigint | null;
                blobGasUsed: bigint;
                difficulty: bigint;
                excessBlobGas: bigint;
                extraData: Hex;
                gasLimit: bigint;
                gasUsed: bigint;
                hash: `0x${string}` | null;
                logsBloom: `0x${string}` | null;
                miner: Address;
                mixHash: Hash;
                nonce: `0x${string}` | null;
                number: bigint | null;
                parentBeaconBlockRoot?: `0x${string}` | undefined;
                parentHash: Hash;
                receiptsRoot: Hex;
                sealFields: Hex[];
                sha3Uncles: Hash;
                size: bigint;
                stateRoot: Hash;
                timestamp: bigint;
                totalDifficulty: bigint | null;
                transactions: `0x${string}`[] | OpStackTransaction<boolean>[];
                transactionsRoot: Hash;
                uncles: Hash[];
                withdrawals?: Withdrawal[] | undefined | undefined;
                withdrawalsRoot?: `0x${string}` | undefined;
            } & {};
            type: "block";
        };
        readonly transaction: {
            exclude: [] | undefined;
            format: (args: OpStackRpcTransaction, action?: string | undefined) => ({
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: Address;
                gas: bigint;
                hash: Hash;
                input: Hex;
                nonce: number;
                r: Hex;
                s: Hex;
                to: Address | null;
                transactionIndex: number | null;
                typeHex: Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                gasPrice?: undefined | undefined;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                isSystemTx?: boolean;
                mint?: bigint | undefined | undefined;
                sourceHash: Hex;
                type: "deposit";
            } | {
                r: Hex;
                s: Hex;
                v: bigint;
                value: bigint;
                gas: bigint;
                to: Address | null;
                from: Address;
                nonce: number;
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                transactionIndex: number | null;
                hash: Hash;
                input: Hex;
                typeHex: Hex | null;
                accessList?: undefined | undefined;
                authorizationList?: undefined | undefined;
                blobVersionedHashes?: undefined | undefined;
                chainId?: number | undefined;
                yParity?: undefined | undefined;
                type: "legacy";
                gasPrice: bigint;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas?: undefined | undefined;
                maxPriorityFeePerGas?: undefined | undefined;
                isSystemTx?: undefined | undefined;
                mint?: undefined | undefined;
                sourceHash?: undefined | undefined;
            } | {
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: Address;
                gas: bigint;
                hash: Hash;
                input: Hex;
                nonce: number;
                r: Hex;
                s: Hex;
                to: Address | null;
                transactionIndex: number | null;
                typeHex: Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                accessList: AccessList;
                authorizationList?: undefined | undefined;
                blobVersionedHashes?: undefined | undefined;
                chainId: number;
                type: "eip2930";
                gasPrice: bigint;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas?: undefined | undefined;
                maxPriorityFeePerGas?: undefined | undefined;
                isSystemTx?: undefined | undefined;
                mint?: undefined | undefined;
                sourceHash?: undefined | undefined;
            } | {
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: Address;
                gas: bigint;
                hash: Hash;
                input: Hex;
                nonce: number;
                r: Hex;
                s: Hex;
                to: Address | null;
                transactionIndex: number | null;
                typeHex: Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                accessList: AccessList;
                authorizationList?: undefined | undefined;
                blobVersionedHashes?: undefined | undefined;
                chainId: number;
                type: "eip1559";
                gasPrice?: undefined | undefined;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                isSystemTx?: undefined | undefined;
                mint?: undefined | undefined;
                sourceHash?: undefined | undefined;
            } | {
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: Address;
                gas: bigint;
                hash: Hash;
                input: Hex;
                nonce: number;
                r: Hex;
                s: Hex;
                to: Address | null;
                transactionIndex: number | null;
                typeHex: Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                accessList: AccessList;
                authorizationList?: undefined | undefined;
                blobVersionedHashes: readonly Hex[];
                chainId: number;
                type: "eip4844";
                gasPrice?: undefined | undefined;
                maxFeePerBlobGas: bigint;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                isSystemTx?: undefined | undefined;
                mint?: undefined | undefined;
                sourceHash?: undefined | undefined;
            } | {
                blockHash: `0x${string}` | null;
                blockNumber: bigint | null;
                from: Address;
                gas: bigint;
                hash: Hash;
                input: Hex;
                nonce: number;
                r: Hex;
                s: Hex;
                to: Address | null;
                transactionIndex: number | null;
                typeHex: Hex | null;
                v: bigint;
                value: bigint;
                yParity: number;
                accessList: AccessList;
                authorizationList: SignedAuthorizationList;
                blobVersionedHashes?: undefined | undefined;
                chainId: number;
                type: "eip7702";
                gasPrice?: undefined | undefined;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                isSystemTx?: undefined | undefined;
                mint?: undefined | undefined;
                sourceHash?: undefined | undefined;
            }) & {};
            type: "transaction";
        };
        readonly transactionReceipt: {
            exclude: [] | undefined;
            format: (args: OpStackRpcTransactionReceipt, action?: string | undefined) => {
                blobGasPrice?: bigint | undefined;
                blobGasUsed?: bigint | undefined;
                blockHash: Hash;
                blockNumber: bigint;
                contractAddress: Address | null | undefined;
                cumulativeGasUsed: bigint;
                effectiveGasPrice: bigint;
                from: Address;
                gasUsed: bigint;
                logs: Log<bigint, number, false>[];
                logsBloom: Hex;
                root?: `0x${string}` | undefined;
                status: "success" | "reverted";
                to: Address | null;
                transactionHash: Hash;
                transactionIndex: number;
                type: TransactionType;
                l1GasPrice: bigint | null;
                l1GasUsed: bigint | null;
                l1Fee: bigint | null;
                l1FeeScalar: number | null;
            } & {};
            type: "transactionReceipt";
        };
    };
    serializers: {
        readonly transaction: serializeTransactionOpStack;
    };
};

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

export declare const polygon: {
    rpcUrls: {
        default: {
            http: string[];
        };
    };
    blockExplorers: {
        readonly default: {
            readonly name: "PolygonScan";
            readonly url: "https://polygonscan.com";
            readonly apiUrl: "https://api.polygonscan.com/api";
        };
    };
    blockTime: 2000;
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 25770160;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 137;
    name: "Polygon";
    nativeCurrency: {
        readonly name: "POL";
        readonly symbol: "POL";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: ChainSerializers<undefined, TransactionSerializable> | undefined;
};

export declare const rollupA: {
    blockExplorers: {
        readonly default: {
            readonly name: "Rollup A";
            readonly url: "https://rollup-a.explorer.testnet.compose.network";
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
    id: 11113;
    name: "Rollup A";
    nativeCurrency: {
        readonly name: "Ethereum";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-a.testnet.compose.network"];
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
            readonly url: "https://rollup-b.explorer.testnet.compose.network";
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
    id: 22224;
    name: "Rollup B";
    nativeCurrency: {
        readonly name: "Ethereum";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc-b.testnet.compose.network"];
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
    readonly kernelImpl: "0x317A2D4564778A585BAd21376dC1ca65b75ccC6a";
    readonly kernelFactory: "0xdEF4343958B5dE047bddEFaB5Fa8F9Ff898890e5";
    readonly multichainValidator: "0x8aB3f6935399e1c10419cA2C93d60901a256b7e3";
    readonly metaFactory: "0x54db674c515e5fdec3f91345bc2fdafafd8b3b8a";
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

export { }
