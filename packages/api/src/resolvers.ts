import { Context } from '../types.js'

const resolvers = {
  Query: {
    feeds: async (_parent, args, { feedRepository }: Context) => {
      return await feedRepository.getFilteredFeeds({
        network: args.network,
        pair: args.pair,
        mainnet: args.mainnet,
      })
    },

    networks: (_parent, _args, { config }: Context) => {
      return config.networksConfig
    },

    requests: async (_parent, args, { resultRequestRepository }: Context) => {
      return await resultRequestRepository.getFeedRequestsPage(
        args.feedFullName,
        args.page,
        args.size,
      )
    },

    feed: async (_parent, args, { feedRepository }: Context) => {
      return await feedRepository.get(args.feedFullName)
    },
  },
  NetworksConfig: {
    logo: async (parent, _args, { loaders }: Context) => {
      return await loaders.logos.load(parent.chain.toLowerCase())
    },
  },
  Feed: {
    logo: async (parent, _args, { loaders }: Context) => {
      return await loaders.logos.load(parent.name.split('/')[0])
    },
    requests: async (parent, args, { loaders }: Context) => {
      return await loaders.requests.load({
        feedFullName: parent.feedFullName,
        timestamp: args.timestamp,
      })
    },
    lastResult: async (parent, _args, { loaders }: Context) => {
      return (await loaders.lastResult.load(parent.feedFullName))?.result
    },
    lastResultTimestamp: async (parent, _args, { loaders }: Context) => {
      return (await loaders.lastResult.load(parent.feedFullName))?.timestamp
    },
    isRouted: async (parent, _args, { feedRepository }: Context) => {
      return !!feedRepository.getConfigByFullName()[parent.feedFullName]
        ?.isRouted
    },
    color: async (parent, _args, { feedRepository }: Context) => {
      return (
        feedRepository.getConfigByFullName()[parent.feedFullName]?.color || ''
      )
    },
    blockExplorer: async (parent, _args, { feedRepository }: Context) => {
      return (
        feedRepository.getConfigByFullName()[parent.feedFullName]
          ?.blockExplorer || ''
      )
    },
    proxyAddress: async (parent, _args, { feedRepository }: Context) => {
      return (
        feedRepository.getConfigByFullName()[parent.feedFullName]
          ?.routerAddress || ''
      )
    },
    deviation: async (parent, _args, { feedRepository }: Context) => {
      return (
        feedRepository.getConfigByFullName()[parent.feedFullName]?.deviation ||
        ''
      )
    },
    heartbeat: async (parent, _args, { feedRepository }: Context) => {
      // Heartbeat plus aproximate time in milliseconds that takes to resolve the witnet dr
      return (
        feedRepository.getConfigByFullName()[parent.feedFullName]?.heartbeat ||
        ''
      )
    },
    finality: async (parent, _args, { feedRepository }: Context) => {
      // Heartbeat plus aproximate time in milliseconds that takes to resolve the witnet dr
      return (
        feedRepository.getConfigByFullName()[parent.feedFullName]?.finality ||
        ''
      )
    },
    address: async (parent, _args, { config }: Context) => {
      return parent.address || config.configuration.getDefaultAddress()
    },
    contractId: async (parent, _args) => {
      return parent.contractId || '0x00000000'
    },
  },
}

export default resolvers
