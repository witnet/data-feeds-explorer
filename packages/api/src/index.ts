require('dotenv/config')

import Web3 from 'web3'
import { MongoManager } from './database'
import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'
import { createServer } from './server'
import { Repositories } from './types'
import { Web3Middleware } from './web3Middleware/index'
import { dataFeeds } from './web3Middleware/dataFeeds'

async function main () {
  const mongoManager = new MongoManager()
  const db = await mongoManager.start()

  const repositories: Repositories = {
    feedRepository: new FeedRepository(db),
    resultRequestRepository: new ResultRequestRepository(db)
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

main()
