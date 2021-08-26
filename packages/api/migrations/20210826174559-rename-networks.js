const dataFeeds = require('../src/dataFeeds.json')

/**
 * Rename network names to discern between different chains and their networks
 */
module.exports = {
  async up (db, client) {
    const feedInfosByFeedFullName = dataFeeds.reduce(
      (acc, feedInfo) => ({
        ...acc,
        [feedInfo.feedFullName]: feedInfo.network
      }),
      {}
    )

    const promises = dataFeeds.map(async dataFeed => {
      await db.collection('feed').updateOne(
        {
          feedFullName: feedInfosByFeedFullName[dataFeed].feedFullName
        },
        { network: feedInfosByFeedFullName[dataFeed.feedFullName].network }
      )
    })

    await Promise.all(promises)
  },

  async down (db, client) {}
}
