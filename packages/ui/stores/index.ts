import { defineStore } from 'pinia'
import { type DataStore, type Network } from '@/types'
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
      selectedEcosystem: [],
      selectedEcosystemName: 'ethereum',
      networks: [],
      ecosystems: [],
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
    async fetchNetworks() {
      this.networks = (await getNetworks()).networks
      return this.networks
    },
    async fetchFeeds({
      network = null,
      mainnet,
      pair = null,
    }: {
      network?: string | null
      mainnet: boolean | null
      pair?: string | null
    }) {
      return (await getAllFeedsRequests({ network, mainnet, pair })).feeds
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
    updateSelectedNetwork({ networks }: { networks: Network[] | [] }) {
      this.selectedEcosystem = networks
      if (networks.length) {
        this.selectedEcosystemName = networks[0].chain
      }
    },
    deleteEmptyNetwork({ index }: { index: number }) {
      this.selectedEcosystem.splice(index, 1)
    },
  },
})
