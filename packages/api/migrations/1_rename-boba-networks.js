module.exports = {
    async up(db) {
        return Promise.all(
            (await db.collection("result_request").find({
                feedFullName: /boba-/
            }))
            .map(result => {
                return {
                    ...result,
                    feedFullName: result.feedFullName.replace(
                        /boba-/, 
                        "boba-ethereum-"
                    )
                }
            })
            .map(result => {
                return db.updateOne(
                    { _id: result._id },
                    { $set: { feedFullName: result.feedFullName }}
                )
            })
        )
    }
}