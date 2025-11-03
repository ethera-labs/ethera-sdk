import { Abi } from 'viem';
import { AbiEvent } from 'viem';
import { AccessList } from 'viem';
import { Account } from 'viem';
import { Address } from 'viem';
import { AuthorizationRequest } from 'viem';
import { BlobSidecar } from 'viem';
import { BlockNumber } from 'viem';
import { BlockTag } from 'viem';
import { ByteArray } from 'viem';
import { CallParameters } from 'viem';
import { CallReturnType } from 'viem';
import { CallType } from '@zerodev/sdk/types';
import { CcipRequestParameters } from 'viem';
import { CcipRequestReturnType } from 'node_modules/viem/_types/utils/ccip';
import { Chain } from 'viem';
import { Client } from 'viem';
import { Config } from '@wagmi/core';
import { ContractEventName } from 'viem';
import { ContractFunctionArgs } from 'viem';
import { ContractFunctionName } from 'viem';
import { CreateAccessListParameters } from 'viem';
import { CreateBlockFilterReturnType } from 'viem';
import { CreateContractEventFilterParameters } from 'viem';
import { CreateContractEventFilterReturnType } from 'viem';
import { CreateEventFilterParameters } from 'viem';
import { CreateEventFilterReturnType } from 'viem';
import { CreateKernelAccountReturnType } from '@zerodev/sdk';
import { CreatePendingTransactionFilterReturnType } from 'viem';
import { DeriveAccount } from 'viem';
import { DeriveChain } from 'viem';
import { EIP1193RequestFn } from 'viem';
import { EncodeDeployDataParameters } from 'viem';
import { EstimateContractGasParameters } from 'viem';
import { EstimateContractGasReturnType } from 'viem';
import { EstimateFeesPerGasParameters } from 'viem';
import { EstimateFeesPerGasReturnType } from 'viem';
import { EstimateGasParameters } from 'viem';
import { EstimateGasReturnType } from 'viem';
import { EstimateMaxPriorityFeePerGasReturnType } from 'viem';
import { EstimateUserOperationGasReturnType } from 'node_modules/viem/_types/account-abstraction/types/userOperation';
import { ExactPartial } from 'viem';
import { ExtractChainFormatterParameters } from 'viem';
import { FeeValuesEIP1559 } from 'viem';
import { FeeValuesEIP4844 } from 'viem';
import { FeeValuesLegacy } from 'viem';
import { FeeValuesType } from 'viem';
import { FilterType } from 'viem';
import { GetBalanceParameters } from 'viem';
import { GetBalanceReturnType } from 'viem';
import { GetBlobBaseFeeReturnType } from 'viem';
import { GetBlockNumberParameters } from 'viem';
import { GetBlockNumberReturnType } from 'viem';
import { GetBlockParameters } from 'viem';
import { GetBlockTransactionCountParameters } from 'viem';
import { GetBlockTransactionCountReturnType } from 'viem';
import { GetBytecodeParameters } from 'viem';
import { GetBytecodeReturnType } from 'viem';
import { GetChainIdReturnType } from 'viem';
import { GetContractEventsParameters } from 'viem';
import { GetContractEventsReturnType } from 'viem';
import { GetEip712DomainParameters } from 'viem';
import { GetEip712DomainReturnType } from 'viem';
import { GetEnsAddressParameters } from 'viem';
import { GetEnsAddressReturnType } from 'viem';
import { GetEnsAvatarParameters } from 'viem';
import { GetEnsAvatarReturnType } from 'viem';
import { GetEnsNameParameters } from 'viem';
import { GetEnsNameReturnType } from 'viem';
import { GetEnsResolverParameters } from 'viem';
import { GetEnsResolverReturnType } from 'viem';
import { GetEnsTextParameters } from 'viem';
import { GetEnsTextReturnType } from 'viem';
import { GetFeeHistoryParameters } from 'viem';
import { GetFeeHistoryReturnType } from 'viem';
import { GetFilterChangesParameters } from 'viem';
import { GetFilterChangesReturnType } from 'viem';
import { GetFilterLogsParameters } from 'viem';
import { GetFilterLogsReturnType } from 'viem';
import { GetGasPriceReturnType } from 'viem';
import { GetLogsParameters } from 'viem';
import { GetLogsReturnType } from 'viem';
import { GetProofParameters } from 'viem';
import { GetProofReturnType } from 'viem';
import { GetStorageAtParameters } from 'viem';
import { GetStorageAtReturnType } from 'viem';
import { GetTransactionConfirmationsParameters } from 'viem';
import { GetTransactionConfirmationsReturnType } from 'viem';
import { GetTransactionCountParameters } from 'viem';
import { GetTransactionCountReturnType } from 'viem';
import { GetTransactionParameters } from 'viem';
import { GetTransactionReceiptParameters } from 'viem';
import { GetTransactionType } from 'viem';
import { Hash } from 'viem';
import { Hex } from 'viem';
import { IsNever } from 'viem';
import { JsonRpcAccount } from 'viem';
import { KERNEL_V3_VERSION_TYPE } from '@zerodev/sdk/types';
import { KernelPluginManager } from '@zerodev/sdk';
import { KernelValidator } from '@zerodev/sdk';
import { MaybeAbiEventName } from 'viem';
import { MaybeExtractEventArgsFromAbi } from 'viem';
import { MulticallBatchOptions } from 'viem';
import { MulticallParameters } from 'viem';
import { MulticallReturnType } from 'viem';
import { NonceManager } from 'viem';
import { OneOf } from 'viem';
import { PaymasterActions } from 'viem/account-abstraction';
import { PrepareTransactionRequestParameters } from 'viem';
import { PrepareTransactionRequestParameterType } from 'viem';
import { PrepareTransactionRequestRequest } from 'viem';
import { Prettify } from 'viem';
import { PrivateKeyAccount } from 'viem';
import { PublicActions } from 'viem';
import { PublicClient } from 'viem';
import { PublicRpcSchema } from 'viem';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { ReadContractParameters } from 'viem';
import { ReadContractReturnType } from 'viem';
import { SendRawTransactionParameters } from 'viem';
import { SendRawTransactionReturnType } from 'viem';
import { SendRawTransactionSyncParameters } from 'viem';
import { SerializeTransactionFn } from 'viem';
import { SignableMessage } from 'viem';
import { SignAuthorizationReturnType } from 'viem/accounts';
import { SignedAuthorizationList } from 'viem';
import { SimulateBlocksParameters } from 'viem';
import { SimulateBlocksReturnType } from 'viem';
import { SimulateCallsParameters } from 'viem';
import { SimulateCallsReturnType } from 'viem';
import { SimulateContractParameters } from 'viem';
import { SimulateContractReturnType } from 'viem';
import { SmartAccountImplementation } from 'viem/account-abstraction';
import { TransactionReceipt } from 'viem';
import { TransactionRequest } from 'viem';
import { TransactionRequestEIP1559 } from 'viem';
import { TransactionRequestEIP2930 } from 'viem';
import { TransactionRequestEIP4844 } from 'viem';
import { TransactionRequestEIP7702 } from 'viem';
import { TransactionRequestLegacy } from 'viem';
import { TransactionSerializable } from 'viem';
import { TransactionSerializableEIP2930 } from 'viem';
import { TransactionSerializableEIP4844 } from 'viem';
import { TransactionSerializableEIP7702 } from 'viem';
import { Transport } from 'wagmi';
import { Transport as Transport_2 } from 'viem';
import { TransportConfig } from 'viem';
import { TypedData } from 'viem';
import { TypedDataDefinition } from 'viem';
import { UninstallFilterParameters } from 'viem';
import { UninstallFilterReturnType } from 'viem';
import { UnionOmit } from 'viem';
import { UnionPartialBy } from 'viem';
import { UnionRequiredBy } from 'viem';
import { UserOperation } from 'viem/account-abstraction';
import { UserOperationRequest } from 'viem/account-abstraction';
import { VerifyHashActionParameters } from 'viem';
import { VerifyHashActionReturnType } from 'viem';
import { VerifyMessageActionParameters } from 'viem';
import { VerifyMessageActionReturnType } from 'viem';
import { VerifySiweMessageParameters } from 'node_modules/viem/_types/actions/siwe/verifySiweMessage';
import { VerifySiweMessageReturnType } from 'node_modules/viem/_types/actions/siwe/verifySiweMessage';
import { VerifyTypedDataActionParameters } from 'viem';
import { VerifyTypedDataActionReturnType } from 'viem';
import { WaitForTransactionReceiptParameters } from 'viem';
import { WalletActions } from 'viem';
import { WatchBlockNumberParameters } from 'viem';
import { WatchBlockNumberReturnType } from 'viem';
import { WatchBlocksParameters } from 'viem';
import { WatchBlocksReturnType } from 'viem';
import { WatchContractEventParameters } from 'viem';
import { WatchContractEventReturnType } from 'viem';
import { WatchEventParameters } from 'viem';
import { WatchEventReturnType } from 'viem';
import { WatchPendingTransactionsParameters } from 'viem';
import { WatchPendingTransactionsReturnType } from 'viem';
import { Withdrawal } from 'viem';

declare type AccountAbstractionContracts = {
    kernelImpl: `0x${string}`;
    kernelFactory: `0x${string}`;
    multichainValidator: `0x${string}`;
    metaFactory: `0x${string}`;
};

declare type ComposeConfigArgs<TConfig extends Config> = {
    wagmi: TConfig;
    getPaymasterEndpoint?: (args: PaymasterEndpointArgs<TConfig>) => string;
    accountAbstractionContracts?: Record<TConfig['chains'][number]['id'], AccountAbstractionContracts>;
};

declare type ComposeConfigReturnType<TConfig extends Config = Config> = {
    getPublicClient: (chainId: TConfig['chains'][number]['id']) => PublicClient;
    hasPaymaster: boolean;
} & Pick<ComposeConfigArgs<TConfig>, 'getPaymasterEndpoint' | 'accountAbstractionContracts'>;

declare type ComposeContextValue<TConfig extends Config> = ComposeConfigReturnType<TConfig>;

export declare function ComposeProvider<TConfig extends Config>({ children, config }: ComposeProviderProps<TConfig>): ReactElement;

export declare interface ComposeProviderProps<TConfig extends Config> {
    children: ReactNode;
    config: ComposeConfigReturnType<TConfig>;
}

declare type PaymasterEndpointArgs<TConfig extends Config> = {
    method: 'pm_getPaymasterStubData' | 'pm_getPaymasterData' | 'pm_sponsorUserOperation';
    chainId: TConfig['chains'][number]['id'];
};

declare type Props = {
    chainId: number;
    multiChainIds?: number[];
};

export declare function useComposeConfig<TConfig extends Config>(): ComposeContextValue<TConfig>;

export declare const useSmartAccount: ({ chainId, multiChainIds }: Props) => {
    publicClient: {
        account: undefined;
        batch?: {
            multicall?: boolean | Prettify<MulticallBatchOptions> | undefined;
        } | undefined;
        cacheTime: number;
        ccipRead?: false | {
            request?: (parameters: CcipRequestParameters) => Promise<CcipRequestReturnType>;
        } | undefined;
        chain: Chain;
        experimental_blockTag?: BlockTag | undefined;
        key: string;
        name: string;
        pollingInterval: number;
        request: EIP1193RequestFn<PublicRpcSchema>;
        transport: TransportConfig<string, EIP1193RequestFn> & Record<string, any>;
        type: string;
        uid: string;
        call: (parameters: CallParameters<Chain>) => Promise<CallReturnType>;
        createAccessList: (parameters: CreateAccessListParameters<Chain>) => Promise<{
            accessList: AccessList;
            gasUsed: bigint;
        }>;
        createBlockFilter: () => Promise<CreateBlockFilterReturnType>;
        createContractEventFilter: <const abi extends Abi | readonly unknown[], eventName extends ContractEventName<abi> | undefined, args extends MaybeExtractEventArgsFromAbi<abi, eventName> | undefined, strict extends boolean | undefined = undefined, fromBlock extends BlockNumber | BlockTag | undefined = undefined, toBlock extends BlockNumber | BlockTag | undefined = undefined>(args: CreateContractEventFilterParameters<abi, eventName, args, strict, fromBlock, toBlock>) => Promise<CreateContractEventFilterReturnType<abi, eventName, args, strict, fromBlock, toBlock>>;
        createEventFilter: <const abiEvent extends AbiEvent | undefined = undefined, const abiEvents extends readonly AbiEvent[] | readonly unknown[] | undefined = abiEvent extends AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends BlockNumber | BlockTag | undefined = undefined, toBlock extends BlockNumber | BlockTag | undefined = undefined, _EventName extends string | undefined = MaybeAbiEventName<abiEvent>, _Args extends MaybeExtractEventArgsFromAbi<abiEvents, _EventName> | undefined = undefined>(args?: CreateEventFilterParameters<abiEvent, abiEvents, strict, fromBlock, toBlock, _EventName, _Args> | undefined) => Promise<CreateEventFilterReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock, _EventName, _Args>>;
        createPendingTransactionFilter: () => Promise<CreatePendingTransactionFilterReturnType>;
        estimateContractGas: <chain extends Chain | undefined, const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "nonpayable" | "payable">, args extends ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>>(args: EstimateContractGasParameters<abi, functionName, args, chain>) => Promise<EstimateContractGasReturnType>;
        estimateGas: (args: EstimateGasParameters<Chain>) => Promise<EstimateGasReturnType>;
        getBalance: (args: GetBalanceParameters) => Promise<GetBalanceReturnType>;
        getBlobBaseFee: () => Promise<GetBlobBaseFeeReturnType>;
        getBlock: <includeTransactions extends boolean = false, blockTag extends BlockTag = "latest">(args?: GetBlockParameters<includeTransactions, blockTag> | undefined) => Promise<{
            number: blockTag extends "pending" ? null : bigint;
            nonce: blockTag extends "pending" ? null : `0x${string}`;
            hash: blockTag extends "pending" ? null : `0x${string}`;
            gasUsed: bigint;
            logsBloom: blockTag extends "pending" ? null : `0x${string}`;
            baseFeePerGas: bigint | null;
            blobGasUsed: bigint;
            difficulty: bigint;
            excessBlobGas: bigint;
            extraData: Hex;
            gasLimit: bigint;
            miner: Address;
            mixHash: Hash;
            parentBeaconBlockRoot?: `0x${string}` | undefined;
            parentHash: Hash;
            receiptsRoot: Hex;
            sealFields: Hex[];
            sha3Uncles: Hash;
            size: bigint;
            stateRoot: Hash;
            timestamp: bigint;
            totalDifficulty: bigint | null;
            transactionsRoot: Hash;
            uncles: Hash[];
            withdrawals?: Withdrawal[] | undefined | undefined;
            withdrawalsRoot?: `0x${string}` | undefined;
            transactions: includeTransactions extends true ? ({
                from: Address;
                gas: bigint;
                nonce: number;
                to: Address | null;
                type: "legacy";
                value: bigint;
                r: Hex;
                s: Hex;
                v: bigint;
                yParity?: undefined | undefined;
                blobVersionedHashes?: undefined | undefined;
                gasPrice: bigint;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas?: undefined | undefined;
                maxPriorityFeePerGas?: undefined | undefined;
                chainId?: number | undefined;
                accessList?: undefined | undefined;
                authorizationList?: undefined | undefined;
                hash: Hash;
                input: Hex;
                typeHex: Hex | null;
                blockHash: (blockTag extends "pending" ? true : false) extends infer T ? T extends (blockTag extends "pending" ? true : false) ? T extends true ? null : `0x${string}` : never : never;
                blockNumber: (blockTag extends "pending" ? true : false) extends infer T_1 ? T_1 extends (blockTag extends "pending" ? true : false) ? T_1 extends true ? null : bigint : never : never;
                transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_2 ? T_2 extends (blockTag extends "pending" ? true : false) ? T_2 extends true ? null : number : never : never;
            } | {
                from: Address;
                gas: bigint;
                nonce: number;
                to: Address | null;
                type: "eip2930";
                value: bigint;
                r: Hex;
                s: Hex;
                v: bigint;
                yParity: number;
                blobVersionedHashes?: undefined | undefined;
                gasPrice: bigint;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas?: undefined | undefined;
                maxPriorityFeePerGas?: undefined | undefined;
                chainId: number;
                accessList: AccessList;
                authorizationList?: undefined | undefined;
                hash: Hash;
                input: Hex;
                typeHex: Hex | null;
                blockHash: (blockTag extends "pending" ? true : false) extends infer T_3 ? T_3 extends (blockTag extends "pending" ? true : false) ? T_3 extends true ? null : `0x${string}` : never : never;
                blockNumber: (blockTag extends "pending" ? true : false) extends infer T_4 ? T_4 extends (blockTag extends "pending" ? true : false) ? T_4 extends true ? null : bigint : never : never;
                transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_5 ? T_5 extends (blockTag extends "pending" ? true : false) ? T_5 extends true ? null : number : never : never;
            } | {
                from: Address;
                gas: bigint;
                nonce: number;
                to: Address | null;
                type: "eip1559";
                value: bigint;
                r: Hex;
                s: Hex;
                v: bigint;
                yParity: number;
                blobVersionedHashes?: undefined | undefined;
                gasPrice?: undefined | undefined;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                chainId: number;
                accessList: AccessList;
                authorizationList?: undefined | undefined;
                hash: Hash;
                input: Hex;
                typeHex: Hex | null;
                blockHash: (blockTag extends "pending" ? true : false) extends infer T_6 ? T_6 extends (blockTag extends "pending" ? true : false) ? T_6 extends true ? null : `0x${string}` : never : never;
                blockNumber: (blockTag extends "pending" ? true : false) extends infer T_7 ? T_7 extends (blockTag extends "pending" ? true : false) ? T_7 extends true ? null : bigint : never : never;
                transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_8 ? T_8 extends (blockTag extends "pending" ? true : false) ? T_8 extends true ? null : number : never : never;
            } | {
                from: Address;
                gas: bigint;
                nonce: number;
                to: Address | null;
                type: "eip4844";
                value: bigint;
                r: Hex;
                s: Hex;
                v: bigint;
                yParity: number;
                blobVersionedHashes: readonly Hex[];
                gasPrice?: undefined | undefined;
                maxFeePerBlobGas: bigint;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                chainId: number;
                accessList: AccessList;
                authorizationList?: undefined | undefined;
                hash: Hash;
                input: Hex;
                typeHex: Hex | null;
                blockHash: (blockTag extends "pending" ? true : false) extends infer T_9 ? T_9 extends (blockTag extends "pending" ? true : false) ? T_9 extends true ? null : `0x${string}` : never : never;
                blockNumber: (blockTag extends "pending" ? true : false) extends infer T_10 ? T_10 extends (blockTag extends "pending" ? true : false) ? T_10 extends true ? null : bigint : never : never;
                transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_11 ? T_11 extends (blockTag extends "pending" ? true : false) ? T_11 extends true ? null : number : never : never;
            } | {
                from: Address;
                gas: bigint;
                nonce: number;
                to: Address | null;
                type: "eip7702";
                value: bigint;
                r: Hex;
                s: Hex;
                v: bigint;
                yParity: number;
                blobVersionedHashes?: undefined | undefined;
                gasPrice?: undefined | undefined;
                maxFeePerBlobGas?: undefined | undefined;
                maxFeePerGas: bigint;
                maxPriorityFeePerGas: bigint;
                chainId: number;
                accessList: AccessList;
                authorizationList: SignedAuthorizationList;
                hash: Hash;
                input: Hex;
                typeHex: Hex | null;
                blockHash: (blockTag extends "pending" ? true : false) extends infer T_12 ? T_12 extends (blockTag extends "pending" ? true : false) ? T_12 extends true ? null : `0x${string}` : never : never;
                blockNumber: (blockTag extends "pending" ? true : false) extends infer T_13 ? T_13 extends (blockTag extends "pending" ? true : false) ? T_13 extends true ? null : bigint : never : never;
                transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_14 ? T_14 extends (blockTag extends "pending" ? true : false) ? T_14 extends true ? null : number : never : never;
            })[] : `0x${string}`[];
        }>;
        getBlockNumber: (args?: GetBlockNumberParameters | undefined) => Promise<GetBlockNumberReturnType>;
        getBlockTransactionCount: (args?: GetBlockTransactionCountParameters | undefined) => Promise<GetBlockTransactionCountReturnType>;
        getBytecode: (args: GetBytecodeParameters) => Promise<GetBytecodeReturnType>;
        getChainId: () => Promise<GetChainIdReturnType>;
        getCode: (args: GetBytecodeParameters) => Promise<GetBytecodeReturnType>;
        getContractEvents: <const abi extends Abi | readonly unknown[], eventName extends ContractEventName<abi> | undefined = undefined, strict extends boolean | undefined = undefined, fromBlock extends BlockNumber | BlockTag | undefined = undefined, toBlock extends BlockNumber | BlockTag | undefined = undefined>(args: GetContractEventsParameters<abi, eventName, strict, fromBlock, toBlock>) => Promise<GetContractEventsReturnType<abi, eventName, strict, fromBlock, toBlock>>;
        getEip712Domain: (args: GetEip712DomainParameters) => Promise<GetEip712DomainReturnType>;
        getEnsAddress: (args: GetEnsAddressParameters) => Promise<GetEnsAddressReturnType>;
        getEnsAvatar: (args: GetEnsAvatarParameters) => Promise<GetEnsAvatarReturnType>;
        getEnsName: (args: GetEnsNameParameters) => Promise<GetEnsNameReturnType>;
        getEnsResolver: (args: GetEnsResolverParameters) => Promise<GetEnsResolverReturnType>;
        getEnsText: (args: GetEnsTextParameters) => Promise<GetEnsTextReturnType>;
        getFeeHistory: (args: GetFeeHistoryParameters) => Promise<GetFeeHistoryReturnType>;
        estimateFeesPerGas: <chainOverride extends Chain | undefined = undefined, type extends FeeValuesType = "eip1559">(args?: EstimateFeesPerGasParameters<Chain, chainOverride, type> | undefined) => Promise<EstimateFeesPerGasReturnType<type>>;
        getFilterChanges: <filterType extends FilterType, const abi extends Abi | readonly unknown[] | undefined, eventName extends string | undefined, strict extends boolean | undefined = undefined, fromBlock extends BlockNumber | BlockTag | undefined = undefined, toBlock extends BlockNumber | BlockTag | undefined = undefined>(args: GetFilterChangesParameters<filterType, abi, eventName, strict, fromBlock, toBlock>) => Promise<GetFilterChangesReturnType<filterType, abi, eventName, strict, fromBlock, toBlock>>;
        getFilterLogs: <const abi extends Abi | readonly unknown[] | undefined, eventName extends string | undefined, strict extends boolean | undefined = undefined, fromBlock extends BlockNumber | BlockTag | undefined = undefined, toBlock extends BlockNumber | BlockTag | undefined = undefined>(args: GetFilterLogsParameters<abi, eventName, strict, fromBlock, toBlock>) => Promise<GetFilterLogsReturnType<abi, eventName, strict, fromBlock, toBlock>>;
        getGasPrice: () => Promise<GetGasPriceReturnType>;
        getLogs: <const abiEvent extends AbiEvent | undefined = undefined, const abiEvents extends readonly AbiEvent[] | readonly unknown[] | undefined = abiEvent extends AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends BlockNumber | BlockTag | undefined = undefined, toBlock extends BlockNumber | BlockTag | undefined = undefined>(args?: GetLogsParameters<abiEvent, abiEvents, strict, fromBlock, toBlock> | undefined) => Promise<GetLogsReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock>>;
        getProof: (args: GetProofParameters) => Promise<GetProofReturnType>;
        estimateMaxPriorityFeePerGas: <chainOverride extends Chain | undefined = undefined>(args?: {
            chain?: chainOverride | null | undefined;
        } | undefined) => Promise<EstimateMaxPriorityFeePerGasReturnType>;
        getStorageAt: (args: GetStorageAtParameters) => Promise<GetStorageAtReturnType>;
        getTransaction: <blockTag extends BlockTag = "latest">(args: GetTransactionParameters<blockTag>) => Promise<{
            from: Address;
            gas: bigint;
            nonce: number;
            to: Address | null;
            type: "legacy";
            value: bigint;
            r: Hex;
            s: Hex;
            v: bigint;
            yParity?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice: bigint;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            chainId?: number | undefined;
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            hash: Hash;
            input: Hex;
            typeHex: Hex | null;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T ? T extends (blockTag extends "pending" ? true : false) ? T extends true ? null : `0x${string}` : never : never;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_1 ? T_1 extends (blockTag extends "pending" ? true : false) ? T_1 extends true ? null : bigint : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_2 ? T_2 extends (blockTag extends "pending" ? true : false) ? T_2 extends true ? null : number : never : never;
        } | {
            from: Address;
            gas: bigint;
            nonce: number;
            to: Address | null;
            type: "eip2930";
            value: bigint;
            r: Hex;
            s: Hex;
            v: bigint;
            yParity: number;
            blobVersionedHashes?: undefined | undefined;
            gasPrice: bigint;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            chainId: number;
            accessList: AccessList;
            authorizationList?: undefined | undefined;
            hash: Hash;
            input: Hex;
            typeHex: Hex | null;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_3 ? T_3 extends (blockTag extends "pending" ? true : false) ? T_3 extends true ? null : `0x${string}` : never : never;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_4 ? T_4 extends (blockTag extends "pending" ? true : false) ? T_4 extends true ? null : bigint : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_5 ? T_5 extends (blockTag extends "pending" ? true : false) ? T_5 extends true ? null : number : never : never;
        } | {
            from: Address;
            gas: bigint;
            nonce: number;
            to: Address | null;
            type: "eip1559";
            value: bigint;
            r: Hex;
            s: Hex;
            v: bigint;
            yParity: number;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            chainId: number;
            accessList: AccessList;
            authorizationList?: undefined | undefined;
            hash: Hash;
            input: Hex;
            typeHex: Hex | null;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_6 ? T_6 extends (blockTag extends "pending" ? true : false) ? T_6 extends true ? null : `0x${string}` : never : never;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_7 ? T_7 extends (blockTag extends "pending" ? true : false) ? T_7 extends true ? null : bigint : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_8 ? T_8 extends (blockTag extends "pending" ? true : false) ? T_8 extends true ? null : number : never : never;
        } | {
            from: Address;
            gas: bigint;
            nonce: number;
            to: Address | null;
            type: "eip4844";
            value: bigint;
            r: Hex;
            s: Hex;
            v: bigint;
            yParity: number;
            blobVersionedHashes: readonly Hex[];
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas: bigint;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            chainId: number;
            accessList: AccessList;
            authorizationList?: undefined | undefined;
            hash: Hash;
            input: Hex;
            typeHex: Hex | null;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_9 ? T_9 extends (blockTag extends "pending" ? true : false) ? T_9 extends true ? null : `0x${string}` : never : never;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_10 ? T_10 extends (blockTag extends "pending" ? true : false) ? T_10 extends true ? null : bigint : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_11 ? T_11 extends (blockTag extends "pending" ? true : false) ? T_11 extends true ? null : number : never : never;
        } | {
            from: Address;
            gas: bigint;
            nonce: number;
            to: Address | null;
            type: "eip7702";
            value: bigint;
            r: Hex;
            s: Hex;
            v: bigint;
            yParity: number;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            chainId: number;
            accessList: AccessList;
            authorizationList: SignedAuthorizationList;
            hash: Hash;
            input: Hex;
            typeHex: Hex | null;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_12 ? T_12 extends (blockTag extends "pending" ? true : false) ? T_12 extends true ? null : `0x${string}` : never : never;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_13 ? T_13 extends (blockTag extends "pending" ? true : false) ? T_13 extends true ? null : bigint : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_14 ? T_14 extends (blockTag extends "pending" ? true : false) ? T_14 extends true ? null : number : never : never;
        }>;
        getTransactionConfirmations: (args: GetTransactionConfirmationsParameters<Chain>) => Promise<GetTransactionConfirmationsReturnType>;
        getTransactionCount: (args: GetTransactionCountParameters) => Promise<GetTransactionCountReturnType>;
        getTransactionReceipt: (args: GetTransactionReceiptParameters) => Promise<TransactionReceipt>;
        multicall: <const contracts extends readonly unknown[], allowFailure extends boolean = true>(args: MulticallParameters<contracts, allowFailure>) => Promise<MulticallReturnType<contracts, allowFailure>>;
        prepareTransactionRequest: <const request extends PrepareTransactionRequestRequest<Chain, chainOverride>, chainOverride extends Chain | undefined = undefined, accountOverride extends Account | Address | undefined = undefined>(args: PrepareTransactionRequestParameters<Chain, Account | undefined, chainOverride, accountOverride, request>) => Promise<UnionRequiredBy<Extract<UnionOmit<ExtractChainFormatterParameters<DeriveChain<Chain, chainOverride>, "transactionRequest", TransactionRequest>, "from"> & (DeriveChain<Chain, chainOverride> extends infer T_14 ? T_14 extends DeriveChain<Chain, chainOverride> ? T_14 extends Chain ? {
        chain: T_14;
        } : {
        chain?: undefined;
        } : never : never) & (DeriveAccount<Account | undefined, accountOverride> extends infer T_15 ? T_15 extends DeriveAccount<Account | undefined, accountOverride> ? T_15 extends Account ? {
        account: T_15;
        from: Address;
        } : {
        account?: undefined;
        from?: undefined;
        } : never : never), IsNever<((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_16 ? T_16 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_16 extends "legacy" ? TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_17 ? T_17 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_17 extends "eip1559" ? TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_18 ? T_18 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_18 extends "eip2930" ? TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_19 ? T_19 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_19 extends "eip4844" ? TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_20 ? T_20 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_20 extends "eip7702" ? TransactionRequestEIP7702 : never : never : never)> extends true ? unknown : ExactPartial<((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_21 ? T_21 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_21 extends "legacy" ? TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_22 ? T_22 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_22 extends "eip1559" ? TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_23 ? T_23 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_23 extends "eip2930" ? TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_24 ? T_24 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_24 extends "eip4844" ? TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_25 ? T_25 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } & (OneOf<    {
        maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
        } | {
        maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
        }, FeeValuesEIP1559> & {
        accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
        }) ? "eip1559" : never) | (request extends {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        } & {
        accessList: TransactionSerializableEIP2930["accessList"];
        } ? "eip2930" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
        }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
        blobs: TransactionSerializableEIP4844["blobs"];
        } | {
        blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
        } | {
        sidecars: TransactionSerializableEIP4844["sidecars"];
        }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        } | {
        accessList?: AccessList | undefined;
        authorizationList?: SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
        }) & {
        authorizationList: TransactionSerializableEIP7702["authorizationList"];
        } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_25 extends "eip7702" ? TransactionRequestEIP7702 : never : never : never)>> & {
        chainId?: number | undefined;
        }, (request["parameters"] extends readonly PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "fees" | "gas" | "nonce" | "type" | "blobVersionedHashes" | "chainId") extends infer T_26 ? T_26 extends (request["parameters"] extends readonly PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "fees" | "gas" | "nonce" | "type" | "blobVersionedHashes" | "chainId") ? T_26 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_26 : never : never> & (unknown extends request["kzg"] ? {} : Pick<request, "kzg">) extends infer T ? { [K in keyof T]: (UnionRequiredBy<Extract<UnionOmit<ExtractChainFormatterParameters<DeriveChain<Chain, chainOverride>, "transactionRequest", TransactionRequest>, "from"> & (DeriveChain<Chain, chainOverride> extends infer T_1 ? T_1 extends DeriveChain<Chain, chainOverride> ? T_1 extends Chain ? {
            chain: T_1;
            } : {
            chain?: undefined;
            } : never : never) & (DeriveAccount<Account | undefined, accountOverride> extends infer T_2 ? T_2 extends DeriveAccount<Account | undefined, accountOverride> ? T_2 extends Account ? {
            account: T_2;
            from: Address;
            } : {
            account?: undefined;
            from?: undefined;
            } : never : never), IsNever<((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_3 ? T_3 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_3 extends "legacy" ? TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_4 ? T_4 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_4 extends "eip1559" ? TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_5 ? T_5 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_5 extends "eip2930" ? TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_6 ? T_6 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_6 extends "eip4844" ? TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_7 ? T_7 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_7 extends "eip7702" ? TransactionRequestEIP7702 : never : never : never)> extends true ? unknown : ExactPartial<((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_8 ? T_8 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_8 extends "legacy" ? TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_9 ? T_9 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_9 extends "eip1559" ? TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_10 ? T_10 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_10 extends "eip2930" ? TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_11 ? T_11 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_11 extends "eip4844" ? TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_12 ? T_12 extends (request["type"] extends string | undefined ? request["type"] : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : GetTransactionType<request, (request extends {
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & FeeValuesLegacy ? "legacy" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } & (OneOf<    {
            maxFeePerGas: FeeValuesEIP1559["maxFeePerGas"];
            } | {
            maxPriorityFeePerGas: FeeValuesEIP1559["maxPriorityFeePerGas"];
            }, FeeValuesEIP1559> & {
            accessList?: TransactionSerializableEIP2930["accessList"] | undefined;
            }) ? "eip1559" : never) | (request extends {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: bigint | undefined;
            sidecars?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            } & {
            accessList: TransactionSerializableEIP2930["accessList"];
            } ? "eip2930" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: undefined | undefined;
            blobs?: readonly `0x${string}`[] | readonly ByteArray[] | undefined;
            blobVersionedHashes?: readonly `0x${string}`[] | undefined;
            maxFeePerBlobGas?: bigint | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: false | readonly BlobSidecar<`0x${string}`>[] | undefined;
            }) & (ExactPartial<FeeValuesEIP4844> & OneOf<    {
            blobs: TransactionSerializableEIP4844["blobs"];
            } | {
            blobVersionedHashes: TransactionSerializableEIP4844["blobVersionedHashes"];
            } | {
            sidecars: TransactionSerializableEIP4844["sidecars"];
            }, TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            } | {
            accessList?: AccessList | undefined;
            authorizationList?: SignedAuthorizationList | undefined;
            blobs?: undefined | undefined;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: bigint | undefined;
            maxPriorityFeePerGas?: bigint | undefined;
            sidecars?: undefined | undefined;
            }) & {
            authorizationList: TransactionSerializableEIP7702["authorizationList"];
            } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_12 extends "eip7702" ? TransactionRequestEIP7702 : never : never : never)>> & {
            chainId?: number | undefined;
            }, (request["parameters"] extends readonly PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "fees" | "gas" | "nonce" | "type" | "blobVersionedHashes" | "chainId") extends infer T_13 ? T_13 extends (request["parameters"] extends readonly PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "fees" | "gas" | "nonce" | "type" | "blobVersionedHashes" | "chainId") ? T_13 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_13 : never : never> & (unknown extends request["kzg"] ? {} : Pick<request, "kzg">))[K]; } : never>;
        readContract: <const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "pure" | "view">, const args extends ContractFunctionArgs<abi, "pure" | "view", functionName>>(args: ReadContractParameters<abi, functionName, args>) => Promise<ReadContractReturnType<abi, functionName, args>>;
        sendRawTransaction: (args: SendRawTransactionParameters) => Promise<SendRawTransactionReturnType>;
        sendRawTransactionSync: (args: SendRawTransactionSyncParameters) => Promise<TransactionReceipt>;
        simulate: <const calls extends readonly unknown[]>(args: SimulateBlocksParameters<calls>) => Promise<SimulateBlocksReturnType<calls>>;
        simulateBlocks: <const calls extends readonly unknown[]>(args: SimulateBlocksParameters<calls>) => Promise<SimulateBlocksReturnType<calls>>;
        simulateCalls: <const calls extends readonly unknown[]>(args: SimulateCallsParameters<calls>) => Promise<SimulateCallsReturnType<calls>>;
        simulateContract: <const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "nonpayable" | "payable">, const args_1 extends ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, chainOverride extends Chain | undefined, accountOverride extends Account | Address | undefined = undefined>(args: SimulateContractParameters<abi, functionName, args_1, Chain, chainOverride, accountOverride>) => Promise<SimulateContractReturnType<abi, functionName, args_1, Chain, Account | undefined, chainOverride, accountOverride>>;
        verifyHash: (args: VerifyHashActionParameters) => Promise<VerifyHashActionReturnType>;
        verifyMessage: (args: VerifyMessageActionParameters) => Promise<VerifyMessageActionReturnType>;
        verifySiweMessage: (args: VerifySiweMessageParameters) => Promise<VerifySiweMessageReturnType>;
        verifyTypedData: (args: VerifyTypedDataActionParameters) => Promise<VerifyTypedDataActionReturnType>;
        uninstallFilter: (args: UninstallFilterParameters) => Promise<UninstallFilterReturnType>;
        waitForTransactionReceipt: (args: WaitForTransactionReceiptParameters<Chain>) => Promise<TransactionReceipt>;
        watchBlockNumber: (args: WatchBlockNumberParameters) => WatchBlockNumberReturnType;
        watchBlocks: <includeTransactions extends boolean = false, blockTag extends BlockTag = "latest">(args: WatchBlocksParameters<Transport<string, Record<string, any>, EIP1193RequestFn>, Chain, includeTransactions, blockTag>) => WatchBlocksReturnType;
        watchContractEvent: <const abi extends Abi | readonly unknown[], eventName extends ContractEventName<abi>, strict extends boolean | undefined = undefined>(args: WatchContractEventParameters<abi, eventName, strict, Transport<string, Record<string, any>, EIP1193RequestFn>>) => WatchContractEventReturnType;
        watchEvent: <const abiEvent extends AbiEvent | undefined = undefined, const abiEvents extends readonly AbiEvent[] | readonly unknown[] | undefined = abiEvent extends AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined>(args: WatchEventParameters<abiEvent, abiEvents, strict, Transport<string, Record<string, any>, EIP1193RequestFn>>) => WatchEventReturnType;
        watchPendingTransactions: (args: WatchPendingTransactionsParameters<Transport<string, Record<string, any>, EIP1193RequestFn>>) => WatchPendingTransactionsReturnType;
        extend: <const client extends {
            [x: string]: unknown;
            account?: undefined;
            batch?: undefined;
            cacheTime?: undefined;
            ccipRead?: undefined;
            chain?: undefined;
            experimental_blockTag?: undefined;
            key?: undefined;
            name?: undefined;
            pollingInterval?: undefined;
            request?: undefined;
            transport?: undefined;
            type?: undefined;
            uid?: undefined;
        } & ExactPartial<Pick<PublicActions<Transport<string, Record<string, any>, EIP1193RequestFn>, Chain, undefined>, "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getChainId" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "prepareTransactionRequest" | "readContract" | "sendRawTransaction" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<WalletActions<Chain, undefined>, "sendTransaction" | "writeContract">>>(fn: (client: Client<Transport<string, Record<string, any>, EIP1193RequestFn>, Chain, undefined, PublicRpcSchema, PublicActions<Transport<string, Record<string, any>, EIP1193RequestFn>, Chain>>) => client) => Client<Transport<string, Record<string, any>, EIP1193RequestFn>, Chain, undefined, PublicRpcSchema, { [K in keyof client]: client[K]; } & PublicActions<Transport<string, Record<string, any>, EIP1193RequestFn>, Chain>>;
    } | undefined;
    account: {
        createUserOp: (calls: {
            to: Address;
            value: bigint;
            data: Hex;
        }[]) => Promise<{
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
        client: Client<Transport_2, Chain | undefined, {
        address: Address;
        nonceManager?: NonceManager | undefined;
        sign?: ((parameters: {
        hash: Hash;
        }) => Promise<Hex>) | undefined | undefined;
        signAuthorization?: ((parameters: AuthorizationRequest) => Promise<SignAuthorizationReturnType>) | undefined | undefined;
        signMessage: ({ message }: {
        message: SignableMessage;
        }) => Promise<Hex>;
        signTransaction: <serializer extends SerializeTransactionFn<TransactionSerializable> = SerializeTransactionFn<TransactionSerializable>, transaction extends Parameters<serializer>[0] = Parameters<serializer>[0]>(transaction: transaction, options?: {
        serializer?: serializer | undefined;
        } | undefined) => Promise<Hex>;
        signTypedData: <const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | "EIP712Domain" = keyof typedData>(parameters: TypedDataDefinition<typedData, primaryType>) => Promise<Hex>;
        publicKey: Hex;
        source: string;
        type: "local";
        } | JsonRpcAccount | undefined>;
        entryPoint: {
            abi: readonly [{
                readonly inputs: readonly [{
                    readonly name: "success";
                    readonly type: "bool";
                }, {
                    readonly name: "ret";
                    readonly type: "bytes";
                }];
                readonly name: "DelegateAndRevert";
                readonly type: "error";
            }, {
                readonly inputs: readonly [{
                    readonly name: "opIndex";
                    readonly type: "uint256";
                }, {
                    readonly name: "reason";
                    readonly type: "string";
                }];
                readonly name: "FailedOp";
                readonly type: "error";
            }, {
                readonly inputs: readonly [{
                    readonly name: "opIndex";
                    readonly type: "uint256";
                }, {
                    readonly name: "reason";
                    readonly type: "string";
                }, {
                    readonly name: "inner";
                    readonly type: "bytes";
                }];
                readonly name: "FailedOpWithRevert";
                readonly type: "error";
            }, {
                readonly inputs: readonly [{
                    readonly name: "returnData";
                    readonly type: "bytes";
                }];
                readonly name: "PostOpReverted";
                readonly type: "error";
            }, {
                readonly inputs: readonly [];
                readonly name: "ReentrancyGuardReentrantCall";
                readonly type: "error";
            }, {
                readonly inputs: readonly [{
                    readonly name: "sender";
                    readonly type: "address";
                }];
                readonly name: "SenderAddressResult";
                readonly type: "error";
            }, {
                readonly inputs: readonly [{
                    readonly name: "aggregator";
                    readonly type: "address";
                }];
                readonly name: "SignatureValidationFailed";
                readonly type: "error";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "userOpHash";
                    readonly type: "bytes32";
                }, {
                    readonly indexed: true;
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "factory";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "paymaster";
                    readonly type: "address";
                }];
                readonly name: "AccountDeployed";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [];
                readonly name: "BeforeExecution";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "totalDeposit";
                    readonly type: "uint256";
                }];
                readonly name: "Deposited";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "userOpHash";
                    readonly type: "bytes32";
                }, {
                    readonly indexed: true;
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "nonce";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly name: "revertReason";
                    readonly type: "bytes";
                }];
                readonly name: "PostOpRevertReason";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "aggregator";
                    readonly type: "address";
                }];
                readonly name: "SignatureAggregatorChanged";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "totalStaked";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly name: "unstakeDelaySec";
                    readonly type: "uint256";
                }];
                readonly name: "StakeLocked";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "withdrawTime";
                    readonly type: "uint256";
                }];
                readonly name: "StakeUnlocked";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "withdrawAddress";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "amount";
                    readonly type: "uint256";
                }];
                readonly name: "StakeWithdrawn";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "userOpHash";
                    readonly type: "bytes32";
                }, {
                    readonly indexed: true;
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: true;
                    readonly name: "paymaster";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "nonce";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly name: "success";
                    readonly type: "bool";
                }, {
                    readonly indexed: false;
                    readonly name: "actualGasCost";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly name: "actualGasUsed";
                    readonly type: "uint256";
                }];
                readonly name: "UserOperationEvent";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "userOpHash";
                    readonly type: "bytes32";
                }, {
                    readonly indexed: true;
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "nonce";
                    readonly type: "uint256";
                }];
                readonly name: "UserOperationPrefundTooLow";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "userOpHash";
                    readonly type: "bytes32";
                }, {
                    readonly indexed: true;
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "nonce";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly name: "revertReason";
                    readonly type: "bytes";
                }];
                readonly name: "UserOperationRevertReason";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "withdrawAddress";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "amount";
                    readonly type: "uint256";
                }];
                readonly name: "Withdrawn";
                readonly type: "event";
            }, {
                readonly inputs: readonly [{
                    readonly name: "unstakeDelaySec";
                    readonly type: "uint32";
                }];
                readonly name: "addStake";
                readonly outputs: readonly [];
                readonly stateMutability: "payable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "account";
                    readonly type: "address";
                }];
                readonly name: "balanceOf";
                readonly outputs: readonly [{
                    readonly name: "";
                    readonly type: "uint256";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "target";
                    readonly type: "address";
                }, {
                    readonly name: "data";
                    readonly type: "bytes";
                }];
                readonly name: "delegateAndRevert";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "account";
                    readonly type: "address";
                }];
                readonly name: "depositTo";
                readonly outputs: readonly [];
                readonly stateMutability: "payable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "";
                    readonly type: "address";
                }];
                readonly name: "deposits";
                readonly outputs: readonly [{
                    readonly name: "deposit";
                    readonly type: "uint256";
                }, {
                    readonly name: "staked";
                    readonly type: "bool";
                }, {
                    readonly name: "stake";
                    readonly type: "uint112";
                }, {
                    readonly name: "unstakeDelaySec";
                    readonly type: "uint32";
                }, {
                    readonly name: "withdrawTime";
                    readonly type: "uint48";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "account";
                    readonly type: "address";
                }];
                readonly name: "getDepositInfo";
                readonly outputs: readonly [{
                    readonly components: readonly [{
                        readonly name: "deposit";
                        readonly type: "uint256";
                    }, {
                        readonly name: "staked";
                        readonly type: "bool";
                    }, {
                        readonly name: "stake";
                        readonly type: "uint112";
                    }, {
                        readonly name: "unstakeDelaySec";
                        readonly type: "uint32";
                    }, {
                        readonly name: "withdrawTime";
                        readonly type: "uint48";
                    }];
                    readonly name: "info";
                    readonly type: "tuple";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly name: "key";
                    readonly type: "uint192";
                }];
                readonly name: "getNonce";
                readonly outputs: readonly [{
                    readonly name: "nonce";
                    readonly type: "uint256";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "initCode";
                    readonly type: "bytes";
                }];
                readonly name: "getSenderAddress";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly components: readonly [{
                        readonly name: "sender";
                        readonly type: "address";
                    }, {
                        readonly name: "nonce";
                        readonly type: "uint256";
                    }, {
                        readonly name: "initCode";
                        readonly type: "bytes";
                    }, {
                        readonly name: "callData";
                        readonly type: "bytes";
                    }, {
                        readonly name: "accountGasLimits";
                        readonly type: "bytes32";
                    }, {
                        readonly name: "preVerificationGas";
                        readonly type: "uint256";
                    }, {
                        readonly name: "gasFees";
                        readonly type: "bytes32";
                    }, {
                        readonly name: "paymasterAndData";
                        readonly type: "bytes";
                    }, {
                        readonly name: "signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "userOp";
                    readonly type: "tuple";
                }];
                readonly name: "getUserOpHash";
                readonly outputs: readonly [{
                    readonly name: "";
                    readonly type: "bytes32";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly components: readonly [{
                        readonly components: readonly [{
                            readonly name: "sender";
                            readonly type: "address";
                        }, {
                            readonly name: "nonce";
                            readonly type: "uint256";
                        }, {
                            readonly name: "initCode";
                            readonly type: "bytes";
                        }, {
                            readonly name: "callData";
                            readonly type: "bytes";
                        }, {
                            readonly name: "accountGasLimits";
                            readonly type: "bytes32";
                        }, {
                            readonly name: "preVerificationGas";
                            readonly type: "uint256";
                        }, {
                            readonly name: "gasFees";
                            readonly type: "bytes32";
                        }, {
                            readonly name: "paymasterAndData";
                            readonly type: "bytes";
                        }, {
                            readonly name: "signature";
                            readonly type: "bytes";
                        }];
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly name: "aggregator";
                        readonly type: "address";
                    }, {
                        readonly name: "signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "opsPerAggregator";
                    readonly type: "tuple[]";
                }, {
                    readonly name: "beneficiary";
                    readonly type: "address";
                }];
                readonly name: "handleAggregatedOps";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly components: readonly [{
                        readonly name: "sender";
                        readonly type: "address";
                    }, {
                        readonly name: "nonce";
                        readonly type: "uint256";
                    }, {
                        readonly name: "initCode";
                        readonly type: "bytes";
                    }, {
                        readonly name: "callData";
                        readonly type: "bytes";
                    }, {
                        readonly name: "accountGasLimits";
                        readonly type: "bytes32";
                    }, {
                        readonly name: "preVerificationGas";
                        readonly type: "uint256";
                    }, {
                        readonly name: "gasFees";
                        readonly type: "bytes32";
                    }, {
                        readonly name: "paymasterAndData";
                        readonly type: "bytes";
                    }, {
                        readonly name: "signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "ops";
                    readonly type: "tuple[]";
                }, {
                    readonly name: "beneficiary";
                    readonly type: "address";
                }];
                readonly name: "handleOps";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "key";
                    readonly type: "uint192";
                }];
                readonly name: "incrementNonce";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "callData";
                    readonly type: "bytes";
                }, {
                    readonly components: readonly [{
                        readonly components: readonly [{
                            readonly name: "sender";
                            readonly type: "address";
                        }, {
                            readonly name: "nonce";
                            readonly type: "uint256";
                        }, {
                            readonly name: "verificationGasLimit";
                            readonly type: "uint256";
                        }, {
                            readonly name: "callGasLimit";
                            readonly type: "uint256";
                        }, {
                            readonly name: "paymasterVerificationGasLimit";
                            readonly type: "uint256";
                        }, {
                            readonly name: "paymasterPostOpGasLimit";
                            readonly type: "uint256";
                        }, {
                            readonly name: "preVerificationGas";
                            readonly type: "uint256";
                        }, {
                            readonly name: "paymaster";
                            readonly type: "address";
                        }, {
                            readonly name: "maxFeePerGas";
                            readonly type: "uint256";
                        }, {
                            readonly name: "maxPriorityFeePerGas";
                            readonly type: "uint256";
                        }];
                        readonly name: "mUserOp";
                        readonly type: "tuple";
                    }, {
                        readonly name: "userOpHash";
                        readonly type: "bytes32";
                    }, {
                        readonly name: "prefund";
                        readonly type: "uint256";
                    }, {
                        readonly name: "contextOffset";
                        readonly type: "uint256";
                    }, {
                        readonly name: "preOpGas";
                        readonly type: "uint256";
                    }];
                    readonly name: "opInfo";
                    readonly type: "tuple";
                }, {
                    readonly name: "context";
                    readonly type: "bytes";
                }];
                readonly name: "innerHandleOp";
                readonly outputs: readonly [{
                    readonly name: "actualGasCost";
                    readonly type: "uint256";
                }];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "";
                    readonly type: "address";
                }, {
                    readonly name: "";
                    readonly type: "uint192";
                }];
                readonly name: "nonceSequenceNumber";
                readonly outputs: readonly [{
                    readonly name: "";
                    readonly type: "uint256";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "interfaceId";
                    readonly type: "bytes4";
                }];
                readonly name: "supportsInterface";
                readonly outputs: readonly [{
                    readonly name: "";
                    readonly type: "bool";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [];
                readonly name: "unlockStake";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "withdrawAddress";
                    readonly type: "address";
                }];
                readonly name: "withdrawStake";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "withdrawAddress";
                    readonly type: "address";
                }, {
                    readonly name: "withdrawAmount";
                    readonly type: "uint256";
                }];
                readonly name: "withdrawTo";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly stateMutability: "payable";
                readonly type: "receive";
            }];
            address: Address;
            version: "0.7";
        };
        extend?: object | undefined;
        getAddress: () => Promise<Address>;
        decodeCalls?: ((data: Hex) => Promise<readonly {
            to: Hex;
            data?: Hex | undefined;
            value?: bigint | undefined;
        }[]>) | undefined | undefined;
        encodeCalls: (calls: Parameters<SmartAccountImplementation["encodeCalls"]>[0], callType?: CallType | undefined) => Promise<Hex>;
        getFactoryArgs: () => Promise<{
            factory?: Address | undefined;
            factoryData?: Hex | undefined;
        }>;
        getNonce: NonNullable<SmartAccountImplementation["getNonce"]>;
        getStubSignature: (parameters?: UserOperationRequest | undefined) => Promise<Hex>;
        nonceKeyManager?: NonceManager | undefined;
        sign: (parameters: {
            hash: Hash;
        }) => Promise<Hex>;
        signMessage: (parameters: {
            message: SignableMessage;
            useReplayableSignature?: boolean;
        }) => Promise<Hex>;
        signTypedData: <const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | "EIP712Domain" = keyof typedData>(parameters: TypedDataDefinition<typedData, primaryType>) => Promise<Hex>;
        signUserOperation: (parameters: UnionPartialBy<UserOperation, "sender"> & {
            chainId?: number | undefined;
        }) => Promise<Hex>;
        userOperation?: {
            estimateGas?: ((userOperation: UserOperationRequest) => Promise<ExactPartial<EstimateUserOperationGasReturnType> | undefined>) | undefined;
        } | undefined | undefined;
        authorization?: undefined | undefined;
        kernelVersion: KERNEL_V3_VERSION_TYPE;
        kernelPluginManager: KernelPluginManager<"0.7">;
        factoryAddress: Address;
        accountImplementationAddress: Address;
        generateInitCode: () => Promise<Hex>;
        encodeModuleInstallCallData: () => Promise<Hex>;
        encodeDeployCallData: ({ abi, args, bytecode }: EncodeDeployDataParameters) => Promise<Hex>;
        eip7702Authorization?: (() => Promise<SignAuthorizationReturnType | undefined>) | undefined | undefined;
        address: Address;
        isDeployed: () => Promise<boolean>;
        type: "smart";
    } | {
        createUserOp: (calls: {
            to: Address;
            value: bigint;
            data: Hex;
        }[]) => Promise<{
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
        client: Client<Transport_2, Chain | undefined, {
        address: Address;
        nonceManager?: NonceManager | undefined;
        sign?: ((parameters: {
        hash: Hash;
        }) => Promise<Hex>) | undefined | undefined;
        signAuthorization?: ((parameters: AuthorizationRequest) => Promise<SignAuthorizationReturnType>) | undefined | undefined;
        signMessage: ({ message }: {
        message: SignableMessage;
        }) => Promise<Hex>;
        signTransaction: <serializer extends SerializeTransactionFn<TransactionSerializable> = SerializeTransactionFn<TransactionSerializable>, transaction extends Parameters<serializer>[0] = Parameters<serializer>[0]>(transaction: transaction, options?: {
        serializer?: serializer | undefined;
        } | undefined) => Promise<Hex>;
        signTypedData: <const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | "EIP712Domain" = keyof typedData>(parameters: TypedDataDefinition<typedData, primaryType>) => Promise<Hex>;
        publicKey: Hex;
        source: string;
        type: "local";
        } | JsonRpcAccount | undefined>;
        entryPoint: {
            abi: readonly [{
                readonly inputs: readonly [{
                    readonly name: "success";
                    readonly type: "bool";
                }, {
                    readonly name: "ret";
                    readonly type: "bytes";
                }];
                readonly name: "DelegateAndRevert";
                readonly type: "error";
            }, {
                readonly inputs: readonly [{
                    readonly name: "opIndex";
                    readonly type: "uint256";
                }, {
                    readonly name: "reason";
                    readonly type: "string";
                }];
                readonly name: "FailedOp";
                readonly type: "error";
            }, {
                readonly inputs: readonly [{
                    readonly name: "opIndex";
                    readonly type: "uint256";
                }, {
                    readonly name: "reason";
                    readonly type: "string";
                }, {
                    readonly name: "inner";
                    readonly type: "bytes";
                }];
                readonly name: "FailedOpWithRevert";
                readonly type: "error";
            }, {
                readonly inputs: readonly [{
                    readonly name: "returnData";
                    readonly type: "bytes";
                }];
                readonly name: "PostOpReverted";
                readonly type: "error";
            }, {
                readonly inputs: readonly [];
                readonly name: "ReentrancyGuardReentrantCall";
                readonly type: "error";
            }, {
                readonly inputs: readonly [{
                    readonly name: "sender";
                    readonly type: "address";
                }];
                readonly name: "SenderAddressResult";
                readonly type: "error";
            }, {
                readonly inputs: readonly [{
                    readonly name: "aggregator";
                    readonly type: "address";
                }];
                readonly name: "SignatureValidationFailed";
                readonly type: "error";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "userOpHash";
                    readonly type: "bytes32";
                }, {
                    readonly indexed: true;
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "factory";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "paymaster";
                    readonly type: "address";
                }];
                readonly name: "AccountDeployed";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [];
                readonly name: "BeforeExecution";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "totalDeposit";
                    readonly type: "uint256";
                }];
                readonly name: "Deposited";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "userOpHash";
                    readonly type: "bytes32";
                }, {
                    readonly indexed: true;
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "nonce";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly name: "revertReason";
                    readonly type: "bytes";
                }];
                readonly name: "PostOpRevertReason";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "aggregator";
                    readonly type: "address";
                }];
                readonly name: "SignatureAggregatorChanged";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "totalStaked";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly name: "unstakeDelaySec";
                    readonly type: "uint256";
                }];
                readonly name: "StakeLocked";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "withdrawTime";
                    readonly type: "uint256";
                }];
                readonly name: "StakeUnlocked";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "withdrawAddress";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "amount";
                    readonly type: "uint256";
                }];
                readonly name: "StakeWithdrawn";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "userOpHash";
                    readonly type: "bytes32";
                }, {
                    readonly indexed: true;
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: true;
                    readonly name: "paymaster";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "nonce";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly name: "success";
                    readonly type: "bool";
                }, {
                    readonly indexed: false;
                    readonly name: "actualGasCost";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly name: "actualGasUsed";
                    readonly type: "uint256";
                }];
                readonly name: "UserOperationEvent";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "userOpHash";
                    readonly type: "bytes32";
                }, {
                    readonly indexed: true;
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "nonce";
                    readonly type: "uint256";
                }];
                readonly name: "UserOperationPrefundTooLow";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "userOpHash";
                    readonly type: "bytes32";
                }, {
                    readonly indexed: true;
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "nonce";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly name: "revertReason";
                    readonly type: "bytes";
                }];
                readonly name: "UserOperationRevertReason";
                readonly type: "event";
            }, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "withdrawAddress";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly name: "amount";
                    readonly type: "uint256";
                }];
                readonly name: "Withdrawn";
                readonly type: "event";
            }, {
                readonly inputs: readonly [{
                    readonly name: "unstakeDelaySec";
                    readonly type: "uint32";
                }];
                readonly name: "addStake";
                readonly outputs: readonly [];
                readonly stateMutability: "payable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "account";
                    readonly type: "address";
                }];
                readonly name: "balanceOf";
                readonly outputs: readonly [{
                    readonly name: "";
                    readonly type: "uint256";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "target";
                    readonly type: "address";
                }, {
                    readonly name: "data";
                    readonly type: "bytes";
                }];
                readonly name: "delegateAndRevert";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "account";
                    readonly type: "address";
                }];
                readonly name: "depositTo";
                readonly outputs: readonly [];
                readonly stateMutability: "payable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "";
                    readonly type: "address";
                }];
                readonly name: "deposits";
                readonly outputs: readonly [{
                    readonly name: "deposit";
                    readonly type: "uint256";
                }, {
                    readonly name: "staked";
                    readonly type: "bool";
                }, {
                    readonly name: "stake";
                    readonly type: "uint112";
                }, {
                    readonly name: "unstakeDelaySec";
                    readonly type: "uint32";
                }, {
                    readonly name: "withdrawTime";
                    readonly type: "uint48";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "account";
                    readonly type: "address";
                }];
                readonly name: "getDepositInfo";
                readonly outputs: readonly [{
                    readonly components: readonly [{
                        readonly name: "deposit";
                        readonly type: "uint256";
                    }, {
                        readonly name: "staked";
                        readonly type: "bool";
                    }, {
                        readonly name: "stake";
                        readonly type: "uint112";
                    }, {
                        readonly name: "unstakeDelaySec";
                        readonly type: "uint32";
                    }, {
                        readonly name: "withdrawTime";
                        readonly type: "uint48";
                    }];
                    readonly name: "info";
                    readonly type: "tuple";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly name: "key";
                    readonly type: "uint192";
                }];
                readonly name: "getNonce";
                readonly outputs: readonly [{
                    readonly name: "nonce";
                    readonly type: "uint256";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "initCode";
                    readonly type: "bytes";
                }];
                readonly name: "getSenderAddress";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly components: readonly [{
                        readonly name: "sender";
                        readonly type: "address";
                    }, {
                        readonly name: "nonce";
                        readonly type: "uint256";
                    }, {
                        readonly name: "initCode";
                        readonly type: "bytes";
                    }, {
                        readonly name: "callData";
                        readonly type: "bytes";
                    }, {
                        readonly name: "accountGasLimits";
                        readonly type: "bytes32";
                    }, {
                        readonly name: "preVerificationGas";
                        readonly type: "uint256";
                    }, {
                        readonly name: "gasFees";
                        readonly type: "bytes32";
                    }, {
                        readonly name: "paymasterAndData";
                        readonly type: "bytes";
                    }, {
                        readonly name: "signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "userOp";
                    readonly type: "tuple";
                }];
                readonly name: "getUserOpHash";
                readonly outputs: readonly [{
                    readonly name: "";
                    readonly type: "bytes32";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly components: readonly [{
                        readonly components: readonly [{
                            readonly name: "sender";
                            readonly type: "address";
                        }, {
                            readonly name: "nonce";
                            readonly type: "uint256";
                        }, {
                            readonly name: "initCode";
                            readonly type: "bytes";
                        }, {
                            readonly name: "callData";
                            readonly type: "bytes";
                        }, {
                            readonly name: "accountGasLimits";
                            readonly type: "bytes32";
                        }, {
                            readonly name: "preVerificationGas";
                            readonly type: "uint256";
                        }, {
                            readonly name: "gasFees";
                            readonly type: "bytes32";
                        }, {
                            readonly name: "paymasterAndData";
                            readonly type: "bytes";
                        }, {
                            readonly name: "signature";
                            readonly type: "bytes";
                        }];
                        readonly name: "userOps";
                        readonly type: "tuple[]";
                    }, {
                        readonly name: "aggregator";
                        readonly type: "address";
                    }, {
                        readonly name: "signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "opsPerAggregator";
                    readonly type: "tuple[]";
                }, {
                    readonly name: "beneficiary";
                    readonly type: "address";
                }];
                readonly name: "handleAggregatedOps";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly components: readonly [{
                        readonly name: "sender";
                        readonly type: "address";
                    }, {
                        readonly name: "nonce";
                        readonly type: "uint256";
                    }, {
                        readonly name: "initCode";
                        readonly type: "bytes";
                    }, {
                        readonly name: "callData";
                        readonly type: "bytes";
                    }, {
                        readonly name: "accountGasLimits";
                        readonly type: "bytes32";
                    }, {
                        readonly name: "preVerificationGas";
                        readonly type: "uint256";
                    }, {
                        readonly name: "gasFees";
                        readonly type: "bytes32";
                    }, {
                        readonly name: "paymasterAndData";
                        readonly type: "bytes";
                    }, {
                        readonly name: "signature";
                        readonly type: "bytes";
                    }];
                    readonly name: "ops";
                    readonly type: "tuple[]";
                }, {
                    readonly name: "beneficiary";
                    readonly type: "address";
                }];
                readonly name: "handleOps";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "key";
                    readonly type: "uint192";
                }];
                readonly name: "incrementNonce";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "callData";
                    readonly type: "bytes";
                }, {
                    readonly components: readonly [{
                        readonly components: readonly [{
                            readonly name: "sender";
                            readonly type: "address";
                        }, {
                            readonly name: "nonce";
                            readonly type: "uint256";
                        }, {
                            readonly name: "verificationGasLimit";
                            readonly type: "uint256";
                        }, {
                            readonly name: "callGasLimit";
                            readonly type: "uint256";
                        }, {
                            readonly name: "paymasterVerificationGasLimit";
                            readonly type: "uint256";
                        }, {
                            readonly name: "paymasterPostOpGasLimit";
                            readonly type: "uint256";
                        }, {
                            readonly name: "preVerificationGas";
                            readonly type: "uint256";
                        }, {
                            readonly name: "paymaster";
                            readonly type: "address";
                        }, {
                            readonly name: "maxFeePerGas";
                            readonly type: "uint256";
                        }, {
                            readonly name: "maxPriorityFeePerGas";
                            readonly type: "uint256";
                        }];
                        readonly name: "mUserOp";
                        readonly type: "tuple";
                    }, {
                        readonly name: "userOpHash";
                        readonly type: "bytes32";
                    }, {
                        readonly name: "prefund";
                        readonly type: "uint256";
                    }, {
                        readonly name: "contextOffset";
                        readonly type: "uint256";
                    }, {
                        readonly name: "preOpGas";
                        readonly type: "uint256";
                    }];
                    readonly name: "opInfo";
                    readonly type: "tuple";
                }, {
                    readonly name: "context";
                    readonly type: "bytes";
                }];
                readonly name: "innerHandleOp";
                readonly outputs: readonly [{
                    readonly name: "actualGasCost";
                    readonly type: "uint256";
                }];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "";
                    readonly type: "address";
                }, {
                    readonly name: "";
                    readonly type: "uint192";
                }];
                readonly name: "nonceSequenceNumber";
                readonly outputs: readonly [{
                    readonly name: "";
                    readonly type: "uint256";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "interfaceId";
                    readonly type: "bytes4";
                }];
                readonly name: "supportsInterface";
                readonly outputs: readonly [{
                    readonly name: "";
                    readonly type: "bool";
                }];
                readonly stateMutability: "view";
                readonly type: "function";
            }, {
                readonly inputs: readonly [];
                readonly name: "unlockStake";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "withdrawAddress";
                    readonly type: "address";
                }];
                readonly name: "withdrawStake";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly inputs: readonly [{
                    readonly name: "withdrawAddress";
                    readonly type: "address";
                }, {
                    readonly name: "withdrawAmount";
                    readonly type: "uint256";
                }];
                readonly name: "withdrawTo";
                readonly outputs: readonly [];
                readonly stateMutability: "nonpayable";
                readonly type: "function";
            }, {
                readonly stateMutability: "payable";
                readonly type: "receive";
            }];
            address: Address;
            version: "0.7";
        };
        extend?: object | undefined;
        getAddress: () => Promise<Address>;
        decodeCalls?: ((data: Hex) => Promise<readonly {
            to: Hex;
            data?: Hex | undefined;
            value?: bigint | undefined;
        }[]>) | undefined | undefined;
        encodeCalls: (calls: Parameters<SmartAccountImplementation["encodeCalls"]>[0], callType?: CallType | undefined) => Promise<Hex>;
        getFactoryArgs: () => Promise<{
            factory?: Address | undefined;
            factoryData?: Hex | undefined;
        }>;
        getNonce: NonNullable<SmartAccountImplementation["getNonce"]>;
        getStubSignature: (parameters?: UserOperationRequest | undefined) => Promise<Hex>;
        nonceKeyManager?: NonceManager | undefined;
        sign: (parameters: {
            hash: Hash;
        }) => Promise<Hex>;
        signMessage: (parameters: {
            message: SignableMessage;
            useReplayableSignature?: boolean;
        }) => Promise<Hex>;
        signTypedData: <const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | "EIP712Domain" = keyof typedData>(parameters: TypedDataDefinition<typedData, primaryType>) => Promise<Hex>;
        signUserOperation: (parameters: UnionPartialBy<UserOperation, "sender"> & {
            chainId?: number | undefined;
        }) => Promise<Hex>;
        userOperation?: {
            estimateGas?: ((userOperation: UserOperationRequest) => Promise<ExactPartial<EstimateUserOperationGasReturnType> | undefined>) | undefined;
        } | undefined | undefined;
        authorization: {
            account: PrivateKeyAccount;
            address: Address;
        };
        kernelVersion: KERNEL_V3_VERSION_TYPE;
        kernelPluginManager: KernelPluginManager<"0.7">;
        factoryAddress: Address;
        accountImplementationAddress: Address;
        generateInitCode: () => Promise<Hex>;
        encodeModuleInstallCallData: () => Promise<Hex>;
        encodeDeployCallData: ({ abi, args, bytecode }: EncodeDeployDataParameters) => Promise<Hex>;
        eip7702Authorization?: (() => Promise<SignAuthorizationReturnType | undefined>) | undefined | undefined;
        address: Address;
        isDeployed: () => Promise<boolean>;
        type: "smart";
    } | undefined;
    validator: KernelValidator<"MultiChainECDSAValidator"> | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
};

export { }
