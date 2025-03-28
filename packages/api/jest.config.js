import dotenv from 'dotenv'
dotenv.config({ path: '.test.env' })

import { v4 as uuid } from 'uuid'

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    // See https://stackoverflow.com/a/73203803
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: uuid,
  },
}
