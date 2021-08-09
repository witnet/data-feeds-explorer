require('dotenv/config')

import fs from 'fs'
import path from 'path'
import Web3 from 'web3'
import { MongoManager } from './database'
import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'
import { createServer } from './server'
import { FeedInfo, FeedInfoConfig, Repositories } from './types'
import { Web3Middleware } from './web3Middleware/index'

async function main () {
  const mongoManager = new MongoManager()
  const db = await mongoManager.start()
  const dataFeeds = readDataFeeds()

  const repositories: Repositories = {
    feedRepository: new FeedRepository(db, dataFeeds),
    resultRequestRepository: new ResultRequestRepository(db, dataFeeds)
  }

  const web3Middleware = new Web3Middleware(
    { repositories, Web3: Web3 },
    dataFeeds
  )
  web3Middleware.listen()

  const server = await createServer(repositories)

  server
    .listen({ host: '0.0.0.0', port: process.env.SERVER_PORT })
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`)
    })
}

function readDataFeeds (): Array<FeedInfo> {
  const dataFeeds: Array<FeedInfoConfig> = JSON.parse(
    fs.readFileSync(path.join(__dirname, process.env.DATA_FEED_CONFIG_PATH || '/dataFeeds.json'), 'utf-8')
  )

  return dataFeeds.map(dataFeed => ({
    ...dataFeed,
    abi: JSON.parse(
      fs.readFileSync(path.join(__dirname, dataFeed.abi), 'utf-8')
    ),
    witnetRequestBoard: {
      ...dataFeed.witnetRequestBoard,
      abi: JSON.parse(
        fs.readFileSync(
          path.join(__dirname, dataFeed.witnetRequestBoard.abi),
          'utf-8'
        )
      )
    }
  }))
}

main()
