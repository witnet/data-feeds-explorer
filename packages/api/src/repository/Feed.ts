import {
  FeedDbObjectNormalized,
  FeedDbObject,
  Collection,
  Db,
  ObjectId,
  FeedInfo
} from '../types'
import { containFalsyValues } from './containFalsyValues'

export class FeedRepository {
  collection: Collection<FeedDbObject>
  // list of addresses to include in the search queries using address as an id for each data feed
  dataFeedsAddresses: Array<string>

  constructor (db: Db, dataFeeds: Array<FeedInfo>) {
    this.collection = db.collection('feed')
    this.dataFeedsAddresses = dataFeeds.map(dataFeed => dataFeed.address)
  }

  async getAll (): Promise<Array<FeedDbObjectNormalized>> {
    return (
      await this.collection
        .find({ address: { $in: this.dataFeedsAddresses } })
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

  async addResultRequest (
    feedId: ObjectId,
    resultRequestId: ObjectId
  ): Promise<FeedDbObjectNormalized> {
    const response = await this.collection.findOneAndUpdate(
      { _id: feedId },
      { $push: { requests: resultRequestId } },
      { returnDocument: 'after' }
    )

    return this.normalizeId(response.value)
  }

  async get (id: string): Promise<FeedDbObjectNormalized> {
    return this.normalizeId(
      await this.collection.findOne({
        _id: new ObjectId(id)
      })
    )
  }

  async getFeeds (
    page: number,
    size: number
  ): Promise<Array<FeedDbObjectNormalized>> {
    return (
      await this.collection
        .find({ address: { $in: this.dataFeedsAddresses } })
        .skip(size * (page - 1))
        .limit(size)
        .toArray()
    ).map(this.normalizeId)
  }

  async getByAddress (address: string): Promise<FeedDbObjectNormalized> {
    return this.normalizeId(await this.collection.findOne({ address }))
  }

  public getTotalCount (): Promise<number> {
    return this.collection.countDocuments()
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
