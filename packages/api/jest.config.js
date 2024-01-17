// require('dotenv/config')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    // See https://stackoverflow.com/a/73203803
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid')
  }
}
