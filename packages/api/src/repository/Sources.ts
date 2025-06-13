import {
  SourcesDbObject,
  Db,
  Collection,
  WithoutId,
} from '../../types.js'

export class SourcesRepository {
  collection: Collection<
    SourcesDbObject | WithoutId<SourcesDbObject>
  >

  constructor(db: Db) {
    this.collection = db.collection('sources')
  }

  async getSources(
    feedFullName: string,
  ): Promise<SourcesDbObject | null> {
    const sources = await this.collection
      .findOne(
        {
          feedFullName,
        },
      )
      .catch((e) => {
        console.log(`Error in getSources: ${feedFullName}`, e)
        return null
      })
    return sources
  }

  async insertSources(
    feedFullName: string,
    sources: Array<string>,
  ): Promise<null> {
    await this.collection
      .updateOne(
        {
          feedFullName,
        },
        { 
            $set: {
                feedFullName,
                sources, 
            },
        },
        {
            upsert: true
        },
      )
      .catch((e) => {
        console.log(`Error in insertSources: ${feedFullName}`, e)
        return null
      })
      return null
  }

}
