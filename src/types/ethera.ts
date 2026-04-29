import type { CanonicalUserOp, ComposedSignedUserOpsTxReturnType } from '@/types/user-op';

export type EtheraRpcSchema = [
  {
    Method: 'eth_sendXTransaction';
    Parameters: [string];
    ReturnType: null;
  },
  {
    Method: 'compose_buildSignedUserOpsTx';
    Parameters: [CanonicalUserOp[], { chainId: number }];
    ReturnType: ComposedSignedUserOpsTxReturnType;
  }
];
