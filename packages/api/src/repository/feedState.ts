import { FeedInfo } from '../../types'

export class FeedsState {
  private legacyFeeds: Array<FeedInfo>
  private v2Feeds: Array<FeedInfo>

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

  getV2Feeds(): Array<FeedInfo> {
    return this.v2Feeds
  }

  getLegacyFeeds(): Array<FeedInfo> {
    return this.legacyFeeds
  }

  listFeeds(): Array<FeedInfo> {
    return [...this.legacyFeeds, ...this.v2Feeds]
  }
}
