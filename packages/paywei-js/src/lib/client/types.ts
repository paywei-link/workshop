export interface ProductFilters {
  recipientAddress?: string
}

export interface PaymentFilters {
  productId: string
  from?: string
  to?: string
  transactionHash?: string
}
