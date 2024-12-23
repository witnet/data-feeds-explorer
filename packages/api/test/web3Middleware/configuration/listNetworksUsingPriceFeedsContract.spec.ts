import { Configuration } from '../../../src/web3Middleware/Configuration'
import { RouterDataFeedsConfig } from '../../../types'
import { baseConfigurationFile } from './baseConfigurationFile'

describe('listNetworksUsingPriceFeedsContract', () => {
  it('Full file', () => {
    const configurationFile = {
      contracts: {
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
              version: '2.0',
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
              version: '2.0',
              mainnet: true,
              address: '0x93f61D0D5F623144e7C390415B70102A9Cc90bA5',
              blockExplorer:
                'https://blockexplorer.boba.network/address/{address}',
              color: '#007dff',
              name: 'Boba ETH/L2 Mainnet',
              pollingPeriod: 120000,
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
    const configuration = new Configuration(
      configurationFile as RouterDataFeedsConfig,
    )
    const result = configuration.listNetworksUsingPriceFeedsContract()

    const expected = [
      {
        address: '0x0000000000000000000000000000000000000000',
        chain: 'Arbitrum',
        key: 'arbitrum-one',
        networkName: 'Arbitrum ONE',
        pollingPeriod: 120000,
        provider: 'provider-arbitrum-one',
      },
      {
        address: '0x9999999d139bdBFbF25923ba39F63bBFc7593400',
        chain: 'Arbitrum',
        key: 'arbitrum-goerli',
        networkName: 'Arbitrum Nitro Goerli',
        pollingPeriod: 120000,
        provider: 'provider-arbitrum-goerli',
      },
      {
        address: '0xBaaF31F4AAc5ab5334b6E239a83bf4E855C55ea7',
        chain: 'Avalanche',
        key: 'avalanche-mainnet',
        networkName: 'Avalanche Mainnet',
        pollingPeriod: 120000,
        provider: 'provider-avalanche-mainnet',
      },
      {
        address: '0x9999999d139bdBFbF25923ba39F63bBFc7593400',
        chain: 'Avalanche',
        key: 'avalanche-fuji',
        networkName: 'Avalanche Fuji',
        pollingPeriod: 120000,
        provider: 'provider-avalanche-fuji',
      },
      {
        address: '0x93f61D0D5F623144e7C390415B70102A9Cc90bA5',
        chain: 'Boba',
        key: 'boba-ethereum-mainnet',
        networkName: 'Boba ETH/L2 Mainnet',
        pollingPeriod: 120000,
        provider: 'provider-boba-ethereum-mainnet',
      },
    ]

    expect(result).toStrictEqual(expected)
  })

  describe('pollingPeriod', () => {
    it('default', () => {
      const configurationFile = {
        ...baseConfigurationFile,
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
                    deviationPercentage: 3.5,
                    maxSecsBetweenUpdates: 86400,
                    minSecsBetweenUpdates: 900,
                  },
                },
              },
            },
          },
        },
      }

      const configuration = new Configuration(
        configurationFile as RouterDataFeedsConfig,
      )
      const result = configuration.listNetworksUsingPriceFeedsContract()

      const expected = [
        {
          address: '0x0000000000000000000000000000000000000000',
          chain: 'Arbitrum',
          key: 'arbitrum-one',
          networkName: 'Arbitrum ONE',
          pollingPeriod: 120000,
          provider: 'provider-arbitrum-one',
        },
      ]

      expect(result).toStrictEqual(expected)
    })

    it('custom', () => {
      const configurationFile = {
        ...baseConfigurationFile,
        chains: {
          arbitrum: {
            name: 'Arbitrum',
            networks: {
              'arbitrum.one': {
                version: '2.0',
                pollingPeriod: 1000,
                blockExplorer: '',
                color: '#E84142',
                mainnet: true,
                name: 'Arbitrum ONE',
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
        },
      }

      const configuration = new Configuration(
        configurationFile as RouterDataFeedsConfig,
      )
      const result = configuration.listNetworksUsingPriceFeedsContract()

      const expected = [
        {
          address: '0x0000000000000000000000000000000000000000',
          chain: 'Arbitrum',
          key: 'arbitrum-one',
          networkName: 'Arbitrum ONE',
          pollingPeriod: 1000,
          provider: 'provider-arbitrum-one',
        },
      ]

      expect(result).toStrictEqual(expected)
    })
  })

  describe('provider', () => {
    it('default', () => {
      const configurationFile = {
        ...baseConfigurationFile,
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
                    deviationPercentage: 3.5,
                    maxSecsBetweenUpdates: 86400,
                    minSecsBetweenUpdates: 900,
                  },
                },
              },
            },
          },
        },
      }

      const configuration = new Configuration(
        configurationFile as RouterDataFeedsConfig,
      )
      const result = configuration.listNetworksUsingPriceFeedsContract()

      const expected = [
        {
          address: '0x0000000000000000000000000000000000000000',
          chain: 'Arbitrum',
          key: 'arbitrum-one',
          networkName: 'Arbitrum ONE',
          pollingPeriod: 120000,
          provider: 'provider-arbitrum-one',
        },
      ]

      expect(result).toStrictEqual(expected)
    })

    it('custom', () => {
      const configurationFile = {
        ...baseConfigurationFile,
        chains: {
          arbitrum: {
            name: 'Arbitrum',
            networks: {
              'arbitrum.one': {
                version: '2.0',
                blockProvider: 'public-provider',
                blockExplorer: 'https://arbiscan.io/address/{address}',
                color: '#E84142',
                mainnet: true,
                name: 'Arbitrum ONE',
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
        },
      }

      const configuration = new Configuration(
        configurationFile as RouterDataFeedsConfig,
      )
      const result = configuration.listNetworksUsingPriceFeedsContract()

      const expected = [
        {
          address: '0x0000000000000000000000000000000000000000',
          chain: 'Arbitrum',
          key: 'arbitrum-one',
          networkName: 'Arbitrum ONE',
          pollingPeriod: 120000,
          provider: 'public-provider',
        },
      ]

      expect(result).toStrictEqual(expected)
    })
  })

  describe('address', () => {
    it('default', () => {
      const configurationFile = {
        ...baseConfigurationFile,
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
                    deviationPercentage: 3.5,
                    maxSecsBetweenUpdates: 86400,
                    minSecsBetweenUpdates: 900,
                  },
                },
              },
            },
          },
        },
      }

      const configuration = new Configuration(
        configurationFile as RouterDataFeedsConfig,
      )
      const result = configuration.listNetworksUsingPriceFeedsContract()

      const expected = [
        {
          address: '0x0000000000000000000000000000000000000000',
          chain: 'Arbitrum',
          key: 'arbitrum-one',
          networkName: 'Arbitrum ONE',
          pollingPeriod: 120000,
          provider: 'provider-arbitrum-one',
        },
      ]

      expect(result).toStrictEqual(expected)
    })
    it('custom', () => {
      const configurationFile = {
        ...baseConfigurationFile,
        chains: {
          arbitrum: {
            name: 'Arbitrum',
            networks: {
              'arbitrum.one': {
                version: '2.0',
                address: '0x2222222222222222222222222222222222222222',
                blockProvider: 'https://arb1.arbitrum.io/rpc/',
                blockExplorer: 'https://arbiscan.io/address/{address}',
                color: '#E84142',
                mainnet: true,
                name: 'Arbitrum ONE',
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
        },
      }

      const configuration = new Configuration(
        configurationFile as RouterDataFeedsConfig,
      )
      const result = configuration.listNetworksUsingPriceFeedsContract()

      const expected = [
        {
          address: '0x2222222222222222222222222222222222222222',
          chain: 'Arbitrum',
          key: 'arbitrum-one',
          networkName: 'Arbitrum ONE',
          pollingPeriod: 120000,
          provider: 'https://arb1.arbitrum.io/rpc/',
        },
      ]

      expect(result).toStrictEqual(expected)
    })
  })
})
