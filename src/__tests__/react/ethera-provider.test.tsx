import type { EtheraConfigReturnType } from '@/types';
import { EtheraProvider, useEtheraConfig } from '@/libs/react';
import { renderHook } from '@testing-library/react';
import type { Config } from '@wagmi/core';
import { describe, expect, it, vi } from 'vitest';

describe('useEthera', () => {
  it('should return Ethera config when used via renderHook', () => {
    const config = {} as EtheraConfigReturnType<Config>;

    const { result } = renderHook(() => useEtheraConfig(), {
      wrapper: ({ children }) => <EtheraProvider config={config} children={children} />
    });

    expect(result.current).toBe(config);
  });

  it('should throw error when useEthera is used outside provider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      expect(() => renderHook(() => useEtheraConfig())).toThrow('useEthera must be used within an EtheraProvider');
    } finally {
      consoleErrorSpy.mockRestore();
    }
  });
});
