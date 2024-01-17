import { FeedParamsConfig, Network, NetworksConfig, RouterDataFeedsConfig } from "../types";
import { getNetworksListByChain, sortAlphabeticallyByLabel } from "../utils";
import { NetworkInfo } from "./NetworkRouter";
import { getProvider } from "./provider";

export class Configuration {
  private configurationFile: RouterDataFeedsConfig

  constructor(json: RouterDataFeedsConfig) {
    this.configurationFile = json
  }

  // normalize config to fit network schema
  public normalizeNetworkConfig (
    config: RouterDataFeedsConfig
  ): Array<Omit<NetworksConfig, 'logo'>> {
    // Get a list of networks where every element of the array contains another array with networks that belong to a chain.
    const networks = getNetworksListByChain(config)

    // Put all networks at the same level removing the nested arrays
    const networkConfig = networks.reduce((networks, network) => {
      network.map(network => {
        networks.push({
          ...network
        })
      })
      return networks
    }, [])
    const testnetNetworks = networkConfig.filter(network => !network.mainnet)
    const mainnetNetworks = networkConfig.filter(network => network.mainnet)
    return [
      ...sortAlphabeticallyByLabel(mainnetNetworks),
      ...sortAlphabeticallyByLabel(testnetNetworks)
    ]
  }

  // return networks using the new price feeds router contract
  public listNetworksUsingPriceFeedsContract(): Array<NetworkInfo> {
    return Object.values(this.configurationFile.chains)
      .flatMap(chain => Object.entries(chain.networks))
      .filter(([_, network])=> network.legacy === false)
      .map(([networkKey, network]) => {
        return {
          provider: getProvider(networkKey.replaceAll('.', '-') as Network),
          address: network.address,
          pollingPeriod: network.pollingPeriod,
          key: this.fromNetworkKeyToNetwork(networkKey),
          networkName: network.name,
        }
      })
  }

  public getLegacyConfigurationFile(): RouterDataFeedsConfig {
    const chains = Object.entries(this.configurationFile.chains).reduce((acc, [chainKey, chain]) => {

      if (chain.hide) {
        return acc
      }

      const networks = Object.entries(chain.networks).reduce((accNetworks, [networkKey, network]) => {
        // add the network entry if it's legacy
        return network.legacy ? { ...accNetworks, [networkKey]: network } : accNetworks;
      }, {})

      return Object.keys(networks).length > 0 ? { ...acc, [chainKey]: { ...chain, networks } } : acc
    }, {})

    return {
      ...this.configurationFile,
      chains,
    }
  }

  public getFeedConfiguration(priceFeedName: string, network: Network): FeedParamsConfig {
    const defaultFeed = this.configurationFile.feeds[priceFeedName]
    const specificFeedConfiguration = this.getNetworkConfiguration(network).feeds[priceFeedName]

    return { ...defaultFeed, ...specificFeedConfiguration }
  }

  public isFeedActive(caption: string): boolean {
    return Object.keys(this.configurationFile.feeds).includes(caption)
  }

  public getNetworkConfiguration(network: Network) {
    return this.configurationFile.chains[getChain(network)].networks[networkToKey(network)]
  }

  private fromNetworkKeyToNetwork(networkKey: string): Network {
    return networkKey.replace('.', '-') as Network
  }
}

export function getChain(network: Network) {
  return network.split('-')[0]
}
export function networkToKey(network: Network) {
  return network.replaceAll('-', '.')
}
