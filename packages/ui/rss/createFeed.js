import axios from 'axios'
import { getFeedDescription } from './getFeedDescription'

export async function createFeed(feed) {
  let dataFeeds
  feed.options = {
    title: 'Witnet Data Feed Explorer',
    link: 'https://feeds.witnet.io/feed.xml',
    description: 'This is the Witnet data feed explorer feed!',
  }
  const feedsQuery = `query feeds {
    feeds (network: "all") {
      feeds {
        feedFullName
        name
        chain
        logo
        networkName
        heartbeat
        finality
        deviation
        isRouted
      }
      total
    }
  }`
  await axios({
    url: process.env.API_ENDPOINT,
    method: 'post',
    data: {
      query: feedsQuery,
    },
  }).then((result) => {
    dataFeeds = result.data.data.feeds.feeds
  })
  if (dataFeeds) {
    dataFeeds.forEach((dataFeed) => {
      const url = `https://feeds.witnet.io/${dataFeed.chain.toLowerCase()}/${
        dataFeed.feedFullName
      }`
      feed.addItem({
        author: {
          name: 'Witnet Foundation',
          email: 'info@witnet.foundation',
          link: 'https://witnet.foundation',
        },
        description: getFeedDescription(dataFeed),
        id: dataFeed.feedFullName,
        link: url,
        title: `${dataFeed.name.toUpperCase()} price feed available on ${
          dataFeed.networkName
        }`,
      })
    })
  }
}
