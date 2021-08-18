import Web3 from 'web3'
import { toHex } from 'web3-utils'
import {
  Contracts,
  ContractsState,
  FeedInfo,
  Repositories,
  ResultRequestDbObject,
  ObjectId,
  FeedDbObjectNormalized
} from '../types'
import { getProvider } from './provider'

export class Web3Middleware {
  public repositories: Repositories
  private Web3: typeof Web3
  public dataFeeds: Array<FeedInfo>
  public lastStoredResult: Record<string, ResultRequestDbObject> = {}

  private intervals = []

  constructor (
    dependencies: { Web3: typeof Web3; repositories: Repositories },
    dataFeeds: Array<FeedInfo>
  ) {
    this.repositories = dependencies.repositories
    this.dataFeeds = dataFeeds
    this.Web3 = dependencies.Web3
  }

  private async initializeLastStoredResults (): Promise<
    Array<FeedDbObjectNormalized>
  > {
    const promises = this.dataFeeds.map(async feedInfo => {
      let feed = await this.repositories.feedRepository.get(
        feedInfo.feedFullName
      )
      if (feed) {
        this.lastStoredResult[
          feedInfo.feedFullName
        ] = await this.repositories.resultRequestRepository.getLastResult(
          feed.feedFullName
        )
      } else {
        feed = await this.repositories.feedRepository.insert({
          feedFullName: feedInfo.feedFullName,
          address: feedInfo.address,
          name: feedInfo.name,
          network: feedInfo.network,
          label: feedInfo.label,
          blockExplorer: feedInfo.blockExplorer
        })
      }
      return feed
    })

    return await Promise.all(promises)
  }

  async listen () {
    const feeds = await this.initializeLastStoredResults()

    const feedDictionary = this.dataFeeds.reduce(
      (
        acc: Record<string, { feedInfo: FeedInfo; feedId: ObjectId }>,
        feedInfo: FeedInfo
      ) => {
        const feedId = feeds.find(feed => {
          return feed.feedFullName === feedInfo.feedFullName
        })

        return {
          ...acc,
          [feedInfo.feedFullName]: {
            feedInfo,
            feedId: feedId._id
          }
        }
      },
      {}
    )

    const promises = Object.values(feedDictionary).map(
      async entry => await this.listenToDataFeed(entry.feedInfo, entry.feedId)
    )

    Promise.all(promises).catch(err => {
      console.error('[ERROR]', err.message)
    })
  }

  stop () {
    this.intervals.forEach(interval => {
      clearInterval(interval)
    })

    this.intervals = []
  }

  listenToDataFeed (feedInfo: FeedInfo, feedId: ObjectId) {
    const provider = getProvider(feedInfo.network)
    console.log('provider', provider)
    const web3 = new this.Web3(provider)
    const feedContract = new web3.eth.Contract(feedInfo.abi, feedInfo.address)
    const interval = setInterval(async () => {
      console.log(`Reading contract state at address: ${feedInfo.address}`)
      await this.fetchAndSaveContractSnapshot(
        { feedContract },
        {
          feedFullName: feedInfo.feedFullName,
          id: feedId,
          label: feedInfo.label
        }
      )
    }, feedInfo.pollingPeriod)

    this.intervals.push(interval)
  }

  async readContractsState ({ feedContract }: Contracts) {
    try {
      return {
        lastPrice: await feedContract.methods.lastPrice().call(),
        // lastResponse contains { timestamp, drTxHash }
        lastResponse: await feedContract.methods.lastResponse().call(),
        requestId: await feedContract.methods.requestId().call()
      }
    } catch (err) {
      console.error('Error reading contract state', err)
      throw new Error(`Error reading contract state ${err}`)
    }
  }

  async fetchAndSaveContractSnapshot (
    contracts: Contracts,
    feed: {
      label: string
      id: ObjectId
      feedFullName: string
    }
  ) {
    try {
      const {
        lastPrice,
        lastResponse,
        requestId
      }: ContractsState = await this.readContractsState(contracts)
      const feedFullName = feed.feedFullName
      const { timestamp, drTxHash } = lastResponse
      const decodedDrTxHash = toHex(drTxHash).slice(2)
      const lastStoredResult = this.lastStoredResult[feedFullName]
      const isAlreadyStored = lastStoredResult?.timestamp === timestamp
      const isDrSolved =
        decodedDrTxHash &&
        decodedDrTxHash !==
          '0000000000000000000000000000000000000000000000000000000000000000'
      if (!isAlreadyStored && isDrSolved) {
        const result = await this.repositories.resultRequestRepository.insert({
          result: lastPrice,
          timestamp: lastResponse.timestamp,
          requestId: requestId,
          drTxHash: decodedDrTxHash,
          feedFullName
        })
        this.lastStoredResult[feed.feedFullName] = result
      }
    } catch (error) {
      console.error(`Error reading contracts state:`, error)
    }
  }
}
