const dataFeeds = require('../src/dataFeeds.json')

/**
 * Rename network names to discern between different chains and their networks
 */
module.exports = {
  async up (db, client) {
    const networksByFeedFullName = dataFeeds.reduce(
      (acc, feedInfo) => ({
        ...acc,
        [feedInfo.feedFullName]: feedInfo.network
      }),
      {}
    )

    const promises = dataFeeds.map(async dataFeed => {
      await db.collection('feed').updateMany(
        {
          feedFullName: dataFeed.feedFullName 
        },
        { $set: {
           network: networksByFeedFullName[dataFeed.feedFullName] }
        }
      )
    })

    await Promise.all(promises)
  },

  async down (db, client) {}
}
