import {
  FeedConfig,
  FeedInfosWithoutAbis,
  FeedParamsConfig,
  FeedParsedParams,
  NetworkConfigMap,
  RouterDataFeedsConfig
} from '../types'
// parse network name to fit schema
export function parseNetworkName (value) {
  return value
    .toLowerCase()
    .split(' ')
    .join('-')
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
    .reduce(
      (acc: Array<Array<FeedConfig>>, networkConfigMap) => [
        ...acc,
        Object.values(networkConfigMap)
      ],
      []
    )
    .flat()

  // Parse Feed adding common config
  const feeds: FeedInfosWithoutAbis = configs.reduce(
    (acc: FeedInfosWithoutAbis, config: FeedConfig) => {
      const feedsArrayConfig: Array<FeedParamsConfig> = Object.values(
        config.feeds
      )

      // Extracts feeds deleting key label
      const feedsArray: Array<FeedParsedParams> = feedsArrayConfig.map(
        (feed, index) =>
          ({
            ...feed,
            key: Object.keys(config.feeds)[index]
          } as FeedParsedParams)
      )

      feedsArray.forEach(feed => {
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

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
