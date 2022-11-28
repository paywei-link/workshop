export enum Network {
  MAINNET = 1,
  ARBITRUM = 42161,
  POLYGON = 137,
  GOERLI = 5
}

export type SDKOptions = {
  network: Network
  apiKey: string
}
