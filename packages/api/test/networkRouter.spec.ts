import { Network, Repositories, RouterDataFeedsConfig } from '../types.js'
import {
  NetworkInfo,
  NetworkRouter,
  NetworkSnapshot,
} from '../src/web3Middleware/NetworkRouter.js'
import { Configuration } from '../src/web3Middleware/Configuration.js'
import dataFeedsRouter from './web3Middleware/dataFeedsRouter.json' assert { type: 'json' }
// FIXME: create a proper mock for web3
import web3 from 'web3'

describe('NetworkRouter', () => {
  it.skip('should fetch network contract', async () => {
    // FIXME: create a proper mock
    const repositories = {
      feedRepository: {},
      resultRequestRepository: {},
    } as unknown as Repositories
    const configuration = new Configuration(
      dataFeedsRouter as RouterDataFeedsConfig,
    )
    const networkInfo = {
      version: '2.0',
      address: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      provider: 'https://rpc2.sepolia.org',
      key: Network.EthereumSepolia,
      pollingPeriod: 1000,
      networkName: 'ethereum',
      chain: 'Ethereum',
    } as NetworkInfo
    const router = new NetworkRouter(
      configuration,
      web3,
      repositories,
      networkInfo,
    )
    const snapshot: NetworkSnapshot =
      (await router.getSnapshot()) as NetworkSnapshot

    expect(snapshot.feeds[0].caption).toBeTruthy()
    expect(snapshot.feeds[0].id).toBeTruthy()
    expect(snapshot.feeds[0].solver).toBeTruthy()
    expect(snapshot.feeds[0].status).toBeTruthy()
    expect(snapshot.feeds[0].tallyHash).toBeTruthy()
    expect(snapshot.feeds[0].timestamp).toBeTruthy()
    expect(snapshot.feeds[0].value).toBeTruthy()

    expect(snapshot.network).toBe('ethereum-sepolia')
  })
})
