import { ApolloServer, gql } from 'apollo-server'

async function main () {
  const app = await createApp()

  // app.listen()
}

async function createApp (): Promise<any> {
  const feeds = [
    {
      name: 'btc/usd',
      price: 50000.0001
    },
    {
      title: 'eth/usd',
      price: 3000.0001
    }
  ]

  const typeDefs = gql`
    type Feed {
      name: String
      price: Float
    }

    type Query {
      feeds: [Feed]
    }
  `

  const resolvers = {
    Query: {
      feeds: () => feeds
    }
  }

  const server = new ApolloServer({ typeDefs, resolvers })

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
