import { defineNuxtPlugin } from "#app"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core"
import { DefaultApolloClient } from '@vue/apollo-composable'

export default defineNuxtPlugin((nuxtApp) => {
  const link = createHttpLink({
    uri: 'http://localhost:4000'
  });
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
    // configuration //
  })
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})