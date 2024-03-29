require('dotenv/config')

import Web3 from 'web3'
import { MongoManager } from './database'
import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'
import { createServer } from './server'
import { Repositories, RouterDataFeedsConfig, NetworksConfig } from './types'
import { Web3Middleware } from './web3Middleware/index'
import { normalizeNetworkConfig } from './utils/index'
import {
  normalizeAndValidateDataFeedConfig,
  fetchDataFeedsRouterConfig
} from './readDataFeeds'
import { SvgCache } from './svgCache'

async function main () {
  const svgCache = new SvgCache()
  const mongoManager = new MongoManager()
  const db = await mongoManager.start()
  const dataFeedsRouterConfig: RouterDataFeedsConfig = await fetchDataFeedsRouterConfig()
  const dataFeeds = normalizeAndValidateDataFeedConfig(dataFeedsRouterConfig)
  const networksConfigPartial: Array<Omit<
    NetworksConfig,
    'logo'
  >> = normalizeNetworkConfig(dataFeedsRouterConfig)

  const logosToFetch = networksConfigPartial.map(
    (networksConfig: NetworksConfig) => {
      return networksConfig.chain.toLowerCase()
    }
  )

  const networksLogos: { [key: string]: string } = await svgCache.getMany(
    logosToFetch
  )

  const networksConfig = networksConfigPartial.map((networksConfig, index) => ({
    ...networksConfig,
    logo: networksLogos[logosToFetch[index]]
  }))

  const repositories: Repositories = {
    feedRepository: new FeedRepository(dataFeeds),
    resultRequestRepository: new ResultRequestRepository(db, dataFeeds)
  }

  const web3Middleware = new Web3Middleware(
    { repositories, Web3: Web3 },
    dataFeeds
  )
  web3Middleware.listen()

  await createServer(repositories, svgCache, {
    dataFeedsConfig: dataFeeds,
    networksConfig
  })
}

main()
