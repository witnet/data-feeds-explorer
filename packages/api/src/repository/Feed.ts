import { FeedsState } from './feedState'
import { PaginatedFeedsObject, FeedInfo, ConfigByFullName } from '../../types'

export class FeedRepository {
  feedsState: FeedsState
  // TODO: replace string with Network
  dataFeedsByNetwork: Record<string, Array<FeedInfo>>
  configByFullName: ConfigByFullName

  constructor(feedState: FeedsState) {
    this.feedsState = feedState
    this.initialize()
  }

  initialize() {
    const feeds = this.feedsState.listFeeds()

    this.dataFeedsByNetwork = feeds.reduce(
      (acc: Record<string, Array<FeedInfo>>, feedInfo: FeedInfo) => ({
        ...acc,
        [feedInfo.network]: acc[feedInfo.network]
          ? [...acc[feedInfo.network], feedInfo]
          : [feedInfo],
      }),
      {},
    )
    this.configByFullName = feeds.reduce(
      (acc, feedInfo) => ({
        ...acc,
        [`${feedInfo.feedFullName}`]: feedInfo,
      }),
      {},
    )
  }

  getConfigByFullName() {
    return this.configByFullName
  }

  get(feedFullName: string): FeedInfo {
    return this.feedsState
      .listFeeds()
      .find((feed) => feed.feedFullName === feedFullName)
  }

  async getFeedsByNetwork(
    // starts in 1
    network: string,
  ): Promise<PaginatedFeedsObject> {
    let feeds: Array<FeedInfo>
    if (network === 'all') {
      feeds = Object.values(this.dataFeedsByNetwork).flat()
    } else {
      feeds = this.dataFeedsByNetwork[network]
    }
    return {
      feeds: feeds || [],
      total: feeds ? feeds.length : 0,
    }
  }

  refreshV2NetworkFeeds(network: string, feedInfos: Array<FeedInfo>) {
    const v2Feeds = this.feedsState.getV2Feeds()

    const newV2Feeds = v2Feeds
      .filter((feed) => feed.network !== network)
      .concat(feedInfos)

    this.feedsState.setV2Feeds(newV2Feeds)

    this.initialize()
  }

  setV2Feeds(v2Feeds: Array<FeedInfo>) {
    this.feedsState.setV2Feeds(v2Feeds)
    this.initialize()
  }
}
