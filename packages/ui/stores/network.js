import { defineStore } from 'pinia'

export const useNetwork = defineStore('network', {
  state: () => ({
    selectedNetwork: [],
  }),
  actions: {
    updateSelectedNetwork(state, network) {
      state.selectedNetwork = network
    },
    deleteEmptyNetwork(state, { index }) {
      state.selectedNetwork.splice(index, 1)
    },
  },
})


