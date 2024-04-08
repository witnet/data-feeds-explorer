import { ObjectId } from 'mongodb'
import Web3 from 'web3'
import { toHex } from 'web3-utils'
import {
  Contracts,
  ContractsState,
  FeedInfo,
  Repositories,
  ContractInfo,
} from '../../types'
import { isZeroAddress } from '../utils/index'
import { getProvider } from './provider'
import { NetworkRouter } from './NetworkRouter'
import { Configuration } from './Configuration'

export class Web3Middleware {
  public repositories: Repositories
  private Web3: typeof Web3
  public legacyDataFeeds: Array<FeedInfo>
  public routerContractByNetwork: Record<string, any> = {}
  public contractIdByFeedId: Record<string, string> = {}
  // feedFullname -> address
  public currentFeedAddresses: Record<string, string> = {}
  public networkRouters: Array<NetworkRouter>
  public configuration: Configuration

  private intervals: NodeJS.Timer[] = []

  constructor(
    configuration: Configuration,
    dependencies: { Web3: typeof Web3; repositories: Repositories },
    legacyDataFeeds: Array<FeedInfo>,
  ) {
    this.repositories = dependencies.repositories
    this.legacyDataFeeds = legacyDataFeeds
    this.Web3 = dependencies.Web3
    this.configuration = configuration
  }

  public listen() {
    this.listenLegacyPriceRouter()
    this.listenWitnetPriceFeeds()
  }

  public async listenWitnetPriceFeeds() {
    this.configuration
      .listNetworksUsingPriceFeedsContract()
      .forEach((networkInfo) =>
        new NetworkRouter(
          this.configuration,
          this.Web3,
          this.repositories,
          networkInfo,
        ).listen(),
      )
  }

  private async initializeAddresses(): Promise<Array<FeedInfo>> {
    const promises = this.legacyDataFeeds.map((feed) =>
      this.recheckFeedAddress(feed),
    )

    const feeds = await Promise.all(promises)

    // Store latest price feed addresses in memory
    this.currentFeedAddresses = feeds.reduce(
      (addresses, feed) => ({
        ...addresses,
        [feed.feedFullName]: feed.address,
      }),
      {},
    )

    return feeds
  }

  async recheckFeedAddress(feedInfo: FeedInfo) {
    const contractInfo = await this.getContractInfo(feedInfo)
    const feed = this.repositories.feedRepository.get(feedInfo.feedFullName)

    if (
      contractInfo?.contractAddress &&
      contractInfo?.contractAddress !== feed?.address
    ) {
      console.log(
        `Address of ${feedInfo.feedFullName}: ${feed.address} -> ${contractInfo.contractAddress}`,
      )

      this.currentFeedAddresses[feed.feedFullName] =
        contractInfo.contractAddress

      return this.repositories.feedRepository.updateFeedAddress(
        feedInfo.feedFullName,
        {
          address: contractInfo.contractAddress,
          contractId: contractInfo.contractId,
        },
      )
    }

    return feedInfo
  }

  async listenLegacyPriceRouter() {
    const feeds = await this.initializeAddresses()

    const feedDictionary = this.legacyDataFeeds.reduce(
      (
        acc: Record<string, { feedInfo: FeedInfo; feedId: ObjectId }>,
        feedInfo: FeedInfo,
      ) => {
        return {
          ...acc,
          [feedInfo.feedFullName]: {
            feedInfo,
          },
        } as Record<string, { feedInfo: FeedInfo; feedId: ObjectId }>
      },
      {},
    )

    feeds.forEach((feed) => {
      const feedInfo = feedDictionary[feed?.feedFullName]?.feedInfo
      if (feedInfo) {
        const interval = setInterval(
          () => this.recheckFeedAddress(feedInfo),
          feed.pollingPeriod,
        )
        this.intervals.push(interval)
      }
    })

    const promises = Object.values(feedDictionary).map(
      async (entry) => await this.listenToDataFeed(entry?.feedInfo),
    )

    Promise.all(promises).catch((err) => {
      console.error('[ERROR]', err.message)
    })
  }

  stop() {
    this.intervals.forEach((interval) => {
      clearInterval(interval)
    })

    this.intervals = []
  }

  async getContractInfo(feedInfo: FeedInfo): Promise<ContractInfo | null> {
    try {
      return await new Promise(async (resolve, reject) => {
        try {
          const provider = getProvider(feedInfo.network)
          const timeout = 30000
          let web3: Web3 | undefined
          //FIXME: make timeout work
          if (provider) {
            web3 = new this.Web3(new Web3.providers.HttpProvider(provider))
          }
          //FIXME: use web3 timeout instead of custom
          setTimeout(() => {
            reject('Timeout')
          }, timeout)

          if (web3 && !this.routerContractByNetwork[feedInfo.network]) {
            this.routerContractByNetwork[feedInfo.network] =
              new web3.eth.Contract(
                feedInfo.routerAbi as any,
                feedInfo.routerAddress,
              )
          }
          const routerContract = this.routerContractByNetwork[feedInfo.network]

          if (!this.contractIdByFeedId[feedInfo.id]) {
            this.contractIdByFeedId[feedInfo.id] = await routerContract.methods
              .currencyPairId(feedInfo.id)
              .call()
          }
          const contractIdentifier = this.contractIdByFeedId[feedInfo.id]
          const address = await routerContract.methods
            .getPriceFeed(contractIdentifier)
            .call()
          resolve({
            contractAddress: address,
            contractId: contractIdentifier,
          })
        } catch (err) {
          reject(err)
        }
      })
    } catch (err) {
      console.log(
        `Error reading pricefeed contract address for ${feedInfo.feedFullName}: ${err}`,
      )
      return null
    }
  }

  async readDataFeedContract(feedInfo: FeedInfo, provider) {
    const web3 = new this.Web3(provider)
    const contractAddress = this.currentFeedAddresses[feedInfo.feedFullName]
    if (contractAddress && !isZeroAddress(contractAddress)) {
      const feedContract = new web3.eth.Contract(
        feedInfo.abi as any,
        contractAddress,
      )
      console.log(
        `Reading ${feedInfo.feedFullName} contract state at address: ${contractAddress}`,
      )
      await this.fetchAndSaveContractSnapshot(
        { feedContract },
        feedInfo.feedFullName,
      )
    } else {
      console.error(`Pricefeed address not set for ${feedInfo.feedFullName}`)
    }
  }

  async listenToDataFeed(feedInfo: FeedInfo) {
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

  async readContractsState({ feedContract }: Contracts, feedFullName: string) {
    try {
      const { _lastPrice, _lastTimestamp, _lastDrTxHash, _latestUpdateStatus } =
        await feedContract.methods.lastValue().call()
      console.log(
        `Latest contract update status for ${feedFullName}`,
        _latestUpdateStatus,
      )
      const requestId = await feedContract.methods.latestQueryId().call()
      return {
        lastPrice: _lastPrice.toString(),
        lastTimestamp: _lastTimestamp.toString(),
        lastDrTxHash: _lastDrTxHash.toString(),
        requestId: requestId.toString(),
      }
    } catch (err) {
      throw new Error(`Error reading contract state for ${feedFullName} ${err}`)
    }
  }

  async fetchAndSaveContractSnapshot(
    contracts: Contracts,
    feedFullName: string,
  ) {
    return new Promise(async (resolve) => {
      try {
        setTimeout(() => {
          console.log(`Timeout while reading from ${feedFullName}`)
          resolve(true)
        }, 30000)
        const {
          lastPrice,
          lastTimestamp,
          lastDrTxHash,
          requestId,
        }: ContractsState = await this.readContractsState(
          contracts,
          feedFullName,
        )
        await this.repositories.resultRequestRepository.insertIfLatest({
          result: lastPrice,
          timestamp: lastTimestamp,
          requestId: requestId,
          drTxHash: toHex(lastDrTxHash).slice(2),
          feedFullName,
        })
        resolve(true)
      } catch (error) {
        console.error(
          `Error reading contracts state for ${feedFullName}:`,
          error,
        )
      }
    })
  }
}
