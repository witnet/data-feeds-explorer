import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'

export * from './generated/types'
export { AbiItem } from 'web3-utils'
export { Db, Collection, ObjectId } from 'mongodb'

export type Context = {
  feedRepository: FeedRepository
  resultRequestRepository: ResultRequestRepository
}

export type FeedInfo = {
  abi: Array<AbiItem>
  address: string
  network: Network
  name: string
  pollingPeriod: number
  label: string
  witnetRequestBoard: {
    address: string
    abi: Array<AbiItem>
  }
}

export type FeedDbObjectNormalized = FeedDbObject & { id: string }
export type ResultRequestDbObjectNormalized = ResultRequestDbObject & {
  id: string
}

export type Repositories = {
  feedRepository: FeedRepository
  resultRequestRepository: ResultRequestRepository
}
