import { SDKOptions } from "@/types";
import * as client from '@/lib/client'

export class Payments {
  constructor(options: SDKOptions) {}

  find(where: client.types.PaymentFilters, fetchOptions: RequestInit = {}) {
    return client.payments.find(where, fetchOptions)
  }
}
