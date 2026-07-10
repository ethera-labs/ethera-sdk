import type { AccountAbstractionContracts } from '@/config/account-abstraction';
import type { EtheraRpcSchema } from '@/types/ethera';
import type { Config } from '@wagmi/core';
import type { EntryPointType } from '@zerodev/sdk/types';
import type { Chain, PublicClient, Transport } from 'viem';
import type { SmartAccount } from 'viem/account-abstraction';

export type PaymasterEndpointArgs<TConfig extends Config> = {
  method: 'pm_getPaymasterStubData' | 'pm_getPaymasterData' | 'pm_sponsorUserOperation';
  chainId: TConfig['chains'][number]['id'];
};

export type EtheraConfigArgs<TConfig extends Config> = {
  wagmi: TConfig;
  getPaymasterEndpoint?: (args: PaymasterEndpointArgs<TConfig>) => string;
  /**
   * XT submission endpoint (the sidecar `POST /xt` route, or a gateway in front of it).
   * When set, `send()` posts the built raw legs as JSON here instead of calling the
   * legacy `eth_sendXTransaction` RPC on the first chain's transport.
   */
  xtSubmissionUrl?: string;
  /**
   * Per-chain bundler endpoint that serves `ethera_buildSignedUserOpsTx`.
   * When set, the build step is sent here instead of the chain's publicClient —
   * required when the bundler is a separate service from the chain RPC (the
   * deployed topology). When unset, the build call rides publicClient (legacy /
   * single-multiplexed-endpoint setups).
   */
  getBundlerUrl?: (chainId: TConfig['chains'][number]['id']) => string;
  accountAbstractionContracts: Partial<Record<TConfig['chains'][number]['id'], AccountAbstractionContracts>>;
  entryPoint?: EntryPointType<'0.7'>;
  entryPoints?: Partial<Record<TConfig['chains'][number]['id'], EntryPointType<'0.7'>>>;
};

export type EtheraConfigReturnType<TConfig extends Config = Config> = {
  getPublicClient: (
    chainId: TConfig['chains'][number]['id']
  ) => PublicClient<Transport, Chain, SmartAccount, EtheraRpcSchema>;
  getEntryPoint: (chainId: TConfig['chains'][number]['id']) => EntryPointType<'0.7'>;
  hasPaymaster: boolean;
  entryPoint: EntryPointType<'0.7'>;
} & Pick<EtheraConfigArgs<TConfig>, 'getPaymasterEndpoint' | 'accountAbstractionContracts' | 'entryPoints' | 'xtSubmissionUrl' | 'getBundlerUrl'>;
