import dotenv from 'dotenv'
dotenv.config()

export const config = {
  mongodb: {
    url: dotenv.env.MONGO_URI,
    databaseName: dotenv.env.MONGO_INITDB_DATABASE,
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
}
