import { defineStore } from 'pinia'

export const useNetwork = defineStore('network', {
  state: () => ({
    selectedNetwork: [],
  }),
  actions: {
    updateSelectedNetwork(network) {
      this.selectedNetwork = network
    },
    deleteEmptyNetwork({ index }) {
      this.selectedNetwork.splice(index, 1)
    },
  },
})


