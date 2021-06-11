import { Db, Collection, ObjectId } from 'mongodb'
import { FeedDbObject } from '../generated/types'

export class FeedRepository {
  collection: Collection<FeedDbObject>

  constructor (db: Db) {
    this.collection = db.collection('feed')
  }

  async getAll () {
    return (await this.collection.find({}).toArray()).map(this._normalizeId)
  }

  async insert (feed: Omit<FeedDbObject, '_id'>) {
    const response = await this.collection.insertOne(feed)

    return this._normalizeId(response.ops[0])
  }

  async addResultRequest (feedId: ObjectId, resultRequestId: ObjectId) {
    const response = await this.collection.findOneAndUpdate(
      { _id: feedId },
      { $push: { requests: resultRequestId } },
      { returnDocument: 'after' }
    )

    return this._normalizeId(response.value)
  }

  async get (name: string) {
    const a = await this.collection.findOne({
      name
    })

    return this._normalizeId(a)
  }

  private _normalizeId (feed: FeedDbObject) {
    if (feed && feed._id) {
      return { ...feed, id: feed._id }
    }
  }
}
