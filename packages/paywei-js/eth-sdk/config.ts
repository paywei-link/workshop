import { defineConfig } from '@dethcrypto/eth-sdk'

export default defineConfig({
  contracts: {
    mainnet: {
      paymentRouterV1: '0xDc8092A838a3350CA4Ce4099251447A6c0eAD396'
    },
    arbitrum: {
      paymentRouterV1: '0xDA4212A38B2FFE79B42Efa098db1C544387d9eF2'
    },
    polygon: {
      paymentRouterV1: '0x71d4639a8746Ba7D5c9c5f2d7b8c82609F3104Bd'
    },
    goerli: {
      paymentRouterV1: '0x3D51E6187F74095dA09a61c22FECA78A9A196b3E'
    }
  },
})
