import { gql } from 'graphql-request'

export default gql`
  query feeds($network: String!) {
    feeds(network: $network) {
      feeds {
        feedFullName
        name
        address
        lastResult
        lastResultTimestamp
        network
        label
        chain
        blockExplorer
        color
        heartbeat
        finality
        logo
      }
      total
    }
  }
`
