import { Db, MongoClient } from 'mongodb'

export class MongoManager {
  db: Db
  client: MongoClient

  async start (uri?: string): Promise<Db | null> {
    const mongoDbUri = `${uri || process.env.MONGO_URI}`
    return this.connect(mongoDbUri, process.env.MONGO_INITDB_DATABASE)
  }

  async connect (uri: string, name: string): Promise<Db | null> {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    try {
      await this.client.connect()
      this.db = this.client.db(name)
      return this.db
    } catch (err) {
      console.error(err)
    }
    return null
  }

  async stop (): Promise<void> {
    await this.client.close()
  }

  async drop (): Promise<void> {
    const collections = await this.db.collections()
    for (const collection of collections) {
      await this.db.dropCollection(collection.collectionName)
    }
  }
}
