export function sortByNetwork(feeds) {
  return feeds.sort((firstFeed, secondFeed) => {
    if (
      firstFeed.network.includes('ethereum-mainnet') &&
      !secondFeed.network.includes('ethereum-mainnet')
    ) {
      return -1
    } else if (
      firstFeed.network.includes('ethereum') &&
      !secondFeed.network.includes('ethereum')
    ) {
      return -1
    } else {
      return 0
    }
  })
}
