import { defineStore } from 'pinia'
import { type DataStore, type FeedInfo, type Network } from '@/types'
import {
  getEcosystems,
  getNetworks,
  getAllFeedsRequests,
  getFeedInfo,
  getFeedRequests,
} from '@/api/index'

export const useStore = defineStore('data', {
  state: () =>
    ({
      loadingFeeds: true,
      navBarSelection: [],
      includeTestnets: true,
      ecosystems: [],
      selectedEcosystemName: 'all',
      selectedPair: null,
      selectedEcosystem: [],
      mainnetSelectedEcosystem: [],
      networks: [],
      feeds: [],
      testnetFeeds: [],
      mainnetFeeds: [],
      totalMainnetFeeds: 0,
      totalTestnetFeeds: 0,
      totalFeeds: 0,
      feed: null,
      paginatedFeedRequest: null,
    }) as DataStore,
  actions: {
    async fetchEcosystems() {
      const result = await getEcosystems()
      this.ecosystems = result.feeds
      this.totalFeeds = result.total
      return result
    },
    async fetchAllNetworks() {
      this.networks = (await getNetworks()).networks
      return this.networks
    },
    async fetchFilteredNetworks() {
      await this.fetchAllNetworks()
      await this.fetchFeeds({
        mainnet: null,
        pair: this.selectedPair,
      })
      const networksByPair = this.networks.filter((network: Network) =>
        this.feeds.map((feed: FeedInfo) => feed.network).includes(network.key),
      )
      this.updateNavBarSelection(networksByPair)
      this.selectEcosystem(networksByPair[0].chain)
    },
    handleIncludeTestnets(value: boolean) {
      this.includeTestnets = value
    },
    setSelectedPair(pair: string | null) {
      this.selectedPair = pair
    },
    async updateSelectedFeeds({
      all = false,
      feeds,
      total,
    }: {
      all: boolean
      feeds?: FeedInfo[]
      total?: number
    }) {
      if (all) {
        this.feeds = [...this.mainnetFeeds, ...this.testnetFeeds]
        this.totalFeeds = this.totalMainnetFeeds + this.totalTestnetFeeds
        this.selectedEcosystemName = 'all'
      } else if (feeds && total) {
        this.feeds = feeds
        this.totalFeeds = total
      } else {
        this.feeds = []
        this.totalFeeds = 0
      }
      this.loadingFeeds = false
    },
    async fetchAllFeeds() {
      const mainnetFeeds = await await getAllFeedsRequests({
        network: 'all',
        mainnet: true,
        pair: null,
      })
      const testnetFeeds = await getAllFeedsRequests({
        network: 'all',
        mainnet: false,
        pair: null,
      })
      this.mainnetFeeds = mainnetFeeds.feeds
      this.totalMainnetFeeds = mainnetFeeds.total
      this.testnetFeeds = testnetFeeds.feeds
      this.totalTestnetFeeds = testnetFeeds.total
    },
    async fetchFeeds({
      network = null,
      mainnet,
      pair = null,
    }: {
      network?: Network[] | null
      mainnet: boolean | null
      pair?: string | null
    }) {
      this.loadingFeeds = true
      let result
      if (network && network.length) {
        const allResults = await Promise.all(
          network.map((network) =>
            getAllFeedsRequests({ network: network.key, mainnet, pair }),
          ),
        )
        result = allResults.reduce(
          (acc, result) => {
            return {
              feeds: [...acc.feeds, ...result.feeds],
              total: acc.total + result.total,
            }
          },
          {
            feeds: [],
            total: 0,
          },
        )
      } else {
        result = await getAllFeedsRequests({ network: 'all', mainnet, pair })
      }
      this.updateSelectedFeeds({
        all: false,
        feeds: result.feeds,
        total: result.total,
      })
      return result
    },
    async fetchFeedInfo({
      feedFullName,
      timestamp,
    }: {
      feedFullName: string
      timestamp: number
    }) {
      this.feed = (await getFeedInfo({ feedFullName, timestamp })).feed
      return this.feed
    },
    async fetchPaginatedFeedRequests({
      feedFullName,
      page,
      size,
    }: {
      feedFullName: string
      page: number
      size: number
    }) {
      this.loadingFeeds = true
      const result = await getFeedRequests({
        feedFullName,
        page,
        size,
      })
      this.paginatedFeedRequest = result
      this.loadingFeeds = false
      return this.paginatedFeedRequest
    },
    updateNavBarSelection(navBarNetworks: Network[]) {
      this.navBarSelection = navBarNetworks
    },
    async updateSelectedNetwork({ networks }: { networks: Network[] }) {
      this.selectedEcosystem = networks
      if (networks.length) {
        this.selectedEcosystemName = networks[0].chain
        this.mainnetSelectedEcosystem = networks.filter((ecosystem) => {
          return ecosystem.label.toLocaleLowerCase().includes('mainnet')
        })
        await this.fetchFeeds({
          mainnet: this.includeTestnets ? null : true,
          network: this.selectedEcosystem,
          pair: this.selectedPair,
        })
      } else if (this.mainnetFeeds && this.testnetFeeds) {
        this.feeds = [...this.mainnetFeeds, ...this.testnetFeeds]
        this.totalFeeds = this.totalMainnetFeeds + this.totalTestnetFeeds
      }
    },
    selectEcosystem(name: string) {
      if (name.toLowerCase() === 'all') {
        this.updateSelectedNetwork({ networks: [] })
        this.selectedEcosystemName = 'all'
      } else {
        const selectedEcosystemNetworks = generateSelectOptions(this.networks)[
          name.toLowerCase()
        ]
        this.updateSelectedNetwork({ networks: selectedEcosystemNetworks })
      }
    },
    deleteEmptyNetwork({ index }: { index: number }) {
      this.selectedEcosystem.splice(index, 1)
    },
  },
})
