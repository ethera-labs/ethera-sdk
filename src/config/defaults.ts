import { getEntryPoint } from '@zerodev/sdk/constants';

export const entryPointV07 = getEntryPoint('0.7');

export const rollupsAccountAbstractionContracts = {
  kernelImpl: '0xBAC849bB641841b44E965fB01A4Bf5F074f84b4D',
  kernelFactory: '0xaac5D4240AF87249B3f71BC8E4A2cae074A3E419',
  multichainValidator: '0x37CE732412539644b3d0E959925a4f89edd463c9'
} as const;
