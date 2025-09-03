import { FeedsState } from './feedState'
import {
  PaginatedFeedsObject,
  FeedInfo,
  ConfigByFullName,
  Network,
  FeedsFilters,
} from '../../types'
import { Configuration } from '../web3Middleware/Configuration'

export class FeedRepository {
  feedsState: FeedsState
  dataFeeds: Record<string, Record<Network, Array<FeedInfo>>>
  dataFeedsByNetwork: Record<string, Array<FeedInfo>>
  configByFullName: ConfigByFullName

  constructor(feedState: FeedsState) {
    this.feedsState = feedState
    this.initialize()
  }

  initialize() {
    const feeds = this.feedsState.listFeeds()

    this.dataFeeds = feeds.reduce(
      (
        acc: Record<string, Record<Network, Array<FeedInfo>>>,
        feedInfo: FeedInfo,
      ) => {
        let value
        const isPairKeyPresent: boolean = !!acc[feedInfo.name]
        const isNetworkAndPairKeyPresent: boolean =
          isPairKeyPresent && !!acc[feedInfo.name][feedInfo.network]
        if (isNetworkAndPairKeyPresent) {
          value = [...acc[feedInfo.name][feedInfo.network], feedInfo]
        } else {
          value = [feedInfo]
        }
        return {
          ...acc,
          [feedInfo.name]: {
            ...acc[feedInfo.name],
            [feedInfo.network]: value,
          },
        }
      },
      {},
    )

    this.dataFeedsByNetwork = feeds.reduce(
      (acc: Record<string, Array<FeedInfo>>, feedInfo: FeedInfo) => {
        return {
          ...acc,
          [feedInfo.network]: acc[feedInfo.network]
            ? [...acc[feedInfo.network], feedInfo]
            : [feedInfo],
        }
      },
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

  async getFilteredFeeds({
    network,
    pair,
    mainnet,
  }: FeedsFilters): Promise<PaginatedFeedsObject> {
    let feeds: Array<FeedInfo> = []
    if (network === 'all') {
      feeds = this.feedsState.listFeeds()
    } else {
      if (network && pair) {
        feeds = this.dataFeeds[pair][network]
      } else if (network) {
        feeds = this.dataFeedsByNetwork[network]
      } else if (pair) {
        feeds = Object.values(this.dataFeeds[pair]).flat()
      }
    }
    return this.getPaginatedFeedsByEnv(feeds, mainnet)
  }

  getPaginatedFeedsByEnv(feeds: FeedInfo[], mainnet: boolean | null) {
    if (mainnet === null) {
      return {
        feeds: feeds || [],
        total: feeds ? feeds.length : 0,
      }
    }
    if (mainnet) {
      return this.getMainnetFeeds(feeds)
    } else {
      return this.getTestnetFeeds(feeds)
    }
  }

  getConfigurationFromNetwork(network: Network) {
    return this.feedsState.getConfiguration().getNetworkConfiguration(network)
  }

  getTestnetFeeds(feeds: Array<FeedInfo>): PaginatedFeedsObject {
    const filteredFeeds: FeedInfo[] =
      feeds?.filter(
        (feed) => !this.getConfigurationFromNetwork(feed.network).mainnet,
      ) ?? []
    return {
      feeds: filteredFeeds,
      total: filteredFeeds.length,
    }
  }

  getMainnetFeeds(feeds: Array<FeedInfo>): PaginatedFeedsObject {
    const filteredFeeds: FeedInfo[] =
      feeds?.filter(
        (feed) => this.getConfigurationFromNetwork(feed.network).mainnet,
      ) ?? []
    return {
      feeds: filteredFeeds,
      total: filteredFeeds.length,
    }
  }

  updateFeedAddress(
    feedFullName: string,
    { address, contractId }: { address: string; contractId: string },
  ): FeedInfo {
    const hasSameFeedFullName = (feed: FeedInfo) =>
      feed.feedFullName === feedFullName

    const legacyFeeds = this.feedsState.getLegacyFeeds()
    const index = legacyFeeds.findIndex(hasSameFeedFullName)
    const updatedFeed = { ...legacyFeeds[index], address, contractId }
    legacyFeeds[index] = updatedFeed
    this.feedsState.setLegacyFeeds(legacyFeeds)

    this.initialize()

    return updatedFeed
  }

  refreshV2NetworkFeeds(network: string, feedInfos: Array<FeedInfo>) {
    const v2Feeds = this.feedsState.getV2Feeds()

    const newV2Feeds = v2Feeds
      .filter((feed) => feed.network !== network)
      .concat(feedInfos)

    this.feedsState.setV2Feeds(newV2Feeds)

    this.initialize()
  }

  setLegacyFeeds(legacyFeeds: Array<FeedInfo>) {
    this.feedsState.setLegacyFeeds(legacyFeeds)
    this.initialize()
  }

  setV2Feeds(v2Feeds: Array<FeedInfo>) {
    this.feedsState.setV2Feeds(v2Feeds)
    this.initialize()
  }

  setConfiguration(configuration: Configuration) {
    this.feedsState.setConfiguration(configuration)
    this.initialize()
  }
}
