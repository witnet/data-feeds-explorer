import {
  ResultRequestDbObjectNormalized,
  ResultRequestDbObject,
  Db,
  Collection,
  FeedInfo,
  WithoutId
} from '../types'
import { containFalsyValues } from './containFalsyValues'

export class ResultRequestRepository {
  collection: Collection<ResultRequestDbObject>
  // list of fullNames to include in the search queries using feedFullName as an id for each data feed
  // dataFeedsFullNames: Array<string>

  constructor (db: Db, _dataFeeds: Array<FeedInfo>) {
    this.collection = db.collection('result_request')
    // this.dataFeedsFullNames = dataFeeds.map(dataFeed => dataFeed.feedFullName)
  }

  async getFeedRequests (
    feedFullName: string,
    timestamp: number
  ): Promise<Array<ResultRequestDbObjectNormalized>> {
    return (
      await this.collection
        .find(
          {
            feedFullName,
            timestamp: { $gt: timestamp.toString() }
          },
          {
            sort: { timestamp: -1 }
          }
        )
        .toArray()
    ).map(this.normalizeId)
  }

  async getFeedRequestsPage (
    feedFullName: string,
    page: number,
    size: number
  ): Promise<Array<ResultRequestDbObjectNormalized>> {
    return (
      await this.collection
        .find({
          feedFullName
        })
        .sort({ timestamp: -1 })
        .skip(size * (page - 1))
        .limit(size)
        .toArray()
    ).map(this.normalizeId)
  }

  async getLastResult (
    feedFullName: string
  ): Promise<ResultRequestDbObjectNormalized> {
    const lastResultRequest = await this.collection.findOne(
      {
        feedFullName: feedFullName
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

  async insert (
    resultRequest: WithoutId<ResultRequestDbObject>
  ): Promise<ResultRequestDbObjectNormalized | null> {
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
