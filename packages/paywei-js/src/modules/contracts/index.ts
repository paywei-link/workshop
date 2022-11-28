import { getMainnetSdk, getGoerliSdk, MainnetSdk, GoerliSdk } from '@dethcrypto/eth-sdk-client'
import { Signer } from 'ethers'
import { Network } from '@/types'

export class Contracts {
  public sdk: MainnetSdk | GoerliSdk | undefined

  constructor(private network: Network) {}

  connect(signer: Signer) {
    if (this.network === 5) {
      this.sdk = getGoerliSdk(signer)
    } else {
      this.sdk = getMainnetSdk(signer)
    }

    return this.sdk
  }

  get paymentRouter() {
    if (this.sdk && 'transferProxy' in this.sdk) {
      return this.sdk.paymentRouter
    }

    return
  }
}
