export function generateSelectOptions(list) {
  if (!list) return {}
  return list.reduce((chainByNetwork, network) => {
    const chain = network.chain
    // Initialize network entry if not exists
    if (!chainByNetwork[chain]) {
      chainByNetwork[chain] = []
    }
    chainByNetwork[chain].push(network)
    return chainByNetwork
  }, {})
}
