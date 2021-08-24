import {
  FeedDbObjectNormalized,
  FeedDbObject,
  Collection,
  Db,
  FeedInfo
} from '../types'
import { containFalsyValues } from './containFalsyValues'

export class FeedRepository {
  collection: Collection<FeedDbObject>
  // list of fullNames to include in the search queries using feedFullName as an id for each data feed
  dataFeedsFullNames: Array<string>

  constructor (db: Db, dataFeeds: Array<FeedInfo>) {
    this.collection = db.collection('feed')
    this.dataFeedsFullNames = dataFeeds.map(dataFeed => dataFeed.feedFullName)
  }

  async getAll (): Promise<Array<FeedDbObjectNormalized>> {
    return (
      await this.collection
        .find({ feedFullName: { $in: this.dataFeedsFullNames } })
        .toArray()
    ).map(this.normalizeId)
  }

  async insert (
    feed: Omit<FeedDbObject, '_id'>
  ): Promise<FeedDbObjectNormalized | null> {
    if (this.isValidFeed(feed)) {
      const response = await this.collection.insertOne(feed)
      return this.normalizeId(response.ops[0])
    } else {
      console.error('Error inserting feed: Validation Error', feed)

      return null
    }
  }

  async get (feedFullName: string): Promise<FeedDbObjectNormalized> {
    const a = this.normalizeId(
      await this.collection.findOne({ feedFullName: feedFullName })
    )
    console.log('a', a)

    return a
  }

  async getFeeds (
    page: number,
    size: number
  ): Promise<Array<FeedDbObjectNormalized>> {
    return (
      await this.collection
        .find({ feedFullName: { $in: this.dataFeedsFullNames } })
        .skip(size * (page - 1))
        .limit(size)
        .toArray()
    ).map(this.normalizeId)
  }

  public getTotalCount (): Promise<number> {
    return this.collection.count()
  }

  private normalizeId (feed: FeedDbObject): FeedDbObjectNormalized | null {
    if (feed && feed._id) {
      return { ...feed, id: feed._id.toString() }
    } else {
      // this code should be unreachable: value from db always contains _id
      return null
    }
  }

  private isValidFeed (feed: Omit<FeedDbObject, '_id'>): boolean {
    return !containFalsyValues(feed)
  }
}
