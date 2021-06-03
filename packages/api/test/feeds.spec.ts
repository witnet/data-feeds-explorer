import { ApolloServer, gql } from 'apollo-server'
// import { MongoMemoryServer } from 'mongodb-memory-server'
import { createServer } from '../src/server'
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing'

import { MongoManager } from './../src/database'
const state: {
  mongoManager: MongoManager
  testClient: ApolloServerTestClient
  server: ApolloServer
} = {
  mongoManager: null,
  testClient: null,
  server: null
}

describe('user', function () {
  beforeAll(async function () {
    const ciUri= 'mongodb://localhost'
    const mongoManager = new MongoManager()
    const db = await mongoManager.start(process.env.CI ? ciUri : null)
    const server = await createServer(db)
    await new Promise(resolve => {
      server.listen(info => {
        resolve(info)
      })
    })
    state.mongoManager = mongoManager
    state.server = server
    state.testClient = createTestClient(server)
  })

  afterAll(async function () {
    await state.mongoManager.stop()
    await state.server.stop()
  })

  beforeEach(async function () {
    await state.mongoManager.drop()
  })

  it('get feed list without data feeds', async () => {
    await state.mongoManager.db.collection('feed').insertOne({
      address: '1',
      name: 'btc/eur',
      requests: []
    })

    const GET_FEEDS = gql`
      query Feeds {
        feeds {
          id
          address
          name
          requests {
            id
          }
        }
      }
    `
    const {
      data: { feeds }
    } = await state.testClient.query({
      query: GET_FEEDS
    })

    expect(feeds.length).toBe(1)
    expect(feeds[0]).toHaveProperty('address', '1')
    expect(feeds[0]).toHaveProperty('name', 'btc/eur')
    expect(feeds[0]).toHaveProperty('requests', [])
    expect(feeds[0].id).toBeTruthy()
  })

  it('get feed list with data feeds', async () => {
    const feedExample = {
      address: '1',
      name: 'btc/eur',
      requests: []
    }
    const feedResponse = await state.mongoManager.db
      .collection('feed')
      .insertOne(feedExample)
    const priceRequestExample = {
      price: 1000.0,
      feedId: feedResponse.ops[0]._id.toString(),
      requestId: '1',
      timestamp: Date.now().toString()
    }
    const priceRequestResponse = await state.mongoManager.db
      .collection('price_request')
      .insertOne(priceRequestExample)

    await state.mongoManager.db
      .collection('feed')
      .findOneAndUpdate(
        { _id: feedResponse.ops[0]._id },
        { $push: { requests: priceRequestResponse.ops[0]._id.toString() } },
        { returnDocument: 'after' }
      )

    const GET_FEEDS = gql`
      query Feeds {
        feeds {
          id
          address
          name
          requests {
            id
            feedId
            price
            requestId
            timestamp
            error
          }
        }
      }
    `

    const {
      data: { feeds }
    } = await state.testClient.query({
      query: GET_FEEDS
    })

    expect(feeds.length).toBe(1)
    expect(feeds[0]).toHaveProperty('address', feedExample.address)
    expect(feeds[0]).toHaveProperty('name', feedExample.name)
    expect(feeds[0].requests.length).toBe(1)
    expect(feeds[0].requests[0]).toHaveProperty(
      'feedId',
      priceRequestExample.feedId
    )
    expect(feeds[0].requests[0]).toHaveProperty(
      'price',
      priceRequestExample.price
    )
    expect(feeds[0].requests[0]).toHaveProperty(
      'requestId',
      priceRequestExample.requestId
    )
    expect(feeds[0].requests[0]).toHaveProperty(
      'timestamp',
      priceRequestExample.timestamp
    )
    expect(feeds[0].id).toBeTruthy()
  })

  it('get feed', async () => {
    const feedExample = {
      address: '1',
      name: 'btc/usd',
      requests: []
    }
    await state.mongoManager.db.collection('feed').insertOne(feedExample)

    const GET_FEED = gql`
      query Feed($name: String!) {
        feed(name: $name) {
          id
          address
          name
          requests {
            id
          }
        }
      }
    `
    const {
      data: { feed }
    } = await state.testClient.query({
      query: GET_FEED,
      variables: {
        name: 'btc/usd'
      }
    })

    expect(feed).toHaveProperty('address', feedExample.address)
    expect(feed).toHaveProperty('name', feedExample.name)
    expect(feed).toHaveProperty('requests', feedExample.requests)
    expect(feed.id).toBeTruthy()
  })
})
