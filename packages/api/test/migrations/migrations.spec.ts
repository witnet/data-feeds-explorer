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

describe('migration-update', function () {
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
      network: dataFeeds[0].network,
      requests: [],
      color: dataFeeds[0].color,
      blockExplorer: dataFeeds[0].blockExplorer
    }
    const feed2 = {
      name: dataFeeds[1].name,
      address: dataFeeds[1].address,
      lastResult: '100000',
      label: dataFeeds[1].label,
      network: dataFeeds[1].network,
      requests: [],
      color: dataFeeds[1].color,
      blockExplorer: dataFeeds[1].blockExplorer
    }
    const resultRequest1 = {
      drTxHash: 'drTxHash',
      error: 'error',
      address: dataFeeds[0].address,
      requestId: 'requestId',
      result: '100',
      timestamp: 1629901812540,
      label: dataFeeds[0].address,
      feedId: 'feedId1'
    }
    const resultRequest2 = {
      drTxHash: 'drTxHash',
      error: 'error',
      address: dataFeeds[1].address,
      requestId: 'requestId',
      result: '100',
      timestamp: 1629901812540,
      label: 'label2',
      feedId: 'feedId2'
    }

    beforeEach(async () => {
      await state.db.collection('feed').insertMany([feed1, feed2])
      await state.db
        .collection('result-request')
        .insertMany([resultRequest1, resultRequest2])

      await state.db
        .collection('result-request')
        .find({})
        .toArray()

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
        expect(updated[0]).toHaveProperty('network', feed1.network)
        expect(updated[0]).toHaveProperty('color', feed1.color)
        expect(updated[0]).toHaveProperty('blockExplorer', feed1.blockExplorer)
        expect(updated[1]).toHaveProperty('name', feed2.name)
        expect(updated[1]).toHaveProperty('address', feed2.address)
        expect(updated[1]).toHaveProperty('label', feed2.label)
        expect(updated[1]).toHaveProperty('network', feed2.network)
        expect(updated[1]).toHaveProperty('color', feed2.color)
        expect(updated[1]).toHaveProperty('blockExplorer', feed2.blockExplorer)
      })

      it('should add feedFullName', async () => {
        const updated = await state.db
          .collection('feed')
          .find({})
          .toArray()

        expect(updated[0]).toHaveProperty(
          'feedFullName',
          dataFeeds[0].feedFullName
        )
        expect(updated[1]).toHaveProperty(
          'feedFullName',
          dataFeeds[1].feedFullName
        )
      })

      it('should remove requests field', async () => {
        await up(state.db)

        const updated = await state.db
          .collection('feed')
          .find({})
          .toArray()

        expect(updated[0]).not.toHaveProperty('requests')
        expect(updated[1]).not.toHaveProperty('requests')
      })

      it('should remove lastResult field', async () => {
        await up(state.db)

        const updated = await state.db
          .collection('feed')
          .find({})
          .toArray()

        expect(updated[0]).not.toHaveProperty('lastResult')
        expect(updated[1]).not.toHaveProperty('lastResult')
      })
    })

    describe('Result requests', () => {
      it('should not change unnecessary fields', async () => {
        await up(state.db)

        const updated = await state.db
          .collection('result-request')
          .find({})
          .toArray()

        expect(updated[0]).toHaveProperty('drTxHash', resultRequest1.drTxHash)
        expect(updated[0]).toHaveProperty('error', resultRequest1.error)
        expect(updated[0]).toHaveProperty('requestId', resultRequest1.requestId)
        expect(updated[0]).toHaveProperty('result', resultRequest1.result)
        expect(updated[0]).toHaveProperty('timestamp', resultRequest1.timestamp)
        expect(updated[1]).toHaveProperty('drTxHash', resultRequest2.drTxHash)
        expect(updated[1]).toHaveProperty('error', resultRequest2.error)
        expect(updated[1]).toHaveProperty('requestId', resultRequest2.requestId)
        expect(updated[1]).toHaveProperty('result', resultRequest2.result)
        expect(updated[1]).toHaveProperty('timestamp', resultRequest2.timestamp)
      })

      it('should remove label from result request', async () => {
        await up(state.db)

        const updated = await state.db
          .collection('result-request')
          .find({})
          .toArray()

        expect(updated[0]).not.toHaveProperty('label')
        expect(updated[1]).not.toHaveProperty('label')
      })

      it('should remove feedId from result request', async () => {
        await up(state.db)

        const updated = await state.db
          .collection('result-request')
          .find({})
          .toArray()

        expect(updated[0]).not.toHaveProperty('feedId')
        expect(updated[1]).not.toHaveProperty('feedId')
      })

      it('should add feedFullName to result request', async () => {
        await up(state.db)

        const updated = await state.db
          .collection('result-request')
          .find({})
          .toArray()

        expect(updated[0]).toHaveProperty(
          'feedFullName',
          dataFeeds[0].feedFullName
        )
        expect(updated[1]).toHaveProperty(
          'feedFullName',
          dataFeeds[1].feedFullName
        )
      })
    })
  })
})
