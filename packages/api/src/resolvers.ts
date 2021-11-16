import { Context, Network } from './types'
const resolvers = {
  Query: {
    feeds: async (_parent, args, { feedRepository }: Context) => {
      return await feedRepository.getPaginatedFeeds(
        args.page,
        args.pageSize,
        args.network
      )
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
      return (await resultRequestRepository.getLastResult(parent.feedFullName))
        ?.result
    },
    color: async (parent, _args, { config }: Context) => {
      return config[parent.feedFullName]?.color || ''
    },
    blockExplorer: async (parent, _args, { config }: Context) => {
      return config[parent.feedFullName]?.blockExplorer || ''
    }
  }
}

export default resolvers
