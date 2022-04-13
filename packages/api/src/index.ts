require('dotenv/config')

import fs from 'fs'
import path from 'path'
import Web3 from 'web3'
import { MongoManager } from './database'
import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'
import { createServer } from './server'
import {
  FeedInfo,
  FeedInfoConfig,
  Repositories,
  RouterDataFeedsConfig,
  NetworksConfig
} from './types'
import { Web3Middleware } from './web3Middleware/index'
import { normalizeConfig, normalizeNetworkConfig } from './utils/index'
import axios from 'axios'

async function getDataFeedsRouterConfig (): Promise<
  RouterDataFeedsConfig | null
> {
  return await axios
    .get(
      'https://raw.github.com/witnet/data-feeds-explorer/main/packages/api/src/dataFeedsRouter.json'
    )
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log('There was an error fetching the config file', err)
      return null
    })
}

async function main () {
  const mongoManager = new MongoManager()
  const db = await mongoManager.start()
  const dataFeeds = await readDataFeeds()
  const networksConfig = await readNetworks()

  const repositories: Repositories = {
    feedRepository: new FeedRepository(dataFeeds),
    resultRequestRepository: new ResultRequestRepository(db, dataFeeds)
  }
  const config = {
    dataFeedsConfig: dataFeeds,
    networksConfig: networksConfig
  }

  const web3Middleware = new Web3Middleware(
    { repositories, Web3: Web3 },
    dataFeeds
  )
  web3Middleware.listen()

  const server = await createServer(repositories, config)

  server
    .listen({ host: '0.0.0.0', port: process.env.SERVER_PORT })
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`)
    })
}

export async function readNetworks (): Promise<Array<NetworksConfig>> {
  return normalizeNetworkConfig(
    (await getDataFeedsRouterConfig()) as RouterDataFeedsConfig
  )
}

export async function readDataFeeds (): Promise<Array<FeedInfo>> {
  const dataFeeds: Array<Omit<
    FeedInfoConfig,
    'abi' | 'routerAbi'
  >> = normalizeConfig(
    (await getDataFeedsRouterConfig()) as RouterDataFeedsConfig
  )

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

main()
