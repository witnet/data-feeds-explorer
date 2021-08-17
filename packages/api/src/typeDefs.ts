import { gql } from 'apollo-server'

const typeDefs = gql`
  type Feed @entity {
    id: String! @id
    name: String! @column
    address: String! @column
    lastResult: String @column
    label: String! @column
    network: String! @column
    requests(feedId: String!, page: Int!, size: Int!): [ResultRequest]! @link
    color: String!
    blockExplorer: String!
  }

  type FeedsPage {
    feeds: [Feed]
    total: Int!
  }

  type ResultRequest @entity {
    id: String! @id
    feedId: String! @column
    result: String! @column
    label: String! @column
    requestId: String! @column
    address: String! @column
    timestamp: String! @column
    drTxHash: String! @column
    # request: DataRequest @embedded
    error: String
  }

  # type DataRequest @entity(embedded: true) {
  #   retrieval: String! @column
  #   aggregation: String! @column
  #   tally: String! @column
  # }

  type Query {
    feed(id: String!): Feed
    feeds(page: Int!, pageSize: Int!): FeedsPage!
    requests(feedId: String!, page: Int!, size: Int!): [ResultRequest]!
  }
`

export default typeDefs
