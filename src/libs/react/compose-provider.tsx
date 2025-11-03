import type { ComposeConfigReturnType } from '@/config/create';
import type { Config } from '@wagmi/core';
import type { ReactElement } from 'react';
import { createContext, ReactNode, useContext } from 'react';

type ComposeContextValue<TConfig extends Config> = ComposeConfigReturnType<TConfig>;

const ComposeContext = createContext<ComposeContextValue<any> | null>(null);

export interface ComposeProviderProps<TConfig extends Config> {
  children: ReactNode;
  config: ComposeConfigReturnType<TConfig>;
}

export function ComposeProvider<TConfig extends Config>({
  children,
  config
}: ComposeProviderProps<TConfig>): ReactElement {
  return <ComposeContext.Provider value={config}>{children}</ComposeContext.Provider>;
}

export function useComposeConfig<TConfig extends Config>(): ComposeContextValue<TConfig> {
  const context = useContext(ComposeContext);
  if (!context) {
    throw new Error('useCompose must be used within a ComposeProvider');
  }
  return context;
}
