import { generateSelectOptions } from "./generateSelectOptions"

export function getSupportedChains(networks, feeds) {
  if (!networks) {
    return []
  }
  const allFeeds = feeds || []

  return Object.values(generateSelectOptions(networks))
    .filter((network) => network && network[0])
    .map((network) => {
      const { chain, logo } = network[0]
      return {
        name: chain,
        count:
          allFeeds.filter((feed) => feed.chain === chain)
            .length,
        detailsPath: {
          name: 'network',
          params: {
            network: chain.toLowerCase(),
          },
        },
        svg: logo,
      }
    })
    .sort((chainA, chainB) => chainA.name.localeCompare(chainB.name))
}