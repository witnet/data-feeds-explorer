import { ApolloServer } from 'apollo-server'
import typeDefs from './typeDefs'
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb'
import resolvers from './resolvers'
import { Db } from 'mongodb'
import { FeedRepository } from './repository/Feed'
import { PriceRequestRepository } from './repository/PriceRequest'

// async function addSampleData(feedRepository: FeedRepository, priceRequestRepository: PriceRequestRepository) {
//   await feedRepository.collection.drop()
//   await priceRequestRepository.collection.drop()

//   const feed1 = await feedRepository.insert({
//     address: "1",
//     name: "btc/eur",
//     requests: []
//   })

//   const priceRequest1 = await priceRequestRepository.insert({
//     price: 1000.00,
//     feedId: feed1._id.toString(),
//     requestId: '1',
//     timestamp: Date.now().toString(),
//   })
//   await feedRepository.addPriceRequest(feed1._id, priceRequest1._id)

//   const priceRequest2 = await priceRequestRepository.insert({
//     price: 2000.00,
//     feedId: feed1._id.toString(),
//     requestId: '2',
//     timestamp: Date.now().toString(),
//   })
//   await feedRepository.addPriceRequest(feed1._id, priceRequest2._id)

//   const feed2 = await feedRepository.insert({
//     address: "2",
//     name: "btc/usd",
//     requests: []
//   })
//   const priceRequest3 = await priceRequestRepository.insert({
//     price: 3000.00,
//     feedId: feed2._id.toString(),
//     requestId: '3',
//     timestamp: Date.now().toString(),
//   })
//   await feedRepository.addPriceRequest(feed2._id, priceRequest3._id)

//   await feedRepository.insert({
//     address: "3",
//     name: "eth/eur",
//     requests: []
//   })
// }

export async function createServer (db: Db): Promise<ApolloServer> {
  const feedRepository = new FeedRepository(db)
  const priceRequestRepository = new PriceRequestRepository(db)

  // addSampleData(feedRepository, priceRequestRepository)

  const context = () => {
    return { feedRepository, priceRequestRepository }
  }

  const server = new ApolloServer({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
    context
  })

  return server
}
