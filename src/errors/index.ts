export type ComposeErrorCode =
  | 'ACCOUNT_ABSTRACTION_CONTRACTS_MISSING'
  | 'ACCOUNT_ABSTRACTION_CONTRACT_FIELD_MISSING'
  | 'ACCOUNT_ABSTRACTION_CONTRACT_ADDRESS_INVALID'
  | 'OPERATIONS_EMPTY'
  | 'PUBLIC_CLIENT_NOT_FOUND'
  | 'WALLET_CLIENT_NOT_AVAILABLE';

export type ComposeErrorDetails = {
  chainId?: number;
  field?: string;
  method?: string;
  value?: string;
};

type ComposeErrorOptions = {
  cause?: unknown;
  details?: ComposeErrorDetails;
};

export class ComposeError extends Error {
  readonly code: ComposeErrorCode;
  readonly details?: ComposeErrorDetails;
  readonly cause?: unknown;

  constructor(code: ComposeErrorCode, message: string, options: ComposeErrorOptions = {}) {
    super(message);
    this.name = 'ComposeError';
    this.code = code;
    this.details = options.details;
    this.cause = options.cause;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const isComposeError = (error: unknown): error is ComposeError => error instanceof ComposeError;
