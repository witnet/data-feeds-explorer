import DataLoader from 'dataloader'
import { Repositories, ResultRequestDbObjectNormalized } from '../types'

export class Loaders {
  repositories: Repositories

  constructor (repositories: Repositories) {
    this.repositories = repositories
  }
  // returns a loader that fetches data using the given function
  private genericLoader<T> (load: (filter) => T) {
    return new DataLoader(async (filters: Array<string>) => {
      // load data from all
      const data = await Promise.all(
        await filters.map(async (filter, index) => ({
          data: await load(filter),
          index
        }))
      )
      // ensure they are sorted
      const fetchedDataByIndex = data.reduce((acc, val) => {
        acc[val.index] = val.data

        return acc
      }, {})
      return filters.map((_, index) => fetchedDataByIndex[index] || null)
    })
  }

  getLoaders (): {
    lastResult: DataLoader<string, ResultRequestDbObjectNormalized, string>
    requests: DataLoader<string, ResultRequestDbObjectNormalized, string>
  } {
    return {
      lastResult: this.genericLoader<Promise<ResultRequestDbObjectNormalized>>(
        async (feedFullName: string) =>
          await this.repositories.resultRequestRepository.getLastResult(
            feedFullName
          )
      ),

      requests: this.genericLoader<
        Promise<Array<ResultRequestDbObjectNormalized>>
      >(
        async (filter: { feedFullName: string; timestamp: number }) =>
          await this.repositories.resultRequestRepository.getFeedRequests(
            filter.feedFullName,
            filter.timestamp
          )
      )
    }
  }
}
