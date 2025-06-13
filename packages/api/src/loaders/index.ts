import DataLoader from 'dataloader'
import { SvgCache } from '../svgCache.js'
import {
  Loaders,
  Repositories,
  ResultRequestDbObjectNormalized,
  SourcesDbObject
} from '../../types.js'

export class LoadersFactory {
  repositories: Repositories
  svgCache: SvgCache

  constructor(repositories: Repositories, svgCache: SvgCache) {
    this.repositories = repositories
    this.svgCache = svgCache
  }
  // returns a loader that fetches data using the given function
  private genericLoader<T>(load: (filter) => T) {
    return new DataLoader(async (filters: Array<string>) => {
      // load data from all
      const data = await Promise.all(
        await filters.map(async (filter, index) => ({
          data: await load(filter),
          index,
        })),
      )
      // ensure they are sorted
      const fetchedDataByIndex = data.reduce((acc, val) => {
        acc[val.index] = val.data

        return acc
      }, {})
      return filters.map((_, index) => fetchedDataByIndex[index] || null)
    })
  }

  getLoaders(): Loaders {
    return {
      lastResult: this.genericLoader<Promise<ResultRequestDbObjectNormalized>>(
        async (feedFullName: string) =>
          await this.repositories.resultRequestRepository.getLastResult(
            feedFullName,
          ),
      ),
      sources: this.genericLoader<Promise<SourcesDbObject>>(
        async (feedFullName: string) =>
          await this.repositories.sourcesRepository.getSources(
            feedFullName,
          ),
      ),
      requests: this.genericLoader<
        Promise<Array<ResultRequestDbObjectNormalized>>
      >(async (filter: { feedFullName: string; timestamp: number }) => {
        const dateNow = Math.floor(Date.now() / 1000)
        let timestamp = filter.timestamp

        const sevenDaysInSeconds = 604800
        if (filter.timestamp.toString().length !== 10) {
          // invalid timestamp
          console.log(
            '[requests] invalid timestamp argument -> returning last 7 days',
          )
          timestamp = dateNow - sevenDaysInSeconds
        }

        if (dateNow < filter.timestamp) {
          // received timestamp is greater than current time
          console.log(
            '[requests] invalid timestamp argument -> returning last 7 days',
          )
          timestamp = dateNow - sevenDaysInSeconds
        }

        const oneMonthInSeconds = 2592000
        if (dateNow - filter.timestamp > oneMonthInSeconds) {
          // received timestamp is greater than 30 days
          timestamp = dateNow - oneMonthInSeconds
        }

        return await this.repositories.resultRequestRepository.getFeedRequests(
          filter.feedFullName,
          timestamp,
        )
      }),
      logos: new DataLoader(async (logos: Array<string>) => {
        return Object.values(await this.svgCache.getMany(logos))
      }),
    }
  }
}
