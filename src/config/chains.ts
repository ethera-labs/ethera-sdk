import { defineChain } from 'viem';

export const rollupA = defineChain({
  id: 555555,
  name: 'Rollup A',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-a-altda.sepolia.ethera-labs.io/']
    }
  },
  blockExplorers: {
    default: {
      name: 'Rollup A',
      url: 'https://rollup-a-altda.explorer.sepolia.ethera-labs.io/'
    }
  },
  iconBackground: 'none',
  iconUrl: '/images/networks/light.svg',
  testnet: true
});

export const rollupB = defineChain({
  id: 666666,
  name: 'Rollup B',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-b-altda.sepolia.ethera-labs.io/']
    }
  },
  blockExplorers: {
    default: {
      name: 'Rollup B',
      url: 'https://rollup-b-altda.explorer.sepolia.ethera-labs.io/'
    }
  },
  iconBackground: 'none',
  iconUrl: '/images/networks/light.svg',
  testnet: true
});

export const besuRollupA = defineChain({
  id: 300003,
  name: 'Besu Rollup A',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://op-rbuilder-a-besu.stage.ethera-labs.io/']
    }
  },
  blockExplorers: {
    default: {
      name: 'Besu Rollup A',
      url: 'https://rollup-a-besu.explorer.stage.ethera-labs.io/'
    }
  },
  iconBackground: 'none',
  iconUrl: '/images/networks/light.svg',
  testnet: true
});

export const besuRollupB = defineChain({
  id: 400005,
  name: 'Besu Rollup B',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://op-rbuilder-b-besu.stage.ethera-labs.io/']
    }
  },
  blockExplorers: {
    default: {
      name: 'Besu Rollup B',
      url: 'https://rollup-b-besu.explorer.stage.ethera-labs.io/'
    }
  },
  iconBackground: 'none',
  iconUrl: '/images/networks/light.svg',
  testnet: true
});
