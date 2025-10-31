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
import { fetchFeedsLegacy, fetchDataFeedsRouterConfig } from './readDataFeeds'
import { SvgCache } from './svgCache'
import { NetworkRouter } from './web3Middleware/NetworkRouter'
import { Configuration } from './web3Middleware/Configuration'
import { FeedsState } from './repository/feedState'

class DataFeedsExplorer {
  routers: Array<NetworkRouter>
  repositories: Repositories
  configurationFile: RouterDataFeedsConfig
  configuration: Configuration
  networksConfig

  svgCache: SvgCache
  mongoManager: MongoManager
  feedsState: FeedsState

  constructor() {
    this.svgCache = new SvgCache()
    this.mongoManager = new MongoManager()
    this.feedsState = new FeedsState()
  }

  async initializeNetworkRouters() {
    return this.configuration
      .listNetworksUsingPriceFeedsContract()
      .filter((config) => {
        if (!config.provider) {
          console.warn('No provider found for ', config.key)
        }
        return config.provider
      })
      .map(
        (networkInfo) =>
          new NetworkRouter(
            this.configuration,
            Web3,
            this.repositories,
            networkInfo,
          ),
      )
  }

  async initializeConfiguration(svgCache: SvgCache) {
    this.configurationFile = await fetchDataFeedsRouterConfig()
    this.configuration = new Configuration(this.configurationFile)
    this.networksConfig = await fetchNetworkConfigurations(
      this.configurationFile,
      svgCache,
    )
  }

  async start() {
    const db = await this.mongoManager.start()

    await this.initializeConfiguration(this.svgCache)
    this.routers = await this.initializeNetworkRouters()

    const legacyFeeds: Array<FeedInfo> = fetchFeedsLegacy(
      this.configurationFile,
    )
    const v2Feeds: Array<FeedInfo> = await fetchFeedsV2(this.routers)

    this.repositories = {
      feedRepository: new FeedRepository(this.feedsState),
      resultRequestRepository: new ResultRequestRepository(db),
    }
    this.repositories.feedRepository.setLegacyFeeds(legacyFeeds)
    this.repositories.feedRepository.setV2Feeds(v2Feeds)
    this.repositories.feedRepository.setConfiguration(this.configuration)

    const web3Middleware = new Web3Middleware(
      this.configuration,
      { repositories: this.repositories, Web3: Web3 },
      legacyFeeds,
    )

    web3Middleware.listen()

    await createServer(this.repositories, this.svgCache, {
      networksConfig: this.networksConfig,
      configuration: this.configuration,
    })
  }
}

async function fetchFeedsV2(
  routers: Array<NetworkRouter>,
): Promise<Array<FeedInfo>> {
  const promises = routers.map(async (router) => await router.getFeedInfos())
  const newFeeds: Array<FeedInfo> = (await Promise.all(promises)).flat()

  return newFeeds
}

async function fetchNetworkConfigurations(
  configurationFile,
  svgCache,
): Promise<Array<NetworksConfig>> {
  const networksConfigPartial: Array<Omit<NetworksConfig, 'logo'>> =
    normalizeNetworkConfig(configurationFile)
  const logosToFetch = networksConfigPartial.map(
    (networksConfig: NetworksConfig) => {
      return networksConfig.chain.toLowerCase()
    },
  )
  const networksLogos: { [key: string]: string } =
    await svgCache.getMany(logosToFetch)

  return networksConfigPartial.map((networksConfig, index) => ({
    ...networksConfig,
    logo: networksLogos[logosToFetch[index]],
  }))
}

const dfe = new DataFeedsExplorer()

dfe.start()
