import {
  MainnetSdk,
  getMainnetSdk,
  GoerliSdk,
  getGoerliSdk,
  ArbitrumOneSdk,
  getArbitrumOneSdk,
  PolygonSdk,
  getPolygonSdk
} from '@dethcrypto/eth-sdk-client'
import { Signer } from 'ethers'
import { Network } from '@/types'

export class Contracts {
  public sdk: MainnetSdk | GoerliSdk | ArbitrumOneSdk | PolygonSdk | undefined

  constructor(private network: Network) {}

  connect(signer: Signer) {
    if (this.network === 5) {
      this.sdk = getGoerliSdk(signer)
    } else if (this.network === 42161) {
      this.sdk = getArbitrumOneSdk(signer)
    } else if (this.network === 137) {
      this.sdk = getPolygonSdk(signer)
    } else {
      this.sdk = getMainnetSdk(signer)
    }

    return this.sdk
  }

  get paymentRouter(): MainnetSdk['paymentRouterV1'] | undefined {
    if (this.sdk && 'paymentRouterV1' in this.sdk) {
      return this.sdk.paymentRouterV1
    }

    return
  }
}
