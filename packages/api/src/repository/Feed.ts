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

  async getPaginatedFeeds (
    // starts in 1
    page: number,
    size: number,
    network: string
  ): Promise<PaginatedFeedsObject> {
    const filteredFeeds =
      network === 'all'
        ? this.sortedDataFeeds
        : this.dataFeedsByNetwork[network]

    const paginatedFeeds = filteredFeeds.slice((page - 1) * size, page * size)

    return {
      feeds: paginatedFeeds,
      total: filteredFeeds.length
    }
  }

  updateFeedAddress (feedFullName: string, address: string): FeedInfo {
    const hasSameFeedFullName = (feed: FeedInfo) =>
      feed.feedFullName === feedFullName

    // Update address in sortedDataFeeds
    const sortedDataFeedIndex = this.sortedDataFeeds.findIndex(
      hasSameFeedFullName
    )
    const feed = this.sortedDataFeeds[sortedDataFeedIndex]
    feed.address = address

    // Update address in dataFeedsByNetwork
    const dataFeedsByNetworkIndex = this.dataFeedsByNetwork[
      feed.network
    ].findIndex(hasSameFeedFullName)
    this.dataFeedsByNetwork[feed.network][
      dataFeedsByNetworkIndex
    ].address = address

    return feed
  }
}
