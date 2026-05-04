import { stringifyBigints } from '@/utils/bigint';
import type {
  Abi,
  AbiFunction,
  AbiParameter,
  AbiParametersToPrimitiveTypes,
  AbiParameterToPrimitiveType,
  AbiType,
  AbiTypeToPrimitiveType,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
  ExtractAbiFunctions
} from 'abitype';
import { encodeFunctionData, type Hex } from 'viem';

export type AbiInputsToParams<T extends readonly AbiParameter[]> = {
  [K in T[number] as K['name'] extends string ? K['name'] : never]: AbiParameterToPrimitiveType<K>;
};

export const paramsToArray = <Fn extends AbiFunction, Params extends Record<string, AbiTypeToPrimitiveType<AbiType>>>({
  params,
  abiFunction
}: {
  params: Params;
  abiFunction: Fn;
}) => {
  return stringifyBigints(
    abiFunction.inputs.reduce(
      (acc, param) => {
        if (param.name) {
          const value = params[param.name];
          if (Number.isNaN(value)) {
            console.warn(`Passed NaN for the [${param.name}] parameter`);
            return [...acc, undefined] as AbiParametersToPrimitiveTypes<Fn['inputs']>;
          }
          return [...acc, value] as AbiParametersToPrimitiveTypes<Fn['inputs']>;
        }
        return acc;
      },
      [] as AbiParametersToPrimitiveTypes<Fn['inputs']>
    )
  ) as AbiParametersToPrimitiveTypes<Fn['inputs']>;
};

export const extractAbiFunction = <abi extends Abi, functionName extends ExtractAbiFunctionNames<abi>>(
  abi: abi,
  functionName: functionName
) => {
  return abi.find((abiFunction) => {
    if (abiFunction.type !== 'function') return false;
    return abiFunction?.name === functionName;
  }) as ExtractAbiFunction<abi, functionName>;
};

export type AbiEncoder<T extends Abi> = {
  [Fn in ExtractAbiFunctions<T, 'nonpayable' | 'payable'> as Fn['name'] & string]: (Fn &
    AbiFunction)['inputs'] extends readonly []
    ? () => Hex
    : (params: AbiInputsToParams<(Fn & AbiFunction)['inputs']>) => Hex;
};

function toEncodeFunctionDataParams<T extends Abi>(params: {
  abi: T;
  functionName: string;
  args: readonly unknown[];
}): Parameters<typeof encodeFunctionData>[0] {
  return params as Parameters<typeof encodeFunctionData>[0];
}

const isWriteFunction = (item: Abi[number]): item is AbiFunction =>
  item.type === 'function' && item.stateMutability !== 'view' && item.stateMutability !== 'pure';

export const createAbiEncoder = <T extends Abi>(abi: T): AbiEncoder<T> => {
  const writeFunctions = abi.filter(isWriteFunction);

  return Object.fromEntries(
    writeFunctions.map((abiFn) => [
      abiFn.name,
      (params?: AbiInputsToParams<typeof abiFn.inputs>) =>
        encodeFunctionData(
          toEncodeFunctionDataParams({
            abi,
            functionName: abiFn.name,
            args: params ? paramsToArray({ params, abiFunction: abiFn }) : []
          })
        )
    ])
  ) as AbiEncoder<T>;
};
