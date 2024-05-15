import Web3 from 'web3'
import WitnetPriceFeedsABI from './../abi/WitnetPriceFeeds.json'
import { FeedInfo, Network, Repositories } from '../../types'
import { toHex } from 'web3-utils'
import { createFeedFullName } from '../utils'
import { PriceFeed } from './PriceFeed'
import { Configuration } from './Configuration'

enum ResultStatus {
  Void = 0,
  Awaiting = 1,
  Ready = 2,
  Error = 3,
  Finaliziieng = 4,
  Delivered = 5,
}

export type SupportedFeed = {
  id: string
  caption: string
  solver: string
}

type LatestPrice = {
  value: string
  timestamp: string
  tallyHash: string
  status: ResultStatus
}

export type NetworkInfo = {
  provider: string
  address: string
  pollingPeriod: number
  key: Network
  networkName: string
  chain: string
}
export type NetworkSnapshot = {
  network: string
  feeds: Array<SupportedFeed & LatestPrice>
}

export class NetworkRouter {
  private Web3: typeof Web3
  public contract: any
  public network: Network
  public networkName: string
  public chain: string
  public pollingPeriod: number
  public feeds?: Array<{ name: string }>
  public repositories: Repositories
  private address: string
  private configuration: Configuration
  private provider: string

  constructor(
    configuration: Configuration,
    web3Dep: typeof Web3,
    repositories: Repositories,
    networkInfo: NetworkInfo,
  ) {
    this.Web3 = web3Dep
    const { provider, address, pollingPeriod, key, networkName, chain } =
      networkInfo

    if (!provider) {
      throw new Error(`Missing provider for ${networkName}`)
    }
    const web3: Web3 = new this.Web3(new Web3.providers.HttpProvider(provider))
    // TODO: why this type isn't working?
    this.contract = new web3.eth.Contract(WitnetPriceFeedsABI as any, address)
    ;(this.pollingPeriod = pollingPeriod), (this.repositories = repositories)
    this.network = key
    this.configuration = configuration
    this.provider = provider
    this.address = address
    this.networkName = networkName
    this.chain = chain
  }

  // Periodically fetch the price feed router contract and store it in mongodb
  public listen() {
    setInterval(async () => {
      const snapshot = await this.getSnapshot()
      const insertPromises = snapshot.feeds
        .filter((feed) => feed.timestamp !== '0')
        .map((feed) => ({
          feedFullName: createFeedFullName(
            this.network,
            feed.caption.split('-').reverse()[1],
            feed.caption.split('-').reverse()[0],
          ),
          drTxHash: toHex(feed.tallyHash).slice(2),
          // TODO: deprecate mandatory legacy field in database
          requestId: '0',
          result: feed.value.toString(),
          timestamp: feed.timestamp.toString(),
        }))
        .map((resultRequest) => {
          return this.repositories.resultRequestRepository.insertIfLatest(
            resultRequest,
          )
        })

      Promise.all(insertPromises)
    }, this.pollingPeriod)
  }

  async getSnapshot(): Promise<NetworkSnapshot> {
    const supportedFeeds = await this.getSupportedFeeds()
    const feedIds = supportedFeeds.map((feed) => feed.id)
    const latestPrices = await this.latestPrices(feedIds)

    return {
      network: this.network,
      feeds: supportedFeeds.map((supportedFeed, index) => ({
        ...supportedFeed,
        ...latestPrices[index],
      })),
    }
  }

  async getFeedInfos(): Promise<Array<FeedInfo>> {
    const suppoortedFeeds = await this.getSupportedFeeds()

    return suppoortedFeeds
      .map((supportedFeed) => {
        const res = PriceFeed.fromWitnetPriceFeedsContract(
          this.configuration,
          supportedFeed,
          this.address,
          this.network,
          this.networkName,
          this.chain,
        ).toJson()
        return res
      })
      .filter((x) => !!x)
  }

  // Wrap supportedFeeds contract method
  async getSupportedFeeds(): Promise<Array<SupportedFeed>> {
    try {
      const supportedFeeds = await Web3.utils.waitWithTimeout(
        this.contract.methods.supportedFeeds().call(),
        10000,
      )
      return supportedFeeds[0].map((_, index) => ({
        id: supportedFeeds[0][index],
        caption: supportedFeeds[1][index],
        solver: supportedFeeds[2][index],
      }))
    } catch (e) {
      console.log(
        `Error in getSupportedFeeds \n\tnetwork: ${this.network}\n\tprovider: ${this.provider}\n\taddress: ${this.address}\n\tError:`,
        e,
      )
      return []
    }
  }

  // Wrap latestPrices contract method
  private async latestPrices(ids: Array<string>): Promise<Array<LatestPrice>> {
    try {
      const latestPrices = await this.contract.methods.latestPrices(ids).call()
      return latestPrices.map((latestPrice) => ({
        value: latestPrice.value.toString(),
        timestamp: latestPrice.timestamp.toString(),
        tallyHash: latestPrice.tallyHash,
        status: Number(latestPrice.status.toString()),
      }))
    } catch (e) {
      console.log(
        `Error in latestPrices\n\tnetwork: ${this.network}\n\tprovider: ${this.provider}\n\taddress: ${this.address}\n\tError:`,
        e,
      )
      return []
    }
  }
}
