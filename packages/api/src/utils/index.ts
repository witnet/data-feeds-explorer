import { FeedParamsConfig, FeedParsedParams, NetworkConfig } from '../types'
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

export function normalizeConfig (config) {
  // Chain list
  const chains: Array<NetworkConfig> = Object.values(config.chains)
  // Extracts networks with its key label from chains object
  const networks = chains.reduce((acc, network) => {
    acc.push(Object.values(network)[0])
    return acc
  }, [])
  // Network Config list deleting key label
  const configs = networks.reduce((acc, config) => {
    acc.push(Object.values(config)[0])
    return acc
  }, [])
  // Parse Feed adding common config
  const feeds = configs.reduce((acc, config) => {
    const feedsArrayConfig: Array<FeedParamsConfig> = Object.values(
      config.feeds
    )
    // Extracts feeds deleting key label
    const feedsArray: Array<FeedParsedParams> = feedsArrayConfig.map(
      (feed: FeedParamsConfig, index) => {
        return {
          ...feed,
          key: Object.keys(config.feeds)[index]
        }
      }
    )

    feedsArray.forEach(feed => {
      const network = parseNetworkName(config.name)
      const name = parseDataName(feed.key)
      const decimals = parseDataDecimals(feed.key)
      acc.push({
        feedFullName: createFeedFullName(network, name, decimals),
        id: feed.key,
        address: config.address,
        network,
        name,
        label: feed.label,
        pollingPeriod: config.pollingPeriod,
        color: config.color,
        blockExplorer: config.blockExplorer,
        deviation: feed.deviationPercentage,
        heartbeat: `${feed.maxSecsBetweenUpdates}000`,
        finality: 900000
      })
    })
    return acc
  }, [])

  return feeds
}
