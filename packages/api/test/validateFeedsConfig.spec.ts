import { normalizeConfig } from '../src/utils/index'
import dataFeedsRouterConfig from '../test/web3Middleware/dataFeedsRouter.json'

describe('validateDataFeedsConfig', () => {
  it('check if the structure is correct', async () => {
    const feeds = normalizeConfig(dataFeedsRouterConfig)
    const expected = [
      {
        feedFullName: 'avalanche-fuji_avax-usd_6',
        isRouted: false,
        id: 'Price-AVAX/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x99Af0CF37d1C6b9Bdfe33cc0A89C00D97D3c42F4',
        network: 'avalanche-fuji',
        networkName: 'Avalanche Fuji',
        chain: 'Avalanche',
        name: 'avax/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#E84142',
        blockExplorer: 'https://testnet.snowtrace.io/address/{address}',
        deviation: '1',
        heartbeat: '3600000',
        finality: '900000'
      },
      {
        feedFullName: 'avalanche-fuji_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x99Af0CF37d1C6b9Bdfe33cc0A89C00D97D3c42F4',
        network: 'avalanche-fuji',
        networkName: 'Avalanche Fuji',
        chain: 'Avalanche',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#E84142',
        blockExplorer: 'https://testnet.snowtrace.io/address/{address}',
        deviation: '1',
        heartbeat: '3600000',
        finality: '900000'
      },
      {
        feedFullName: 'avalanche-fuji_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x99Af0CF37d1C6b9Bdfe33cc0A89C00D97D3c42F4',
        network: 'avalanche-fuji',
        networkName: 'Avalanche Fuji',
        chain: 'Avalanche',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#E84142',
        blockExplorer: 'https://testnet.snowtrace.io/address/{address}',
        deviation: '1',
        heartbeat: '3600000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-rinkeby_boba-usdt_6',
        isRouted: false,
        id: 'Price-BOBA/USDT-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a',
        network: 'boba-rinkeby',
        networkName: 'Boba Rinkeby',
        chain: 'Boba',
        name: 'boba/usdt',
        label: '₮',
        pollingPeriod: 15000,
        color: '#1cd83d',
        blockExplorer:
          'https://blockexplorer.rinkeby.boba.network/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-rinkeby_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a',
        network: 'boba-rinkeby',
        networkName: 'Boba Rinkeby',
        chain: 'Boba',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#1cd83d',
        blockExplorer:
          'https://blockexplorer.rinkeby.boba.network/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-rinkeby_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a',
        network: 'boba-rinkeby',
        networkName: 'Boba Rinkeby',
        chain: 'Boba',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#1cd83d',
        blockExplorer:
          'https://blockexplorer.rinkeby.boba.network/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-rinkeby_frax-usdt_6',
        isRouted: false,
        id: 'Price-FRAX/USDT-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a',
        network: 'boba-rinkeby',
        networkName: 'Boba Rinkeby',
        chain: 'Boba',
        name: 'frax/usdt',
        label: '₮',
        pollingPeriod: 15000,
        color: '#1cd83d',
        blockExplorer:
          'https://blockexplorer.rinkeby.boba.network/address/{address}',
        deviation: '0.1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-rinkeby_fxs-usdt_6',
        isRouted: false,
        id: 'Price-FXS/USDT-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a',
        network: 'boba-rinkeby',
        networkName: 'Boba Rinkeby',
        chain: 'Boba',
        name: 'fxs/usdt',
        label: '₮',
        pollingPeriod: 15000,
        color: '#1cd83d',
        blockExplorer:
          'https://blockexplorer.rinkeby.boba.network/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-rinkeby_omg-btc_9',
        isRouted: false,
        id: 'Price-OMG/BTC-9',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a',
        network: 'boba-rinkeby',
        networkName: 'Boba Rinkeby',
        chain: 'Boba',
        name: 'omg/btc',
        label: '₿',
        pollingPeriod: 15000,
        color: '#1cd83d',
        blockExplorer:
          'https://blockexplorer.rinkeby.boba.network/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-rinkeby_omg-eth_9',
        isRouted: false,
        id: 'Price-OMG/ETH-9',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a',
        network: 'boba-rinkeby',
        networkName: 'Boba Rinkeby',
        chain: 'Boba',
        name: 'omg/eth',
        label: 'Ξ',
        pollingPeriod: 15000,
        color: '#1cd83d',
        blockExplorer:
          'https://blockexplorer.rinkeby.boba.network/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-rinkeby_omg-usdt_6',
        isRouted: false,
        id: 'Price-OMG/USDT-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a',
        network: 'boba-rinkeby',
        networkName: 'Boba Rinkeby',
        chain: 'Boba',
        name: 'omg/usdt',
        label: '₮',
        pollingPeriod: 15000,
        color: '#1cd83d',
        blockExplorer:
          'https://blockexplorer.rinkeby.boba.network/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-rinkeby_usdc-usd_6',
        isRouted: false,
        id: 'Price-USDC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a',
        network: 'boba-rinkeby',
        networkName: 'Boba Rinkeby',
        chain: 'Boba',
        name: 'usdc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#1cd83d',
        blockExplorer:
          'https://blockexplorer.rinkeby.boba.network/address/{address}',
        deviation: '0.1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-rinkeby_usdt-usd_6',
        isRouted: false,
        id: 'Price-USDT/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x36928Aeedaaf7D85bcA39aDfB2A39ec529ce221a',
        network: 'boba-rinkeby',
        networkName: 'Boba Rinkeby',
        chain: 'Boba',
        name: 'usdt/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#1cd83d',
        blockExplorer:
          'https://blockexplorer.rinkeby.boba.network/address/{address}',
        deviation: '0.1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-mainnet_boba-usdt_6',
        isRouted: false,
        id: 'Price-BOBA/USDT-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x93f61D0D5F623144e7C390415B70102A9Cc90bA5',
        network: 'boba-mainnet',
        networkName: 'Boba Mainnet',
        chain: 'Boba',
        name: 'boba/usdt',
        label: '₮',
        pollingPeriod: 15000,
        color: '#007dff',
        blockExplorer: 'https://blockexplorer.boba.network/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-mainnet_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x93f61D0D5F623144e7C390415B70102A9Cc90bA5',
        network: 'boba-mainnet',
        networkName: 'Boba Mainnet',
        chain: 'Boba',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#007dff',
        blockExplorer: 'https://blockexplorer.boba.network/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-mainnet_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x93f61D0D5F623144e7C390415B70102A9Cc90bA5',
        network: 'boba-mainnet',
        networkName: 'Boba Mainnet',
        chain: 'Boba',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#007dff',
        blockExplorer: 'https://blockexplorer.boba.network/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-mainnet_frax-usdt_6',
        isRouted: false,
        id: 'Price-FRAX/USDT-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x93f61D0D5F623144e7C390415B70102A9Cc90bA5',
        network: 'boba-mainnet',
        networkName: 'Boba Mainnet',
        chain: 'Boba',
        name: 'frax/usdt',
        label: '₮',
        pollingPeriod: 15000,
        color: '#007dff',
        blockExplorer: 'https://blockexplorer.boba.network/address/{address}',
        deviation: '0.25',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-mainnet_usdc-usd_6',
        isRouted: false,
        id: 'Price-USDC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x93f61D0D5F623144e7C390415B70102A9Cc90bA5',
        network: 'boba-mainnet',
        networkName: 'Boba Mainnet',
        chain: 'Boba',
        name: 'usdc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#007dff',
        blockExplorer: 'https://blockexplorer.boba.network/address/{address}',
        deviation: '0.25',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'boba-mainnet_usdt-usd_6',
        isRouted: false,
        id: 'Price-USDT/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x93f61D0D5F623144e7C390415B70102A9Cc90bA5',
        network: 'boba-mainnet',
        networkName: 'Boba Mainnet',
        chain: 'Boba',
        name: 'usdt/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#007dff',
        blockExplorer: 'https://blockexplorer.boba.network/address/{address}',
        deviation: '0.25',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'celo-alfajores_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x6f8A7E2bBc1eDb8782145cD1089251f6e2C738AE',
        network: 'celo-alfajores',
        networkName: 'Celo Alfajores',
        chain: 'Celo',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#1cd8d2',
        blockExplorer:
          'https://alfajores-blockscout.celo-testnet.org/address/{address}',
        deviation: '1',
        heartbeat: '3600000',
        finality: '900000'
      },
      {
        feedFullName: 'celo-alfajores_celo-eur_6',
        isRouted: false,
        id: 'Price-CELO/EUR-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x6f8A7E2bBc1eDb8782145cD1089251f6e2C738AE',
        network: 'celo-alfajores',
        networkName: 'Celo Alfajores',
        chain: 'Celo',
        name: 'celo/eur',
        label: '€',
        pollingPeriod: 15000,
        color: '#1cd8d2',
        blockExplorer:
          'https://alfajores-blockscout.celo-testnet.org/address/{address}',
        deviation: '1',
        heartbeat: '3600000',
        finality: '900000'
      },
      {
        feedFullName: 'celo-alfajores_celo-usd_6',
        isRouted: false,
        id: 'Price-CELO/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x6f8A7E2bBc1eDb8782145cD1089251f6e2C738AE',
        network: 'celo-alfajores',
        networkName: 'Celo Alfajores',
        chain: 'Celo',
        name: 'celo/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#1cd8d2',
        blockExplorer:
          'https://alfajores-blockscout.celo-testnet.org/address/{address}',
        deviation: '1',
        heartbeat: '3600000',
        finality: '900000'
      },
      {
        feedFullName: 'celo-alfajores_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x6f8A7E2bBc1eDb8782145cD1089251f6e2C738AE',
        network: 'celo-alfajores',
        networkName: 'Celo Alfajores',
        chain: 'Celo',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#1cd8d2',
        blockExplorer:
          'https://alfajores-blockscout.celo-testnet.org/address/{address}',
        deviation: '1',
        heartbeat: '3600000',
        finality: '900000'
      },
      {
        feedFullName: 'celo-mainnet_celo-eur_6',
        isRouted: false,
        id: 'Price-CELO/EUR-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x931673904eB6E69D775e35F522c0EA35575297Cb',
        network: 'celo-mainnet',
        networkName: 'Celo Mainnet',
        chain: 'Celo',
        name: 'celo/eur',
        label: '€',
        pollingPeriod: 15000,
        color: '#ff8100',
        blockExplorer: 'https://explorer.celo.org/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'celo-mainnet_celo-usd_6',
        isRouted: false,
        id: 'Price-CELO/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x931673904eB6E69D775e35F522c0EA35575297Cb',
        network: 'celo-mainnet',
        networkName: 'Celo Mainnet',
        chain: 'Celo',
        name: 'celo/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff8100',
        blockExplorer: 'https://explorer.celo.org/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'celo-mainnet_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x931673904eB6E69D775e35F522c0EA35575297Cb',
        network: 'celo-mainnet',
        networkName: 'Celo Mainnet',
        chain: 'Celo',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff8100',
        blockExplorer: 'https://explorer.celo.org/address/{address}',
        deviation: '3.5',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'celo-mainnet_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x931673904eB6E69D775e35F522c0EA35575297Cb',
        network: 'celo-mainnet',
        networkName: 'Celo Mainnet',
        chain: 'Celo',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff8100',
        blockExplorer: 'https://explorer.celo.org/address/{address}',
        deviation: '3.5',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'conflux-testnet_cfx-usdt_6',
        isRouted: false,
        id: 'Price-CFX/USDT-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x8F61C7b18F69bB87D6151B8a5D733E1945ea6c25',
        network: 'conflux-testnet',
        networkName: 'Conflux Core (Testnet)',
        chain: 'Conflux',
        name: 'cfx/usdt',
        label: '₮',
        pollingPeriod: 15000,
        color: '#6600ff',
        blockExplorer: 'https://testnet.confluxscan.io/address/{address}',
        deviation: '1',
        heartbeat: '3600000',
        finality: '900000'
      },
      {
        feedFullName: 'conflux-testnet_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x8F61C7b18F69bB87D6151B8a5D733E1945ea6c25',
        network: 'conflux-testnet',
        networkName: 'Conflux Core (Testnet)',
        chain: 'Conflux',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#6600ff',
        blockExplorer: 'https://testnet.confluxscan.io/address/{address}',
        deviation: '1',
        heartbeat: '3600000',
        finality: '900000'
      },
      {
        feedFullName: 'conflux-testnet_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x8F61C7b18F69bB87D6151B8a5D733E1945ea6c25',
        network: 'conflux-testnet',
        networkName: 'Conflux Core (Testnet)',
        chain: 'Conflux',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#6600ff',
        blockExplorer: 'https://testnet.confluxscan.io/address/{address}',
        deviation: '1',
        heartbeat: '3600000',
        finality: '900000'
      },
      {
        feedFullName: 'conflux-tethys_cfx-usdt_6',
        isRouted: false,
        id: 'Price-CFX/USDT-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x806c8dFd322EE2d52b188CC472e0814F64304C32',
        network: 'conflux-tethys',
        networkName: 'Conflux Core (Hydra)',
        chain: 'Conflux',
        name: 'cfx/usdt',
        label: '₮',
        pollingPeriod: 15000,
        color: '#ff0000',
        blockExplorer: 'https://confluxscan.io/address/{address}',
        deviation: '1',
        heartbeat: '3600000',
        finality: '900000'
      },
      {
        feedFullName: 'conflux-tethys_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x806c8dFd322EE2d52b188CC472e0814F64304C32',
        network: 'conflux-tethys',
        networkName: 'Conflux Core (Hydra)',
        chain: 'Conflux',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff0000',
        blockExplorer: 'https://confluxscan.io/address/{address}',
        deviation: '3.5',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'conflux-tethys_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x806c8dFd322EE2d52b188CC472e0814F64304C32',
        network: 'conflux-tethys',
        networkName: 'Conflux Core (Hydra)',
        chain: 'Conflux',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff0000',
        blockExplorer: 'https://confluxscan.io/address/{address}',
        deviation: '3.5',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'ethereum-goerli_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x1cF3Aa9DBF4880d797945726B94B9d29164211BE',
        network: 'ethereum-goerli',
        networkName: 'Ethereum Goerli',
        chain: 'Ethereum',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff5599',
        blockExplorer: 'https://goerli.etherscan.io/address/{address}',
        deviation: '1',
        heartbeat: '28800000',
        finality: '900000'
      },
      {
        feedFullName: 'ethereum-goerli_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x1cF3Aa9DBF4880d797945726B94B9d29164211BE',
        network: 'ethereum-goerli',
        networkName: 'Ethereum Goerli',
        chain: 'Ethereum',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff5599',
        blockExplorer: 'https://goerli.etherscan.io/address/{address}',
        deviation: '1',
        heartbeat: '28800000',
        finality: '900000'
      },
      {
        feedFullName: 'ethereum-rinkeby_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0xa50b17C2fc373c247C3b603f83df6A7800cB0DC9',
        network: 'ethereum-rinkeby',
        networkName: 'Ethereum Rinkeby',
        chain: 'Ethereum',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff5599',
        blockExplorer: 'https://rinkeby.etherscan.io/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'ethereum-rinkeby_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0xa50b17C2fc373c247C3b603f83df6A7800cB0DC9',
        network: 'ethereum-rinkeby',
        networkName: 'Ethereum Rinkeby',
        chain: 'Ethereum',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff5599',
        blockExplorer: 'https://rinkeby.etherscan.io/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'ethereum-mainnet_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x83A757eAe821Ad7B520D9A74952337138A80b2AF',
        network: 'ethereum-mainnet',
        networkName: 'Ethereum Mainnet',
        chain: 'Ethereum',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff5599',
        blockExplorer: 'https://etherscan.io/address/{address}',
        deviation: '3.5',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'ethereum-mainnet_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x83A757eAe821Ad7B520D9A74952337138A80b2AF',
        network: 'ethereum-mainnet',
        networkName: 'Ethereum Mainnet',
        chain: 'Ethereum',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff5599',
        blockExplorer: 'https://etherscan.io/address/{address}',
        deviation: '3.5',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'harmony-testnet_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x08d479a544b05B297454e5CAc133abA3a584AB8E',
        network: 'harmony-testnet',
        networkName: 'Harmony Testnet',
        chain: 'Harmony',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#f6006f',
        blockExplorer: 'https://explorer.pops.one/address/{address}',
        deviation: '1',
        heartbeat: '3600000',
        finality: '900000'
      },
      {
        feedFullName: 'harmony-testnet_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x08d479a544b05B297454e5CAc133abA3a584AB8E',
        network: 'harmony-testnet',
        networkName: 'Harmony Testnet',
        chain: 'Harmony',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#f6006f',
        blockExplorer: 'https://explorer.pops.one/address/{address}',
        deviation: '1',
        heartbeat: '3600000',
        finality: '900000'
      },
      {
        feedFullName: 'kcc-testnet_kcs-usdt_6',
        isRouted: false,
        id: 'Price-KCS/USDT-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0xba7CF62498340fa3734EC51Ca8A69928F0d9E03a',
        network: 'kcc-testnet',
        networkName: 'KCC Testnet',
        chain: 'KCC',
        name: 'kcs/usdt',
        label: '₮',
        pollingPeriod: 15000,
        color: '#ff0066',
        blockExplorer: 'https://scan-testnet.kcc.network/address/{address}',
        deviation: '0.5',
        heartbeat: '600000',
        finality: '900000'
      },
      {
        feedFullName: 'kcc-testnet_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0xba7CF62498340fa3734EC51Ca8A69928F0d9E03a',
        network: 'kcc-testnet',
        networkName: 'KCC Testnet',
        chain: 'KCC',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff0066',
        blockExplorer: 'https://scan-testnet.kcc.network/address/{address}',
        deviation: '0.5',
        heartbeat: '600000',
        finality: '900000'
      },
      {
        feedFullName: 'kcc-testnet_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0xba7CF62498340fa3734EC51Ca8A69928F0d9E03a',
        network: 'kcc-testnet',
        networkName: 'KCC Testnet',
        chain: 'KCC',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff0066',
        blockExplorer: 'https://scan-testnet.kcc.network/address/{address}',
        deviation: '0.5',
        heartbeat: '600000',
        finality: '900000'
      },
      {
        feedFullName: 'kcc-mainnet_kcs-usdt_6',
        isRouted: false,
        id: 'Price-KCS/USDT-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0xD39D4d972C7E166856c4eb29E54D3548B4597F53',
        network: 'kcc-mainnet',
        networkName: 'KCC Mainnet',
        chain: 'KCC',
        name: 'kcs/usdt',
        label: '₮',
        pollingPeriod: 15000,
        color: '#ff0066',
        blockExplorer: 'https://scan.kcc.io/address/{address}',
        deviation: '0.5',
        heartbeat: '600000',
        finality: '900000'
      },
      {
        feedFullName: 'kcc-mainnet_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0xD39D4d972C7E166856c4eb29E54D3548B4597F53',
        network: 'kcc-mainnet',
        networkName: 'KCC Mainnet',
        chain: 'KCC',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff0066',
        blockExplorer: 'https://scan.kcc.io/address/{address}',
        deviation: '0.5',
        heartbeat: '600000',
        finality: '900000'
      },
      {
        feedFullName: 'kcc-mainnet_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0xD39D4d972C7E166856c4eb29E54D3548B4597F53',
        network: 'kcc-mainnet',
        networkName: 'KCC Mainnet',
        chain: 'KCC',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff0066',
        blockExplorer: 'https://scan.kcc.io/address/{address}',
        deviation: '0.5',
        heartbeat: '600000',
        finality: '900000'
      },
      {
        feedFullName: 'metis-rinkeby_metis-usdt_6',
        isRouted: false,
        id: 'Price-METIS/USDT-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x5134EAF08bcf8cE1922991150AAad1774e93751f',
        network: 'metis-rinkeby',
        networkName: 'Metis Rinkeby',
        chain: 'Metis',
        name: 'metis/usdt',
        label: '₮',
        pollingPeriod: 15000,
        color: '#ff6600',
        blockExplorer: 'https://stardust-explorer.metis.io/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'metis-rinkeby_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x5134EAF08bcf8cE1922991150AAad1774e93751f',
        network: 'metis-rinkeby',
        networkName: 'Metis Rinkeby',
        chain: 'Metis',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff6600',
        blockExplorer: 'https://stardust-explorer.metis.io/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'metis-rinkeby_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x5134EAF08bcf8cE1922991150AAad1774e93751f',
        network: 'metis-rinkeby',
        networkName: 'Metis Rinkeby',
        chain: 'Metis',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#ff6600',
        blockExplorer: 'https://stardust-explorer.metis.io/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'metis-mainnet_metis-usdt_6',
        isRouted: false,
        id: 'Price-METIS/USDT-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0xD39D4d972C7E166856c4eb29E54D3548B4597F53',
        network: 'metis-mainnet',
        networkName: 'Metis Mainnet',
        chain: 'Metis',
        name: 'metis/usdt',
        label: '₮',
        pollingPeriod: 15000,
        color: '#ff6600',
        blockExplorer: 'https://andromeda-explorer.metis.io/address/{address}',
        deviation: '2',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'polygon-goerli_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x6d5544ca5b35bf2e7a78ace4E7B8d191fe5C9FAb',
        network: 'polygon-goerli',
        networkName: 'Polygon Mumbai',
        chain: 'Polygon',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#66ff00',
        blockExplorer: 'https://mumbai.polygonscan.com/address/{address}',
        deviation: '3.5',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'polygon-goerli_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x6d5544ca5b35bf2e7a78ace4E7B8d191fe5C9FAb',
        network: 'polygon-goerli',
        networkName: 'Polygon Mumbai',
        chain: 'Polygon',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#66ff00',
        blockExplorer: 'https://mumbai.polygonscan.com/address/{address}',
        deviation: '3.5',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'polygon-mainnet_btc-usd_6',
        isRouted: false,
        id: 'Price-BTC/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x3806311c7138ddF2bAF2C2093ff3633E5A73AbD4',
        network: 'polygon-mainnet',
        networkName: 'Polygon Mainnet',
        chain: 'Polygon',
        name: 'btc/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#66ff00',
        blockExplorer: 'https://polygonscan.com/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      },
      {
        feedFullName: 'polygon-mainnet_eth-usd_6',
        isRouted: false,
        id: 'Price-ETH/USD-6',
        address: '0x0000000000000000000000000000000000000000',
        contractId: '0x0000000000000000000000000000000000000000',
        routerAddress: '0x3806311c7138ddF2bAF2C2093ff3633E5A73AbD4',
        network: 'polygon-mainnet',
        networkName: 'Polygon Mainnet',
        chain: 'Polygon',
        name: 'eth/usd',
        label: '$',
        pollingPeriod: 15000,
        color: '#66ff00',
        blockExplorer: 'https://polygonscan.com/address/{address}',
        deviation: '1',
        heartbeat: '86400000',
        finality: '900000'
      }
    ]

    expect(feeds).toStrictEqual(expected)
  })
})
