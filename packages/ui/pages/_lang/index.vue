<template>
  <div>
    <h2>Feeds</h2>
    <div v-for="feed in feeds" :key="feed.id">
      <p>{{ feed }}</p>
    </div>
    <h2>Feed</h2>
    <p>{{ feed }}</p>
  </div>
</template>

<script>
import feeds from '@/apollo/queries/feeds.gql'
import feed from '@/apollo/queries/feed.gql'

export default {
  apollo: {
    feeds: {
      prefetch: true,
      query: feeds,
    },
    feed: {
      prefetch: true,
      query: feed,
      variables: {
        name: 'btc/usd',
      },
    },
  },
}
</script>
