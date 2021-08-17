import { AbiItem } from 'web3-utils'
import { FeedDbObject, ResultRequestDbObject } from './generated/types'
import { Contract } from 'web3-eth-contract'

import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'

export * from './generated/types'
export { AbiItem } from 'web3-utils'
export { Db, Collection, ObjectId } from 'mongodb'

export type Context = {
  feedRepository: FeedRepository
  resultRequestRepository: ResultRequestRepository
  config: ConfigByAddress
}

export type ConfigByAddress = {
  [key: string]: FeedInfo
}

export enum Network {
  Mainnet = 'mainnet',
  Goerli = 'goerli',
  Kovan = 'kovan',
  Rinkeby = 'rinkeby'
}

export type FeedInfoGeneric<ABI> = {
  abi: ABI
  address: string
  network: Network
  name: string
  pollingPeriod: number
  label: string
  witnetRequestBoard: {
    address: string
    abi: ABI
  }
  color: string
  blockExplorer: string
}
export type FeedInfo = FeedInfoGeneric<Array<AbiItem>>
export type FeedInfoConfig = FeedInfoGeneric<string>

export type FeedDbObjectNormalized = FeedDbObject & { id: string }
export type ResultRequestDbObjectNormalized = ResultRequestDbObject & {
  id: string
}

export type Repositories = {
  feedRepository: FeedRepository
  resultRequestRepository: ResultRequestRepository
}

export type ContractsState = {
  lastPrice: string
  lastTimestamp: string
  lastRequestId: string
  drTxHash: string
}

export type Contracts = {
  feedContract: Contract
  proxyContract: Contract
}
