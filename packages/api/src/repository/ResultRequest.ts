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

  constructor (db: Db, _dataFeeds: Array<FeedInfo>) {
    this.collection = db.collection('result_request')
    this.collection.createIndex(
      { feedFullName: 1, timestamp: -1 },
      {
        collation: {
          locale: 'en_US',
          numericOrdering: true
        }
      }
    )
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
            timestamp: { $gt: timestamp.toString() },
            result: { $exists: true }
          },
          {
            sort: { timestamp: -1 }
          }
        )
        .toArray()
    )
      .filter((request, index, self) => {
        return index === self.findIndex(x => x.timestamp === request.timestamp)
      })
      .map(this.normalizeId)
  }

  async getFeedRequestsPage (
    feedFullName: string,
    page: number,
    size: number
  ): Promise<Array<ResultRequestDbObjectNormalized>> {
    return (
      await this.collection
        .find({
          feedFullName,
          result: { $exists: true }
        })
        .sort({ timestamp: -1 })
        .skip(size * (page - 1))
        .limit(size)
        .toArray()
    ).map(this.normalizeId)
  }

  async getLastResult (
    feedFullName: string
  ): Promise<ResultRequestDbObjectNormalized | null> {
    const lastResultRequest = await this.collection.findOne(
      {
        feedFullName
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
  ): ResultRequestDbObjectNormalized | null {
    if (resultRequest?._id) {
      return { ...resultRequest, id: resultRequest._id.toString() }
    } else {
      // This should be unreachable: obj from db always contains _id
      return null
    }
  }

  private isValidResultRequest (
    resultRequest: WithoutId<ResultRequestDbObject>
  ): boolean {
    return !containFalsyValues(resultRequest)
  }
}
