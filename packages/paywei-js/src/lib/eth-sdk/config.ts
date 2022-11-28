import * as networkConfig from '../../modules/network-config/configs'
import { defineConfig, EthSdkContracts } from '@dethcrypto/eth-sdk'

const mainnet = networkConfig.mainnet.contracts
const polygon = networkConfig.polygon.contracts
const arbitrumOne = networkConfig.arbitrum.contracts
const goerli = networkConfig.goerli.contracts
const contracts = { mainnet, polygon, arbitrumOne, goerli } as EthSdkContracts

export default defineConfig({
  contracts
})
