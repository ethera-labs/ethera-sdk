import type { CanonicalUserOp, ComposedSignedUserOpsTxReturnType } from '@/types/user-op';

export type EtheraRpcSchema = [
  {
    Method: 'eth_sendXTransaction';
    Parameters: [string];
    ReturnType: null;
  },
  {
    Method: 'ethera_buildSignedUserOpsTx';
    Parameters: [CanonicalUserOp[], { chainId: number; submit?: boolean }];
    ReturnType: ComposedSignedUserOpsTxReturnType;
  }
];
