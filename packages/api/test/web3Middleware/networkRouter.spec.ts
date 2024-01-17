import { Network, Repositories } from '../../src/types'
import { Configuration } from '../../src/web3Middleware/Configuration'
import { NetworkInfo, NetworkRouter } from '../../src/web3Middleware/NetworkRouter'


describe('NetworkRouter', () => {
  // FIXME: web3 library is not working with jest. It works if use use vitest instead.
  it.skip('should fetch network contract', async () => {
    // FIXME: create a proper mock
    const configuration = { } as unknown as Configuration
    const repositories = { feedRepository: { }, resultRequestRepository: { } } as unknown as Repositories
    const networkInfo: NetworkInfo = {
      address:'0x9999999d139bdBFbF25923ba39F63bBFc7593400',
      provider: 'https://rpc2.sepolia.org',
      key: Network.EthereumSepolia,
      pollingPeriod: 1,
      networkName: 'Ethereum Sepholia'
      // maxSecsBetweenUpdates: 1
    }
    const router = new NetworkRouter(configuration, repositories, networkInfo)

    const snapshot = await router.getSnapshot()

    expect(snapshot.feeds[0].caption).toBeTruthy()
    expect(snapshot.feeds[0].id).toBeTruthy()
    expect(snapshot.feeds[0].solver).toBeTruthy()
    expect(snapshot.feeds[0].status).toBeTruthy()
    expect(snapshot.feeds[0].tallyHash).toBeTruthy()
    expect(snapshot.feeds[0].timestamp).toBeTruthy()
    expect(snapshot.feeds[0].value).toBeTruthy()

    expect(snapshot.network).toBe('ethereum.sepholia')
  })
})
