import { FeedInfo } from '../../types.js'
import { Configuration } from '../web3Middleware/Configuration.js'

export class FeedsState {
  private legacyFeeds: Array<FeedInfo>
  private v2Feeds: Array<FeedInfo>
  private configuration: Configuration

  constructor() {
    this.legacyFeeds = []
    this.v2Feeds = []
  }

  setV2Feeds(v2Feeds: Array<FeedInfo>) {
    this.v2Feeds = v2Feeds
  }

  setLegacyFeeds(legacyFeeds: Array<FeedInfo>) {
    this.legacyFeeds = legacyFeeds
  }

  setConfiguration(configuration: Configuration) {
    this.configuration = configuration
  }

  getV2Feeds(): Array<FeedInfo> {
    return this.v2Feeds
  }

  getConfiguration(): Configuration {
    return this.configuration
  }

  getLegacyFeeds(): Array<FeedInfo> {
    return this.legacyFeeds
  }

  listFeeds(): Array<FeedInfo> {
    return [...this.legacyFeeds, ...this.v2Feeds]
  }
}
