import Web3 from './__mocks__/web3'

import { FeedInfo, Db, ObjectId } from '../../src/types'
import { FeedRepository } from '../../src/repository/Feed'
import { ResultRequestRepository } from '../../src/repository/ResultRequest'
import { Web3Middleware } from '../../src/web3Middleware/index'
import dataFeeds from './dataFeeds.json'

jest.mock('../../src/repository/Feed')
jest.mock('../../src/repository/ResultRequest')

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
  it('should read the state of each datafeed provided', async () => {
    const feedInfos: Array<FeedInfo> = [dataFeeds[0] as FeedInfo]
    const resultRequestRepository = new ResultRequestRepository(
      ('' as unknown) as Db,
      feedInfos
    )
    resultRequestRepository.insert = jest.fn(
      async ({ result, requestId, timestamp, drTxHash, feedFullName }) => {
        return {
          _id: new ObjectId('507f1f77bcf86cd799439012'),
          id: '507f1f77bcf86cd799439012',
          result,
          requestId,
          timestamp,
          drTxHash,
          feedFullName
        }
      }
    )
    const feedRepository = new FeedRepository(('' as unknown) as Db, feedInfos)
    feedRepository.insert = jest.fn(
      async ({
        feedFullName,
        name,
        address,
        label,
        network,
        blockExplorer
      }) => ({
        _id: new ObjectId('507f1f77bcf86cd799439011'),
        id: '507f1f77bcf86cd799439011',
        address,
        label,
        name,
        network,
        blockExplorer,
        feedFullName
      })
    )
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
  it('should insert each new contract snapshot', async () => {
    const feedInfos: Array<FeedInfo> = [dataFeeds[0] as FeedInfo]
    const resultRequestRepository = new ResultRequestRepository(
      ('' as unknown) as Db,
      feedInfos
    )
    resultRequestRepository.insert = jest.fn(
      async ({ result, requestId, timestamp, drTxHash, feedFullName }) => ({
        _id: new ObjectId('507f1f77bcf86cd799439012'),
        id: '507f1f77bcf86cd799439012',
        result,
        requestId,
        timestamp,
        drTxHash,
        feedFullName
      })
    )
    const feedRepository = new FeedRepository(('' as unknown) as Db, feedInfos)
    feedRepository.insert = jest.fn(
      async ({
        address,
        label,
        name,
        blockExplorer,
        feedFullName,
        network
      }) => ({
        _id: new ObjectId('507f1f77bcf86cd799439012'),
        id: '507f1f77bcf86cd799439012',
        address,
        label,
        name,
        network,
        feedFullName,
        blockExplorer
      })
    )
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

    expect(resultRequestRepository.insert).toBeCalled()
  })

  it('should not insert the current state if is already stored', async () => {
    const feedInfos: Array<FeedInfo> = [dataFeeds[0] as FeedInfo].map(feed => {
      return {
        ...feed,
        pollingPeriod: 500
      }
    })

    const resultRequestRepository = new ResultRequestRepository(
      ('' as unknown) as Db,
      feedInfos
    )
    resultRequestRepository.insert = jest.fn(
      async ({ result, drTxHash, feedFullName, requestId, timestamp }) => ({
        _id: new ObjectId('507f1f77bcf86cd799439012'),
        id: '507f1f77bcf86cd799439012',
        result,
        requestId,
        timestamp,
        drTxHash,
        feedFullName
      })
    )
    resultRequestRepository.getLastResult = jest.fn(async feedFullName => ({
      _id: new ObjectId('507f1f77bcf86cd799439012'),
      id: '507f1f77bcf86cd799439012',
      result: '1000',
      label: feedInfos[0].label,
      requestId: 'request_ID',
      timestamp: '1624363045259',
      drTxHash: 'hash',
      feedFullName
    }))
    const feedRepository = new FeedRepository(('' as unknown) as Db, feedInfos)
    feedRepository.get = jest.fn(async feedFullName => ({
      _id: new ObjectId('507f1f77bcf86cd799439012'),
      id: '507f1f77bcf86cd799439012',
      address: feedInfos[0].address,
      label: feedInfos[0].label,
      name: feedInfos[0].name,
      network: feedInfos[0].network,
      requests: [],
      lastResult: null,
      feedFullName,
      blockExplorer: feedInfos[0].blockExplorer
    }))

    const middleware = new Web3Middleware(
      {
        repositories: { feedRepository, resultRequestRepository },
        Web3: Web3Mock
      },
      feedInfos
    )
    middleware.listen()
    await new Promise(resolve => setTimeout(() => resolve(''), 1000))
    middleware.stop()

    expect(resultRequestRepository.insert).toBeCalledTimes(1)
  })

  it('should initialize data feed if not exists', async () => {
    const feedInfos: Array<FeedInfo> = dataFeeds as Array<FeedInfo>
    const resultRequestRepository = new ResultRequestRepository(
      ('' as unknown) as Db,
      feedInfos
    )
    resultRequestRepository.insert = jest.fn(
      async ({ drTxHash, feedFullName, requestId, result, timestamp }) => ({
        _id: new ObjectId('507f1f77bcf86cd799439012'),
        id: '507f1f77bcf86cd799439012',
        result,
        requestId,
        timestamp,
        drTxHash,
        feedFullName
      })
    )
    const feedRepository = new FeedRepository(('' as unknown) as Db, feedInfos)
    feedRepository.insert = jest.fn(
      async ({
        address,
        blockExplorer,
        feedFullName,
        label,
        name,
        network
      }) => ({
        _id: new ObjectId('507f1f77bcf86cd799439011'),
        id: '507f1f77bcf86cd799439011',
        address,
        label,
        name,
        network,
        requests: [],
        feedFullName,
        blockExplorer
      })
    )
    feedRepository.get = jest.fn(async () => null)

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
    const feedInfos: Array<FeedInfo> = dataFeeds as Array<FeedInfo>
    const resultRequestRepository = new ResultRequestRepository(
      ('' as unknown) as Db,
      feedInfos
    )
    resultRequestRepository.getLastResult = jest.fn(async feedFullName => ({
      _id: new ObjectId('507f1f77bcf86cd799439012'),
      id: '507f1f77bcf86cd799439012',
      result: '1000',
      requestId: 'request_ID',
      timestamp: '1624363045259',
      drTxHash: 'hash',
      feedFullName
    }))
    resultRequestRepository.insert = jest.fn(
      async ({ drTxHash, feedFullName, requestId, result, timestamp }) => {
        return {
          _id: new ObjectId('507f1f77bcf86cd799439012'),
          id: '507f1f77bcf86cd799439012',
          result,
          requestId,
          timestamp,
          drTxHash,
          feedFullName
        }
      }
    )
    const feedRepository = new FeedRepository(('' as unknown) as Db, feedInfos)
    feedRepository.get = jest.fn(async feedFullName => ({
      _id: new ObjectId('507f1f77bcf86cd799439011'),
      id: '507f1f77bcf86cd799439011',
      label: feedInfos[0].label,
      name: feedInfos[0].name,
      network: feedInfos[0].network,
      requests: [],
      lastResult: null,
      feedFullName,
      address: feedInfos[0].address,
      blockExplorer: feedInfos[0].blockExplorer
    }))
    feedRepository.get = jest.fn(async feedFullName => ({
      _id: new ObjectId('507f1f77bcf86cd799439011'),
      id: '507f1f77bcf86cd799439011',
      address: feedInfos[0].address,
      label: feedInfos[0].label,
      name: feedInfos[0].name,
      network: feedInfos[0].network,
      requests: [],
      lastResult: null,
      feedFullName,
      blockExplorer: feedInfos[0].blockExplorer
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
