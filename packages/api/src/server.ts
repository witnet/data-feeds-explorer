import { ApolloServer } from 'apollo-server'
import typeDefs from './typeDefs'
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb'
import resolvers from './resolvers'
import { Repositories } from './types'
// import { FeedRepository } from './repository/Feed'
// import { ResultRequestRepository } from './repository/ResultRequest'

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
//     network: 'goerli',
//     requests: []
//   })

//   const resultRequest1 = await resultRequestRepository.insert({
//     feedId: feed1._id.toString(),
//     address: '0x00000000',
//     result: '1000.0',
//     label: '$',
//     requestId: '1',
//     timestamp: Date.now().toString(),
//     drTxHash: 'drTxHash12345'
//   })
//   await feedRepository.addResultRequest(feed1._id, resultRequest1._id)

//   const resultRequest2 = await resultRequestRepository.insert({
//     feedId: feed1._id.toString(),
//     address: '0x00000000',
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
//     network: 'rinkeby',
//     requests: []
//   })
//   const resultRequest3 = await resultRequestRepository.insert({
//     feedId: feed1._id.toString(),
//     address: '0x00000000',
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
//     network: 'kovan',
//     requests: []
//   })
// }

export async function createServer (
  repositories: Repositories
): Promise<ApolloServer> {
  // addSampleData(repositories.feedRepository, repositories.resultRequestRepository)

  return new ApolloServer({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
    context: () => repositories
  })
}
