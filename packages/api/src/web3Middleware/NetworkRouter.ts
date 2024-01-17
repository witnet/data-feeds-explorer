import Web3 from "web3"
import WitnetPriceFeedsABI from './../abi/WitnetPriceFeeds.json'
import { FeedInfo, Network, Repositories } from "./../types"
import { toHex } from "web3-utils"
import { createFeedFullName } from "../utils"
import { PriceFeed } from "./PriceFeed"
import { Configuration } from "./Configuration"


enum ResultStatus {
  Void = 0,
  Awaiting = 1,
  Ready = 2,
  Error = 3,
  AwaitingReady = 4,
  AwaitingError = 5
}

export type SupportedFeed = {
  id: string,
  caption: string
  solver: string
}

type LatestPrice = {
    value: string,
    timestamp: string,
    tallyHash: string,
    status: ResultStatus
}

export type NetworkInfo = {
  provider: string,
  address: string,
  pollingPeriod: number,
  key: Network,
  networkName: string
}
export type NetworkSnapshot = {
  network: string,
  feeds: Array<SupportedFeed & LatestPrice>
}

export class NetworkRouter {
  public contract: any
  public network: Network
  public networkName: string
  public pollingPeriod: number
  public feeds?: Array<{ name: string; }>
  public repositories: Repositories
  private address: string
  private configuration: Configuration
  private provider: string


  constructor(configuration: Configuration, repositories: Repositories, networkInfo: NetworkInfo) {
    const { provider, address, pollingPeriod, key } = networkInfo

    if (!provider) {
      throw new Error(`Missing provider for ${name}`)
    }
    const web3 = new Web3(new Web3.providers.HttpProvider(provider, { timeout: 30000 }))
    // TODO: why this type isn't working?
    this.contract = new web3.eth.Contract( WitnetPriceFeedsABI as any, address)
    this.pollingPeriod = pollingPeriod,
    this.repositories = repositories
    this.network = key
    this.configuration = configuration
    this.provider = provider
    this.address = address
  }

  // Periodically fetch the price feed router contract and store it in mongodb
  public listen() {
    setInterval(async () => {
      const snapshot = await this.getSnapshot()
      const insertPromises = snapshot.feeds.filter(feed => feed.status !== ResultStatus.Ready).map((feed) => ({
        feedFullName: createFeedFullName(this.network, feed.caption, feed.caption.split("-").reverse()[0]),
        drTxHash: toHex(feed.tallyHash).slice(2),
        requestId: feed.id,
        result: feed.value,
        timestamp: feed.timestamp
      }))
      .map(resultRequest =>{
        return this.repositories.resultRequestRepository.insertIfLatest(resultRequest)
      })

      Promise.all(insertPromises)
    }, this.pollingPeriod)
  }

  async getSnapshot(): Promise<NetworkSnapshot> {
    const supportedFeeds = await this.getSupportedFeeds()
    const feedIds = supportedFeeds.map(feed => feed.id)
    const latestPrices = await this.latestPrices(feedIds)

    return {
      network: this.network,
      feeds: supportedFeeds.map((supportedFeed, index) => ({
        ...supportedFeed,
        ...latestPrices[index]
      }))
    }
  }

  async getFeedInfos(): Promise<Array<FeedInfo>> {
    const suppoortedFeeds = await this.getSupportedFeeds()

    return suppoortedFeeds.map((supportedFeed)=> {
      if (!this.configuration.isFeedActive(supportedFeed.caption)) {
        console.log(`${supportedFeed.caption} in ${this.network} is deprecated`)
        return null
      }
      const res = PriceFeed.fromWitnetPriceFeedsContract(
        this.configuration,
        supportedFeed,
        this.address,
        this.network,
        this.networkName,
      ).toJson()
      return res
    }).filter(x => !!x)
  }

  // Wrap supportedFeeds contract method
  async getSupportedFeeds (): Promise<Array<SupportedFeed>> {
    try {
      const supportedFeeds = await this.contract.methods.supportedFeeds().call()
      return supportedFeeds._ids.map((_, index) => ({
        id: supportedFeeds._ids[index],
        caption: supportedFeeds._captions[index],
        solver: supportedFeeds._solvers[index],
      }))
    } catch (e) {
      console.log(`Error in getSupportedFeeds \n\tnetwork: ${this.network}\n\tprovider: ${this.provider}\n\taddress: ${this.address}\n\tError:`, e)
      return []
    }
  }

  // Wrap latestPrices contract method
  private async latestPrices (ids: Array<string>): Promise<Array<LatestPrice>> {
    try {
      const latestPrices = await this.contract.methods.latestPrices(ids).call()
      return latestPrices.map(latestPrice => ({
        value: latestPrice.value.toString(),
        timestamp: latestPrice.timestamp.toString(),
        tallyHash: latestPrice.tallyHash,
        status: Number(latestPrice.status)
      }))
    } catch (e) {
      console.log(`Error in latestPrices\n\tnetwork: ${this.network}\n\tprovider: ${this.provider}\n\taddress: ${this.address}\n\tError:`, e)
      return []
    }
  }
 }
