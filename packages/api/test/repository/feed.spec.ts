import { FeedRepository } from '../../src/repository/Feed'
import { FeedsState } from '../../src/repository/feedState'
import { FeedInfo, Network } from '../../types'

describe('FeedRepository', () => {
  const v2Feeds: Array<FeedInfo> = [
    {
      feedFullName: 'arbitrum-sepolia_eth-usd_6',
      id: '0x3d15f701',
      abi: [],
      routerAbi: [],
      address: null,
      routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      isRouted: false,
      network: 'arbitrum-sepolia' as Network,
      name: 'eth/usd',
      networkName: 'Arbitrum Sepolia',
      pollingPeriod: 120000,
      label: '$',
      contractId: '0x3d15f701',
      chain: 'Arbitrum',
      blockExplorer: 'https://sepolia.arbiscan.io/address/{address}',
      deviation: '3.5',
      heartbeat: '86400000',
      finality: '900000',
      color: '#66ff00',
    },
    {
      feedFullName: 'base-sepolia_eth-usd_6',
      id: '0x3d15f701',
      abi: [],
      routerAbi: [],
      address: null,
      routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      isRouted: false,
      network: 'base-sepolia' as Network,
      name: 'eth/usd',
      networkName: 'Base Sepolia',
      pollingPeriod: 120000,
      label: '$',
      contractId: '0x3d15f701',
      chain: 'Base',
      blockExplorer: 'https://base-sepolia.blockscout.com/{address}',
      deviation: '3.5',
      heartbeat: '86400000',
      finality: '900000',
      color: '#66ff00',
    },
    {
      feedFullName: 'base-sepolia_usdt-usd_6',
      id: '0x538f5a25',
      abi: [],
      routerAbi: [],
      address: null,
      routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      isRouted: false,
      network: 'base-sepolia' as Network,
      name: 'usdt/usd',
      networkName: 'Base Sepolia',
      pollingPeriod: 120000,
      label: '$',
      contractId: '0x538f5a25',
      chain: 'Base',
      blockExplorer: 'https://base-sepolia.blockscout.com/{address}',
      deviation: '0.1',
      heartbeat: '86400000',
      finality: '900000',
      color: '#66ff00',
    },
    {
      feedFullName: 'base-sepolia_wit-usdt_6',
      id: '0xde55fdb1',
      abi: [],
      routerAbi: [],
      address: null,
      routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      isRouted: false,
      network: 'base-sepolia' as Network,
      name: 'wit/usdt',
      networkName: 'Base Sepolia',
      pollingPeriod: 120000,
      label: '₮',
      contractId: '0xde55fdb1',
      chain: 'Base',
      blockExplorer: 'https://base-sepolia.blockscout.com/{address}',
      deviation: '1',
      heartbeat: '86400000',
      finality: '900000',
      color: '#66ff00',
    },
  ]
  const v2Feed = {
    feedFullName: 'celo-alfajores_btc-usd_6',
    id: '0x24beead4',
    abi: [],
    routerAbi: [],
    address: null,
    routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
    isRouted: false,
    network: 'celo-alfajores' as Network,
    name: 'btc/usd',
    networkName: 'Celo Alfajores',
    pollingPeriod: 120000,
    label: '$',
    contractId: '0x24beead4',
    chain: 'Celo',
    blockExplorer: 'https://alfajores.celoscan.io/address/{address}',
    deviation: '3.5',
    heartbeat: '86400000',
    finality: '900000',
    color: '#66ff00',
  }
  const baseConfigFullName = {
    'arbitrum-sepolia_eth-usd_6': {
      feedFullName: 'arbitrum-sepolia_eth-usd_6',
      id: '0x3d15f701',
      abi: [],
      routerAbi: [],
      address: null,
      routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      isRouted: false,
      network: 'arbitrum-sepolia',
      name: 'eth/usd',
      networkName: 'Arbitrum Sepolia',
      pollingPeriod: 120000,
      label: '$',
      contractId: '0x3d15f701',
      chain: 'Arbitrum',
      blockExplorer: 'https://sepolia.arbiscan.io/address/{address}',
      deviation: '3.5',
      heartbeat: '86400000',
      finality: '900000',
      color: '#66ff00',
    },
    'base-sepolia_eth-usd_6': {
      feedFullName: 'base-sepolia_eth-usd_6',
      id: '0x3d15f701',
      abi: [],
      routerAbi: [],
      address: null,
      routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      isRouted: false,
      network: 'base-sepolia',
      name: 'eth/usd',
      networkName: 'Base Sepolia',
      pollingPeriod: 120000,
      label: '$',
      contractId: '0x3d15f701',
      chain: 'Base',
      blockExplorer: 'https://base-sepolia.blockscout.com/{address}',
      deviation: '3.5',
      heartbeat: '86400000',
      finality: '900000',
      color: '#66ff00',
    },
    'base-sepolia_usdt-usd_6': {
      feedFullName: 'base-sepolia_usdt-usd_6',
      id: '0x538f5a25',
      abi: [],
      routerAbi: [],
      address: null,
      routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      isRouted: false,
      network: 'base-sepolia',
      name: 'usdt/usd',
      networkName: 'Base Sepolia',
      pollingPeriod: 120000,
      label: '$',
      contractId: '0x538f5a25',
      chain: 'Base',
      blockExplorer: 'https://base-sepolia.blockscout.com/{address}',
      deviation: '0.1',
      heartbeat: '86400000',
      finality: '900000',
      color: '#66ff00',
    },
    'base-sepolia_wit-usdt_6': {
      feedFullName: 'base-sepolia_wit-usdt_6',
      id: '0xde55fdb1',
      abi: [],
      routerAbi: [],
      address: null,
      routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      isRouted: false,
      network: 'base-sepolia',
      name: 'wit/usdt',
      networkName: 'Base Sepolia',
      pollingPeriod: 120000,
      label: '₮',
      contractId: '0xde55fdb1',
      chain: 'Base',
      blockExplorer: 'https://base-sepolia.blockscout.com/{address}',
      deviation: '1',
      heartbeat: '86400000',
      finality: '900000',
      color: '#66ff00',
    },
  }
  const updatedConfig = {
    'arbitrum-sepolia_eth-usd_6': {
      feedFullName: 'arbitrum-sepolia_eth-usd_6',
      id: '0x3d15f701',
      abi: [],
      routerAbi: [],
      address: null,
      routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      isRouted: false,
      network: 'arbitrum-sepolia',
      name: 'eth/usd',
      networkName: 'Arbitrum Sepolia',
      pollingPeriod: 120000,
      label: '$',
      contractId: '0x3d15f701',
      chain: 'Arbitrum',
      blockExplorer: 'https://sepolia.arbiscan.io/address/{address}',
      deviation: '3.5',
      heartbeat: '86400000',
      finality: '900000',
      color: '#66ff00',
    },
    'base-sepolia_eth-usd_6': {
      feedFullName: 'base-sepolia_eth-usd_6',
      id: '0x3d15f701',
      abi: [],
      routerAbi: [],
      address: null,
      routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      isRouted: false,
      network: 'base-sepolia',
      name: 'eth/usd',
      networkName: 'Base Sepolia',
      pollingPeriod: 120000,
      label: '$',
      contractId: '0x3d15f701',
      chain: 'Base',
      blockExplorer: 'https://base-sepolia.blockscout.com/{address}',
      deviation: '3.5',
      heartbeat: '86400000',
      finality: '900000',
      color: '#66ff00',
    },
    'base-sepolia_usdt-usd_6': {
      feedFullName: 'base-sepolia_usdt-usd_6',
      id: '0x538f5a25',
      abi: [],
      routerAbi: [],
      address: null,
      routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      isRouted: false,
      network: 'base-sepolia',
      name: 'usdt/usd',
      networkName: 'Base Sepolia',
      pollingPeriod: 120000,
      label: '$',
      contractId: '0x538f5a25',
      chain: 'Base',
      blockExplorer: 'https://base-sepolia.blockscout.com/{address}',
      deviation: '0.1',
      heartbeat: '86400000',
      finality: '900000',
      color: '#66ff00',
    },
    'base-sepolia_wit-usdt_6': {
      feedFullName: 'base-sepolia_wit-usdt_6',
      id: '0xde55fdb1',
      abi: [],
      routerAbi: [],
      address: null,
      routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      isRouted: false,
      network: 'base-sepolia',
      name: 'wit/usdt',
      networkName: 'Base Sepolia',
      pollingPeriod: 120000,
      label: '₮',
      contractId: '0xde55fdb1',
      chain: 'Base',
      blockExplorer: 'https://base-sepolia.blockscout.com/{address}',
      deviation: '1',
      heartbeat: '86400000',
      finality: '900000',
      color: '#66ff00',
    },
    'celo-alfajores_btc-usd_6': {
      feedFullName: 'celo-alfajores_btc-usd_6',
      id: '0x24beead4',
      abi: [],
      routerAbi: [],
      address: null,
      routerAddress: '0x1111AbA2164AcdC6D291b08DfB374280035E1111',
      isRouted: false,
      network: 'celo-alfajores',
      name: 'btc/usd',
      networkName: 'Celo Alfajores',
      pollingPeriod: 120000,
      label: '$',
      contractId: '0x24beead4',
      chain: 'Celo',
      blockExplorer: 'https://alfajores.celoscan.io/address/{address}',
      deviation: '3.5',
      heartbeat: '86400000',
      finality: '900000',
      color: '#66ff00',
    },
  }

  it('Updates config by fullname map after updating v2 feeds from the repository', async () => {
    const feedState = new FeedsState()

    feedState.setV2Feeds(v2Feeds)

    const feedRepository = new FeedRepository(feedState)

    expect(baseConfigFullName).toStrictEqual(
      feedRepository.getConfigByFullName(),
    )

    feedRepository.setV2Feeds([...v2Feeds, v2Feed])

    expect(updatedConfig).toStrictEqual(feedRepository.getConfigByFullName())
    expect(updatedConfig).not.toStrictEqual(baseConfigFullName)
  })

  it('Updates config by fullname map after updating v2 feeds from the feed state and then calling initialize', async () => {
    const feedState = new FeedsState()

    feedState.setV2Feeds(v2Feeds)

    const feedRepository = new FeedRepository(feedState)

    expect(baseConfigFullName).toStrictEqual(
      feedRepository.getConfigByFullName(),
    )

    feedState.setV2Feeds([...v2Feeds, v2Feed])
    feedRepository.initialize()

    expect(updatedConfig).toStrictEqual(feedRepository.getConfigByFullName())
    expect(updatedConfig).not.toStrictEqual(baseConfigFullName)
  })

  it('refreshV2NetworkFeeds concats new values in the state instead of overwrite them', () => {
    const feedState = new FeedsState()

    feedState.setV2Feeds(v2Feeds)

    const feedRepository = new FeedRepository(feedState)

    feedRepository.refreshV2NetworkFeeds(v2Feed.network, [v2Feed])

    expect(feedRepository.feedsState.getV2Feeds()).toStrictEqual([
      ...v2Feeds,
      v2Feed,
    ])
  })
})
