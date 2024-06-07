import axios from 'axios'
import path from 'path'
import fs from 'fs'
import { RouterDataFeedsConfig, FeedInfo, FeedInfoConfig } from '../types'
import { normalizeConfig } from './utils'

const CONFIG_URL = process.env.TEST_BRANCH
  ? `https://raw.github.com/witnet/data-feeds-explorer/${process.env.TEST_BRANCH}/packages/api/src/dataFeedsRouter.json`
  : `https://raw.github.com/witnet/data-feeds-explorer/main/packages/api/src/dataFeedsRouter.json`

function isRouterDataFeedsConfig(val: any): val is RouterDataFeedsConfig {
  return val?.contracts && val?.chains && val.conditions && val.currencies
}

export async function fetchDataFeedsRouterConfig(): Promise<RouterDataFeedsConfig | null> {
  console.log('Reading configuration file from:', CONFIG_URL)
  return await axios
    .get(CONFIG_URL)
    .then((res) => {
      if (isRouterDataFeedsConfig(res.data)) {
        return res.data
      } else {
        throw new Error('Received data is not of type RouterDataFeedsConfig')
      }
    })
    .catch((err) => {
      console.error(
        `There was an error fetching the config file from ${CONFIG_URL}`,
        err,
      )

      return null
    })
}
/**
 * FIXME(#197): normalizeAndValidateDataFeedConfig could be refactored to include the ABI to avoid
 * have multiple functions to build the object. So we should review how we are fetching,
 * validating and normalizing the configuration file We can even review the normalized object
 * structure to check if it has sense right now or only because it was the previous configuration
 * format
 */
export function normalizeAndValidateDataFeedConfig(
  config: RouterDataFeedsConfig,
): Array<FeedInfo> {
  const dataFeeds: Array<Omit<FeedInfoConfig, 'abi' | 'routerAbi'>> =
    normalizeConfig(config)

  // Throw and error if config file is not valid
  // validateDataFeeds(dataFeeds)
  return dataFeeds.map((dataFeed) => ({
    ...dataFeed,
    routerAbi: JSON.parse(
      fs.readFileSync(
        path.resolve(
          process.env.DATA_FEED_ROUTER_ABI_PATH || config.contracts.legacy.abi,
        ),
        'utf-8',
      ),
    ),
    abi: JSON.parse(
      fs.readFileSync(
        path.resolve(
          // TODO: should this abi be in the config file?
          process.env.DATA_FEED_ABI_PATH || './src/abi/PriceFeed.json',
        ),
        'utf-8',
      ),
    ),
  }))
}

// // Throw an error if a field is missing in the data feed config file
// function validateDataFeeds (
//   dataFeeds: Array<Omit<FeedInfoConfig, 'abi' | 'routerAbi'>>
// ) {
//   const expectedFields = [
//     'feedFullName',
//     'id',
//     'address',
//     'contractId',
//     'network',
//     'networkName',
//     'chain',
//     'name',
//     'label',
//     'pollingPeriod',
//     'color',
//     'blockExplorer',
//     'deviation',
//     'heartbeat',
//     'finality',
//     'isRouted'
//   ]

//   const optionalFields = ['deviation', 'heartbeat', 'isRouted']

//   dataFeeds.forEach((feedInfoConfig, index) => {
//     expectedFields.forEach(field => {
//       // Validate nested keys in a field
//       field.split('.').reduce((acc, val) => {
//         // Throw error if the key is not found or has a falsy value
//         if (!(val in acc) || !acc[val]) {
//           if (optionalFields.includes(val)) {
//             return acc[val]
//           } else {
//             throw new Error(
//               `Missing field ${field} in index ${index} in data feed config file`
//             )
//           }
//         } else {
//           // Throw error if not validated new fields are added in the config file
//           if (Object.keys(feedInfoConfig).length !== expectedFields.length) {
//             throw new Error(
//               `There are more fields in the feed config than expected`
//             )
//           }
//           return acc[val]
//         }
//       }, feedInfoConfig)
//     })
//   })
// }
