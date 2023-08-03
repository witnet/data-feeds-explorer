import axios from 'axios'
import { getFeedDescription } from './getFeedDescription'

export async function createFeed() {
  let dataFeeds

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
    url: import.meta.env.VITE_API_ENDPOINT,
    method: 'post',
    data: {
      query: feedsQuery,
    },
  }).then((result) => {
    dataFeeds = result.data.data.feeds.feeds
  })

  if (dataFeeds) {
    return dataFeeds.map((dataFeed) => {
      const url = `https://feeds.witnet.io/${dataFeed.chain.toLowerCase()}/${
        dataFeed.feedFullName
      }`
      return ({
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
  } else return []
}
