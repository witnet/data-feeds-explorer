import { Context } from './types'
const resolvers = {
  Query: {
    feeds: async (_parent, args, { feedRepository }: Context) => {
      return await feedRepository.getFeedsByNetwork(args.network)
    },

    networks: async (_parent, _args, { config }) => {
      console.log('--new networks config in RESOLVERS--', config.networksConfig)
      return config.networksConfig
    },

    requests: async (_parent, args, { resultRequestRepository }: Context) => {
      return await resultRequestRepository.getFeedRequestsPage(
        args.feedFullName,
        args.page,
        args.size
      )
    },

    feed: async (_parent, args, { feedRepository }: Context) => {
      return await feedRepository.get(args.feedFullName)
    }
  },
  Feed: {
    requests: async (parent, args, { loaders }: Context) => {
      return await loaders.requests.load({
        feedFullName: parent.feedFullName,
        timestamp: args.timestamp
      })
    },
    lastResult: async (parent, _args, { loaders }: Context) => {
      return (await loaders.lastResult.load(parent.feedFullName))?.result
    },
    lastResultTimestamp: async (parent, _args, { loaders }: Context) => {
      return (await loaders.lastResult.load(parent.feedFullName))?.timestamp
    },
    color: async (parent, _args, { config }: Context) => {
      return config.feedsConfig[parent.feedFullName]?.color || ''
    },
    blockExplorer: async (parent, _args, { config }: Context) => {
      return config.feedsConfig[parent.feedFullName]?.blockExplorer || ''
    },
    proxyAddress: async (parent, _args, { config }: Context) => {
      return config.feedsConfig[parent.feedFullName]?.routerAddress || ''
    },
    deviation: async (parent, _args, { config }: Context) => {
      return config.feedsConfig[parent.feedFullName]?.deviation || ''
    },
    heartbeat: async (parent, _args, { config }: Context) => {
      // Heartbeat plus aproximate time in milliseconds that takes to resolve the witnet dr
      return config.feedsConfig[parent.feedFullName]?.heartbeat || ''
    },
    finality: async (parent, _args, { config }: Context) => {
      // Heartbeat plus aproximate time in milliseconds that takes to resolve the witnet dr
      return config.feedsConfig[parent.feedFullName]?.finality || ''
    }
  }
}

export default resolvers
