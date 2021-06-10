import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'
type Context = {
  feedRepository: FeedRepository
  resultRequestRepository: ResultRequestRepository
}

const resolvers = {
  Query: {
    feeds: async (_parent, _args, { feedRepository }: Context) => {
      return await feedRepository.getAll()
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
      return await resultRequestRepository.getLastResult(parent.id)
    }
  }
}

export default resolvers
