import Web3 from './__mocks__/web3'

import { FeedInfo, Db, ObjectId } from '../../src/types'
import { FeedRepository } from '../../src/repository/Feed'
import { ResultRequestRepository } from '../../src/repository/ResultRequest'
import { Web3Middleware } from '../../src/web3Middleware/index'
import fs from 'fs'
import path from 'path'

jest.mock('../../src/repository/Feed')
jest.mock('../../src/repository/ResultRequest')

const dataFeeds = JSON.parse(
  fs.readFileSync(path.resolve('./test/web3Middleware/dataFeeds.json'), 'utf-8')
)

const lastPriceMock = jest.fn(() => ({ call: jest.fn(() => '10000') }))
const lastResponseMock = jest.fn(() => ({
  call: jest.fn(() => {
    return { timestamp: '1624363045258', drTxHash: '99999' }
  })
}))
const requestIdMock = jest.fn(() => ({ call: jest.fn(() => '1') }))
const contractMock = jest.fn(() => ({
  methods: {
    lastPrice: lastPriceMock,
    lastResponse: lastResponseMock,
    requestId: requestIdMock
  }
}))
const Web3Mock = (jest.fn(() => ({
  eth: {
    Contract: contractMock
  }
})) as unknown) as typeof Web3

beforeEach(() => jest.clearAllMocks())

describe('web3Middleware', () => {
  //FIXME: fix test
  it.only('should read the state of each datafeed provided', async () => {
    const feedInfos: Array<FeedInfo> = [dataFeeds[0]]
    const resultRequestRepository = new ResultRequestRepository(
      ('' as unknown) as Db,
      feedInfos
    )
    resultRequestRepository.insert = jest.fn(async () => {
      return {
        _id: new ObjectId('507f1f77bcf86cd799439012'),
        id: 'id',
        feedId: 'feedId',
        result: '1000',
        label: feedInfos[0].label,
        requestId: 'request_ID',
        address: feedInfos[0].address,
        timestamp: '1624363045259',
        drTxHash: 'hash'
      }
    })
    const feedRepository = new FeedRepository(('' as unknown) as Db, feedInfos)
    feedRepository.insert = jest.fn(async () => ({
      _id: new ObjectId('507f1f77bcf86cd799439011'),
      address: feedInfos[0].address,
      id: 'id',
      label: feedInfos[0].label,
      name: feedInfos[0].name,
      network: feedInfos[0].network,
      requests: [],
      lastResult: null
    }))
    const middleware = new Web3Middleware(
      {
        repositories: { feedRepository, resultRequestRepository },
        Web3: Web3Mock
      },
      feedInfos
    )
    await middleware.listen()
    await new Promise(resolve => setTimeout(() => resolve(''), 1000))
    middleware.stop()

    expect(Web3Mock).toBeCalledTimes(1)
    expect(lastPriceMock).toBeCalledTimes(1)
    expect(lastResponseMock).toBeCalledTimes(1)
    expect(requestIdMock).toBeCalledTimes(1)
  })
  //FIXME: fix test
  it('should insert each new contract snapshot', async () => {
    const feedInfos: Array<FeedInfo> = [dataFeeds[0]]
    const resultRequestRepository = new ResultRequestRepository(
      ('' as unknown) as Db,
      feedInfos
    )
    resultRequestRepository.insert = jest.fn(async () => ({
      _id: new ObjectId('507f1f77bcf86cd799439012'),
      id: 'id',
      feedId: 'feedId',
      result: '1000',
      label: feedInfos[0].label,
      requestId: 'request_ID',
      address: feedInfos[0].address,
      timestamp: '1624363045259',
      drTxHash: 'hash'
    }))
    const feedRepository = new FeedRepository(('' as unknown) as Db, feedInfos)
    feedRepository.insert = jest.fn(async () => ({
      _id: new ObjectId('507f1f77bcf86cd799439012'),
      address: feedInfos[0].address,
      id: 'id',
      label: feedInfos[0].label,
      name: feedInfos[0].name,
      network: feedInfos[0].network,
      requests: [],
      lastResult: null
    }))
    const middleware = new Web3Middleware(
      {
        repositories: { feedRepository, resultRequestRepository },
        Web3: Web3Mock
      },
      feedInfos
    )
    await middleware.listen()
    middleware.stop()

    expect(resultRequestRepository.insert).toBeCalled()
  })

  it('should not insert the current state if is already stored', async () => {
    const feedInfos: Array<FeedInfo> = [dataFeeds[0]].map(feed => {
      return {
        ...feed,
        pollingPeriod: 500
      }
    })

    const resultRequestRepository = new ResultRequestRepository(
      ('' as unknown) as Db,
      feedInfos
    )
    resultRequestRepository.insert = jest.fn(async () => ({
      _id: new ObjectId('507f1f77bcf86cd799439012'),
      id: 'id',
      feedId: 'feedId',
      result: '1000',
      label: feedInfos[0].label,
      requestId: 'request_ID',
      address: feedInfos[0].address,
      timestamp: '1624363045259',
      drTxHash: 'hash'
    }))
    resultRequestRepository.getLastResult = jest.fn(async () => ({
      _id: new ObjectId('507f1f77bcf86cd799439012'),
      id: 'id',
      feedId: 'feedId',
      result: '1000',
      label: feedInfos[0].label,
      requestId: 'request_ID',
      address: feedInfos[0].address,
      timestamp: '1624363045259',
      drTxHash: 'hash'
    }))
    const feedRepository = new FeedRepository(('' as unknown) as Db, feedInfos)
    feedRepository.insert = jest.fn(async () => ({
      _id: new ObjectId('507f1f77bcf86cd799439012'),
      address: feedInfos[0].address,
      id: 'id',
      label: feedInfos[0].label,
      name: feedInfos[0].name,
      network: feedInfos[0].network,
      requests: [],
      lastResult: null
    }))
    feedRepository.getByAddress = jest.fn(async () => ({
      _id: new ObjectId('507f1f77bcf86cd799439012'),
      address: feedInfos[0].address,
      id: 'id',
      label: feedInfos[0].label,
      name: feedInfos[0].name,
      network: feedInfos[0].network,
      requests: [],
      lastResult: null
    }))

    const middleware = new Web3Middleware(
      {
        repositories: { feedRepository, resultRequestRepository },
        Web3: Web3Mock
      },
      feedInfos
    )
    middleware.listen()
    await new Promise(resolve => setTimeout(() => resolve(''), 3000))
    middleware.stop()

    expect(resultRequestRepository.insert).toBeCalledTimes(0)
  })

  it('should initialize data feed if not exists', async () => {
    const feedInfos: Array<FeedInfo> = dataFeeds
    const resultRequestRepository = new ResultRequestRepository(
      ('' as unknown) as Db,
      feedInfos
    )
    resultRequestRepository.insert = jest.fn(async ({ address }) => ({
      _id: new ObjectId('507f1f77bcf86cd799439012'),
      id: 'id',
      feedId: 'feedId',
      result: '1000',
      label: feedInfos[0].label,
      requestId: 'request_ID',
      address: address,
      timestamp: '1624363045259',
      drTxHash: 'hash'
    }))
    const feedRepository = new FeedRepository(('' as unknown) as Db, feedInfos)
    feedRepository.insert = jest.fn(async ({ address }) => ({
      _id: new ObjectId('507f1f77bcf86cd799439011'),
      address: address,
      id: 'id',
      label: feedInfos[0].label,
      name: feedInfos[0].name,
      network: feedInfos[0].network,
      requests: [],
      lastResult: null
    }))
    feedRepository.getByAddress = jest.fn(async () => null)

    const middleware = new Web3Middleware(
      {
        repositories: { feedRepository, resultRequestRepository },
        Web3: Web3Mock
      },
      feedInfos
    )
    middleware.listen()
    await new Promise(resolve => setTimeout(() => resolve(''), 2000))
    middleware.stop()

    expect(feedRepository.insert).toBeCalled()
    expect(feedRepository.insert).toBeCalled()
  })

  it('should not initialize data feed if exists', async () => {
    const feedInfos: Array<FeedInfo> = dataFeeds
    const resultRequestRepository = new ResultRequestRepository(
      ('' as unknown) as Db,
      feedInfos
    )
    resultRequestRepository.getLastResult = jest.fn(async () => ({
      _id: new ObjectId('507f1f77bcf86cd799439012'),
      id: 'id',
      feedId: 'feedId',
      result: '1000',
      label: feedInfos[0].label,
      requestId: 'request_ID',
      address: feedInfos[1].address,
      timestamp: '1624363045259',
      drTxHash: 'hash'
    }))
    resultRequestRepository.insert = jest.fn(async ({ address }) => {
      return {
        _id: new ObjectId('507f1f77bcf86cd799439012'),
        id: 'id',
        feedId: 'feedId',
        result: '1000',
        label: feedInfos[0].label,
        requestId: 'request_ID',
        address: address,
        timestamp: '1624363045259',
        drTxHash: 'hash'
      }
    })
    const feedRepository = new FeedRepository(('' as unknown) as Db, feedInfos)
    feedRepository.insert = jest.fn(async ({ address }) => ({
      _id: new ObjectId('507f1f77bcf86cd799439011'),
      address: address,
      id: 'id',
      label: feedInfos[0].label,
      name: feedInfos[0].name,
      network: feedInfos[0].network,
      requests: [],
      lastResult: null
    }))
    feedRepository.getByAddress = jest.fn(async address => ({
      _id: new ObjectId('507f1f77bcf86cd799439011'),
      address: address,
      id: 'id',
      label: feedInfos[0].label,
      name: feedInfos[0].name,
      network: feedInfos[0].network,
      requests: [],
      lastResult: null
    }))

    const middleware = new Web3Middleware(
      {
        repositories: { feedRepository, resultRequestRepository },
        Web3: Web3Mock
      },
      feedInfos
    )
    middleware.listen()
    await new Promise(resolve => setTimeout(() => resolve(''), 2000))
    middleware.stop()

    expect(feedRepository.insert).not.toBeCalled()
  })
})
