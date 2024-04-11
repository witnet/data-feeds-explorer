import { AbiItem, FeedInfo, Network } from '../../types'
import { SupportedFeed } from './NetworkRouter'
import WitnetPriceFeedsABI from './../abi/WitnetPriceFeeds.json'
import { createFeedFullName } from '../utils'
import { Configuration } from './Configuration'

export class PriceFeed {
  feedFullName: string
  id: string
  abi: Array<AbiItem>
  routerAbi: Array<AbiItem>
  address: string
  routerAddress: string
  isRouted: boolean
  network: Network
  name: string
  pollingPeriod: number
  label: string
  contractId: string
  color: string
  blockExplorer: string
  deviation: string | null
  heartbeat: string | null
  finality: string
  configuration: Configuration
  networkName: string
  chain: string

  constructor(configuration: Configuration, args: FeedInfo) {
    this.configuration = configuration
    this.feedFullName = args.feedFullName
    this.id = args.id
    this.abi = args.abi
    this.routerAbi = args.routerAbi
    this.address = args.address
    this.routerAddress = args.routerAddress
    this.isRouted = args.isRouted
    this.network = args.network
    this.name = args.name
    this.pollingPeriod = args.pollingPeriod
    this.label = args.label
    this.contractId = args.contractId
    this.color = args.color
    this.blockExplorer = args.blockExplorer
    this.deviation = args.deviation
    this.heartbeat = args.heartbeat
    this.finality = args.finality
    this.networkName = args.networkName
    this.chain = args.chain
  }

  toJson(): FeedInfo {
    return {
      feedFullName: this.feedFullName,
      id: this.id,
      abi: this.abi,
      routerAbi: this.routerAbi,
      address: this.address,
      routerAddress: this.routerAddress,
      isRouted: this.isRouted,
      network: this.network,
      name: this.name,
      networkName: this.networkName,
      pollingPeriod: this.pollingPeriod,
      label: this.label,
      contractId: this.contractId,
      chain: this.chain,
      color: this.color,
      blockExplorer: this.blockExplorer,
      deviation: this.deviation,
      heartbeat: this.heartbeat,
      finality: this.finality,
    }
  }

  static fromWitnetPriceFeedsContract(
    configuration: Configuration,
    feed: SupportedFeed,
    address: string,
    network: Network,
    networkName: string,
    chain: string,
  ): PriceFeed {
    const feedConfiguration = configuration.getFeedConfiguration(
      feed.caption,
      network,
    )
    const networkConfiguration = configuration.getNetworkConfiguration(network)

    if (!feedConfiguration || Object.keys(feedConfiguration).length === 0) {
      throw new Error(`${feed.caption} not found in configuration file`)
    }

    if (feedConfiguration.isRouted) {
      feedConfiguration.maxSecsBetweenUpdates = 0
      feedConfiguration.deviationPercentage = 0
    }

    const [decimals, adaptedCaption] = feed.caption.split('-').reverse()
    return new PriceFeed(configuration, {
      feedFullName: createFeedFullName(network, adaptedCaption, decimals),
      id: feed.id,
      abi: null,
      // TODO: remove any
      routerAbi: WitnetPriceFeedsABI as any,
      address: null,
      routerAddress: address,
      isRouted: feedConfiguration.isRouted,
      network: network,
      networkName: networkName,
      name: adaptedCaption.toLowerCase(),
      pollingPeriod: networkConfiguration.pollingPeriod,
      label: feedConfiguration.label,
      // TODO: This field should be renamed to id4
      contractId: feed.id,
      color: networkConfiguration.color,
      blockExplorer: networkConfiguration.blockExplorer,
      deviation: feedConfiguration.deviationPercentage.toString(),
      heartbeat: feedConfiguration.maxSecsBetweenUpdates.toString(),
      finality: '900000',
      chain,
    })
  }
}
