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
        const contractAddress = await this.getContractAddress(feedInfo)
        if (contractAddress) {
          feed = await this.repositories.feedRepository.insert({
            feedFullName: feedInfo.feedFullName,
            address: contractAddress,
            name: feedInfo.name,
            network: feedInfo.network,
            label: feedInfo.label,
            blockExplorer: feedInfo.blockExplorer
          })
        }
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
          if (feed) {
            return feed.feedFullName === feedInfo.feedFullName
          } else {
            return false
          }
        })
        return {
          ...acc,
          [feedInfo.feedFullName]: {
            feedInfo,
            feedId: feedId?._id
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

  async getContractAddress (feedInfo: FeedInfo) {
    try {
      const provider = getProvider(feedInfo.network)
      const web3 = new this.Web3(provider)
      const feedContract = new web3.eth.Contract(
        feedInfo.routerAbi,
        feedInfo.address
      )
      const contractIdentifier = await feedContract.methods
        .currencyPairId(feedInfo.id)
        .call()
      const address = await feedContract.methods
        .getPriceFeed(contractIdentifier)
        .call()
      return address
    } catch (err) {
      console.log(
        `Error reading contract for ${feedInfo.feedFullName} with address:`,
        err
      )
    }
  }

  async listenToDataFeed (feedInfo: FeedInfo, feedId: ObjectId) {
    const contractAddress = await this.getContractAddress(feedInfo)
    const provider = getProvider(feedInfo.network)
    if (provider) {
      const web3 = new this.Web3(provider)
      const feedContract = new web3.eth.Contract(feedInfo.abi, contractAddress)
      const interval = setInterval(async () => {
        console.log(
          `Reading ${feedInfo.feedFullName} contract state at address: ${contractAddress}`
        )
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
    } else {
      console.error(`Provider not set for network ${feedInfo.network}`)
    }
  }

  async readContractsState ({ feedContract }: Contracts) {
    try {
      const {
        _lastPrice,
        _lastTimestamp,
        _lastDrTxHash,
        _latestUpdateStatus
      } = await feedContract.methods.lastValue().call()
      console.log('Latest update status:', _latestUpdateStatus)
      return {
        lastPrice: _lastPrice,
        lastTimestamp: _lastTimestamp,
        lastDrTxHash: _lastDrTxHash,
        requestId: await feedContract.methods.latestQueryId().call()
      }
    } catch (err) {
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
        lastTimestamp,
        lastDrTxHash,
        requestId
      }: ContractsState = await this.readContractsState(contracts)
      const feedFullName = feed.feedFullName
      const decodedDrTxHash = toHex(lastDrTxHash).slice(2)
      const lastStoredResult = this.lastStoredResult[feedFullName]
      const isAlreadyStored = lastStoredResult?.timestamp === lastTimestamp
      const isDrSolved =
        decodedDrTxHash &&
        decodedDrTxHash !==
          '0000000000000000000000000000000000000000000000000000000000000000'
      if (!isAlreadyStored && isDrSolved) {
        const result = await this.repositories.resultRequestRepository.insert({
          result: lastPrice,
          timestamp: lastTimestamp,
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
