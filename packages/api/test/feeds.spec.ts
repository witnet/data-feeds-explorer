import { ApolloServer, gql } from 'apollo-server'
import { createServer } from '../src/server'
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing'

import { MongoManager } from './../src/database'
import { FeedRepository } from '../src/repository/Feed'
import { ResultRequestRepository } from '../src/repository/ResultRequest'

const state: {
  mongoManager: MongoManager
  testClient: ApolloServerTestClient
  server: ApolloServer
} = {
  mongoManager: null,
  testClient: null,
  server: null
}

describe('feeds', function () {
  beforeAll(async function () {
    const ciUri = 'mongodb://localhost'
    const mongoManager = new MongoManager()
    const db = await mongoManager.start(process.env.CI ? ciUri : null)
    const server = await createServer({
      feedRepository: new FeedRepository(db),
      resultRequestRepository: new ResultRequestRepository(db)
    })
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
      network: 'mainnet',
      label: '$',
      requests: []
    })

    const GET_FEEDS = gql`
      query feeds($page: Int!, $pageSize: Int!) {
        feeds(page: $page, pageSize: $pageSize) {
          feeds {
            id
            name
            address
            lastResult
            network
            label
          }
          total
        }
      }
    `
    const {
      data: {
        feeds: { feeds }
      }
    } = await state.testClient.query({
      query: GET_FEEDS,
      variables: {
        page: 1,
        pageSize: 6
      }
    })

    expect(feeds.length).toBe(1)
    expect(feeds[0]).toHaveProperty('address', '1')
    expect(feeds[0]).toHaveProperty('name', 'btc/eur')
    expect(feeds[0].id).toBeTruthy()
  })

  it('get feed list with data feeds', async () => {
    const feedExample = {
      address: '1',
      name: 'btc/eur',
      requests: [],
      label: '$',
      network: 'mainnet'
    }
    const feedResponse = await state.mongoManager.db
      .collection('feed')
      .insertOne(feedExample)
    const resultRequestExample1 = {
      result: '1111.0',
      feedId: feedResponse.ops[0]._id.toString(),
      requestId: '1',
      timestamp: '1623085320000'
    }
    const resultRequestExample2 = {
      result: '2222.0',
      feedId: feedResponse.ops[0]._id.toString(),
      requestId: '1',
      timestamp: '1623085329000'
    }
    const resultRequestResponse1 = await state.mongoManager.db
      .collection('result_request')
      .insertOne(resultRequestExample1)
    const resultRequestResponse2 = await state.mongoManager.db
      .collection('result_request')
      .insertOne(resultRequestExample2)

    await state.mongoManager.db
      .collection('feed')
      .findOneAndUpdate(
        { _id: feedResponse.ops[0]._id },
        { $push: { requests: resultRequestResponse1.ops[0]._id.toString() } },
        { returnDocument: 'after' }
      )
    await state.mongoManager.db
      .collection('feed')
      .findOneAndUpdate(
        { _id: feedResponse.ops[0]._id },
        { $push: { requests: resultRequestResponse2.ops[0]._id.toString() } },
        { returnDocument: 'after' }
      )

    const GET_FEEDS = gql`
      query feeds($page: Int!, $pageSize: Int!, $id: String!) {
        feeds(page: $page, pageSize: $pageSize) {
          feeds {
            id
            name
            address
            lastResult
            network
            label
            requests (feedId: $id, page: $page, size: $pageSize){
              id
              feedId
              result
              requestId
              timestamp
              error
            }
          }
          total
        }
      }
    `

    const {
      data: {
        feeds: { feeds }
      }
    } = await state.testClient.query({
      query: GET_FEEDS,
      variables: {
        page: 1,
        pageSize: 6,
        id: feedResponse.ops[0]._id.toString(),
      }
    })
    expect(feeds.length).toBe(1)
    expect(feeds[0]).toHaveProperty('address', feedExample.address)
    expect(feeds[0]).toHaveProperty('name', feedExample.name)
    expect(feeds[0]).toHaveProperty('lastResult', resultRequestExample2.result)
    expect(feeds[0].requests.length).toBe(2)
    expect(feeds[0].requests[0]).toHaveProperty(
      'feedId',
      resultRequestExample1.feedId
    )
    expect(feeds[0].requests[0]).toHaveProperty(
      'result',
      resultRequestExample1.result
    )
    expect(feeds[0].requests[0]).toHaveProperty(
      'requestId',
      resultRequestExample1.requestId
    )
    expect(feeds[0].requests[0]).toHaveProperty(
      'timestamp',
      resultRequestExample1.timestamp
    )
    expect(feeds[0].id).toBeTruthy()
  })

  it('get feed', async () => {
    const feedExample = {
      address: '1',
      name: 'btc/usd',
      requests: []
    }
    const result = await state.mongoManager.db
      .collection('feed')
      .insertOne(feedExample)

    const { _id } = result.ops[0]

    const GET_FEED = gql`
      query Feed($id: String!, $page: Int!, $size: Int!) {
        feed(id: $id) {
          id
          name
          address
          requests(feedId: $id, page: $page, size: $size) {
            feedId
          }
        }
      }
    `
    const {
      data: { feed }
    } = await state.testClient.query({
      query: GET_FEED,
      variables: {
        id: _id.toString(),
        page: 1,
        size: 3,
      }
    })

    expect(feed).toHaveProperty('address', feedExample.address)
    expect(feed).toHaveProperty('name', feedExample.name)
    expect(feed).toHaveProperty('requests', feedExample.requests)
    expect(feed.id).toBeTruthy()
  })
})
