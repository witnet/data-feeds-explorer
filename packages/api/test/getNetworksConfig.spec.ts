import { normalizeNetworkConfig } from '../src/utils/index'
import dataFeedsRouterConfig from '../test/web3Middleware/dataFeedsRouter.json'

describe('validateDataFeedsConfig', () => {
  it('check if the structure is correct', async () => {
    const networksConfig = normalizeNetworkConfig(dataFeedsRouterConfig)
    const expected = [
      { key: 'boba-mainnet', label: 'Boba Mainnet', chain: 'Boba' },
      { key: 'boba-rinkeby', label: 'Boba Rinkeby', chain: 'Boba' },
      { key: 'celo-alfajores', label: 'Celo Alfajores', chain: 'Celo' },
      { key: 'celo-mainnet', label: 'Celo Mainnet', chain: 'Celo' },
      {
        key: 'conflux-tethys',
        label: 'Conflux Core (Hydra)',
        chain: 'Conflux'
      },
      {
        key: 'conflux-testnet',
        label: 'Conflux Core (Testnet)',
        chain: 'Conflux'
      },
      {
        key: 'ethereum-goerli',
        label: 'Ethereum Goerli',
        chain: 'Ethereum'
      },
      {
        key: 'ethereum-mainnet',
        label: 'Ethereum Mainnet',
        chain: 'Ethereum'
      },
      {
        key: 'ethereum-rinkeby',
        label: 'Ethereum Rinkeby',
        chain: 'Ethereum'
      },
      {
        key: 'harmony-testnet',
        label: 'Harmony Testnet',
        chain: 'Harmony'
      },
      { key: 'kcc-mainnet', label: 'KCC Mainnet', chain: 'KCC' },
      { key: 'kcc-testnet', label: 'KCC Testnet', chain: 'KCC' },
      { key: 'metis-mainnet', label: 'Metis Mainnet', chain: 'Metis' },
      { key: 'metis-rinkeby', label: 'Metis Rinkeby', chain: 'Metis' },
      {
        key: 'polygon-mainnet',
        label: 'Polygon Mainnet',
        chain: 'Polygon'
      },
      { key: 'polygon-goerli', label: 'Polygon Mumbai', chain: 'Polygon' }
    ]
    expect(networksConfig).toStrictEqual(expected)
  })
})
