module.exports = {
  async up (db) {
    const resultRequestCollection = db.collection('result_request')
    const updateConfluxTethysPromises = (
      await resultRequestCollection
        .find({ feedFullName: /conflux-tethys/ })
        .toArray()
    )
      .map(resultRequest => ({
        ...resultRequest,
        feedFullName: resultRequest.feedFullName.replace(
          /conflux-tethys/,
          'conflux-core-mainnet'
        )
      }))
      .map(resultRequest =>
        resultRequestCollection.updateOne(
          { _id: resultRequest._id },
          { $set: { feedFullName: resultRequest.feedFullName } }
        )
      )
    const updateConfluxRinkebyPromises = (
      await resultRequestCollection.find({
        feedFullName: /conflux-testnet/
      })
    )
      .map(resultRequest => ({
        ...resultRequest,
        feedFullName: resultRequest.feedFullName.replace(
          /conflux-testnet/,
          'conflux-core-testnet'
        )
      }))
      .map(resultRequest =>
        resultRequestCollection.updateOne(
          { _id: resultRequest._id },
          { $set: { feedFullName: resultRequest.feedFullName } }
        )
      )
    await Promise.all(
      [updateConfluxTethysPromises, updateConfluxRinkebyPromises].flat()
    )
  }
}
