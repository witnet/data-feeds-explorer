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
      >(async (filter: { feedFullName: string; timestamp: number }) => {
        const dateNow = Math.floor(Date.now() / 1000)
        let timestamp = filter.timestamp

        const sevenDaysInSeconds = 604800
        if (filter.timestamp.toString().length !== 10) {
          // invalid timestamp
          console.log(
            '[requests] invalid timestamp argument -> returning last 7 days'
          )
          timestamp = dateNow - sevenDaysInSeconds
        }

        if (dateNow < filter.timestamp) {
          // received timestamp is greater than current time
          console.log(
            '[requests] invalid timestamp argument -> returning last 7 days'
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
          timestamp
        )
      })
    }
  }
}
