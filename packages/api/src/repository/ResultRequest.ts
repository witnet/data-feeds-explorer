import {
  ResultRequestDbObjectNormalized,
  ResultRequestDbObject,
  Db,
  Collection,
  WithoutId,
  PaginatedRequests,
} from '../../types.js'
import { containFalsyValues } from './containFalsyValues.js'

export class ResultRequestRepository {
  // TODO: find a better way to deal with auto generated ids
  collection: Collection<
    ResultRequestDbObject | WithoutId<ResultRequestDbObject>
  >
  latestResults: Record<string, WithoutId<ResultRequestDbObject>> = {}

  constructor(db: Db) {
    this.collection = db.collection('result_request')
  }

  async getFeedRequests(
    feedFullName: string,
    timestamp: number,
  ): Promise<Array<ResultRequestDbObjectNormalized>> {
    return (
      await this.collection
        .find(
          {
            feedFullName,
            timestamp: { $gt: timestamp.toString() },
          },
          {
            sort: { timestamp: -1 },
            collation: {
              locale: 'en_US',
              numericOrdering: true,
            },
          },
        )
        .toArray()
    )
      .filter((request, index, self) => {
        return (
          index === self.findIndex((x) => x.timestamp === request.timestamp)
        )
      })
      .map(this.normalizeId)
  }

  async getFeedRequestsPageByPair(
    pair: string,
    page: number,
    size: number,
  ): Promise<PaginatedRequests> {
    const query = { feedFullName: { $regex: pair } }
    return {
      requests: (
        await this.collection
          .find(query)
          .sort({ timestamp: -1 })
          .skip(size * (page - 1))
          .limit(size)
          .toArray()
      ).map(this.normalizeId),
      total: (await this.collection.find(query).toArray()).length,
    }
  }

  async getFeedRequestsPage(
    feedFullName: string,
    page: number,
    size: number,
  ): Promise<PaginatedRequests> {
    return {
      requests: (
        await this.collection
          .find({
            feedFullName,
          })
          .sort({ timestamp: -1 })
          .skip(size * (page - 1))
          .limit(size)
          .toArray()
      ).map(this.normalizeId),
      total: (
        await this.collection
          .find({
            feedFullName,
          })
          .toArray()
      ).length,
    }
  }

  async getLastResult(
    feedFullName: string,
  ): Promise<ResultRequestDbObjectNormalized | null> {
    const lastResultRequest = await this.collection
      .findOne(
        {
          feedFullName,
        },
        {
          sort: {
            timestamp: -1,
          },
          collation: {
            locale: 'en_US',
            numericOrdering: true,
          },
        },
      )
      .catch((e) => {
        console.log(`Error in getLastResult: ${feedFullName}`, e)
        return null
      })
    return this.normalizeId(lastResultRequest)
  }

  async insert(
    resultRequest: WithoutId<ResultRequestDbObject>,
  ): Promise<ResultRequestDbObjectNormalized | null> {
    if (this.isValidResultRequest(resultRequest)) {
      const response = await this.collection.insertOne(resultRequest)

      // store in cache
      this.latestResults[resultRequest.feedFullName] = resultRequest

      return this.normalizeId(response[0])
    } else {
      console.error(
        'Error inserting result request: Validation Error',
        resultRequest,
      )
      return null
    }
  }

  async insertIfLatest(
    resultRequest: WithoutId<ResultRequestDbObject>,
  ): Promise<ResultRequestDbObjectNormalized | null> {
    let storedResult = this.latestResults[resultRequest.feedFullName]
    if (!storedResult) {
      storedResult = await this.getLastResult(resultRequest.feedFullName)
    }

    const timestampChanged = storedResult?.timestamp !== resultRequest.timestamp

    if (timestampChanged) {
      return await this.insert(resultRequest)
    } else {
      console.log(
        'Not inserting result because timestap is already inserted',
        resultRequest,
      )
      return null
    }
  }

  private normalizeId(
    resultRequest: ResultRequestDbObject,
  ): ResultRequestDbObjectNormalized | null {
    if (resultRequest?._id) {
      return { ...resultRequest, id: resultRequest._id.toString() }
    } else {
      // This should be unreachable: obj from db always contains _id
      return null
    }
  }

  private isValidResultRequest(
    resultRequest: WithoutId<ResultRequestDbObject>,
  ): boolean {
    return !containFalsyValues(resultRequest) && resultRequest.timestamp !== '0'
  }
}
