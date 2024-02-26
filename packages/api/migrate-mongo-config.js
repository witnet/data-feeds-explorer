require('dotenv/config')

const config = {
  mongodb: {
    url: process.env.MONGO_URI,
    databaseName: process.env.MONGO_INITDB_DATABASE,
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
}

module.exports = config
