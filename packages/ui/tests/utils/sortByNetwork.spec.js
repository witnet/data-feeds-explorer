import { sortByNetwork } from '../../utils/sortByNetwork'

describe('sortByNetwork.js', () => {
  it('orders ethereum-mainnet first, ethereum remainning networks in second place, and the rest alphabetically', () => {
    const feeds = [
      { network: 'boba-rinkeby' },
      { network: 'conflux-testnet' },
      { network: 'ethereum-rinkeby' },
      { network: 'ethereum-mainnet' },
      { network: 'ethereum-goerli' },
    ]
    const options = sortByNetwork(feeds)
    expect(options).toStrictEqual([
      { network: 'ethereum-mainnet' },
      { network: 'ethereum-rinkeby' },
      { network: 'ethereum-goerli' },
      { network: 'boba-rinkeby' },
      { network: 'conflux-testnet' },
    ])
  })
})
