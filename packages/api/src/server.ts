import { ApolloServer } from 'apollo-server'
import typeDefs from './typeDefs'
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb'
import resolvers from './resolvers'
import { Db } from 'mongodb'
import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'

// async function addSampleData(feedRepository: FeedRepository, resultRequestRepository: ResultRequestRepository) {
//   await feedRepository.collection.drop()
//   await resultRequestRepository.collection.drop()

//   const feed1 = await feedRepository.insert({
//     address: "1",
//     name: "btc/eur",
//     requests: []
//   })

//   const resultRequest1 = await resultRequestRepository.insert({
//     result: 1000.00,
//     feedId: feed1._id.toString(),
//     requestId: '1',
//     timestamp: Date.now().toString(),
//   })
//   await feedRepository.addResultRequest(feed1._id, resultRequest1._id)

//   const resultRequest2 = await resultRequestRepository.insert({
//     result: 2000.00,
//     feedId: feed1._id.toString(),
//     requestId: '2',
//     timestamp: Date.now().toString(),
//   })
//   await feedRepository.addResultRequest(feed1._id, resultRequest2._id)

//   const feed2 = await feedRepository.insert({
//     address: "2",
//     name: "btc/usd",
//     requests: []
//   })
//   const resultRequest3 = await resultRequestRepository.insert({
//     result: 3000.00,
//     feedId: feed2._id.toString(),
//     requestId: '3',
//     timestamp: Date.now().toString(),
//   })
//   await feedRepository.addResultRequest(feed2._id, resultRequest3._id)

//   await feedRepository.insert({
//     address: "3",
//     name: "eth/eur",
//     requests: []
//   })
// }

export async function createServer (db: Db): Promise<ApolloServer> {
  const feedRepository = new FeedRepository(db)
  const resultRequestRepository = new ResultRequestRepository(db)

  // addSampleData(feedRepository, resultRequestRepository)

  const context = () => {
    return { feedRepository, resultRequestRepository }
  }

  const server = new ApolloServer({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
    context
  })

  return server
}
