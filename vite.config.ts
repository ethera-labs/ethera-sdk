import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig(({ mode }) => ({
  plugins: [
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts', 'src/**/*.test.tsx'],
      rollupTypes: true,
      outDir: 'dist',
      entryRoot: 'src',
      tsconfigPath: './tsconfig.json'
    }),
    nodePolyfills({
      globals: {
        Buffer: mode === 'production'
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },

  build: {
    target: 'node22',
    minify: false,
    lib: {
      entry: {
        main: resolve(__dirname, 'src/main.ts'),
        react: resolve(__dirname, 'src/libs/react/index.ts')
      },
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'wagmi', '@wagmi/core', '@tanstack/react-query', 'viem'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js'
        }
      ]
    },
    outDir: 'dist'
  }
}));
