import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Feed {
    id: String!
    address: String!
    contractId: String!
    blockExplorer: String!
    color: String!
    isRouted: Boolean!
    feedFullName: String!
    label: String!
    name: String!
    network: String!
    networkName: String
    chain: String
    lastResult: String
    lastResultTimestamp: String
    deviation: String!
    proxyAddress: String
    heartbeat: String!
    finality: String!
    requests(timestamp: Int!): [ResultRequest]!
    logo: String!
    sources: [String!]!
  }

  type Total {
    count: Int
  }

  type FeedsPage {
    feeds: [Feed]
    total: Int!
  }

  type NetworksConfig {
    chain: String!
    label: String!
    key: String!
    logo: String!
  }

  type ResultRequest @entity {
    id: String! @id
    drTxHash: String! @column
    error: String
    feedFullName: String! @column
    requestId: String! @column
    result: String! @column
    timestamp: String! @column
  }

  type PaginatedResultRequest {
    requests: [ResultRequest]
    total: Int!
  }

  type Query {
    feed(feedFullName: String!): Feed
    feeds(network: String, mainnet: Boolean, pair: String): FeedsPage!
    requests(
      feedFullName: String!
      page: Int!
      size: Int!
    ): PaginatedResultRequest!
    networks: [NetworksConfig]!
  }
`

export default typeDefs
