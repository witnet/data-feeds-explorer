import {
  ResultRequestDbObjectNormalized,
  ResultRequestDbObject,
  Db,
  Collection,
  FeedInfo,
  WithoutId,
  PaginatedRequests
} from '../types'
import { containFalsyValues } from './containFalsyValues'

export class ResultRequestRepository {
  // TODO: find a better way to deal with auto generated ids
  collection: Collection<
    ResultRequestDbObject | WithoutId<ResultRequestDbObject>
  >

  constructor (db: Db, _dataFeeds: Array<FeedInfo>) {
    this.collection = db.collection('result_request')
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
            sort: { timestamp: -1 },
            collation: {
              locale: 'en_US',
              numericOrdering: true
            }
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
  ): Promise<PaginatedRequests> {
    return {
      requests: (
        await this.collection
          .find({
            feedFullName
          })
          .sort({ timestamp: -1 })
          .skip(size * (page - 1))
          .limit(size)
          .toArray()
      ).map(this.normalizeId),
      total: (
        await this.collection
          .find({
            feedFullName
          })
          .toArray()
      ).length
    }
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

      return this.normalizeId(response[0])
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
    return !containFalsyValues(resultRequest) && resultRequest.timestamp !== '0'
  }
}
