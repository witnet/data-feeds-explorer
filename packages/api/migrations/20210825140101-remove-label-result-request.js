const dataFeeds = require('../src/dataFeeds.json')

/**
 * Update `feed` and `result-requests` collections adding a new field (feedFullName) to avoid use random generated id.
 * To achieve this, the following changes have been made to `feed` and `result-requests`
 *
 * feed
 *   - `feedFullName` field has been added
 *   - `request` field has been removed
 *
 *  result-requests
 *   - `feedFullName` field has been added
 *   - `feedId` field has been removed
 *   - `label` field has been removed
 *   - `address` field has been removed
 *
 * Models before the migration were:
 *   Feed {
 *     id: String!
 *     name: String!
 *     address: String!
 *     lastResult: String
 *     label: String!
 *     network: String!
 *     requests: [ResultRequest]!
 *     color: String!
 *     blockExplorer: String!
 *   }
 *
 *   ResultRequest {
 *     id: String!
 *     feedId: String!
 *     result: String!
 *     label: String!
 *     requestId: String!
 *     address: String!
 *     timestamp: String!
 *     drTxHash: String!
 *     error: String
 *   }
 *
 * Models after the migration are:
 *
 *   Feed {
 *     id: String!
 *     address: String!
 *     blockExplorer: String!
 *     color: String!
 *     feedFullName: String!
 *     label: String!
 *     name: String!
 *     network: String!
 *   }
 *
 *   ResultRequest {
 *     id: String!
 *     drTxHash: String!
 *     error: String
 *     feedFullName: String!
 *     requestId: String!
 *     result: String!
 *     timestamp: String!
 *   }
 */

module.exports = {
  async up (db, client) {
    const feedInfosByAddress = dataFeeds.reduce(
      (acc, feedInfo) => ({
        ...acc,
        [feedInfo.address]: feedInfo.feedFullName
      }),
      {}
    )
    const promises = dataFeeds.map(async dataFeeds => {
      let feed = await db.collection('feed').findOne({
        address: dataFeeds.address
      })

      if (feed) {
        // add feedFullName and remove requests from feed
        await db.collection('feed').updateMany(
          { address: feed.address },
          {
            $set: { feedFullName: feedInfosByAddress[feed.address] },
            $unset: {
              requests: 1,
              lastResult: 1
            }
          }
        )
        // Remove feedId, label, address and add feedFullName to result-request
        await db.collection('result-request').updateMany(
          { address: feed.address },
          {
            $unset: { feedId: 1, label: 1, address: 1 },
            $set: {
              feedFullName: feedInfosByAddress[feed.address]
            }
          }
        )
      }
    })

    await Promise.all(promises)
  },

  async down (db, client) {}
}
