import {
  ExtendedFeedConfig,
  FeedInfosWithoutAbis,
  FeedParamsConfig,
  FeedParsedParams,
  NetworkConfigMap,
  RouterDataFeedsConfig,
  NetworksConfig,
  Chain,
  FeedConfig,
} from '../../types'
// parse network name to fit schema
export function parseNetworkName(value) {
  return value.toLowerCase().split('.').join('-')
}
export function parseChainName(value) {
  return value.toLowerCase().split('.')[0]
}
// parse data feed name to fit schema
export function parseDataName(value) {
  return value.split('-')[1].toLowerCase()
}
export function parseDataDecimals(value) {
  return value.split('-')[2]
}
// parse data feed full name to fit schema
export function createFeedFullName(network, name, decimals) {
  return `${network}_${name.split('/').join('-')}_${decimals}`
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

// normalize config to fit schema

export function normalizeConfig(
  config: RouterDataFeedsConfig,
): FeedInfosWithoutAbis {
  // Chain list
  const chains: Array<{ networks: NetworkConfigMap }> = Object.values(
    config.chains,
  )
  // Network Config list deleting key label
  const networksConfigMap = chains.flatMap((network: Chain) => {
    return Object.values(network.networks).filter(network => !network.version || network.version === 'legacy').map(
      (feedConfig: FeedConfig, index) => {
        return {
          ...feedConfig,
          chain: network.name,
          hide: !!network.hide || feedConfig.hide,
          network: Object.keys(network.networks)[index],
        }
      })
  })

  // Parse Feed adding common config
  const feeds: FeedInfosWithoutAbis = networksConfigMap.reduce(
    (acc: FeedInfosWithoutAbis, config: ExtendedFeedConfig) => {
      const feedsArrayConfig: Array<FeedParamsConfig> = config.feeds
        ? Object.values(config.feeds)
        : []
      // Extracts feeds deleting key label
      const feedsArray: Array<FeedParsedParams> = feedsArrayConfig.map(
        (feed, index) => {
          return {
            ...feed,
            key: Object.keys(config.feeds)[index],
          } as FeedParsedParams
        },
      )

      feedsArray.forEach((feed) => {
        const chain = config.chain
        const network = parseNetworkName(config.network)
        const name = parseDataName(feed.key)
        const decimals = parseDataDecimals(feed.key)
        if (!config.hide) {
          acc.push({
            feedFullName: createFeedFullName(network, name, decimals),
            isRouted: !!feed.isRouted,
            id: feed.key,
            address: '0x0000000000000000000000000000000000000000',
            contractId: '0x0000000000000000000000000000000000000000',
            routerAddress: config.address,
            network,
            networkName: config.name,
            chain,
            name,
            label: feed.label,
            pollingPeriod: config.pollingPeriod,
            color: config.color,
            blockExplorer: config.blockExplorer,
            deviation: feed.deviationPercentage?.toString() || null,
            heartbeat: feed.maxSecsBetweenUpdates
              ? `${feed.maxSecsBetweenUpdates}000`
              : null,
            finality: '900000',
          })
        }
      })

      return acc
    },
    [],
  )

  return feeds
}

export function isZeroAddress(address: string) {
  return address === '0x0000000000000000000000000000000000000000' || !address
}

export function isZeroHash(hash: string) {
  return (
    hash ===
      '0x0000000000000000000000000000000000000000000000000000000000000000' ||
    !hash
  )
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function removeRepeatedElements<T>(items: Array<T>): Array<T> {
  return [...new Set(items)]
}
