import Web3 from 'web3'
import { toHex } from 'web3-utils'
import {
  Contracts,
  ContractsState,
  FeedInfo,
  Repositories,
  ResultRequestDbObject,
  ObjectId,
  ContractInfo,
  Contract
} from '../types'
import { isZeroAddress } from '../utils/index'
import { getProvider } from './provider'

export class Web3Middleware {
  public repositories: Repositories
  private Web3: typeof Web3
  public dataFeeds: Array<FeedInfo>
  public lastStoredResult: Record<string, ResultRequestDbObject> = {}
  public routerContractByNetwork: Record<string, Contract> = {}
  public contractIdByFeedId: Record<string, string> = {}
  // feedFullname -> address
  public currentFeedAddresses: Record<string, string> = {}

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
    const promises = this.dataFeeds.map(feed => this.recheckFeedAddress(feed))

    const feeds = await Promise.all(promises)

    // Store latest price feed addresses in memory
    this.currentFeedAddresses = feeds.reduce(
      (addresses, feed) => ({
        ...addresses,
        [feed.feedFullName]: feed.address
      }),
      {}
    )

    return feeds
  }

  async recheckFeedAddress (feedInfo: FeedInfo) {
    const contractInfo = await this.getContractInfo(feedInfo)
    const feed = this.repositories.feedRepository.get(feedInfo.feedFullName)

    if (
      contractInfo?.contractAddress &&
      contractInfo?.contractAddress !== feed?.address
    ) {
      console.log(
        `Address of ${feedInfo.feedFullName}: ${feed.address} -> ${contractInfo.contractAddress}`
      )

      this.currentFeedAddresses[feed.feedFullName] =
        contractInfo.contractAddress

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
        const interval = setInterval(
          () => this.recheckFeedAddress(feedInfo),
          feed.pollingPeriod
        )
        this.intervals.push(interval)
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
          const timeout = 30000
          //FIXME: make timeout work
          const web3 = new this.Web3(
            new Web3.providers.HttpProvider(provider, { timeout })
          )
          //FIXME: use web3 timeout instead of custom
          setTimeout(() => {
            reject('Timeout')
          }, timeout)

          if (!this.routerContractByNetwork[feedInfo.network]) {
            this.routerContractByNetwork[
              feedInfo.network
            ] = new web3.eth.Contract(
              feedInfo.routerAbi,
              feedInfo.routerAddress
            )
          }
          const routerContract = this.routerContractByNetwork[feedInfo.network]

          if (!this.contractIdByFeedId[feedInfo.id]) {
            this.contractIdByFeedId[
              feedInfo.id
            ] = await routerContract.methods.currencyPairId(feedInfo.id).call()
          }
          const contractIdentifier = this.contractIdByFeedId[feedInfo.id]
          const address = await routerContract.methods
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

  async readDataFeedContract (feedInfo: FeedInfo, provider) {
    const web3 = new this.Web3(provider)
    const contractAddress = this.currentFeedAddresses[feedInfo.feedFullName]
    if (contractAddress && !isZeroAddress(contractAddress)) {
      const feedContract = new web3.eth.Contract(feedInfo.abi, contractAddress)
      console.log(
        `Reading ${feedInfo.feedFullName} contract state at address: ${contractAddress}`
      )
      await this.fetchAndSaveContractSnapshot(
        { feedContract },
        feedInfo.feedFullName
      )
    } else {
      console.error(`Pricefeed address not set for ${feedInfo.feedFullName}`)
    }
  }

  async listenToDataFeed (feedInfo: FeedInfo) {
    const provider = getProvider(feedInfo.network)
    if (provider) {
      try {
        this.readDataFeedContract(feedInfo, provider)
        const interval = setInterval(async () => {
          this.readDataFeedContract(feedInfo, provider)
        }, feedInfo.pollingPeriod)

        this.intervals.push(interval)
      } catch (err) {
        console.error(`Provider not valid for ${feedInfo.network}`, err)
      }
    } else {
      console.error(`Provider not set for network ${feedInfo.network}`)
    }

    return
  }

  async readContractsState ({ feedContract }: Contracts, feedFullName: string) {
    try {
      const {
        _lastPrice,
        _lastTimestamp,
        _lastDrTxHash,
        _latestUpdateStatus
      } = await feedContract.methods.lastValue().call()
      console.log(
        `Latest contract update status for ${feedFullName}`,
        _latestUpdateStatus
      )
      return {
        lastPrice: _lastPrice,
        lastTimestamp: _lastTimestamp,
        lastDrTxHash: _lastDrTxHash,
        requestId: await feedContract.methods.latestQueryId().call()
      }
    } catch (err) {
      throw new Error(`Error reading contract state for ${feedFullName} ${err}`)
    }
  }

  async fetchAndSaveContractSnapshot (
    contracts: Contracts,
    feedFullName: string
  ) {
    return new Promise(async resolve => {
      try {
        setTimeout(() => {
          console.log(`Timeout while reading from ${feedFullName}`)
          resolve(true)
        }, 30000)
        const {
          lastPrice,
          lastTimestamp,
          lastDrTxHash,
          requestId
        }: ContractsState = await this.readContractsState(
          contracts,
          feedFullName
        )
        const decodedDrTxHash = toHex(lastDrTxHash)
        const lastStoredResult =
          this.lastStoredResult[feedFullName] ||
          (await this.repositories.resultRequestRepository.getLastResult(
            feedFullName
          ))
        const timestampChanged = lastStoredResult?.timestamp !== lastTimestamp
        if (timestampChanged) {
          const result = await this.repositories.resultRequestRepository.insert(
            {
              result: lastPrice,
              timestamp: lastTimestamp,
              requestId: requestId,
              drTxHash: decodedDrTxHash.slice(2),
              feedFullName
            }
          )
          this.lastStoredResult[feedFullName] = result
          resolve(true)
        }
      } catch (error) {
        console.error(
          `Error reading contracts state for ${feedFullName}:`,
          error
        )
      }
    })
  }
}
