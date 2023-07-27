import { defineStore } from 'pinia'

export const useNetwork = defineStore('network', {
  state: () => ({
    selectedNetwork: [],
  }),
  actions: {
    updateSelectedNetwork(network) {
      debugger
      this.selectedNetwork = network
    },
    deleteEmptyNetwork({ index }) {
      this.selectedNetwork.splice(index, 1)
    },
  },
})


