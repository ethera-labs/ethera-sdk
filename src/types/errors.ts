export type EtheraErrorCode =
  | 'ACCOUNT_ABSTRACTION_CONTRACTS_MISSING'
  | 'ACCOUNT_ABSTRACTION_CONTRACT_FIELD_MISSING'
  | 'ACCOUNT_ABSTRACTION_CONTRACT_ADDRESS_INVALID'
  | 'BRIDGE_AMOUNT_INVALID'
  | 'CALLS_EMPTY'
  | 'CHAIN_ID_MISMATCH'
  | 'COMPOSE_OPERATION_AMBIGUOUS'
  | 'COMPOSE_OPERATION_DUPLICATE'
  | 'OPERATIONS_EMPTY'
  | 'PAYMASTER_ENDPOINT_INVALID'
  | 'PUBLIC_CLIENT_NOT_FOUND'
  | 'SMART_ACCOUNT_INVALID'
  | 'WALLET_CLIENT_NOT_AVAILABLE';

export type EtheraErrorDetails = {
  accountAddress?: string;
  chainId?: number;
  duplicateOperationIndex?: number;
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
