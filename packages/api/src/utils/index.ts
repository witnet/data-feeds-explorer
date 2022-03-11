import {
  ExtendedFeedConfig,
  FeedConfig,
  FeedInfosWithoutAbis,
  FeedParamsConfig,
  FeedParsedParams,
  NetworkConfigMap,
  RouterDataFeedsConfig,
  NetworksConfig
} from '../types'
// parse network name to fit schema
export function parseNetworkName (value) {
  return value
    .toLowerCase()
    .split(' ')
    .join('-')
}
export function parseChainName (value) {
  return value.toLowerCase().split('.')[0]
}
// parse data feed name to fit schema
export function parseDataName (value) {
  return value.split('-')[1].toLowerCase()
}
export function parseDataDecimals (value) {
  return value.split('-')[2]
}
// parse data feed full name to fit schema
export function createFeedFullName (network, name, decimals) {
  return `${network}_${name.split('/').join('-')}_${decimals}`
}

// normalize config to fit network schema

export function normalizeNetworkConfig (
  config: RouterDataFeedsConfig
): Array<NetworksConfig> {
  // get list of chains

  const chains: Array<string> = Object.keys(config.chains)

  // get list of networks

  const networks: any = Object.values(config.chains).map(chain =>
    Object.values(chain.networks).map(value => value.name)
  )

  // add chain to each of the networks

  const networkConfig = networks.reduce((networks, network, index) => {
    network.map(network => {
      networks.push({
        label: network
          .split(' ')
          .join('-')
          .toLowerCase(),
        key: network,
        chain: chains[index]
      })
    })
    return networks
  }, [])
  return networkConfig
}

// normalize config to fit schema

export function normalizeConfig (
  config: RouterDataFeedsConfig
): FeedInfosWithoutAbis {
  // Chain list
  const chains: Array<{ networks: NetworkConfigMap }> = Object.values(
    config.chains
  )

  // Extracts networks with its key label from chains object
  const networksConfigMap: Array<NetworkConfigMap> = chains.reduce(
    (acc: Array<NetworkConfigMap>, network) => {
      return [...acc, network.networks]
    },
    []
  )
  // Network Config list deleting key label
  const configs: Array<FeedConfig> = networksConfigMap
    .reduce((acc: Array<Array<ExtendedFeedConfig>>, networkConfigMap) => {
      const config = Object.values(networkConfigMap).map((feed, index) => {
        const result = {
          ...feed,
          chain: Object.keys(networkConfigMap)[index]
        }
        return result
      })
      const result = [...acc, config]
      return result
    }, [])
    .flat()
  // Parse Feed adding common config
  const feeds: FeedInfosWithoutAbis = configs.reduce(
    (acc: FeedInfosWithoutAbis, config: ExtendedFeedConfig) => {
      const feedsArrayConfig: Array<FeedParamsConfig> = Object.values(
        config.feeds
      )

      // Extracts feeds deleting key label
      const feedsArray: Array<FeedParsedParams> = feedsArrayConfig.map(
        (feed, index) =>
          ({
            ...feed,
            key: Object.keys(config.feeds)[index]
            // chain: Object.keys(config.chainsNames)[index]
          } as FeedParsedParams)
      )

      feedsArray.forEach(feed => {
        const chain = parseChainName(config.chain)
        const network = parseNetworkName(config.name)
        const name = parseDataName(feed.key)
        const decimals = parseDataDecimals(feed.key)

        acc.push({
          feedFullName: createFeedFullName(network, name, decimals),
          id: feed.key,
          address: '0x0000000000000000000000000000000000000000',
          contractId: '0x0000000000000000000000000000000000000000',
          routerAddress: config.address,
          network,
          chain,
          name,
          label: feed.label,
          pollingPeriod: config.pollingPeriod,
          color: config.color,
          blockExplorer: config.blockExplorer,
          deviation: feed.deviationPercentage.toString(),
          heartbeat: `${feed.maxSecsBetweenUpdates}000`,
          finality: '900000'
        })
      })

      return acc
    },
    []
  )

  return feeds
}

export function isZeroAddress (address: string) {
  return address === '0x0000000000000000000000000000000000000000' || !address
}

export function isZeroHash (hash: string) {
  return (
    hash ===
      '0x0000000000000000000000000000000000000000000000000000000000000000' ||
    !hash
  )
}

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
