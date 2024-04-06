import { normalizeNetworkConfig } from '../src/utils/index'
import dataFeedsRouterConfig from '../test/web3Middleware/dataFeedsRouter.json'

describe('validateNetworkConfig', () => {
  it('check if the structure is correct', async () => {
    const networksConfig = normalizeNetworkConfig(dataFeedsRouterConfig)
    const expected = [
      {
        key: 'boba-bnb-mainnet',
        label: 'Boba BNB/L2 Mainnet',
        chain: 'Boba',
        mainnet: true,
      },
      {
        key: 'celo-mainnet',
        label: 'Celo Mainnet',
        chain: 'Celo',
        mainnet: true,
      },
      {
        key: 'ethereum-mainnet',
        label: 'Ethereum Mainnet',
        chain: 'Ethereum',
        mainnet: true,
      },
      { key: 'kcc-mainnet', label: 'KCC Mainnet', chain: 'KCC', mainnet: true },
      {
        key: 'polygon-mainnet',
        label: 'Polygon Mainnet',
        chain: 'Polygon',
        mainnet: true,
      },
      {
        key: 'polygon-zkevm-mainnet',
        label: 'Polygon zkEVM Mainnet',
        chain: 'Polygon',
        mainnet: true,
      },
      {
        key: 'boba-bnb-testnet',
        label: 'Boba BNB/L2 Testnet',
        chain: 'Boba',
        mainnet: false,
      },
      {
        key: 'boba-ethereum-goerli',
        label: 'Boba ETH/L2 Goerli',
        chain: 'Boba',
        mainnet: false,
      },
      {
        key: 'celo-alfajores',
        label: 'Celo Alfajores',
        chain: 'Celo',
        mainnet: false,
      },
      {
        key: 'conflux-core-mainnet',
        label: 'Conflux Core (Hydra)',
        chain: 'Conflux',
        mainnet: false,
      },
      {
        key: 'conflux-core-testnet',
        label: 'Conflux Core (Testnet)',
        chain: 'Conflux',
        mainnet: false,
      },
      {
        key: 'conflux-espace-testnet',
        label: 'Conflux eSpace (Testnet)',
        chain: 'Conflux',
        mainnet: false,
      },
      {
        key: 'ethereum-goerli',
        label: 'Ethereum Goerli',
        chain: 'Ethereum',
        mainnet: false,
      },
      {
        key: 'ethereum-sepolia',
        label: 'Ethereum Sepolia',
        chain: 'Ethereum',
        mainnet: false,
      },
      {
        key: 'kcc-testnet',
        label: 'KCC Testnet',
        chain: 'KCC',
        mainnet: false,
      },
      {
        key: 'metis-goerli',
        label: 'Metis Goerli',
        chain: 'Metis',
        mainnet: false,
      },
      {
        key: 'polygon-goerli',
        label: 'Polygon Mumbai',
        chain: 'Polygon',
        mainnet: false,
      },
      {
        key: 'polygon-zkevm-goerli',
        label: 'Polygon zkEVM Testnet',
        chain: 'Polygon',
        mainnet: false,
      },
    ]
    expect(networksConfig).toStrictEqual(expected)
  })
})
