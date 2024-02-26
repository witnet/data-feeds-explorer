import { Repositories } from '../../src/types.js'
import { NetworkRouter } from '../../src/web3Middleware/NetworkRouter'

describe('NetworkRouter', () => {
  it('should fetch network contract', async () => {
    // FIXME: create a proper mock
    const repositories = {
      feedRepository: {},
      resultRequestRepository: {},
    } as unknown as Repositories
    const networkInfo = {
      address: '0x9999999d139bdBFbF25923ba39F63bBFc7593400',
      provider: 'https://rpc2.sepolia.org',
      name: 'ethereum.sepholia',
      pollingPeriod: 1,
      maxSecsBetweenUpdates: 1,
    }
    const router = new NetworkRouter(repositories, networkInfo)

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
