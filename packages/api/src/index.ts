require('dotenv/config')

import Web3 from 'web3'
import { MongoManager } from './database'
import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'
import { createServer } from './server'
import { Repositories, RouterDataFeedsConfig, NetworksConfig } from './types'
import { Web3Middleware } from './web3Middleware/index'
import { normalizeNetworkConfig } from './utils/index'
import axios from 'axios'
import { readDataFeeds } from './readDataFeeds'

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
  const dataFeedsRouterConfig: RouterDataFeedsConfig = await getDataFeedsRouterConfig()
  const dataFeeds = await readDataFeeds(dataFeedsRouterConfig)
  const networksConfig: Array<NetworksConfig> = normalizeNetworkConfig(
    dataFeedsRouterConfig
  )

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

main()
