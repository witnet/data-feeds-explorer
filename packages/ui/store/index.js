export const state = () => ({
  selectedNetwork: [
    {
      label: 'ethereum-mainnet',
      key: 'Ethereum Mainnet',
      network: 'Ethereum',
    },
  ],
  updateFromMain: true,
})

export const mutations = {
  updateSelectedNetwork(state, { network }) {
    state.selectedNetwork = network
  },
  // TODO: refactor with cleaner approach
  updateFromNavBar(state) {
    state.updateFromMain = false
  },
  deleteEmptyNetwork(state, { index }) {
    state.selectedNetwork.splice(index, 1)
  },
}
