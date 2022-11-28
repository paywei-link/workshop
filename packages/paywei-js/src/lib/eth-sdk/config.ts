import { defineConfig, EthSdkContracts } from '@dethcrypto/eth-sdk'
import { config } from '../../config'
const contracts = config.contracts as EthSdkContracts

export default defineConfig({
  contracts
})
