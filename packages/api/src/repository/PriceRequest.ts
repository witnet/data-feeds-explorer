import { Db, Collection, ObjectId } from 'mongodb'
import { PriceRequestDbObject } from '../generated/types'

export class PriceRequestRepository {
  collection: Collection<PriceRequestDbObject>

  constructor (db: Db) {
    this.collection = db.collection('price_request')
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

  async getLastPrice (feedId: ObjectId) {
    const lastPriceRequest = await this.collection.findOne(
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

    return lastPriceRequest?.price
  }

  async insert (priceRequest: Omit<PriceRequestDbObject, '_id'>) {
    const response = await this.collection.insertOne(priceRequest)

    return this.normalizeId(response.ops[0])
  }

  private normalizeId (priceRequest: PriceRequestDbObject) {
    return { ...priceRequest, id: priceRequest._id }
  }
}
