import { getEntryPoint } from '@zerodev/sdk/constants';

export const entryPointV07 = getEntryPoint('0.7');

export const rollupsAccountAbstractionContracts = {
  kernelImpl: '0x317A2D4564778A585BAd21376dC1ca65b75ccC6a',
  kernelFactory: '0xdEF4343958B5dE047bddEFaB5Fa8F9Ff898890e5',
  multichainValidator: '0x8aB3f6935399e1c10419cA2C93d60901a256b7e3',
  metaFactory: '0x54db674c515e5fdec3f91345bc2fdafafd8b3b8a'
} as const;

export const composeRollupsContracts = {
  tokens: {
    WETH: '0x29dDf1a92069c4c170A63032C93c2aE66C359Bf9',
    USDC: '0x0F5808d4776E7fB10293f2DCd6dA3073b8Dad970',
    SSV: '0x969b0ad5ffa2376E8C0f5e413D510a056416D627'
  },
  bridge: '0x1388C9619aCCcd1dfff0234626EDDA61413Be74e'
} as const;
