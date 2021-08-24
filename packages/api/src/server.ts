import { ApolloServer } from 'apollo-server'
import typeDefs from './typeDefs'
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb'
import resolvers from './resolvers'
import { ConfigByFullName, FeedInfo, Repositories } from './types'

export async function createServer (
  repositories: Repositories,
  config: Array<FeedInfo>
): Promise<ApolloServer> {
  return new ApolloServer({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
    context: () => {
      const configByFullName: ConfigByFullName = config.reduce(
        (acc, feedInfo) => ({
          ...acc,
          // Use network + address to avoid collision if address is the same on multiple networks
          [`${feedInfo.network}_${feedInfo.feedFullName}`]: feedInfo
        }),
        {}
      )

      return { ...repositories, config: configByFullName }
    }
  })
}
