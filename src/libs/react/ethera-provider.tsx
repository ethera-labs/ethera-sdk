import type { EtheraConfigReturnType, EtheraProviderProps } from '@/types';
import type { Config } from '@wagmi/core';
import type { ReactElement } from 'react';
import { createContext, useContext } from 'react';

type EtheraContextValue<TConfig extends Config> = EtheraConfigReturnType<TConfig>;

const EtheraContext = createContext<EtheraContextValue<any> | null>(null);

export function EtheraProvider<TConfig extends Config>({
  children,
  config
}: EtheraProviderProps<TConfig>): ReactElement {
  return <EtheraContext.Provider value={config}>{children}</EtheraContext.Provider>;
}

export function useEtheraConfig<TConfig extends Config>(): EtheraContextValue<TConfig> {
  const context = useContext(EtheraContext);
  if (!context) {
    throw new Error('useEthera must be used within an EtheraProvider');
  }
  return context;
}
