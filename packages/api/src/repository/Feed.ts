import { AggregationCursor } from 'mongodb'
import {
  FeedDbObjectNormalized,
  FeedDbObject,
  Collection,
  Db,
  FeedInfo,
  WithoutId,
  PaginatedFeedsObject
} from '../types'
import { containFalsyValues } from './containFalsyValues'

export class FeedRepository {
  collection: Collection<FeedDbObject>
  // list of fullNames to include in the search queries using feedFullName as an id for each data feed
  dataFeedsFullNames: Array<string>

  constructor (db: Db, dataFeeds: Array<FeedInfo>) {
    this.collection = db.collection('feed')
    this.dataFeedsFullNames = dataFeeds.map(dataFeed => dataFeed.feedFullName)
    this.collection.createIndex({ feedFullName: 1 })
  }

  async getAll (): Promise<Array<FeedDbObjectNormalized>> {
    return (
      await this.collection
        .find({
          feedFullName: { $in: this.dataFeedsFullNames }
        })
        .sort('network')
        .toArray()
    ).map(this.normalizeId)
  }

  async insert (
    feed: WithoutId<FeedDbObject>
  ): Promise<FeedDbObjectNormalized | null> {
    if (this.isValidFeed(feed)) {
      const response = await this.collection.insertOne(feed)
      return this.normalizeId(response.ops[0])
    } else {
      console.error('Error inserting feed: Validation Error', feed)

      return null
    }
  }

  async get (feedFullName: string): Promise<FeedDbObjectNormalized> {
    const response = await this.collection.findOne({ feedFullName })
    return this.normalizeId(response)
  }

  async getPaginatedFeeds (
    page: number,
    size: number,
    network: string
  ): Promise<PaginatedFeedsObject> {
    const queryByNetwork = {
      feedFullName: { $in: this.dataFeedsFullNames },
      network
    }
    const queryAll = {
      feedFullName: { $in: this.dataFeedsFullNames }
    }
    const match = network !== 'all' ? queryByNetwork : queryAll
    const aggregation = (
      await (await this.aggregateCollection(match, page, size)).toArray()
    )[0]
    return {
      feeds: aggregation.feeds.map(this.normalizeId),
      total: aggregation.total[0]?.count || 0
    }
  }

  private async aggregateCollection (
    match,
    page,
    size
  ): Promise<AggregationCursor> {
    return await this.collection.aggregate([
      {
        $project: {
          _id: 1,
          address: 1,
          blockExplorer: 1,
          feedFullName: 1,
          label: 1,
          name: 1,
          network: 1,
          order: {
            $cond: {
              if: { $eq: ['$network', 'ethereum-mainnet'] },
              then: 1,
              else: {
                $cond: {
                  if: { $eq: [{ $substr: ['$network', 0, 8] }, 'ethereum'] },
                  then: 2,
                  else: 3
                }
              }
            }
          }
        }
      },
      { $match: match },
      { $sort: { order: 1, network: 1 } },
      {
        $project: {
          _id: 1,
          address: 1,
          blockExplorer: 1,
          feedFullName: 1,
          label: 1,
          name: 1,
          network: 1
        }
      },
      {
        $facet: {
          feeds: [{ $skip: size * (page - 1) }, { $limit: size }],
          total: [
            {
              $count: 'count'
            }
          ]
        }
      }
    ])
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
