import { Payment } from '@prisma/client'
import { config } from '../../config'
import type { PaymentFilters } from './types'

const find = (
  where: PaymentFilters,
  fetchOptions: RequestInit = {}
): Promise<Payment[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { productId, ...rest } = where
  const params = new URLSearchParams(
    rest as Record<keyof PaymentFilters, string>
  )
  const url = new URL(
    `v1/products/${where.productId}/payments?${params.toString()}`,
    config.apiUrl
  )
  const response = fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then(({ payments }) => {
      return payments
    })

  return response
}

export { find }
