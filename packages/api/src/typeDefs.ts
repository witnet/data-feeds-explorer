import { gql } from 'apollo-server'

const typeDefs = gql`
  type Feed @entity {
    id: String! @id
    name: String! @column
    address: String! @column
    requests: [PriceRequest]! @link
    lastPrice: Float! @column
  }

  type PriceRequest @entity {
    id: String! @id
    feedId: String! @column
    price: Float! @column
    requestId: String! @column
    timestamp: String! @column
    # request: DataRequest @embedded
    error: String
  }

  # type DataRequest @entity(embedded: true) {
  #   retrieval: String! @column
  #   aggregation: String! @column
  #   tally: String! @column
  # }

  type Query {
    feeds: [Feed]!
    feed(name: String!): Feed
  }
`

export default typeDefs
