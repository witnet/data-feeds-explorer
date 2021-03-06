export const state = () => ({
  selectedNetwork: [],
})

export const mutations = {
  updateSelectedNetwork(state, { network }) {
    state.selectedNetwork = network
  },
  deleteEmptyNetwork(state, { index }) {
    state.selectedNetwork.splice(index, 1)
  },
}
