import { ApolloServer, gql } from 'apollo-server'
import { createServer } from '../src/server'
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing'
import { getTimestampByRange } from './utils/getTimestampByRange'
import { CHART_RANGE } from './constants'
import { MongoManager } from './../src/database'
import { FeedRepository } from '../src/repository/Feed'
import { ResultRequestRepository } from '../src/repository/ResultRequest'
import fs from 'fs'
import path from 'path'

const dataFeeds = JSON.parse(
  fs.readFileSync(
    path.resolve('./test/web3Middleware/dataFeeds.json'),
    'utf-8'
  )
)
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

    const server = await createServer(
      {
        feedRepository: new FeedRepository(db, dataFeeds),
        resultRequestRepository: new ResultRequestRepository(db, dataFeeds)
      },
      dataFeeds
    )
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
    const dataFeed = dataFeeds[0]
    await state.mongoManager.db.collection('feed').insertOne(dataFeed)

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
    expect(feeds[0]).toHaveProperty('address', dataFeed.address)
    expect(feeds[0]).toHaveProperty('name', dataFeed.name)
    expect(feeds[0].id).toBeTruthy()
  })

  it('get feed list with data feeds', async () => {
    const dataFeed = dataFeeds[0]
    await state.mongoManager.db.collection('feed').insertOne(dataFeed)

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
    expect(feeds[0]).toHaveProperty('address', dataFeed.address)
    expect(feeds[0]).toHaveProperty('name', dataFeed.name)
    expect(feeds[0]).toHaveProperty('network', dataFeed.network)
    expect(feeds[0].id).toBeTruthy()
  })

  it('get feed', async () => {
    const feedResponse = await state.mongoManager.db
      .collection('feed')
      .insert(dataFeeds[0])

    const { _id } = feedResponse.ops[0]

    const resultRequestExample1 = {
      result: '1111.0',
      feedId: _id.toString(),
      requestId: '1',
      timestamp: (getTimestampByRange(CHART_RANGE.m.value) + 10).toString(),
      address: '0x58995FaD03158fB9cd64397347bA97714EF8fC12',
      drTxHash:
        '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532372bae88a',
      label: '$'
    }
    const resultRequestExample2 = {
      result: '2222.0',
      feedId: _id.toString(),
      requestId: '1',
      timestamp: (getTimestampByRange(CHART_RANGE.m.value) + 10).toString(),
      address: '0x58995FaD03158fB9cd64397347bA97714EF9fC12',
      drTxHash:
        '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532072bae88a',
      label: '$'
    }
    const resultRequestResponse1 = await state.mongoManager.db
      .collection('result_request')
      .insert(resultRequestExample1)
    const resultRequestResponse2 = await state.mongoManager.db
      .collection('result_request')
      .insert(resultRequestExample2)
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
    const GET_FEED = gql`
      query Feed($id: String!, $timestamp: Int!) {
        feed(id: $id) {
          id
          name
          address
          lastResult
          network
          label
          requests(id: $id, timestamp: $timestamp) {
            feedId
            result
            drTxHash
            requestId
            timestamp
          }
          blockExplorer
          color
        }
      }
    `
    const {
      data: { feed }
    } = await state.testClient.query({
      query: GET_FEED,
      variables: {
        id: _id.toString(),
        timestamp: getTimestampByRange(CHART_RANGE.m.value)
      }
    })

    expect(feed).toHaveProperty('address', feed.address)
    expect(feed).toHaveProperty('name', feed.name)
    expect(feed).toHaveProperty('requests', feed.requests)
    expect(feed.requests).toHaveLength(2)
    expect(feed.id).toBeTruthy()
  })

  it('get feeds with range 7d', async () => {
    const feedResponse = await state.mongoManager.db
      .collection('feed')
      .insert(dataFeeds[0])

    const { _id } = feedResponse.ops[0]

    const resultRequestExample1 = {
      result: '1111.0',
      feedId: _id.toString(),
      requestId: '1',
      timestamp: (getTimestampByRange(CHART_RANGE.w.value) + 10).toString(),
      address: '0x58995FaD03158fB9cd64397347bA97714EF8fC12',
      drTxHash:
        '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532372bae88a',
      label: '$'
    }
    const resultRequestExample2 = {
      result: '2222.0',
      feedId: _id.toString(),
      requestId: '1',
      timestamp: (getTimestampByRange(CHART_RANGE.m.value) + 10).toString(),
      address: '0x58995FaD03158fB9cd64397347bA97714EF9fC12',
      drTxHash:
        '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532072bae88a',
      label: '$'
    }
    const resultRequestResponse1 = await state.mongoManager.db
      .collection('result_request')
      .insert(resultRequestExample1)
    const resultRequestResponse2 = await state.mongoManager.db
      .collection('result_request')
      .insert(resultRequestExample2)
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
    const GET_FEED = gql`
      query Feed($id: String!, $timestamp: Int!) {
        feed(id: $id) {
          id
          name
          address
          lastResult
          network
          label
          requests(id: $id, timestamp: $timestamp) {
            feedId
            result
            drTxHash
            requestId
            timestamp
          }
          blockExplorer
          color
        }
      }
    `
    const {
      data: { feed }
    } = await state.testClient.query({
      query: GET_FEED,
      variables: {
        id: _id.toString(),
        timestamp: getTimestampByRange(CHART_RANGE.w.value)
      }
    })

    expect(feed).toHaveProperty('address', feed.address)
    expect(feed).toHaveProperty('name', feed.name)
    expect(feed).toHaveProperty('requests', feed.requests)
    expect(feed.requests[0].timestamp).toBe(resultRequestExample1.timestamp)
    expect(feed.id).toBeTruthy()
  })

  it('get feeds with range 30d', async () => {
    const feedResponse = await state.mongoManager.db
      .collection('feed')
      .insert(dataFeeds[0])

    const { _id } = feedResponse.ops[0]

    const resultRequestExample1 = {
      result: '1111.0',
      feedId: _id.toString(),
      requestId: '1',
      timestamp: (getTimestampByRange(CHART_RANGE.w.value) + 10).toString(),
      address: '0x58995FaD03158fB9cd64397347bA97714EF8fC12',
      drTxHash:
        '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532372bae88a',
      label: '$'
    }
    const resultRequestExample2 = {
      result: '2222.0',
      feedId: _id.toString(),
      requestId: '1',
      timestamp: (getTimestampByRange(CHART_RANGE.m.value) + 10).toString(),
      address: '0x58995FaD03158fB9cd64397347bA97714EF9fC12',
      drTxHash:
        '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532072bae88a',
      label: '$'
    }
    const resultRequestResponse1 = await state.mongoManager.db
      .collection('result_request')
      .insert(resultRequestExample1)
    const resultRequestResponse2 = await state.mongoManager.db
      .collection('result_request')
      .insert(resultRequestExample2)
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
    const GET_FEED = gql`
      query Feed($id: String!, $timestamp: Int!) {
        feed(id: $id) {
          id
          name
          address
          lastResult
          network
          label
          requests(id: $id, timestamp: $timestamp) {
            feedId
            result
            drTxHash
            requestId
            timestamp
          }
          blockExplorer
          color
        }
      }
    `
    const {
      data: { feed }
    } = await state.testClient.query({
      query: GET_FEED,
      variables: {
        id: _id.toString(),
        timestamp: getTimestampByRange(CHART_RANGE.m.value)
      }
    })

    expect(feed).toHaveProperty('address', feed.address)
    expect(feed).toHaveProperty('name', feed.name)
    expect(feed).toHaveProperty('requests', feed.requests)
    expect(feed.requests).toHaveLength(2)
    expect(feed.requests[0].timestamp).toBe(resultRequestExample1.timestamp)
    expect(feed.requests[1].timestamp).toBe(resultRequestExample2.timestamp)
    expect(feed.id).toBeTruthy()
  })

  it('get only feeds specified in the data feed list', async () => {
    await state.mongoManager.db.collection('feed').insertOne(dataFeeds[0])
    await state.mongoManager.db.collection('feed').insertOne({
      ...dataFeeds[1],
      address: 'fabadaacabada'
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
  })
})
