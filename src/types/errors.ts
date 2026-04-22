export type EtheraErrorCode =
  | 'ACCOUNT_ABSTRACTION_CONTRACTS_MISSING'
  | 'ACCOUNT_ABSTRACTION_CONTRACT_FIELD_MISSING'
  | 'ACCOUNT_ABSTRACTION_CONTRACT_ADDRESS_INVALID'
  | 'CALLS_EMPTY'
  | 'CHAIN_ID_MISMATCH'
  | 'OPERATIONS_EMPTY'
  | 'PUBLIC_CLIENT_NOT_FOUND'
  | 'SMART_ACCOUNT_INVALID'
  | 'WALLET_CLIENT_NOT_AVAILABLE';

export type EtheraErrorDetails = {
  chainId?: number;
  expected?: string;
  field?: string;
  method?: string;
  operationIndex?: number;
  received?: string;
  value?: string;
};

export type EtheraErrorOptions = {
  cause?: unknown;
  details?: EtheraErrorDetails;
};
