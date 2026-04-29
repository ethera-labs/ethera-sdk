import type { EtheraErrorCode, EtheraErrorDetails, EtheraErrorOptions } from '@/types/errors';

export class EtheraError extends Error {
  readonly code: EtheraErrorCode;
  readonly details?: EtheraErrorDetails;
  readonly cause?: unknown;

  constructor(code: EtheraErrorCode, message: string, options: EtheraErrorOptions = {}) {
    super(message);
    this.name = 'EtheraError';
    this.code = code;
    this.details = options.details;
    this.cause = options.cause;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const isEtheraError = (error: unknown): error is EtheraError => error instanceof EtheraError;
