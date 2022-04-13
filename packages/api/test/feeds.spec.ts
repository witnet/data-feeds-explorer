import { ApolloServer, gql } from 'apollo-server'
import { createServer } from '../src/server'
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing'
import { getTimestampByRange } from './utils/getTimestampByRange'
import { CHART_RANGE } from './constants'
import { MongoManager } from './../src/database'
import { FeedRepository } from '../src/repository/Feed'
import { ResultRequestRepository } from '../src/repository/ResultRequest'

import { normalizeNetworkConfig } from '../src/utils'
import { readDataFeeds } from '../src/readDataFeeds'
import dataFeedsRouterConfig from '../../api/src/dataFeedsRouter.json'

const dataFeeds = readDataFeeds(dataFeedsRouterConfig)
const networksConfig = normalizeNetworkConfig(dataFeedsRouterConfig)

const state: {
  mongoManager: MongoManager
  testClient: ApolloServerTestClient
  server: ApolloServer
} = {
  mongoManager: null,
  testClient: null,
  server: null
}
describe.skip('feeds', function () {
  beforeAll(async function () {
    const ciUri = 'mongodb://localhost'
    const mongoManager = new MongoManager()
    const db = await mongoManager.start(process.env.CI ? ciUri : null)

    const server = await createServer(
      {
        feedRepository: new FeedRepository(dataFeeds),
        resultRequestRepository: new ResultRequestRepository(db, dataFeeds)
      },
      {
        dataFeedsConfig: dataFeeds,
        networksConfig: networksConfig
      }
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
    const GET_FEEDS = gql`
      query feeds($page: Int!, $pageSize: Int!, $network: String!) {
        feeds(page: $page, pageSize: $pageSize, network: $network) {
          feeds {
            name
            address
            lastResult
            network
            label
            feedFullName
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
        network: 'all'
      }
    })
    expect(feeds.length).toBe(0)
  })

  it('get feed list with data feeds', async () => {
    const dataFeed = dataFeeds[0]
    await state.mongoManager.db.collection('feed').insertOne(dataFeed)

    const GET_FEEDS = gql`
      query feeds($page: Int!, $pageSize: Int!, $network: String!) {
        feeds(page: $page, pageSize: $pageSize, network: $network) {
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
        pageSize: 6,
        network: 'all'
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

    const { feedFullName } = feedResponse.ops[0]
    const resultRequestExample1 = {
      result: '1111.0',
      feedFullName,
      requestId: '1',
      timestamp: (getTimestampByRange(CHART_RANGE.m.value) + 10).toString(),
      drTxHash:
        '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532372bae88a'
    }
    const resultRequestExample2 = {
      result: '2222.0',
      feedFullName,
      requestId: '1',
      timestamp: (getTimestampByRange(CHART_RANGE.m.value) + 11).toString(),
      drTxHash:
        '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532072bae88a'
    }
    await state.mongoManager.db
      .collection('result_request')
      .insert(resultRequestExample1)
    await state.mongoManager.db
      .collection('result_request')
      .insert(resultRequestExample2)
    const GET_FEED = gql`
      query Feed($feedFullName: String!, $timestamp: Int!) {
        feed(feedFullName: $feedFullName) {
          feedFullName
          name
          address
          network
          label
          lastResult
          requests(timestamp: $timestamp) {
            feedFullName
            result
            drTxHash
            requestId
            timestamp
            error
          }
          blockExplorer
          color
        }
      }
    `

    const data = await state.testClient.query({
      query: GET_FEED,
      variables: {
        feedFullName,
        timestamp: getTimestampByRange(CHART_RANGE.m.value)
      }
    })
    const feed = data.data.feed
    expect(feed).toHaveProperty('address', dataFeeds[0].address)
    expect(feed).toHaveProperty('name', dataFeeds[0].name)
    expect(feed).toHaveProperty('lastResult', resultRequestExample2.result)
    expect(feed.requests.length).toBe(2)
    expect(feed.requests[0]).toHaveProperty(
      'feedFullName',
      resultRequestExample2.feedFullName
    )
    expect(feed.requests[0]).toHaveProperty(
      'result',
      resultRequestExample2.result
    )
    expect(feed.requests[0]).toHaveProperty(
      'requestId',
      resultRequestExample2.requestId
    )
    expect(feed.requests[0]).toHaveProperty(
      'timestamp',
      resultRequestExample2.timestamp
    )
    expect(feed.requests[1]).toHaveProperty(
      'feedFullName',
      resultRequestExample1.feedFullName
    )
    expect(feed.requests[1]).toHaveProperty(
      'result',
      resultRequestExample1.result
    )
    expect(feed.requests[1]).toHaveProperty(
      'requestId',
      resultRequestExample1.requestId
    )
    expect(feed.requests[1]).toHaveProperty(
      'timestamp',
      resultRequestExample1.timestamp
    )
  })

  it('get requests with range 7d', async () => {
    const feedResponse = await state.mongoManager.db
      .collection('feed')
      .insert(dataFeeds[0])

    const { feedFullName } = feedResponse.ops[0]

    const resultRequestExample1 = {
      result: '1111.0',
      feedFullName,
      requestId: '1',
      timestamp: (getTimestampByRange(CHART_RANGE.w.value) + 10).toString(),
      drTxHash:
        '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532372bae88a'
    }
    const resultRequestExample2 = {
      result: '2222.0',
      feedFullName,
      requestId: '1',
      timestamp: (getTimestampByRange(CHART_RANGE.m.value) + 11).toString(),
      drTxHash:
        '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532072bae88a'
    }
    await state.mongoManager.db
      .collection('result_request')
      .insert(resultRequestExample1)
    await state.mongoManager.db
      .collection('result_request')
      .insert(resultRequestExample2)

    const GET_FEED = gql`
      query Feed($feedFullName: String!, $timestamp: Int!) {
        feed(feedFullName: $feedFullName) {
          id
          name
          address
          lastResult
          network
          label
          requests(timestamp: $timestamp) {
            feedFullName
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
        feedFullName: feedResponse.ops[0].feedFullName,
        timestamp: getTimestampByRange(CHART_RANGE.w.value)
      }
    })
    expect(feed).toHaveProperty('address', dataFeeds[0].address)
    expect(feed).toHaveProperty('name', dataFeeds[0].name)
    expect(feed).toHaveProperty('lastResult', resultRequestExample1.result)
    expect(feed.requests.length).toBe(1)
    expect(feed.requests[0]).toHaveProperty(
      'feedFullName',
      resultRequestExample1.feedFullName
    )
    expect(feed.requests[0]).toHaveProperty(
      'result',
      resultRequestExample1.result
    )
    expect(feed.requests[0]).toHaveProperty(
      'requestId',
      resultRequestExample1.requestId
    )
    expect(feed.requests[0]).toHaveProperty(
      'timestamp',
      resultRequestExample1.timestamp
    )
  })

  it('get requests with range 30d', async () => {
    const feedResponse = await state.mongoManager.db
      .collection('feed')
      .insert(dataFeeds[0])

    const { feedFullName } = feedResponse.ops[0]

    const resultRequestExample1 = {
      result: '1111.0',
      feedFullName,
      requestId: '1',
      timestamp: (getTimestampByRange(CHART_RANGE.w.value) + 10).toString(),
      drTxHash:
        '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532372bae88a'
    }
    const resultRequestExample2 = {
      result: '2222.0',
      feedFullName,
      requestId: '1',
      timestamp: (getTimestampByRange(CHART_RANGE.m.value) + 11).toString(),
      address: '0x58995FaD03158fB9cd64397347bA97714EF9fC12',
      drTxHash:
        '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532072bae88a',
      label: '$'
    }
    await state.mongoManager.db
      .collection('result_request')
      .insert(resultRequestExample1)
    await state.mongoManager.db
      .collection('result_request')
      .insert(resultRequestExample2)
    const GET_FEED = gql`
      query Feed($feedFullName: String!, $timestamp: Int!) {
        feed(feedFullName: $feedFullName) {
          id
          name
          address
          lastResult
          network
          label
          requests(timestamp: $timestamp) {
            feedFullName
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
        feedFullName,
        timestamp: getTimestampByRange(CHART_RANGE.m.value)
      }
    })

    expect(feed).toHaveProperty('address', dataFeeds[0].address)
    expect(feed).toHaveProperty('name', dataFeeds[0].name)
    expect(feed).toHaveProperty('lastResult', resultRequestExample1.result)
    expect(feed.requests.length).toBe(2)
    expect(feed.requests[0]).toHaveProperty(
      'feedFullName',
      resultRequestExample1.feedFullName
    )
    expect(feed.requests[0]).toHaveProperty(
      'result',
      resultRequestExample1.result
    )
    expect(feed.requests[0]).toHaveProperty(
      'requestId',
      resultRequestExample1.requestId
    )
    expect(feed.requests[0]).toHaveProperty(
      'timestamp',
      resultRequestExample1.timestamp
    )
    expect(feed.requests[1]).toHaveProperty(
      'feedFullName',
      resultRequestExample2.feedFullName
    )
    expect(feed.requests[1]).toHaveProperty(
      'result',
      resultRequestExample2.result
    )
    expect(feed.requests[1]).toHaveProperty(
      'requestId',
      resultRequestExample2.requestId
    )
    expect(feed.requests[1]).toHaveProperty(
      'timestamp',
      resultRequestExample2.timestamp
    )
  })

  it('get all feeds inserted', async () => {
    await state.mongoManager.db.collection('feed').insertOne(dataFeeds[0])
    await state.mongoManager.db.collection('feed').insertOne(dataFeeds[1])

    const GET_FEEDS = gql`
      query feeds($page: Int!, $pageSize: Int!, $network: String!) {
        feeds(page: $page, pageSize: $pageSize, network: $network) {
          feeds {
            name
            address
            lastResult
            network
            label
            feedFullName
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
        network: 'all'
      }
    })

    expect(feeds.length).toBe(2)
  })
})
