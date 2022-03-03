import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'

export function generateSelectOptions(list) {
  if (!list) return {}
  return list.reduce((chainByNetwork, chain) => {
    const network = chain.label.split('-')[0]
    const networkDetails = {
      label: chain.label,
      key: chain.label.split('-').map(capitalizeFirstLetter).join(' '),
      network: capitalizeFirstLetter(network),
    }
    // Initialize network entry if not exists
    if (!chainByNetwork[network]) {
      chainByNetwork[network] = []
    }
    chainByNetwork[network].push(networkDetails)
    return chainByNetwork
  }, {})
}
