import path from 'path'
import fs from 'fs'
import { RouterDataFeedsConfig, FeedInfo, FeedInfoConfig } from './types'
import { normalizeConfig } from './utils'

export function readDataFeeds (config: RouterDataFeedsConfig): Array<FeedInfo> {
  const dataFeeds: Array<Omit<
    FeedInfoConfig,
    'abi' | 'routerAbi'
  >> = normalizeConfig(config)

  // Throw and error if config file is not valid
  validateDataFeeds(dataFeeds)

  return dataFeeds.map(dataFeed => ({
    ...dataFeed,
    routerAbi: JSON.parse(
      fs.readFileSync(
        path.resolve(
          process.env.DATA_FEED_ROUTER_ABI_PATH ||
            './src/abi/PriceFeedRouter.json'
        ),
        'utf-8'
      )
    ),
    abi: JSON.parse(
      fs.readFileSync(
        path.resolve(
          process.env.DATA_FEED_ABI_PATH || './src/abi/PriceFeed.json'
        ),
        'utf-8'
      )
    )
  }))
}

// Throw an error if a field is missing in the data feed config file
function validateDataFeeds (
  dataFeeds: Array<Omit<FeedInfoConfig, 'abi' | 'routerAbi'>>
) {
  const expectedFields = [
    'feedFullName',
    'id',
    'address',
    'contractId',
    'routerAddress',
    'network',
    'networkName',
    'chain',
    'name',
    'label',
    'pollingPeriod',
    'color',
    'blockExplorer',
    'deviation',
    'heartbeat',
    'finality'
  ]

  dataFeeds.forEach((feedInfoConfig, index) => {
    expectedFields.forEach(field => {
      // Validate nested keys in a field
      field.split('.').reduce((acc, val) => {
        // Throw error if the key is not found or has a falsy value
        if (!(val in acc) || !acc[val]) {
          throw new Error(
            `Missing field ${field} in index ${index} in data feed config file`
          )
        } else {
          // Throw error if not validated new fields are added in the config file
          if (Object.keys(feedInfoConfig).length !== expectedFields.length) {
            throw new Error(
              `There are more fields in the feed config than expected`
            )
          }
          return acc[val]
        }
      }, feedInfoConfig)
    })
  })
}
