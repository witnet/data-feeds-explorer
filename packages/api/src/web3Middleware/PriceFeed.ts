import { AbiItem, FeedInfo, Network } from '../../types'
import { SupportedFeed } from './NetworkRouter'
import WitnetPriceFeedsABI from './../abi/WitnetPriceFeeds.json'
import { createFeedFullName } from '../utils'
import { Configuration } from './Configuration'

export class PriceFeed {
  constructor(
    public configuration: Configuration,
    public feedFullName: string,
    public id: string,
    public abi: Array<AbiItem>,
    public routerAbi: Array<AbiItem>,
    public address: string,
    public routerAddress: string,
    public isRouted: boolean,
    public network: Network,
    public networkName: string,
    public name: string,
    public pollingPeriod: number,
    public label: string,
    public contractId: string,
    public color: string,
    public blockExplorer: string,
    public deviation: string | null,
    public heartbeat: string | null,
    public finality: string,
    public chain: string,
  ) {}

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
    const isRouted: boolean = this.isRouted(feed.solver)

    if (isRouted) {
      feedConfiguration.maxSecsBetweenUpdates = 0
      feedConfiguration.deviationPercentage = 0
    }

    const [decimals, adaptedCaption] = feed.caption.split('-').reverse()
    return new PriceFeed(
      configuration,
      createFeedFullName(network, adaptedCaption, decimals),
      feed.id,
      null,
      // TODO: remove any
      WitnetPriceFeedsABI as any,
      null,
      address,
      isRouted,
      network,
      networkName,
      adaptedCaption.toLowerCase(),
      networkConfiguration.pollingPeriod,
      feedConfiguration.label,
      // TODO: This field should be renamed to id4
      feed.id,
      networkConfiguration.color,
      networkConfiguration.blockExplorer,
      feedConfiguration.deviationPercentage.toString(),
      `${feedConfiguration.maxSecsBetweenUpdates.toString()}000`,
      '900000',
      chain,
    )
  }

  static isRouted(solver: string): boolean {
    // ends in 24 0s
    return solver.endsWith('000000000000000000000000')
  }
}
