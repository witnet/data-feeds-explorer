import { Configuration } from '../../../src/web3Middleware/Configuration'
import { RouterDataFeedsConfig } from '../../../types'

const configurationFile: RouterDataFeedsConfig = {
  contract: {
    legacy: {
      abi: './src/abi/WitnetPriceRouter.json',
      pollingPeriod: 120000,
    },
    '2.0': {
      abi: './src/abi/WitnetPriceFeeds.json',
      address: '0x0000000000000000000000000000000000000000',
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
          blockExplorer: 'https://arbiscan.io/address/{address}',
          color: '#E84142',
          mainnet: true,
          name: 'Arbitrum ONE',
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
          feeds: {
            'Price-ETH/USD-6': {
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
  },
  conditions: {
    default: {
      deviationPercentage: 3.5,
      maxSecsBetweenUpdates: 86400,
      minSecsBetweenUpdates: 3600,
    },
    'Price-ETH/USD-6': {
      deviationPercentage: 10,
      maxSecsBetweenUpdates: 86400,
      minSecsBetweenUpdates: 900,
    },
  },
}

describe('getLegacyConfigurationFile', () => {
  it('should return only networks using the legacy contract', () => {
    const configuration = new Configuration(configurationFile)
    const result = configuration.getLegacyConfigurationFile()

    const expected = {
      abi: './src/abi/WitnetPriceRouter.json',
      chains: {
        avalanche: {
          name: 'Avalanche',
          networks: {
            'avalanche.mainnet': {
              address: '0xBaaF31F4AAc5ab5334b6E239a83bf4E855C55ea7',
              blockExplorer: 'https://snowtrace.io/address/{address}',
              color: '#070fdf',
              feeds: {
                'Price-ETH/USD-6': {
                  deviationPercentage: 3.5,
                  label: '$',
                  maxSecsBetweenUpdates: 86400,
                  minSecsBetweenUpdates: 900,
                },
              },
              version: 'legacy',
              mainnet: true,
              name: 'Avalanche Mainnet',
              pollingPeriod: 120000,
            },
          },
        },
        boba: {
          name: 'Boba',
          networks: {
            'boba.ethereum.mainnet': {
              address: '0x93f61D0D5F623144e7C390415B70102A9Cc90bA5',
              blockExplorer:
                'https://blockexplorer.boba.network/address/{address}',
              color: '#007dff',
              feeds: {
                'Price-ETH/USD-6': {
                  deviationPercentage: 3.5,
                  label: '$',
                  maxSecsBetweenUpdates: 86400,
                  minSecsBetweenUpdates: 900,
                },
              },
              version: 'legacy',
              mainnet: true,
              name: 'Boba ETH/L2 Mainnet',
              pollingPeriod: 120000,
            },
          },
        },
      },
    }

    expect(result).toStrictEqual(expected)
  })
})
