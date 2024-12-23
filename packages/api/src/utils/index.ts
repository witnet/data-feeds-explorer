import { RouterDataFeedsConfig, NetworksConfig } from '../../types'

// parse data feed full name to fit schema
export function createFeedFullName(network, name, decimals) {
  return `${network}_${name.split('/').join('-')}_${decimals}`.toLowerCase()
}

// Get networks list by chain
export function getNetworksListByChain(config: RouterDataFeedsConfig) {
  return Object.values(config.chains).map((chain) => {
    const networkNames = Object.keys(chain.networks)
    return Object.values(chain.networks).map((network, index) => {
      return {
        key: networkNames[index].split('.').join('-').toLowerCase(),
        label: network.name,
        mainnet: !!network.mainnet,
        chain: chain.name,
      }
    })
  })
}

export function sortAlphabeticallyByLabel(networks) {
  return networks.sort((chainA, chainB) =>
    chainA.label.localeCompare(chainB.label),
  )
}

// normalize config to fit network schema
export function normalizeNetworkConfig(
  config: RouterDataFeedsConfig,
): Array<Omit<NetworksConfig, 'logo'>> {
  // Get a list of networks where every element of the array contains another array with networks that belong to a chain.
  const networks = getNetworksListByChain(config)

  // Put all networks at the same level removing the nested arrays
  const networkConfig = networks.reduce((networks, network) => {
    network.map((network) => {
      networks.push({
        ...network,
      })
    })
    return networks
  }, [])
  const testnetNetworks = networkConfig.filter((network) => !network.mainnet)
  const mainnetNetworks = networkConfig.filter((network) => network.mainnet)
  return [
    ...sortAlphabeticallyByLabel(mainnetNetworks),
    ...sortAlphabeticallyByLabel(testnetNetworks),
  ]
}

export function removeRepeatedElements<T>(items: Array<T>): Array<T> {
  return [...new Set(items)]
}
