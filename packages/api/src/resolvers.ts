import { Context } from './types'

const resolvers = {
  Query: {
    feeds: async (_parent, _args, { feedRepository }: Context) => {
      return await feedRepository.getAll()
    },

    feedsPage: async (_parent, args, { feedRepository }: Context) => {
      return {
        feeds: await feedRepository.getFeedsPage(args.page, args.pageSize),
        total: await feedRepository.getTotalCount()
      }
    },

    feed: async (_parent, args, { feedRepository }: Context) => {
      return await feedRepository.get(args.id)
    }
  },
  Feed: {
    requests: async (parent, _args, { resultRequestRepository }: Context) => {
      return await resultRequestRepository.getFeedRequests(parent.id)
    },
    lastResult: async (parent, _args, { resultRequestRepository }: Context) => {
      return (await resultRequestRepository.getLastResult(parent.id))?.result
    }
  }
}

export default resolvers
