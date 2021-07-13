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
      let feed = await this.repositories.feedRepository.getByAddress(
        feedInfo.address
      )
      if (feed) {
        this.lastStoredResult[
          feedInfo.address
        ] = await this.repositories.resultRequestRepository.getLastResult(
          feed._id
        )
      } else {
        feed = await this.repositories.feedRepository.insert({
          address: feedInfo.address,
          name: feedInfo.name,
          requests: [],
          network: feedInfo.network,
          label: feedInfo.label
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
      ) => ({
        ...acc,
        [feedInfo.address]: {
          feedInfo,
          feedId: feeds.find(feed => feed.address === feedInfo.address)._id
        }
      }),
      {}
    )

    const promises = Object.values(feedDictionary).map(
      async entry => await this.listenToDataFeed(entry.feedInfo, entry.feedId)
    )

    Promise.all(promises)
  }

  stop () {
    this.intervals.forEach(interval => {
      clearInterval(interval)
    })

    this.intervals = []
  }

  listenToDataFeed (feedInfo: FeedInfo, feedId: ObjectId) {
    const provider = getProvider(feedInfo.network)
    const web3 = new this.Web3(provider)
    const feedContract = new web3.eth.Contract(feedInfo.abi, feedInfo.address)
    const proxyContract = new web3.eth.Contract(
      feedInfo.witnetRequestBoard.abi,
      feedInfo.witnetRequestBoard.address
    )
    const interval = setInterval(async () => {
      console.log(`Reading contract state at address: ${feedInfo.address}`)
      await this.fetchAndSaveContractSnapshot(
        { feedContract, proxyContract },
        {
          address: feedInfo.address,
          id: feedId,
          label: feedInfo.label
        }
      )
    }, feedInfo.pollingPeriod)

    this.intervals.push(interval)
  }

  async readContractsState ({ feedContract, proxyContract }: Contracts) {
    const feedContractState = {
      lastPrice: await feedContract.methods.lastPrice().call(),
      lastTimestamp: await feedContract.methods.timestamp().call(),
      lastRequestId: await feedContract.methods.lastRequestId().call()
    }

    const drTxHash = await proxyContract.methods
      .readDrTxHash(feedContractState.lastRequestId)
      .call()

    return {
      ...feedContractState,
      drTxHash: toHex(drTxHash).slice(2)
    }
  }

  async fetchAndSaveContractSnapshot (
    contracts: Contracts,
    feed: {
      label: string
      id: ObjectId
      address: string
    }
  ) {
    const {
      drTxHash,
      lastPrice,
      lastRequestId,
      lastTimestamp
    }: ContractsState = await this.readContractsState(contracts)
    const address = feed.address
    const lastStoredResult = this.lastStoredResult[address]

    const isAlreadyStored = lastStoredResult?.timestamp === lastTimestamp
    if (!isAlreadyStored) {
      const result = await this.repositories.resultRequestRepository.insert({
        feedId: feed.id.toString(),
        result: lastPrice,
        timestamp: lastTimestamp,
        requestId: lastRequestId,
        address: feed.address,
        drTxHash: drTxHash,
        label: feed.label
      })
      this.lastStoredResult[feed.address] = result
    }
  }
}