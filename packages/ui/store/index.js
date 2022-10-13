export const state = () => ({
  selectedNetwork: [],
  networks: {},
})

export const mutations = {
  updateSelectedNetwork(state, { network }) {
    state.selectedNetwork = network
  },
  deleteEmptyNetwork(state, { index }) {
    state.selectedNetwork.splice(index, 1)
  },
  setNetworks(state, { networks }) {
    state.networks = networks
  },
}
