import { EtheraError } from '@/errors';
import { isAddress } from 'viem';

export const ACCOUNT_ABSTRACTION_CONTRACT_FIELDS = ['kernelImpl', 'kernelFactory', 'multichainValidator'] as const;

export type AccountAbstractionContractField = (typeof ACCOUNT_ABSTRACTION_CONTRACT_FIELDS)[number];

export type AccountAbstractionContracts = Record<AccountAbstractionContractField, `0x${string}`>;

type ContractsByChain<TChainId extends number = number> = Partial<
  Record<TChainId, Partial<Record<AccountAbstractionContractField, `0x${string}`>>>
>;

export const getAccountAbstractionContractsForChain = <TChainId extends number>(
  accountAbstractionContracts: ContractsByChain<TChainId>,
  chainId: TChainId
): AccountAbstractionContracts => {
  const contracts = accountAbstractionContracts[chainId];

  if (!contracts) {
    throw new EtheraError(
      'ACCOUNT_ABSTRACTION_CONTRACTS_MISSING',
      `Account abstraction contracts not found for chain ${chainId}.`,
      { details: { chainId } }
    );
  }

  for (const field of ACCOUNT_ABSTRACTION_CONTRACT_FIELDS) {
    const address = contracts[field];

    if (!address) {
      throw new EtheraError(
        'ACCOUNT_ABSTRACTION_CONTRACT_FIELD_MISSING',
        `Missing required account abstraction contract "${field}" for chain ${chainId}.`,
        { details: { chainId, field } }
      );
    }

    if (!isAddress(address)) {
      throw new EtheraError(
        'ACCOUNT_ABSTRACTION_CONTRACT_ADDRESS_INVALID',
        `Invalid "${field}" address for chain ${chainId}: ${address}.`,
        { details: { chainId, field, value: address } }
      );
    }
  }

  return contracts as AccountAbstractionContracts;
};

export const validateAccountAbstractionContracts = <TChainId extends number>(
  chainIds: readonly TChainId[],
  accountAbstractionContracts: ContractsByChain<TChainId>
) => {
  chainIds.forEach((chainId) => {
    getAccountAbstractionContractsForChain(accountAbstractionContracts, chainId);
  });
};
