import { SDKOptions } from '@/types'
import { Prisma, Product } from '@prisma/client'
import * as client from '@/lib/client'
import { PaymentRouter } from '@/modules/contracts/payment-router'
import { formatBytes32String } from 'ethers/lib/utils'
import { Contracts } from '../contracts'
import { Signer } from 'ethers'
import { NetworkConfig } from '../network-config/network-config.module'
import { isSameAddress } from '@/lib/utils/addresses'

export class Products {
  constructor(
    options: SDKOptions,
    private readonly paymentRouter = new PaymentRouter(options.network),
    private readonly contracts = new Contracts(options.network)
  ) {}

  async get(id: string, fetchOptions: RequestInit = {}) {
    const product = await client.products.get(id, fetchOptions)
    return this.decorateWithMethods(product)
  }

  async find(where: client.types.ProductFilters, fetchOptions: RequestInit = {}) {
    const products = await client.products.find(where, fetchOptions)
    return products.map(this.decorateWithMethods)
  }

  async create(data: Prisma.ProductCreateInput, fetchOptions: RequestInit = {}) {
    const product = await client.products.create(data, fetchOptions)
    return this.decorateWithMethods(product)
  }

  buildPayment(product: Product) {
    const config = NetworkConfig.get(product.network)

    if (!this.paymentRouter) {
      throw 'Missing paymentRouter'
    }

    const { amount, recipientAddress, eventRef, tokenAddress } = product
    let value = undefined
    if (isSameAddress(tokenAddress, config.nativeAsset.address)) {
      value = amount
    }
    const id = formatBytes32String(eventRef)
    const data = this.paymentRouter.interface.encodeFunctionData(
      'makePayment',
      [tokenAddress, amount, recipientAddress, id]
    )

    return {
      to: this.paymentRouter.address,
      data,
      value
    }
  }

  sendPayment(product: Product, signer: Signer) {
    const config = NetworkConfig.get(product.network)
    const { amount, recipientAddress: recipient, eventRef, tokenAddress } = product
    let value = undefined
    if (isSameAddress(tokenAddress, config.nativeAsset.address)) {
      value = amount
    }
    const id = formatBytes32String(eventRef)

    this.contracts.connect(signer)
    this.contracts.paymentRouter.makePayment(tokenAddress, amount, recipient, id, { value })
  }

  decorateWithMethods(product: Product) {
    return {
      ...product,
      buildPayment: () => this.buildPayment(product),
      sendPayment: (signer: Signer) => this.sendPayment(product, signer),
    }
  }
}
