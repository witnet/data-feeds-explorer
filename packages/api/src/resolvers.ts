import { FeedRepository } from './repository/Feed'
import { PriceRequestRepository } from './repository/PriceRequest'
type Context = {
  feedRepository: FeedRepository
  priceRequestRepository: PriceRequestRepository
}

const resolvers = {
  Query: {
    feeds: async (_parent, _args, { feedRepository }: Context) => {
      return await feedRepository.getAll()
    },

    feed: async (_parent, args, { feedRepository }: Context) => {
      console.log('ARGS', args)
      return await feedRepository.get(args.name)
    }
  },
  Feed: {
    requests: async (parent, _args, { priceRequestRepository }: Context) => {
      return await priceRequestRepository.getFeedRequests(parent.id)
    }
  }
}

export default resolvers
