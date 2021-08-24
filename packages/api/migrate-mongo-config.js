require('dotenv/config')

const config = {
  mongodb: {
    url: process.env.MONGO_URI,
    databaseName: process.env.MONGO_INITDB_DATABASE,
    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true // removes a deprecating warning when connecting
    }
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false
}

module.exports = config
