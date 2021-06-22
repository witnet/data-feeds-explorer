import {
  FeedDbObjectNormalized,
  FeedDbObject,
  Collection,
  Db,
  ObjectId
} from '../types'

export class FeedRepository {
  collection: Collection<FeedDbObject>

  constructor (db: Db) {
    this.collection = db.collection('feed')
  }

  async getAll () {
    return (await this.collection.find({}).toArray()).map(this.normalizeId)
  }

  async insert (feed: Omit<FeedDbObject, '_id'>) {
    const response = await this.collection.insertOne(feed)

    return this.normalizeId(response.ops[0])
  }

  async addResultRequest (feedId: ObjectId, resultRequestId: ObjectId) {
    const response = await this.collection.findOneAndUpdate(
      { _id: feedId },
      { $push: { requests: resultRequestId } },
      { returnDocument: 'after' }
    )

    return this.normalizeId(response.value)
  }

  async get (id: string) {
    return this.normalizeId(
      await this.collection.findOne({ _id: new ObjectId(id) })
    )
  }

  async getByAddress (address: string) {
    return this.normalizeId(await this.collection.findOne({ address }))
  }

  private normalizeId (feed: FeedDbObject): FeedDbObjectNormalized {
    if (feed && feed._id) {
      return { ...feed, id: feed._id.toString() }
    }
  }
}
