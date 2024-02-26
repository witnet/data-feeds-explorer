module.exports = {
  async up(db) {
    const resultRequestCollection = db.collection('result_request')
    await Promise.all(
      (await resultRequestCollection.find({ feedFullName: /boba-/ }).toArray())
        .map((resultRequest) => ({
          ...resultRequest,
          feedFullName: resultRequest.feedFullName.replace(
            /boba-/,
            'boba-ethereum-',
          ),
        }))
        .map((resultRequest) =>
          resultRequestCollection.updateOne(
            { _id: resultRequest._id },
            { $set: { feedFullName: resultRequest.feedFullName } },
          ),
        ),
    )
  },
}
