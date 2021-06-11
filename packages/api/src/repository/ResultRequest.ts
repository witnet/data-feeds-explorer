import { Db, Collection, ObjectId } from 'mongodb'
import { ResultRequestDbObject } from '../generated/types'

export class ResultRequestRepository {
  collection: Collection<ResultRequestDbObject>

  constructor (db: Db) {
    this.collection = db.collection('result_request')
  }

  async getFeedRequests (feedId: ObjectId) {
    return (
      await this.collection
        .find({
          feedId: feedId.toString()
        })
        .toArray()
    ).map(this.normalizeId)
  }

  async getLastResult (feedId: ObjectId) {
    const lastResultRequest = await this.collection.findOne(
      {
        feedId: feedId.toString()
      },
      {
        sort: {
          timestamp: -1
        },
        collation: {
          locale: 'en_US',
          numericOrdering: true
        }
      }
    )

    return lastResultRequest?.result
  }

  async insert (resultRequest: Omit<ResultRequestDbObject, '_id'>) {
    const response = await this.collection.insertOne(resultRequest)

    return this.normalizeId(response.ops[0])
  }

  private normalizeId (resultRequest: ResultRequestDbObject) {
    return { ...resultRequest, id: resultRequest._id }
  }
}
