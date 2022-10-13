import { PaginatedFeedsObject, FeedInfo } from '../types'

export class FeedRepository {
  dataFeeds: Array<FeedInfo>
  // TODO: replace string with Network
  dataFeedsByNetwork: Record<string, Array<FeedInfo>>
  networksByEcosystem: Record<string, Array<string>>

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
    this.networksByEcosystem = Object.keys(this.dataFeedsByNetwork).reduce(
      (acc, network) => {
        const ecosystem = network.split('-')[0]

        if (!acc[ecosystem]) {
          acc[ecosystem] = []
        }

        acc[ecosystem].push(network)

        return acc
      },
      {}
    )
  }

  get (feedFullName: string): FeedInfo {
    return this.dataFeeds.find(feed => feed.feedFullName === feedFullName)
  }

  getAllFeedsByNetwork (): Array<PaginatedFeedsObject> {
    return Object.entries(this.dataFeedsByNetwork).reduce(
      (acc, [network, feeds]) => [
        ...acc,
        { network, feeds, total: feeds.length }
      ],
      []
    )
  }

  async getEcosystemFeeds (
    ecosystem: string
  ): Promise<Array<PaginatedFeedsObject>> {
    const networks: Array<string> = this.networksByEcosystem[ecosystem]

    return this.getFeedsByNetworks(networks)
  }

  async getFeedsByNetworks (
    networks: Array<string>
  ): Promise<Array<PaginatedFeedsObject>> {
    return await Promise.all(
      networks.map(network => this.getFeedsByNetwork(network))
    )
  }

  async getFeedsByNetwork (
    // starts in 1
    network: string
  ): Promise<PaginatedFeedsObject> {
    let feeds: Array<FeedInfo> = this.dataFeedsByNetwork[network]
    return {
      feeds: feeds || [],
      total: feeds ? feeds.length : 0,
      network
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
