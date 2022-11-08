module.exports = {
    async up(db) {
        await Promise.all(
            (await db.collection("result_request").find({
                feedFullName: /conflux-tethys/
            }))
            .map(result => {
                return {
                    ...result,
                    feedFullName: result.feedFullName.replace(
                        /conflux-tethys/, 
                        "conflux-core-mainnet"
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
        await Promise.all(
            (await db.collection("result_request").find({
                feedFullName: /conflux-rinkeby/
            }))
            .map(result => {
                return {
                    ...result,
                    feedFullName: result.feedFullName.replace(
                        /conflux-rinkeby/, 
                        "conflux-core-rinkeby"
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