import { gql } from 'graphql-request'

export default gql`
  query networks {
    networks {
      label
      key
      chain
      logo
    }
  }
`
