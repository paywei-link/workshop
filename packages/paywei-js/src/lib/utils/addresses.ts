import { getAddress } from "ethers/lib/utils"

export function isSameAddress (a: string, b: string): boolean {
  if (!a || !b) return false
  return getAddress(a) === getAddress(b)
}
