import { PaginatedFeedsObject, FeedInfo } from '../types'

export class FeedRepository {
  dataFeeds: Array<FeedInfo>
  // TODO: replace string with Network
  dataFeedsByNetwork: Record<string, Array<FeedInfo>>

  constructor (dataFeeds: Array<FeedInfo>) {
    this.dataFeedsByNetwork = dataFeeds.reduce(
      (acc: Record<string, Array<FeedInfo>>, feedInfo: FeedInfo) => ({
        ...acc,
        [feedInfo.network]: acc[feedInfo.network]
          ? [...acc[feedInfo.network], feedInfo]
          : [feedInfo]
      }),
      {}
    )
    this.dataFeeds = dataFeeds
  }

  get (feedFullName: string): FeedInfo {
    return this.dataFeeds.find(feed => feed.feedFullName === feedFullName)
  }

  async getFeedsByNetwork (
    // starts in 1
    network: string
  ): Promise<PaginatedFeedsObject> {
    let feeds: Array<FeedInfo>
    if (network === 'all') {
      feeds = Object.values(this.dataFeedsByNetwork).flat()
    } else {
      feeds = this.dataFeedsByNetwork[network]
    }
    return {
      feeds: feeds || [],
      total: feeds ? feeds.length : 0
    }
  }

  updateFeedAddress (
    feedFullName: string,
    { address, contractId }: { address: string; contractId: string }
  ): FeedInfo {
    const hasSameFeedFullName = (feed: FeedInfo) =>
      feed.feedFullName === feedFullName

    // Update address in sortedDataFeeds
    const sortedDataFeedIndex = this.dataFeeds.findIndex(hasSameFeedFullName)
    const feed = this.dataFeeds[sortedDataFeedIndex]
    feed.address = address
    feed.contractId = contractId
    // Update address in dataFeedsByNetwork cache
    const dataFeedsByNetworkIndex = this.dataFeedsByNetwork[
      feed.network
    ].findIndex(hasSameFeedFullName)
    this.dataFeedsByNetwork[feed.network][
      dataFeedsByNetworkIndex
    ].address = address
    // Update contractId in dataFeedsByNetwork cache
    this.dataFeedsByNetwork[feed.network][
      dataFeedsByNetworkIndex
    ].contractId = contractId

    return feed
  }
}
