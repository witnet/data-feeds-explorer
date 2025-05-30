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
      navBarSelection: [],
      includeTestnets: true,
      ecosystems: [],
      selectedEcosystemName: 'ethereum',
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
    handleIncludeTestnets(value: boolean) {
      this.includeTestnets = value
    },
    setSelectedPair(pair: string | null) {
      this.selectedPair = pair
    },
    async getFilteredFeeds() {
      await this.fetchFeeds({
        mainnet: !this.includeTestnets,
        network: this.selectedEcosystem,
        pair: this.selectedPair,
      })
    },
    async updateSelectedFeeds({
      feeds,
      total,
    }: {
      feeds: FeedInfo[]
      total: number
    }) {
      this.feeds = feeds
      this.totalFeeds = total
    },
    async fetchAllFeeds() {
      const mainnetFeeds = await await getAllFeedsRequests({
        network: 'all',
        mainnet: true,
        pair: null,
      })
      const testnetFeeds = await getAllFeedsRequests({
        network: 'all',
        mainnet: true,
        pair: null,
      })
      this.mainnetFeeds = mainnetFeeds.feeds
      this.totalMainnetFeeds = mainnetFeeds.total
      this.testnetFeeds = testnetFeeds.feeds
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
      this.updateSelectedFeeds({ feeds: result.feeds, total: result.total })
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
      const result = await getFeedRequests({
        feedFullName,
        page,
        size,
      })
      this.paginatedFeedRequest = result
      return this.paginatedFeedRequest
    },
    updateNavBarSelection(navBarNetworks: Network[]) {
      this.navBarSelection = navBarNetworks
    },
    updateSelectedNetwork({ networks }: { networks: Network[] | [] }) {
      this.selectedEcosystem = networks
      if (networks.length) {
        this.selectedEcosystemName = networks[0].chain
        this.mainnetSelectedEcosystem = networks.filter((ecosystem) => {
          return ecosystem.label.toLocaleLowerCase().includes('mainnet')
        })
      }
      this.getFilteredFeeds()
    },
    selectEcosystem(name: string) {
      const selectedEcosystemNetworks = generateSelectOptions(this.networks)[
        name.toLowerCase()
      ]
      this.updateSelectedNetwork({ networks: selectedEcosystemNetworks })
    },
    deleteEmptyNetwork({ index }: { index: number }) {
      this.selectedEcosystem.splice(index, 1)
    },
  },
})
