import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const link = createHttpLink({
    uri: 'http://localhost:4000',
  })
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link,
    // configuration //
  })
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
