import { Context } from './types'

const resolvers = {
  Query: {
    feeds: async (_parent, args, { feedRepository }: Context) => {
      return await feedRepository.getFeedsByNetwork(args.network)
    },

    networks: (_parent, _args, { config }: Context) => {
      return config.networksConfig
    },

    requests: async (_parent, args, { resultRequestRepository }: Context) => {
      const result = await resultRequestRepository.getFeedRequestsPage(
        args.feedFullName,
        args.page,
        args.size
      )
      console.log('result', result)
      return result
    },

    feed: async (_parent, args, { feedRepository }: Context) => {
      return await feedRepository.get(args.feedFullName)
    }
  },
  NetworksConfig: {
    logo: async (parent, _args, { loaders }: Context) => {
      return await loaders.logos.load(parent.chain.toLowerCase())
    }
  },
  Feed: {
    logo: async (parent, _args, { loaders }: Context) => {
      return await loaders.logos.load(parent.name.split('/')[0])
    },
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
    isRouted: async (parent, _args, { config }: Context) => {
      return !!config.feedsConfig[parent.feedFullName]?.isRouted
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
