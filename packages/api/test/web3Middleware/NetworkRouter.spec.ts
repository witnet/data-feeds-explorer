<<<<<<< HEAD:packages/api/test/web3Middleware/NetworkRouter.spec.ts
import { Repositories } from '../../src/types.js'
import { NetworkRouter } from '../../src/web3Middleware/NetworkRouter'

=======
import { Network, Repositories } from '../../src/types'
import { Configuration } from '../../src/web3Middleware/Configuration'
import {
  NetworkInfo,
  NetworkRouter
} from '../../src/web3Middleware/NetworkRouter'
>>>>>>> 3ed77b4 (feat: migrate ui package to nuxt3):packages/api/test/web3Middleware/networkRouter.spec.ts

describe('NetworkRouter', () => {
  it('should fetch network contract', async () => {
    // FIXME: create a proper mock
<<<<<<< HEAD:packages/api/test/web3Middleware/NetworkRouter.spec.ts
    const repositories = { feedRepository: { }, resultRequestRepository: { } } as unknown as Repositories
    const networkInfo = {
      address:'0x9999999d139bdBFbF25923ba39F63bBFc7593400',
=======
    const configuration = ({} as unknown) as Configuration
    const repositories = ({
      feedRepository: {},
      resultRequestRepository: {}
    } as unknown) as Repositories
    const networkInfo: NetworkInfo = {
      address: '0x9999999d139bdBFbF25923ba39F63bBFc7593400',
>>>>>>> 3ed77b4 (feat: migrate ui package to nuxt3):packages/api/test/web3Middleware/networkRouter.spec.ts
      provider: 'https://rpc2.sepolia.org',
      name: 'ethereum.sepholia',
      pollingPeriod: 1,
      maxSecsBetweenUpdates: 1
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
