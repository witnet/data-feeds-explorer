import { normalizeNetworkConfig } from '../src/utils/index'
import dataFeedsRouterConfig from '../test/web3Middleware/dataFeedsRouter.json'

describe('validateNetworkConfig', () => {
  it('check if the structure is correct', async () => {
    const networksConfig = normalizeNetworkConfig(dataFeedsRouterConfig)
    const expected = [
      {
        key: 'boba-mainnet',
        label: 'Boba Mainnet',
        chain: 'Boba',
        mainnet: true
      },
      {
        key: 'celo-mainnet',
        label: 'Celo Mainnet',
        chain: 'Celo',
        mainnet: true
      },
      {
        key: 'ethereum-mainnet',
        label: 'Ethereum Mainnet',
        chain: 'Ethereum',
        mainnet: true
      },
      { key: 'kcc-mainnet', label: 'KCC Mainnet', chain: 'KCC', mainnet: true },
      {
        key: 'metis-mainnet',
        label: 'Metis Mainnet',
        chain: 'Metis',
        mainnet: true
      },
      {
        key: 'polygon-mainnet',
        label: 'Polygon Mainnet',
        chain: 'Polygon',
        mainnet: true
      },
      {
        key: 'avalanche-fuji',
        label: 'Avalanche Fuji',
        chain: 'Avalanche',
        mainnet: false
      },
      {
        key: 'boba-rinkeby',
        label: 'Boba Rinkeby',
        chain: 'Boba',
        mainnet: false
      },
      {
        key: 'celo-alfajores',
        label: 'Celo Alfajores',
        chain: 'Celo',
        mainnet: false
      },
      {
        key: 'conflux-tethys',
        label: 'Conflux Core (Hydra)',
        chain: 'Conflux',
        mainnet: false
      },
      {
        key: 'conflux-testnet',
        label: 'Conflux Core (Testnet)',
        chain: 'Conflux',
        mainnet: false
      },
      {
        key: 'ethereum-goerli',
        label: 'Ethereum Goerli',
        chain: 'Ethereum',
        mainnet: false
      },
      {
        key: 'ethereum-rinkeby',
        label: 'Ethereum Rinkeby',
        chain: 'Ethereum',
        mainnet: false
      },
      {
        key: 'harmony-testnet',
        label: 'Harmony Testnet',
        chain: 'Harmony',
        mainnet: false
      },
      {
        key: 'kcc-testnet',
        label: 'KCC Testnet',
        chain: 'KCC',
        mainnet: false
      },
      {
        key: 'metis-rinkeby',
        label: 'Metis Rinkeby',
        chain: 'Metis',
        mainnet: false
      },
      {
        key: 'polygon-goerli',
        label: 'Polygon Mumbai',
        chain: 'Polygon',
        mainnet: false
      }
    ]
    expect(networksConfig).toStrictEqual(expected)
  })
})
