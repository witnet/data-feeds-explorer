import RSS from 'rss'

import { createFeed } from '../../rss/createFeed'

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: 'Witnet Data Feed Explorer',
    link: 'https://feeds.witnet.io/feed.xml',
    description: 'This is the Witnet data feed explorer feed!',
  })

  const feedInfo = await createFeed()
  // Add information to rss feed
  feedInfo.forEach((f) => {
    feed.item(f)
  })

  const feedString = feed.xml({ indent: true })
  event.res.setHeader('content-type', 'text/xml')
  event.res.end(feedString)
})
