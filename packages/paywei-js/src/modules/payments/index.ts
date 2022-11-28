import * as client from '../../lib/client'

export class Payments {
  find(where: client.types.PaymentFilters, fetchOptions: RequestInit = {}) {
    return client.payments.find(where, fetchOptions)
  }
}
