import { FeedInfo } from '../../types'

export class FeedsState {
  private v2Feeds: Array<FeedInfo>

  constructor() {
    this.v2Feeds = []
  }

  setV2Feeds(v2Feeds: Array<FeedInfo>) {
    this.v2Feeds = v2Feeds
  }

  getV2Feeds(): Array<FeedInfo> {
    return this.v2Feeds
  }

  listFeeds(): Array<FeedInfo> {
    return [...this.v2Feeds]
  }
}
