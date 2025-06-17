import { gql } from 'graphql-request'

export default gql`
  query feeds($network: String, $mainnet: Boolean, $pair: String) {
    feeds(network: $network, mainnet: $mainnet, pair: $pair) {
      feeds {
        isRouted
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
        sources
      }
      total
    }
  }
`
