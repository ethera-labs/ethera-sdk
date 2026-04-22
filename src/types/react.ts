import type { EtheraConfigReturnType } from '@/types/config';
import type { Config } from '@wagmi/core';
import type { ReactNode } from 'react';

export interface EtheraProviderProps<TConfig extends Config> {
  children: ReactNode;
  config: EtheraConfigReturnType<TConfig>;
}
