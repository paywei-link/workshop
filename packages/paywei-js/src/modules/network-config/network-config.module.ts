import { Network } from "../../types";
import * as Configs from './configs'

export type NetConfig = {
  chainId: number;
  contracts: {
    paymentRouterV1: string;
  };
  nativeAsset: {
    name: string;
    address: string;
    symbol: string;
    decimals: number,
    logoURI: string;
  };
}

const configMap: Record<Network | number, NetConfig> = {
  [Network.MAINNET]: Configs.mainnet,
  [Network.ARBITRUM]: Configs.arbitrum,
  [Network.POLYGON]: Configs.polygon,
  [Network.GOERLI]: Configs.goerli
};

export class NetworkConfig {
  static get(network: Network): NetConfig {
    const config = configMap[network]
    if (!config) throw new Error(`Network not supported: ${network}`)
    return config
  }
}
