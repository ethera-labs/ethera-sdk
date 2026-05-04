import { api } from '@/api/api-client';
import { EtheraError } from '@/errors';
import type { EtheraConfigReturnType } from '@/types';
import { stringifyBigints } from '@/utils/bigint';
import type { Hex } from 'viem';
import { numberToHex } from 'viem';
import type { GetPaymasterDataParameters } from 'viem/account-abstraction';

interface PaymasterResponseData {
  id: 1;
  jsonrpc: '2.0';
  result: {
    paymaster: `0x${string}`;
    paymasterData: `0x${string}`;
    paymasterPostOpGasLimit: Hex;
    paymasterVerificationGasLimit: Hex;

    preVerificationGas: Hex;
    callGasLimit: Hex;
    verificationGasLimit: Hex;
  };
}

export type GetPaymasterDataForChainParams = {
  params: GetPaymasterDataParameters;
  method: 'pm_getPaymasterStubData' | 'pm_getPaymasterData' | 'pm_sponsorUserOperation';
  getPaymasterEndpoint: NonNullable<EtheraConfigReturnType['getPaymasterEndpoint']>;
};

const hexify = (n: number | bigint | undefined) => (n ? numberToHex(n) : undefined);

export const getValidatedPaymasterEndpoint = ({
  method,
  chainId,
  getPaymasterEndpoint
}: Pick<GetPaymasterDataForChainParams, 'method' | 'getPaymasterEndpoint'> & { chainId: number }) => {
  const endpoint = getPaymasterEndpoint({ method, chainId });

  if (!endpoint) {
    throw new EtheraError('PAYMASTER_ENDPOINT_INVALID', `Paymaster endpoint not found for chain ${chainId}.`, {
      details: { method, chainId, value: endpoint }
    });
  }

  try {
    return new URL(endpoint).toString();
  } catch {
    throw new EtheraError('PAYMASTER_ENDPOINT_INVALID', `Invalid paymaster endpoint for chain ${chainId}.`, {
      details: { method, chainId, value: endpoint }
    });
  }
};

export const getPaymasterDataForChain = async ({
  params,
  method,
  getPaymasterEndpoint
}: GetPaymasterDataForChainParams) => {
  const endpoint = getValidatedPaymasterEndpoint({
    method,
    chainId: params.chainId,
    getPaymasterEndpoint
  });

  const userOpOnly = {
    callData: params.callData,
    initCode: params.initCode,
    callGasLimit: hexify(params.callGasLimit),
    factory: params.factory,
    factoryData: params.factoryData,
    maxFeePerGas: hexify(params.maxFeePerGas || 0),
    maxPriorityFeePerGas: hexify(params.maxPriorityFeePerGas || 0),
    nonce: hexify(params.nonce),
    sender: params.sender,
    preVerificationGas: hexify(params.preVerificationGas || 0),
    verificationGasLimit: hexify(params.verificationGasLimit || 0),
    paymasterPostOpGasLimit: hexify(params.paymasterPostOpGasLimit || 0),
    paymasterVerificationGasLimit: hexify(params.paymasterVerificationGasLimit || 0)
  };

  const paymasterParams = [userOpOnly, params.entryPointAddress];

  if (method !== 'pm_sponsorUserOperation') {
    paymasterParams.push(numberToHex(params.chainId));
  }

  return api
    .post<PaymasterResponseData>(
      endpoint,
      {
        jsonrpc: '2.0',
        id: 1,
        method,
        params: stringifyBigints(paymasterParams)
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then((res) => {
      return {
        ...res.result,
        paymasterPostOpGasLimit: BigInt(res.result?.paymasterPostOpGasLimit || '0'),
        paymasterVerificationGasLimit: BigInt(res.result.paymasterVerificationGasLimit || '0')
      };
    });
};
