import {
  FeedDbObjectNormalized,
  FeedDbObject,
  Collection,
  Db,
  FeedInfo,
  WithoutId,
  PaginatedFeedsObject
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
        .sort('network')
        .toArray()
    ).map(this.normalizeId)
  }

  async insert (
    feed: WithoutId<FeedDbObject>
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
    return this.normalizeId(await this.collection.findOne({ feedFullName }))
  }

  async getPaginatedFeeds (
    page: number,
    size: number,
    network: string
  ): Promise<PaginatedFeedsObject> {
    const queryByNetwork = this.collection.find({
      feedFullName: { $in: this.dataFeedsFullNames },
      network
    })
    const queryAll = this.collection.find({
      feedFullName: { $in: this.dataFeedsFullNames }
    })
    const query = network !== 'all' ? queryByNetwork : queryAll

    return {
      feeds: (
        await query
          .skip(size * (page - 1))
          .limit(size)
          .toArray()
      ).map(this.normalizeId),
      total: await query.count()
    }
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
