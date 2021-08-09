import Web3 from './__mocks__/web3'

import { FeedInfo, Db, ObjectId } from '../../src/types'
import { FeedRepository } from '../../src/repository/Feed'
import { ResultRequestRepository } from '../../src/repository/ResultRequest'
import { Web3Middleware } from '../../src/web3Middleware/index'
import { dataFeeds } from '../web3Middleware/dataFeeds'

jest.mock('../../src/repository/Feed')
jest.mock('../../src/repository/ResultRequest')

const lastPriceMock = jest.fn(() => ({ call: jest.fn(() => '10000') }))
const timestampMock = jest.fn(() => ({ call: jest.fn(() => '1624363045259') }))
const lastRequestIdMock = jest.fn(() => ({ call: jest.fn(() => '1') }))
const readDrTxHashMock = jest.fn(() => ({
  call: jest.fn(() => '0x0C4be6AA667df48de54BA174bE7948875fdf152B')
}))
const contractMock = jest.fn(() => ({
  methods: {
    lastPrice: lastPriceMock,
    timestamp: timestampMock,
    lastRequestId: lastRequestIdMock,
    readDrTxHash: readDrTxHashMock
  }
}))
const Web3Mock = (jest.fn(() => ({
  eth: {
    Contract: contractMock
  }
})) as unknown) as typeof Web3

beforeEach(() => jest.clearAllMocks())

describe('web3Middleware', () => {
  it('should read the state of each datafeed provided', async () => {
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
    middleware.listen()
    await new Promise(resolve => setTimeout(() => resolve(''), 2000))
    middleware.stop()

    expect(Web3Mock).toBeCalledTimes(1)
    expect(contractMock).toBeCalledTimes(2)
    expect(lastPriceMock).toBeCalledTimes(1)
    expect(timestampMock).toBeCalledTimes(1)
    expect(lastRequestIdMock).toBeCalledTimes(1)
  })

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
    middleware.listen()
    await new Promise(resolve => setTimeout(() => resolve(''), 2000))
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
