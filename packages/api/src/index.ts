require('dotenv/config')

import Web3 from 'web3'
import { MongoManager } from './database'
import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'
import { createServer } from './server'
import {
  RouterDataFeedsConfig,
  Repositories,
  FeedInfo,
  NetworksConfig,
} from '../types'
import { Web3Middleware } from './web3Middleware/index'
import { normalizeNetworkConfig } from './utils/index'
import {
  normalizeAndValidateDataFeedConfig,
  fetchDataFeedsRouterConfig,
} from './readDataFeeds'
import { SvgCache } from './svgCache'
import { NetworkRouter } from './web3Middleware/NetworkRouter'
import { Configuration } from './web3Middleware/Configuration'

async function main() {
  const svgCache = new SvgCache()
  const mongoManager = new MongoManager()
  const db = await mongoManager.start()
  const configurationFile: RouterDataFeedsConfig =
    await fetchDataFeedsRouterConfig()
  const configuration = new Configuration(configurationFile)

  const legacyFeeds: Array<FeedInfo> =
    normalizeAndValidateDataFeedConfig(configurationFile)
  const networksConfigPartial: Array<Omit<NetworksConfig, 'logo'>> =
    normalizeNetworkConfig(configurationFile)

  const logosToFetch = networksConfigPartial.map(
    (networksConfig: NetworksConfig) => {
      return networksConfig.chain.toLowerCase()
    },
  )

  const networksLogos: { [key: string]: string } =
    await svgCache.getMany(logosToFetch)

  const networksConfig = networksConfigPartial.map((networksConfig, index) => ({
    ...networksConfig,
    logo: networksLogos[logosToFetch[index]],
  }))

  const routers = configuration
    .listNetworksUsingPriceFeedsContract()
    .filter((config) => {
      if (!config.provider) {
        console.warn('No provider found for ', config.key)
      }
      return config.provider
    })
    .map(
      (networkInfo) =>
        new NetworkRouter(configuration, Web3, repositories, networkInfo),
    )

  const newFeeds: Array<FeedInfo> = []

  for (const router of routers) {
    const feedInfos = await router.getFeedInfos()
    newFeeds.concat(feedInfos)
  }

  const feeds = [...legacyFeeds, ...newFeeds]

  const repositories: Repositories = {
    feedRepository: new FeedRepository(feeds),
    resultRequestRepository: new ResultRequestRepository(db, feeds),
  }

  const web3Middleware = new Web3Middleware(
    configuration,
    { repositories, Web3: Web3 },
    legacyFeeds,
  )

  web3Middleware.listen()

  await createServer(repositories, svgCache, {
    dataFeedsConfig: feeds,
    networksConfig,
  })
}

main()
