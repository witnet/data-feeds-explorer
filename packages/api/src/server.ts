import { ApolloServer } from '@apollo/server'
import typeDefs from './typeDefs'
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb'
import resolvers from './resolvers'
import { Context, Loaders, NetworksConfig, Repositories } from '../types'
import { startStandaloneServer } from '@apollo/server/standalone'
import { LoadersFactory } from './loaders'
import SvgCache from './svgCache'
import { Configuration } from './web3Middleware/Configuration'

export async function createServer(
  repositories: Repositories,
  svgCache: SvgCache,
  config: {
    networksConfig: Array<NetworksConfig>
    configuration: Configuration
  },
): Promise<{ url; server: ApolloServer<Context> }> {
  const server = new ApolloServer<Context>({
    typeDefs: [DIRECTIVES, typeDefs],
    resolvers,
  })

  const { url } = await startStandaloneServer<Context>(server, {
    listen: { host: '0.0.0.0', port: Number(process.env.SERVER_PORT) },
    context: async () => {
      const loaders: Loaders = new LoadersFactory(
        repositories,
        svgCache,
      ).getLoaders()

      return {
        feedRepository: repositories.feedRepository,
        resultRequestRepository: repositories.resultRequestRepository,
        config: {
          networksConfig: config.networksConfig,
          configuration: config.configuration,
        },
        loaders: loaders,
      }
    },
  })
  console.log(`🚀 Server ready at ${url}`)

  return { url, server }
}
