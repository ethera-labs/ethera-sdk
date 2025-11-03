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

export type AbiEncoder<T extends AbiFunction[]> = {
  [Fn in T[number] as Fn['name']]: Fn['inputs'] extends readonly []
    ? () => Hex
    : (params: AbiInputsToParams<Fn['inputs']>) => Hex;
};

export const createAbiEncoder = <T extends Abi = Abi>(
  abi: T
  //@ts-expect-error - TODO: fix this
): AbiEncoder<ExtractAbiFunctions<T, 'nonpayable' | 'payable'>[]> => {
  const writeFunctions = abi.filter(
    (item) => item.type === 'function' && item.stateMutability !== 'view' && item.stateMutability !== 'pure'
  ) as AbiFunction[];

  return writeFunctions.reduce((acc, abiFn) => {
    return {
      ...acc,
      [abiFn.name]: (params?: AbiInputsToParams<typeof abiFn.inputs>) => {
        // @ts-expect-error - TODO: fix this
        return encodeFunctionData({
          abi,
          functionName: abiFn.name,
          args: !params ? [] : paramsToArray({ params, abiFunction: abiFn })
        });
      }
    };
  }, {} as any);
};

