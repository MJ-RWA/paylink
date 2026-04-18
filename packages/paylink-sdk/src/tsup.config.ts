import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,

  external: [
    'react',
    'react-dom',
    'starknet',
    'zustand',
    '@privy-io/react-auth',
    'starkzap',
    '@hyperlane-xyz/sdk',
    '@hyperlane-xyz/utils',
    '@hyperlane-xyz/registry',
  ],
});