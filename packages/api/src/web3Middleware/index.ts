import Web3 from 'web3'
import { toHex } from 'web3-utils'
import {
  Contracts,
  ContractsState,
  FeedInfo,
  Repositories,
  ResultRequestDbObject,
  ObjectId,
  ContractInfo
} from '../types'
import { isZeroAddress } from '../utils/index'
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

  public async initializeAddresses (): Promise<Array<FeedInfo>> {
    const promises = this.dataFeeds.map(feed => this.updateFeed(feed))

    return await Promise.all(promises)
  }

  async updateFeed (feedInfo: FeedInfo) {
    const contractInfo = await this.getContractInfo(feedInfo)
    const feed = this.repositories.feedRepository.get(feedInfo.feedFullName)

    if (
      contractInfo?.contractAddress &&
      contractInfo?.contractAddress !== feed?.address
    ) {
      return this.repositories.feedRepository.updateFeedAddress(
        feedInfo.feedFullName,
        {
          address: contractInfo.contractAddress,
          contractId: contractInfo.contractId
        }
      )
    }

    return feedInfo
  }

  async listen () {
    const feeds = await this.initializeAddresses()

    const feedDictionary = this.dataFeeds.reduce(
      (
        acc: Record<string, { feedInfo: FeedInfo; feedId: ObjectId }>,
        feedInfo: FeedInfo
      ) => {
        return {
          ...acc,
          [feedInfo.feedFullName]: {
            feedInfo
          }
        }
      },
      {}
    )

    feeds.forEach(feed => {
      const feedInfo = feedDictionary[feed?.feedFullName]?.feedInfo
      if (feedInfo) {
        this.updateFeed(feedInfo)
      }
    })

    const promises = Object.values(feedDictionary).map(
      async entry => await this.listenToDataFeed(entry.feedInfo)
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

  async getContractInfo (feedInfo: FeedInfo): Promise<ContractInfo | null> {
    try {
      return await new Promise(async (resolve, reject) => {
        try {
          const provider = getProvider(feedInfo.network)
          //FIXME: make timeout work
          const web3 = new this.Web3(
            new Web3.providers.HttpProvider(provider, { timeout: 10000 })
          )
          //FIXME: use web3 timeout instead of custom
          setTimeout(() => {
            reject('Timeout')
          }, 10000)
          const feedContract = new web3.eth.Contract(
            feedInfo.routerAbi,
            feedInfo.routerAddress
          )
          const contractIdentifier = await feedContract.methods
            .currencyPairId(feedInfo.id)
            .call()
          const address = await feedContract.methods
            .getPriceFeed(contractIdentifier)
            .call()

          resolve({
            contractAddress: address,
            contractId: contractIdentifier
          })
        } catch (err) {
          reject(err)
        }
      })
    } catch (err) {
      console.log(
        `Error reading pricefeed contract address for ${feedInfo.feedFullName}: ${err}`
      )
      return null
    }
  }

  async listenToDataFeed (feedInfo: FeedInfo) {
    const contractInfo = await this.getContractInfo(feedInfo)
    const provider = getProvider(feedInfo.network)
    if (provider) {
      if (
        contractInfo &&
        contractInfo.contractAddress &&
        !isZeroAddress(contractInfo.contractAddress)
      ) {
        try {
          const web3 = new this.Web3(provider)
          const feedContract = new web3.eth.Contract(
            feedInfo.abi,
            contractInfo.contractAddress
          )
          const interval = setInterval(async () => {
            console.log(
              `Reading ${feedInfo.feedFullName} contract state at address: ${contractInfo.contractAddress}`
            )
            await this.fetchAndSaveContractSnapshot(
              { feedContract },
              feedInfo.feedFullName
            )
          }, feedInfo.pollingPeriod)

          this.intervals.push(interval)
        } catch (err) {
          console.error(`Provider not valid for ${feedInfo.network}`, err)
        }
      } else {
        console.error(`Pricefeed address not set for ${feedInfo.feedFullName}`)
      }
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
    feedFullName: string
  ) {
    try {
      const {
        lastPrice,
        lastTimestamp,
        lastDrTxHash,
        requestId
      }: ContractsState = await this.readContractsState(contracts)
      const decodedDrTxHash = toHex(lastDrTxHash)
      const lastStoredResult =
        this.lastStoredResult[feedFullName] ||
        (await this.repositories.resultRequestRepository.getLastResult(
          feedFullName
        ))
      const timestampChanged = lastStoredResult?.timestamp !== lastTimestamp
      if (timestampChanged) {
        const result = await this.repositories.resultRequestRepository.insert({
          result: lastPrice,
          timestamp: lastTimestamp,
          requestId: requestId,
          drTxHash: decodedDrTxHash.slice(2),
          feedFullName
        })
        this.lastStoredResult[feedFullName] = result
      }
    } catch (error) {
      console.error(`Error reading contracts state:`, error)
    }
  }
}
