import { gql } from 'graphql-request'

export default gql`
  query feeds($network: String!) {
    feeds(network: $network) {
      feeds {
        chain
      }
      total
    }
  }
`
