import { PaginatedFeedsObject, FeedInfo, Network } from '../types'

export class FeedRepository {
  sortedDataFeeds: Array<FeedInfo>
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

    const sortedFeedsWithoutEth = dataFeeds
      .filter(feed => !feed.network.includes(Network.EthereumMainnet))
      .sort((a, b) => (b.network < a.network ? 1 : -1))

    this.sortedDataFeeds = [
      ...this.dataFeedsByNetwork[Network.EthereumMainnet],
      ...this.dataFeedsByNetwork[Network.EthereumGoerli],
      ...this.dataFeedsByNetwork[Network.EthereumRinkeby],
      ...sortedFeedsWithoutEth
    ]
  }

  get (feedFullName: string): FeedInfo {
    return this.sortedDataFeeds.find(feed => feed.feedFullName === feedFullName)
  }

  async getFeedsByNetwork (
    // starts in 1
    network: string
  ): Promise<PaginatedFeedsObject> {
    let feeds: Array<FeedInfo>
    if (network === 'all') {
      feeds = Object.values(this.dataFeedsByNetwork[network]).flat()
    } else {
      feeds = this.dataFeedsByNetwork[network]
    }

    return {
      feeds,
      total: feeds.length
    }
  }

  updateFeedAddress (
    feedFullName: string,
    { address, contractId }: { address: string; contractId: string }
  ): FeedInfo {
    const hasSameFeedFullName = (feed: FeedInfo) =>
      feed.feedFullName === feedFullName

    // Update address in sortedDataFeeds
    const sortedDataFeedIndex = this.sortedDataFeeds.findIndex(
      hasSameFeedFullName
    )
    const feed = this.sortedDataFeeds[sortedDataFeedIndex]
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
