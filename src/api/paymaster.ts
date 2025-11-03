import { api } from '@/api/api-client';
import type { ComposeConfigReturnType } from '@/config';
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
  getPaymasterEndpoint: NonNullable<ComposeConfigReturnType['getPaymasterEndpoint']>;
};

const hexify = (n: number | bigint | undefined) => (n ? numberToHex(n) : undefined);

export const getPaymasterDataForChain = async ({
  params,
  method,
  getPaymasterEndpoint
}: GetPaymasterDataForChainParams) => {
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

  if (!import.meta.env.VITE_PAYMASTER_URL) {
    throw new Error('VITE_PAYMASTER_URL is not set - Paymaster Service URL - set it in .env to support paymaster');
  }

  const paymasterParams = [userOpOnly, params.entryPointAddress];

  if (method !== 'pm_sponsorUserOperation') {
    paymasterParams.push(numberToHex(params.chainId));
  }

  return api
    .post<PaymasterResponseData>(
      getPaymasterEndpoint({ method, chainId: params.chainId })!,
      {
        jsonrpc: '2.0',
        id: 1,
        method,
        params: paymasterParams
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        transformRequest: [stringifyBigints]
      }
    )
    .then((res) => {
      console.log('Paymaster response', res);
      return {
        ...res.result,
        paymasterPostOpGasLimit: BigInt(res.result?.paymasterPostOpGasLimit || '0'),
        paymasterVerificationGasLimit: BigInt(res.result.paymasterVerificationGasLimit || '0')
      };
    });
};
