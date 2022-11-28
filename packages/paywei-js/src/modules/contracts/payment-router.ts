import { PaymentRouterV1__factory } from '../../lib/typechain'
import { PaymentRouterV1Interface } from '../../lib/typechain/PaymentRouterV1'
import { Network } from '../../types'
import { NetworkConfig } from '../network-config/network-config.module'

export class PaymentRouter {
  public address: string | undefined
  public interface: PaymentRouterV1Interface

  constructor(
    private network: Network,
    private readonly config = NetworkConfig.get(network)
  ) {
    this.address = this.config.contracts.paymentRouterV1
    this.interface = PaymentRouterV1__factory.createInterface()
  }
}
