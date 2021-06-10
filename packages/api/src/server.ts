import { ApolloServer } from 'apollo-server'
import typeDefs from './typeDefs'
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb'
import resolvers from './resolvers'
import { Db } from 'mongodb'
import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'

// async function addSampleData (
//   feedRepository: FeedRepository,
//   resultRequestRepository: ResultRequestRepository
// ) {
//   await feedRepository.collection.drop()
//   await resultRequestRepository.collection.drop()

//   const feed1 = await feedRepository.insert({
//     name: 'btc/eur',
//     address: '1',
//     lastResult: '1000.0',
//     label: '$',
//     network: 'mainnet',
//     requests: []
//   })

//   const resultRequest1 = await resultRequestRepository.insert({
//     feedId: feed1._id.toString(),
//     result: '1000.0',
//     label: '$',
//     requestId: '1',
//     timestamp: Date.now().toString(),
//     drTxHash: 'drTxHash12345'
//   })
//   await feedRepository.addResultRequest(feed1._id, resultRequest1._id)

//   const resultRequest2 = await resultRequestRepository.insert({
//     feedId: feed1._id.toString(),
//     result: '2000.0',
//     label: '$',
//     requestId: '1',
//     timestamp: Date.now().toString(),
//     drTxHash: 'drTxHash12345'
//   })
//   await feedRepository.addResultRequest(feed1._id, resultRequest2._id)

//   const feed2 = await feedRepository.insert({
//     name: 'btc/usd',
//     address: '2',
//     lastResult: '2000.0',
//     label: '$',
//     network: 'mainnet',
//     requests: []
//   })
//   const resultRequest3 = await resultRequestRepository.insert({
//     feedId: feed1._id.toString(),
//     result: '3000.0',
//     label: '$',
//     requestId: '1',
//     timestamp: Date.now().toString(),
//     drTxHash: 'drTxHash12345'
//   })
//   await feedRepository.addResultRequest(feed2._id, resultRequest3._id)

//   await feedRepository.insert({
//     name: 'btc/usd',
//     address: '3',
//     lastResult: '3000.0',
//     label: '$',
//     network: 'mainnet',
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
