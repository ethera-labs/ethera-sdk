import type { ComposedSignedUserOpsTxReturnType, toRpcUserOpCanonical } from '@/utils';

export type ComposeRpcSchema = [
  {
    Method: 'eth_sendXTransaction';
    Parameters: [string];
    ReturnType: null;
  },
  {
    Method: 'compose_buildSignedUserOpsTx';
    Parameters: [ReturnType<typeof toRpcUserOpCanonical>[], { chainId: number }];
    ReturnType: ComposedSignedUserOpsTxReturnType;
  }
];
