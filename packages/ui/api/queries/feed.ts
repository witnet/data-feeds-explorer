import { gql } from 'graphql-request'

export default gql`
  query feed($feedFullName: String!, $timestamp: Int!) {
    feed(feedFullName: $feedFullName) {
      feedFullName
      isRouted
      name
      address
      contractId
      lastResult
      lastResultTimestamp
      network
      networkName
      chain
      label
      deviation
      proxyAddress
      heartbeat
      finality
      requests(timestamp: $timestamp) {
        feedFullName
        result
        drTxHash
        requestId
        timestamp
      }
      blockExplorer
      color
      logo
    }
  }
`
