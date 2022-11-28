import { Product, Prisma } from '@prisma/client'
import { config } from '../../config'
import type { ProductFilters } from './types'

const get = (id: string, fetchOptions: RequestInit = {}): Promise<Product> => {
  const url = new URL(`v1/products/${id}`, config.apiUrl)
  const response = fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then(({ product }) => {
      return product
    })
  // TODO: do we want to handle errors and give custom names, or propagate to user?
  // .catch(err => {
  //   if (err.name === 'AbortError') {
  //     console.log('cancelled')
  //   } else {
  //     // TODO: Handle failing requests
  //   }
  // })

  return response
}

const find = (
  where: ProductFilters,
  fetchOptions: RequestInit = {}
): Promise<Product[]> => {
  const params = new URLSearchParams(
    where as Record<keyof ProductFilters, string>
  )
  const url = new URL(`v1/products?${params.toString()}`, config.apiUrl)
  const response = fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then(({ products }) => {
      return products
    })

  return response
}

const create = (
  product: Prisma.ProductCreateInput,
  fetchOptions: RequestInit = {}
): Promise<Product> => {
  const url = new URL('v1/products', config.apiUrl)
  const response = fetch(url.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
    ...fetchOptions,
  })
    .then((res) => res.json())
    .then(({ product }) => {
      return product
    })

  return response
}

export { get, find, create }
