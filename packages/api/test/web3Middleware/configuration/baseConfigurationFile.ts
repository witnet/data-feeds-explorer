export const baseConfigurationFile = {
  contracts: {
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
  chains: {},
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
