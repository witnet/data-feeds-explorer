import { AbiItem } from 'web3-utils'
import { FeedDbObject, ResultRequestDbObject } from './generated/types'
import { Contract } from 'web3-eth-contract'

import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'

export * from './generated/types'
export { AbiItem } from 'web3-utils'
export { Db, Collection, ObjectId, WithId } from 'mongodb'

export type WithoutId<T> = Omit<T, '_id' | 'id'>

export type Context = {
  feedRepository: FeedRepository
  resultRequestRepository: ResultRequestRepository
  config: ConfigByFullName
}

export type ConfigByFullName = {
  [key: string]: FeedInfo
}

export enum Network {
  EthereumMainnet = 'ethereum-mainnet',
  EthereumGoerli = 'ethereum-goerli',
  EthereumKovan = 'ethereum-kovan',
  EthereumRinkeby = 'ethereum-rinkeby',
  ConfluxTestnet = 'conflux-testnet',
  ConfluxMainnet = 'conflux-mainnet',
  BobaRinkeby = 'boba-rinkeby'
}

export type FeedInfoGeneric<ABI> = {
  feedFullName: string
  abi: ABI
  address: string
  network: Network
  name: string
  pollingPeriod: number
  label: string
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
  lastResponse: LastResponse
  requestId: string
}

export type LastResponse = {
  timestamp: string
  drTxHash: string
}

export type Contracts = {
  feedContract: Contract
}
