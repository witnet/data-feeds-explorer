export function generateNavOptions(list) {
  return list
    .map((network) => {
      return {
        name: network[0].chain,
        logo: network[0].logo,
      }
    })
    .sort((chainA, chainB) => chainA.name.localeCompare(chainB.name))
}
