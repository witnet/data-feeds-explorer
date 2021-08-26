import { Db } from 'mongodb'
import { up } from '../../migrations/20210825140101-remove-label-result-request'
import { MongoManager } from '../../src/database'

import dataFeeds from '../../src/dataFeeds.json'

const state: {
  mongoManager: MongoManager
  db: Db
} = {
  mongoManager: null,
  db: null
}

describe('rename-networks', function () {
  beforeAll(async function () {
    const ciUri = 'mongodb://localhost'
    const mongoManager = new MongoManager()
    const db = await mongoManager.start(process.env.CI ? ciUri : null)

    state.mongoManager = mongoManager
    state.db = db
  })

  afterAll(async function () {
    await state.mongoManager.stop()
  })

  beforeEach(async function () {
    await state.mongoManager.drop()
  })

  describe('up', () => {
    const feed1 = {
      name: dataFeeds[0].name,
      address: dataFeeds[0].address,
      lastResult: '100000',
      label: dataFeeds[0].label,
      network: 'wrong-network-1',
      requests: [],
      color: dataFeeds[0].color,
      blockExplorer: dataFeeds[0].blockExplorer
    }
    const feed2 = {
      name: dataFeeds[1].name,
      address: dataFeeds[1].address,
      lastResult: '100000',
      label: dataFeeds[1].label,
      network: 'wrong-network-2',
      requests: [],
      color: dataFeeds[1].color,
      blockExplorer: dataFeeds[1].blockExplorer
    }

    beforeEach(async () => {
      await state.db.collection('feed').insertMany([feed1, feed2])

      await up(state.db)
    })

    describe('feeds', () => {
      it('should not change unnecessary fields', async () => {
        const updated = await state.db
          .collection('feed')
          .find({})
          .toArray()

        expect(updated[0]).toHaveProperty('name', feed1.name)
        expect(updated[0]).toHaveProperty('address', feed1.address)
        expect(updated[0]).toHaveProperty('label', feed1.label)
        expect(updated[0]).toHaveProperty('color', feed1.color)
        expect(updated[0]).toHaveProperty('blockExplorer', feed1.blockExplorer)
        expect(updated[1]).toHaveProperty('name', feed2.name)
        expect(updated[1]).toHaveProperty('address', feed2.address)
        expect(updated[1]).toHaveProperty('label', feed2.label)
        expect(updated[1]).toHaveProperty('color', feed2.color)
        expect(updated[1]).toHaveProperty('blockExplorer', feed2.blockExplorer)
      })

      it('should rename network', async () => {
        const updated = await state.db
          .collection('feed')
          .find({})
          .toArray()

        expect(updated[0]).toHaveProperty('network', dataFeeds[0].network)
        expect(updated[1]).toHaveProperty('feedFullName', dataFeeds[1].network)
      })
    })
  })
})
