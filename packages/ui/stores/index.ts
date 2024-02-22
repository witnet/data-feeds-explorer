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
    },
    async fetchNetworks() {
      this.networks = (await getNetworks()).networks
    },
    async fetchFeeds({ network }: { network: any }) {
      return (await getAllFeedsRequests({ network })).feeds
    },
    async fetchFeedInfo({
      feedFullName,
      timestamp,
    }: {
      feedFullName: string
      timestamp: number
    }) {
      this.feed = (await getFeedInfo({ feedFullName, timestamp })).feed
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
      this.paginatedFeedRequest = result.requests
    },
    updateSelectedNetwork({ networks }: { networks: Network[] | [] }) {
      this.selectedEcosystem = networks
    },
    deleteEmptyNetwork({ index }: { index: number }) {
      this.selectedEcosystem.splice(index, 1)
    },
  },
})
