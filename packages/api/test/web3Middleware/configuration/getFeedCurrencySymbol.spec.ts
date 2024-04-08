import { RouterDataFeedsConfig } from '../../../types'
import { Configuration } from '../../../src/web3Middleware/Configuration'

const configurationFile: RouterDataFeedsConfig = {
  contracts: {
    legacy: {
      abi: './src/abi/WitnetPriceRouter.json',
      pollingPeriod: 120000,
    },
    '2.0': {
      abi: './src/abi/WitnetPriceFeeds.json',
      address: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      pollingPeriod: 120000,
    },
  },
  currencies: {
    EUR: '€',
    KRW: '₩',
    USD: '$',
    USDC: '$',
    USDT: '₮',
  },
  chains: {
    arbitrum: {
      name: 'Arbitrum',
      networks: {
        'arbitrum.one': {
          version: '2.0',
          address: '0x9999999d139bdBFbF25923ba39F63bBFc7593400',
          blockExplorer: 'https://arbiscan.io/address/{address}',
          color: '#E84142',
          mainnet: true,
          name: 'Arbitrum ONE',
          pollingPeriod: 120000,
          feeds: {
            'Price-ETH/USD-6': {
              label: '$',
              deviationPercentage: 3.5,
              maxSecsBetweenUpdates: 86400,
              minSecsBetweenUpdates: 900,
            },
          },
        },
        'arbitrum.goerli': {
          version: '2.0',
          address: '0x9999999d139bdBFbF25923ba39F63bBFc7593400',
          blockExplorer: 'https://goerli.arbiscan.io/address/{address}',
          color: '#E84142',
          name: 'Arbitrum Nitro Goerli',
          pollingPeriod: 120000,
          feeds: {
            'Price-ETH/USD-6': {
              label: '$',
              deviationPercentage: 3.5,
              maxSecsBetweenUpdates: 86400,
              minSecsBetweenUpdates: 900,
            },
          },
        },
      },
    },
    avalanche: {
      name: 'Avalanche',
      networks: {
        'avalanche.mainnet': {
          version: 'legacy',
          mainnet: true,
          address: '0xBaaF31F4AAc5ab5334b6E239a83bf4E855C55ea7',
          blockExplorer: 'https://snowtrace.io/address/{address}',
          color: '#070fdf',
          name: 'Avalanche Mainnet',
          pollingPeriod: 120000,
          feeds: {
            'Price-ETH/USD-6': {
              label: '$',
              deviationPercentage: 3.5,
              maxSecsBetweenUpdates: 86400,
              minSecsBetweenUpdates: 900,
            },
          },
        },
        'avalanche.fuji': {
          version: '2.0',
          address: '0x9999999d139bdBFbF25923ba39F63bBFc7593400',
          blockExplorer: 'https://testnet.snowtrace.io/address/{address}',
          color: '#E84142',
          name: 'Avalanche Fuji',
          pollingPeriod: 120000,
          feeds: {
            'Price-ETH/USD-6': {
              label: '$',
              deviationPercentage: 3.5,
              maxSecsBetweenUpdates: 86400,
              minSecsBetweenUpdates: 900,
            },
          },
        },
      },
    },
    boba: {
      name: 'Boba',
      networks: {
        'boba.ethereum.mainnet': {
          version: 'legacy',
          mainnet: true,
          address: '0x93f61D0D5F623144e7C390415B70102A9Cc90bA5',
          blockExplorer: 'https://blockexplorer.boba.network/address/{address}',
          color: '#007dff',
          name: 'Boba ETH/L2 Mainnet',
          pollingPeriod: 120000,
          feeds: {},
        },
      },
    },
  },
  conditions: {
    default: {
      deviationPercentage: 3.5,
      maxSecsBetweenUpdates: 86400,
      minSecsBetweenUpdates: 3600,
    },
    'Price-ETH/USD-6': {
      label: '$',
      deviationPercentage: 10,
      maxSecsBetweenUpdates: 86400,
      minSecsBetweenUpdates: 900,
    },
  },
}

describe('getFeedCurrencySymbol', () => {
  it('empty', () => {
    const configuration = new Configuration(configurationFile)

    const result = configuration.getFeedCurrencySymbol('Price-ADA/XYZ-6')

    expect(result).toBe(' ')
  })

  it('USD', () => {
    const configuration = new Configuration(configurationFile)

    const result = configuration.getFeedCurrencySymbol('Price-ADA/USD-6')

    expect(result).toBe('$')
  })

  it('EUR', () => {
    const configuration = new Configuration(configurationFile)

    const result = configuration.getFeedCurrencySymbol('Price-CELO/EUR-6')

    expect(result).toBe('€')
  })

  it('KRW', () => {
    const configuration = new Configuration(configurationFile)

    const result = configuration.getFeedCurrencySymbol('Price-KSP/KRW-9')

    expect(result).toBe('₩')
  })
})
