import type { ComposeConfigReturnType } from '@/config/create';
import { ComposeProvider, useComposeConfig } from '@/libs/react';
import { renderHook } from '@testing-library/react';
import type { Config } from '@wagmi/core';
import { describe, expect, it, vi } from 'vitest';

describe('useCompose', () => {
  it('should return compose config when used via renderHook', () => {
    const config = {} as ComposeConfigReturnType<Config>;

    const { result } = renderHook(() => useComposeConfig(), {
      wrapper: ({ children }) => <ComposeProvider config={config} children={children} />
    });

    expect(result.current).toBe(config);
  });

  it('should throw error when useCompose is used outside provider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      expect(() => renderHook(() => useComposeConfig())).toThrow('useCompose must be used within a ComposeProvider');
    } finally {
      consoleErrorSpy.mockRestore();
    }
  });
});
