import { defineStore } from 'pinia'
import {
  getEcosystems,
  getNetworks,
  getAllFeedsRequests,
  getFeedInfo,
  getFeedRequests,
} from '@/api/index'

export type Network = {
  chain: string
  key: string
  label: string
  logo: string
}

export interface DataStore {
  selectedEcosystem: Array<any>
  networks: Array<Network | undefined>
  ecosystems: any
  totalFeeds: any
  feed: any
  paginatedFeedRequest: any
}

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
      this.ecosystems = result.feeds.feeds
      this.totalFeeds = result.feeds.total
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
    updateSelectedNetwork({ networks }: any) {
      this.selectedEcosystem = networks
    },
    deleteEmptyNetwork({ index }: { index: number }) {
      this.selectedEcosystem.splice(index, 1)
    },
  },
})
