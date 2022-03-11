export function generateNavOptions(list) {
  if (!list) return {}
  return list.reduce((chainByNetwork, network) => {
    const chain = network[0].chain
    chainByNetwork.push(chain)
    console.log('....', chainByNetwork)
    return chainByNetwork
  }, [])
}
