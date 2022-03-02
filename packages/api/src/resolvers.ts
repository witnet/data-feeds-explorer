import { Context, Network } from './types'
const resolvers = {
  Query: {
    feeds: async (_parent, args, { feedRepository }: Context) => {
      return await feedRepository.getPaginatedFeeds(args.network)
    },

    networks: async (_parent, _args) => {
      return Object.keys(Network).map(key => ({ label: Network[key] }))
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
    requests: async (parent, args, { resultRequestRepository }: Context) => {
      return await resultRequestRepository.getFeedRequests(
        parent.feedFullName,
        args.timestamp
      )
    },
    lastResult: async (parent, _args, { resultRequestRepository }: Context) => {
      // FIXME: add dataloader library to avoid overfetching
      return (await resultRequestRepository.getLastResult(parent.feedFullName))
        ?.result
    },
    lastResultTimestamp: async (
      parent,
      _args,
      { resultRequestRepository }: Context
    ) => {
      // FIXME: add dataloader library to avoid overfetching
      return (await resultRequestRepository.getLastResult(parent.feedFullName))
        ?.timestamp
    },
    color: async (parent, _args, { config }: Context) => {
      return config[parent.feedFullName]?.color || ''
    },
    blockExplorer: async (parent, _args, { config }: Context) => {
      return config[parent.feedFullName]?.blockExplorer || ''
    },
    proxyAddress: async (parent, _args, { config }: Context) => {
      return config[parent.feedFullName]?.routerAddress || ''
    },
    deviation: async (parent, _args, { config }: Context) => {
      return config[parent.feedFullName]?.deviation || ''
    },
    heartbeat: async (parent, _args, { config }: Context) => {
      // Heartbeat plus aproximate time in milliseconds that takes to resolve the witnet dr
      return config[parent.feedFullName]?.heartbeat || ''
    },
    finality: async (parent, _args, { config }: Context) => {
      // Heartbeat plus aproximate time in milliseconds that takes to resolve the witnet dr
      return config[parent.feedFullName]?.finality || ''
    }
  }
}

export default resolvers
