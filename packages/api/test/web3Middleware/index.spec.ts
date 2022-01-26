import Web3 from './__mocks__/web3'

import { FeedInfo, Db, ObjectId } from '../../src/types'
import { FeedRepository } from '../../src/repository/Feed'
import { ResultRequestRepository } from '../../src/repository/ResultRequest'
import { Web3Middleware } from '../../src/web3Middleware/index'
import { normalizeConfig } from '../../src/utils'
import dataFeedsRouter from './dataFeedsRouter.json'

const dataFeeds = normalizeConfig(dataFeedsRouter)

jest.mock('../../src/repository/Feed')
jest.mock('../../src/repository/ResultRequest')

const lastValueMock = jest.fn(() => ({
  call: jest.fn(() => {
    return {
      _lastPrice: '10000',
      _lastTimestamp: '1624363045258',
      _lastDrTxHash: '99999',
      _lastestUpdateStatus: 200
    }
  })
}))
const currencyPairIdMock = jest.fn(() => ({
  call: jest.fn(() => {
    return '9999999000001624363045258'
  })
}))
const getPriceFeedMock = jest.fn(() => ({
  call: jest.fn(() => {
    return '0x000001624363045258'
  })
}))
const requestIdMock = jest.fn(() => ({ call: jest.fn(() => '1') }))
const contractMock = jest.fn(() => ({
  methods: {
    lastValue: lastValueMock,
    latestQueryId: requestIdMock,
    currencyPairId: currencyPairIdMock,
    getPriceFeed: getPriceFeedMock
  }
}))
const Web3Mock = (jest.fn(() => ({
  eth: {
    Contract: contractMock
  }
})) as unknown) as typeof Web3

const originalenv = process.env

beforeEach(() => {
  jest.resetModules()
  process.env = {
    ...originalenv,
    ETHEREUM_GOERLI_PROVIDER: `https://goerli.infura.io`,
    ETHEREUM_KOVAN_PROVIDER: `https://kovan.infura.io`,
    ETHEREUM_RINKEBY_PROVIDER: `https://rinkeby.infura.io`,
    BOBA_RINKEBY_PROVIDER: `https://rinkeby.boba.network`,
    BOBA_MAINNET_PROVIDER: `https://mainnet.boba.network`,
    CELO_ALFAJORES_PROVIDER: `https://alfajores-forno.celo-testnet.org`,
    CELO_MAINNET_PROVIDER: `https://forno.celo.org`,
    ETHEREUM_MAINNET_PROVIDER: `https://mainnet.infura.io`
  }
  jest.clearAllMocks()
})
// TODO: Fix tests
describe.skip('web3Middleware', () => {
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
    const feedRepository = new FeedRepository(feedInfos)

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

    expect(Web3Mock).toBeCalledTimes(4)
    expect(lastValueMock).toBeCalledTimes(1)
    expect(requestIdMock).toBeCalledTimes(1)
    expect(currencyPairIdMock).toBeCalledTimes(3)
    expect(getPriceFeedMock).toBeCalledTimes(3)
  })
  // it('should insert each new contract snapshot', async () => {
  //   const feedInfos: Array<FeedInfo> = [dataFeeds[0] as FeedInfo]
  //   const resultRequestRepository = new ResultRequestRepository(
  //     ('' as unknown) as Db,
  //     feedInfos
  //   )
  //   resultRequestRepository.insert = jest.fn(
  //     async ({ result, requestId, timestamp, drTxHash, feedFullName }) => ({
  //       _id: new ObjectId('507f1f77bcf86cd799439012'),
  //       id: '507f1f77bcf86cd799439012',
  //       result,
  //       requestId,
  //       timestamp,
  //       drTxHash,
  //       feedFullName
  //     })
  //   )
  //   const feedRepository = new FeedRepository(('' as unknown) as Db, feedInfos)
  //   feedRepository.insert = jest.fn(
  //     async ({
  //       address,
  //       label,
  //       name,
  //       blockExplorer,
  //       feedFullName,
  //       network
  //     }) => ({
  //       _id: new ObjectId('507f1f77bcf86cd799439012'),
  //       id: '507f1f77bcf86cd799439012',
  //       address,
  //       label,
  //       name,
  //       network,
  //       feedFullName,
  //       blockExplorer
  //     })
  //   )
  //   const middleware = new Web3Middleware(
  //     {
  //       repositories: { feedRepository, resultRequestRepository },
  //       Web3: Web3Mock
  //     },
  //     feedInfos
  //   )
  //   await middleware.listen()
  //   await new Promise(resolve => setTimeout(() => resolve(''), 1000))
  //   middleware.stop()

  //   expect(resultRequestRepository.insert).toBeCalled()
  // })

  // it('should not insert the current state if is already stored', async () => {
  //   const feedInfos: Array<FeedInfo> = [dataFeeds[0] as FeedInfo].map(feed => {
  //     return {
  //       ...feed,
  //       pollingPeriod: 500
  //     }
  //   })

  //   const resultRequestRepository = new ResultRequestRepository(
  //     ('' as unknown) as Db,
  //     feedInfos
  //   )
  //   resultRequestRepository.insert = jest.fn(
  //     async ({ result, drTxHash, feedFullName, requestId, timestamp }) => ({
  //       _id: new ObjectId('507f1f77bcf86cd799439012'),
  //       id: '507f1f77bcf86cd799439012',
  //       result,
  //       requestId,
  //       timestamp,
  //       drTxHash,
  //       feedFullName
  //     })
  //   )
  //   resultRequestRepository.getLastResult = jest.fn(async feedFullName => ({
  //     _id: new ObjectId('507f1f77bcf86cd799439012'),
  //     id: '507f1f77bcf86cd799439012',
  //     result: '1000',
  //     label: feedInfos[0].label,
  //     requestId: 'request_ID',
  //     timestamp: '1624363045259',
  //     drTxHash: 'hash',
  //     feedFullName
  //   }))
  //   const feedRepository = new FeedRepository(('' as unknown) as Db, feedInfos)
  //   feedRepository.get = jest.fn(async feedFullName => ({
  //     _id: new ObjectId('507f1f77bcf86cd799439012'),
  //     id: '507f1f77bcf86cd799439012',
  //     address: feedInfos[0].address,
  //     label: feedInfos[0].label,
  //     name: feedInfos[0].name,
  //     network: feedInfos[0].network,
  //     requests: [],
  //     lastResult: null,
  //     feedFullName,
  //     blockExplorer: feedInfos[0].blockExplorer
  //   }))

  //   const middleware = new Web3Middleware(
  //     {
  //       repositories: { feedRepository, resultRequestRepository },
  //       Web3: Web3Mock
  //     },
  //     feedInfos
  //   )
  //   middleware.listen()
  //   await new Promise(resolve => setTimeout(() => resolve(''), 1000))
  //   middleware.stop()

  //   expect(resultRequestRepository.insert).toBeCalledTimes(1)
  // })

  // it('should not initialize data feed if exists', async () => {
  //   const feedInfos: Array<FeedInfo> = dataFeeds as Array<FeedInfo>
  //   const resultRequestRepository = new ResultRequestRepository(
  //     ('' as unknown) as Db,
  //     feedInfos
  //   )
  //   resultRequestRepository.getLastResult = jest.fn(async feedFullName => ({
  //     _id: new ObjectId('507f1f77bcf86cd799439012'),
  //     id: '507f1f77bcf86cd799439012',
  //     result: '1000',
  //     requestId: 'request_ID',
  //     timestamp: '1624363045259',
  //     drTxHash: 'hash',
  //     feedFullName
  //   }))
  //   resultRequestRepository.insert = jest.fn(
  //     async ({ drTxHash, feedFullName, requestId, result, timestamp }) => {
  //       return {
  //         _id: new ObjectId('507f1f77bcf86cd799439012'),
  //         id: '507f1f77bcf86cd799439012',
  //         result,
  //         requestId,
  //         timestamp,
  //         drTxHash,
  //         feedFullName
  //       }
  //     }
  //   )
  //   const feedRepository = new FeedRepository(('' as unknown) as Db, feedInfos)
  //   feedRepository.get = jest.fn(async feedFullName => ({
  //     _id: new ObjectId('507f1f77bcf86cd799439011'),
  //     id: '507f1f77bcf86cd799439011',
  //     label: feedInfos[0].label,
  //     name: feedInfos[0].name,
  //     network: feedInfos[0].network,
  //     requests: [],
  //     lastResult: null,
  //     feedFullName,
  //     address: feedInfos[0].address,
  //     blockExplorer: feedInfos[0].blockExplorer
  //   }))
  //   feedRepository.get = jest.fn(async feedFullName => ({
  //     _id: new ObjectId('507f1f77bcf86cd799439011'),
  //     id: '507f1f77bcf86cd799439011',
  //     address: feedInfos[0].address,
  //     label: feedInfos[0].label,
  //     name: feedInfos[0].name,
  //     network: feedInfos[0].network,
  //     requests: [],
  //     lastResult: null,
  //     feedFullName,
  //     blockExplorer: feedInfos[0].blockExplorer
  //   }))

  //   const middleware = new Web3Middleware(
  //     {
  //       repositories: { feedRepository, resultRequestRepository },
  //       Web3: Web3Mock
  //     },
  //     feedInfos
  //   )
  //   middleware.listen()
  //   await new Promise(resolve => setTimeout(() => resolve(''), 2000))
  //   middleware.stop()

  //   expect(feedRepository.insert).not.toBeCalled()
  // })
})
