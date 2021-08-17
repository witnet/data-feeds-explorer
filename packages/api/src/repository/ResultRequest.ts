import {
  ResultRequestDbObjectNormalized,
  ResultRequestDbObject,
  Db,
  Collection,
  ObjectId,
  FeedInfo
} from '../types'
import { containFalsyValues } from './containFalsyValues'

export class ResultRequestRepository {
  collection: Collection<ResultRequestDbObject>
  // list of addresses to include in the search queries using address as an id for each data feed
  dataFeedsAddresses: Array<string>

  constructor (db: Db, dataFeeds: Array<FeedInfo>) {
    this.collection = db.collection('result_request')
    this.dataFeedsAddresses = dataFeeds.map(dataFeed => dataFeed.address)
  }

  async getFeedRequests (feedId: ObjectId): Promise<Array<ResultRequestDbObjectNormalized>> {
    return (
      await this.collection
        .find({
          feedId: feedId.toString()
        })
        .sort({ timestamp: -1 })
        .toArray()
    ).map(this.normalizeId)
  }

  async getFeedRequestsPage (feedId: ObjectId, page: number, size: number): Promise<Array<ResultRequestDbObjectNormalized>> {
    return (
      await this.collection
        .find({
          feedId: feedId.toString()
        })
        .sort({ timestamp: -1 })
        .skip(size * (page - 1))
        .limit(size)
        .toArray()
    ).map(this.normalizeId)
  }

  async getLastResult (feedId: ObjectId): Promise<ResultRequestDbObjectNormalized> {
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

    return this.normalizeId(lastResultRequest)
  }

  async insert (resultRequest: Omit<ResultRequestDbObject, '_id'>): Promise<ResultRequestDbObjectNormalized | null> {
    if (this.isValidResultRequest(resultRequest)) {
      const response = await this.collection.insertOne(resultRequest)

      return this.normalizeId(response.ops[0])
    } else {
      console.error(
        'Error inserting result request: Validation Error',
        resultRequest
      )
      return null
    }
  }

  private normalizeId (
    resultRequest: ResultRequestDbObject
  ): ResultRequestDbObjectNormalized {
    if (resultRequest?._id) {
      return { ...resultRequest, id: resultRequest._id.toString() }
    } else {
      // This should be unreachable: obj from db always contains _id
      return null
    }
  }

  private isValidResultRequest (
    resultRequest: Omit<ResultRequestDbObject, '_id'>
  ): boolean {
    return !containFalsyValues(resultRequest)
  }
}
