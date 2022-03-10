export const state = () => ({
  selectedNetwork: [
    {
      label: 'ethereum-mainnet',
      key: 'Ethereum Mainnet',
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
