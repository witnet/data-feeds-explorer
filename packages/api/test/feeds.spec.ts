// import { ApolloServer } from '@apollo/server'
// import { gql } from 'graphql-tag'
// import { createServer } from '../src/server'
// import { getTimestampByRange } from './utils/getTimestampByRange'
// import { CHART_RANGE } from './constants'
// import { MongoManager } from './../src/database'
// import { FeedRepository } from '../src/repository/Feed'
// import { ResultRequestRepository } from '../src/repository/ResultRequest'
// import { env } from 'process'

// import { normalizeNetworkConfig } from '../src/utils'
// import { fetchFeedsLegacy } from '../src/readDataFeeds'
// import dataFeedsRouterConfig from '../../api/src/dataFeedsRouter.json'
// import { Context } from '../src/types'

// const dataFeeds = fetchFeedsLegacy(dataFeedsRouterConfig)
// const networksConfig = normalizeNetworkConfig(dataFeedsRouterConfig).map(c => ({
//   ...c,
//   logo: '<svg></svg>'
// }))
// type QueryResultRequest = {
//   data: {
//     feeds: {
//       feeds: Array<{
//         id: String
//         name: String
//         address: String
//         lastResult: String
//         network: String
//         label: String
//         feedFullName: String
//       }>
//     }
//   }
// }

// type QueryFeed = {
//   data: {
//     feed: {
//       id: String
//       name: String
//       lastResult: String
//       network: String
//       label: String
//       blockExplorer: String
//       color: String
//       requests: Array<{
//         feedFullName: String
//         result: String
//         drTxHash: String
//         requestId: String
//         timestamp: String
//       }>
//     }
//   }
// }

// const state: {
//   mongoManager: MongoManager | null
//   server: ApolloServer<Context> | null
// } = {
//   mongoManager: null,
//   server: null
// }
describe.skip('feeds', function () {
  it.todo('test')
  //   beforeAll(async function () {
  //     const ciUri = 'mongodb://localhost'
  //     const mongoManager = new MongoManager()
  //     const db = await mongoManager.start(env.CI ? ciUri : undefined)

  //     const get = jest.fn(() => '<svg></svg>')
  //     const getMany = jest.fn(arr => arr.map(_ => '<svg></svg>'))
  //     const svgCache = jest.fn(() => ({ get, getMany }))
  //     if (db) {
  //       const { server } = await createServer(
  //         {
  //           feedRepository: new FeedRepository(dataFeeds),
  //           resultRequestRepository: new ResultRequestRepository(db, dataFeeds)
  //         },
  //         svgCache as any,
  //         {
  //           dataFeedsConfig: dataFeeds,
  //           networksConfig: networksConfig
  //         }
  //       )

  //       state.mongoManager = mongoManager
  //       state.server = server
  //     }
  //   })

  //   afterAll(async function () {
  //     await state.mongoManager?.stop()
  //     await state.server?.stop()
  //   })

  //   beforeEach(async function () {
  //     await state.mongoManager?.drop()
  //   })

  //   it('get feed list without data feeds', async () => {
  //     const GET_FEEDS = gql`
  //       query feeds($page: Int!, $pageSize: Int!, $network: String!) {
  //         feeds(page: $page, pageSize: $pageSize, network: $network) {
  //           feeds {
  //             name
  //             address
  //             lastResult
  //             network
  //             label
  //             feedFullName
  //           }
  //           total
  //         }
  //       }
  //     `
  //     const {
  //         feeds: { feeds }
  //       } = await state.server?.executeOperation({
  //       query: GET_FEEDS,
  //       variables: {
  //         page: 1,
  //         pageSize: 6,
  //         network: 'all'
  //       }
  //     })
  //     expect(feeds.length).toBe(0)
  //   })

  //   it('get feed list with data feeds', async () => {
  //     const dataFeed = dataFeeds[0]
  //     await state.mongoManager?.db.collection('feed').insertOne(dataFeed)

  //     const GET_FEEDS = gql`
  //       query feeds($page: Int!, $pageSize: Int!, $network: String!) {
  //         feeds(page: $page, pageSize: $pageSize, network: $network) {
  //           feeds {
  //             id
  //             name
  //             address
  //             lastResult
  //             network
  //             label
  //           }
  //           total
  //         }
  //       }
  //     `
  //     const response = await state.server?.executeOperation({
  //       query: GET_FEEDS,
  //       variables: {
  //         page: 1,
  //         pageSize: 6,
  //         network: 'all'
  //       }
  //     })
  //     expect(feeds.length).toBe(1)
  //     expect(feeds[0]).toHaveProperty('address', dataFeed.address)
  //     expect(feeds[0]).toHaveProperty('name', dataFeed.name)
  //     expect(feeds[0]).toHaveProperty('network', dataFeed.network)
  //     expect(feeds[0].id).toBeTruthy()
  //   })

  //   it('get feed', async () => {
  //     const feedResponse = await state.mongoManager?.db
  //       .collection('feed')
  //       .insertOne(dataFeeds[0])

  //     console.log(JSON.stringify(feedResponse))

  //     const { feedFullName } = feedResponse ? feedResponse[0] : null
  //     const resultRequestExample1 = {
  //       result: '1111.0',
  //       feedFullName,
  //       requestId: '1',
  //       timestamp: (getTimestampByRange(CHART_RANGE.m.value) + 10).toString(),
  //       drTxHash:
  //         '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532372bae88a'
  //     }
  //     const resultRequestExample2 = {
  //       result: '2222.0',
  //       feedFullName,
  //       requestId: '1',
  //       timestamp: (getTimestampByRange(CHART_RANGE.m.value) + 11).toString(),
  //       drTxHash:
  //         '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532072bae88a'
  //     }
  //     await state.mongoManager?.db
  //       .collection('result_request')
  //       .insertOne(resultRequestExample1)
  //     await state.mongoManager?.db
  //       .collection('result_request')
  //       .insertOne(resultRequestExample2)
  //     const GET_FEED = gql`
  //       query Feed($feedFullName: String!, $timestamp: Int!) {
  //         feed(feedFullName: $feedFullName) {
  //           feedFullName
  //           name
  //           address
  //           network
  //           label
  //           lastResult
  //           requests(timestamp: $timestamp) {
  //             feedFullName
  //             result
  //             drTxHash
  //             requestId
  //             timestamp
  //             error
  //           }
  //           blockExplorer
  //           color
  //         }
  //       }
  //     `

  //     const data = await state.server?.executeOperation({
  //       query: GET_FEED,
  //       variables: {
  //         feedFullName,
  //         timestamp: getTimestampByRange(CHART_RANGE.m.value)
  //       }
  //     })

  //     const feed = data?.data.feed
  //     expect(feed).toHaveProperty('address', dataFeeds[0].address)
  //     expect(feed).toHaveProperty('name', dataFeeds[0].name)
  //     expect(feed).toHaveProperty('lastResult', resultRequestExample2.result)
  //     expect(feed.requests.length).toBe(2)
  //     expect(feed.requests[0]).toHaveProperty(
  //       'feedFullName',
  //       resultRequestExample2.feedFullName
  //     )
  //     expect(feed.requests[0]).toHaveProperty(
  //       'result',
  //       resultRequestExample2.result
  //     )
  //     expect(feed.requests[0]).toHaveProperty(
  //       'requestId',
  //       resultRequestExample2.requestId
  //     )
  //     expect(feed.requests[0]).toHaveProperty(
  //       'timestamp',
  //       resultRequestExample2.timestamp
  //     )
  //     expect(feed.requests[1]).toHaveProperty(
  //       'feedFullName',
  //       resultRequestExample1.feedFullName
  //     )
  //     expect(feed.requests[1]).toHaveProperty(
  //       'result',
  //       resultRequestExample1.result
  //     )
  //     expect(feed.requests[1]).toHaveProperty(
  //       'requestId',
  //       resultRequestExample1.requestId
  //     )
  //     expect(feed.requests[1]).toHaveProperty(
  //       'timestamp',
  //       resultRequestExample1.timestamp
  //     )
  //   })

  //   it('get requests with range 7d', async () => {
  //     const feedResponse = await state.mongoManager?.db
  //       .collection('feed')
  //       .insertOne(dataFeeds[0])

  //     const { feedFullName } = feedResponse ? feedResponse[0] : null

  //     const resultRequestExample1 = {
  //       result: '1111.0',
  //       feedFullName,
  //       requestId: '1',
  //       timestamp: (getTimestampByRange(CHART_RANGE.w.value) + 10).toString(),
  //       drTxHash:
  //         '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532372bae88a'
  //     }
  //     const resultRequestExample2 = {
  //       result: '2222.0',
  //       feedFullName,
  //       requestId: '1',
  //       timestamp: (getTimestampByRange(CHART_RANGE.m.value) + 11).toString(),
  //       drTxHash:
  //         '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532072bae88a'
  //     }
  //     await state.mongoManager?.db
  //       .collection('result_request')
  //       .insertOne(resultRequestExample1)
  //     await state.mongoManager?.db
  //       .collection('result_request')
  //       .insertOne(resultRequestExample2)

  //     const GET_FEED = gql`
  //       query Feed($feedFullName: String!, $timestamp: Int!) {
  //         feed(feedFullName: $feedFullName) {
  //           id
  //           name
  //           address
  //           lastResult
  //           network
  //           label
  //           requests(timestamp: $timestamp) {
  //             feedFullName
  //             result
  //             drTxHash
  //             requestId
  //             timestamp
  //           }
  //           blockExplorer
  //           color
  //         }
  //       }
  //     `
  //     const {
  //       data: { feed }
  //     } = (await state.server?.query({
  //       query: GET_FEED,
  //       variables: {
  //         feedFullName: feedResponse ? feedResponse[0].feedFullName : null,
  //         timestamp: getTimestampByRange(CHART_RANGE.w.value)
  //       }
  //     })) as QueryFeed
  //     expect(feed).toHaveProperty('address', dataFeeds[0].address)
  //     expect(feed).toHaveProperty('name', dataFeeds[0].name)
  //     expect(feed).toHaveProperty('lastResult', resultRequestExample1.result)
  //     expect(feed.requests.length).toBe(1)
  //     expect(feed.requests[0]).toHaveProperty(
  //       'feedFullName',
  //       resultRequestExample1.feedFullName
  //     )
  //     expect(feed.requests[0]).toHaveProperty(
  //       'result',
  //       resultRequestExample1.result
  //     )
  //     expect(feed.requests[0]).toHaveProperty(
  //       'requestId',
  //       resultRequestExample1.requestId
  //     )
  //     expect(feed.requests[0]).toHaveProperty(
  //       'timestamp',
  //       resultRequestExample1.timestamp
  //     )
  //   })

  //   it('get requests with range 30d', async () => {
  //     const feedResponse = await state.mongoManager?.db
  //       .collection('feed')
  //       .insertOne(dataFeeds[0])

  //     const { feedFullName } = feedResponse ? feedResponse[0] : null

  //     const resultRequestExample1 = {
  //       result: '1111.0',
  //       feedFullName,
  //       requestId: '1',
  //       timestamp: (getTimestampByRange(CHART_RANGE.w.value) + 10).toString(),
  //       drTxHash:
  //         '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532372bae88a'
  //     }
  //     const resultRequestExample2 = {
  //       result: '2222.0',
  //       feedFullName,
  //       requestId: '1',
  //       timestamp: (getTimestampByRange(CHART_RANGE.m.value) + 11).toString(),
  //       address: '0x58995FaD03158fB9cd64397347bA97714EF9fC12',
  //       drTxHash:
  //         '666f4735c3cbfb71d6e2f06cd13e4705751c50500c1720162b16532072bae88a',
  //       label: '$'
  //     }
  //     await state.mongoManager?.db
  //       .collection('result_request')
  //       .insertOne(resultRequestExample1)
  //     await state.mongoManager?.db
  //       .collection('result_request')
  //       .insertOne(resultRequestExample2)
  //     const GET_FEED = gql`
  //       query Feed($feedFullName: String!, $timestamp: Int!) {
  //         feed(feedFullName: $feedFullName) {
  //           id
  //           name
  //           address
  //           lastResult
  //           network
  //           label
  //           requests(timestamp: $timestamp) {
  //             feedFullName
  //             result
  //             drTxHash
  //             requestId
  //             timestamp
  //           }
  //           blockExplorer
  //           color
  //         }
  //       }
  //     `
  //     const {
  //       data: { feed }
  //     } = (await state.testClient?.query({
  //       query: GET_FEED,
  //       variables: {
  //         feedFullName,
  //         timestamp: getTimestampByRange(CHART_RANGE.m.value)
  //       }
  //     })) as QueryFeed

  //     expect(feed).toHaveProperty('address', dataFeeds[0].address)
  //     expect(feed).toHaveProperty('name', dataFeeds[0].name)
  //     expect(feed).toHaveProperty('lastResult', resultRequestExample1.result)
  //     expect(feed.requests.length).toBe(2)
  //     expect(feed.requests[0]).toHaveProperty(
  //       'feedFullName',
  //       resultRequestExample1.feedFullName
  //     )
  //     expect(feed.requests[0]).toHaveProperty(
  //       'result',
  //       resultRequestExample1.result
  //     )
  //     expect(feed.requests[0]).toHaveProperty(
  //       'requestId',
  //       resultRequestExample1.requestId
  //     )
  //     expect(feed.requests[0]).toHaveProperty(
  //       'timestamp',
  //       resultRequestExample1.timestamp
  //     )
  //     expect(feed.requests[1]).toHaveProperty(
  //       'feedFullName',
  //       resultRequestExample2.feedFullName
  //     )
  //     expect(feed.requests[1]).toHaveProperty(
  //       'result',
  //       resultRequestExample2.result
  //     )
  //     expect(feed.requests[1]).toHaveProperty(
  //       'requestId',
  //       resultRequestExample2.requestId
  //     )
  //     expect(feed.requests[1]).toHaveProperty(
  //       'timestamp',
  //       resultRequestExample2.timestamp
  //     )
  //   })

  //   it('get all feeds inserted', async () => {
  //     await state.mongoManager?.db.collection('feed').insertOne(dataFeeds[0])
  //     await state.mongoManager?.db.collection('feed').insertOne(dataFeeds[1])

  //     const GET_FEEDS = gql`
  //       query feeds($page: Int!, $pageSize: Int!, $network: String!) {
  //         feeds(page: $page, pageSize: $pageSize, network: $network) {
  //           feeds {
  //             name
  //             address
  //             lastResult
  //             network
  //             label
  //             feedFullName
  //           }
  //           total
  //         }
  //       }
  //     `
  //     const {
  //       data: {
  //         feeds: { feeds }
  //       }
  //     } = (await state.testClient?.query({
  //       query: GET_FEEDS,
  //       variables: {
  //         page: 1,
  //         pageSize: 6,
  //         network: 'all'
  //       }
  //     })) as QueryResultRequest

  //     expect(feeds.length).toBe(2)
  //   })
})
