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
  RouterDataFeedsConfig
} from './types'
import { Web3Middleware } from './web3Middleware/index'
import { normalizeConfig, normalizeNetworkConfig } from './utils/index'
import dataFeedsRouterConfig from './dataFeedsRouter.json'

async function main () {
  const mongoManager = new MongoManager()
  const db = await mongoManager.start()
  const dataFeeds = readDataFeeds()
  const networksConfig = readNetworks()

  const repositories: Repositories = {
    feedRepository: new FeedRepository(dataFeeds),
    resultRequestRepository: new ResultRequestRepository(db, dataFeeds)
  }

  const web3Middleware = new Web3Middleware(
    { repositories, Web3: Web3 },
    dataFeeds
  )
  web3Middleware.listen()

  const server = await createServer(repositories, dataFeeds, networksConfig)

  server
    .listen({ host: '0.0.0.0', port: process.env.SERVER_PORT })
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`)
    })
}

export function readNetworks (): any {
  const dataFeeds: Array<Omit<
    FeedInfoConfig,
    'abi' | 'routerAbi'
  >> = normalizeNetworkConfig(dataFeedsRouterConfig as RouterDataFeedsConfig)
  return dataFeeds
}

export function readDataFeeds (): Array<FeedInfo> {
  const dataFeeds: Array<Omit<
    FeedInfoConfig,
    'abi' | 'routerAbi'
  >> = normalizeConfig(dataFeedsRouterConfig as RouterDataFeedsConfig)

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
  const fields = [
    'feedFullName',
    'address',
    'network',
    'name',
    'pollingPeriod',
    'color',
    'blockExplorer',
    'deviation',
    'heartbeat',
    'finality'
  ]

  dataFeeds.forEach((feedInfoConfig, index) => {
    fields.forEach(field => {
      // Validate nested keys in a field
      field.split('.').reduce((acc, val) => {
        // Throw error if the key is not found or has a falsy value
        if (!(val in acc) || !acc[val]) {
          throw new Error(
            `Missing field ${field} in index ${index} in data feed config file`
          )
        } else {
          return acc[val]
        }
      }, feedInfoConfig)
    })
  })
}

main()
