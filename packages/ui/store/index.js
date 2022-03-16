export const state = () => ({
  selectedNetwork: [
    {
      label: 'Ethereum Mainnet',
      key: 'ethereum-mainnet',
      chain: 'Ethereum',
    },
  ],
})

export const mutations = {
  updateSelectedNetwork(state, { network }) {
    state.selectedNetwork = network
  },
  deleteEmptyNetwork(state, { index }) {
    state.selectedNetwork.splice(index, 1)
  },
}
