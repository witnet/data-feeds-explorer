<template>
  <div>
    <Main />
  </div>
</template>

<script>
import feeds from '@/apollo/queries/feeds.gql'

export default {
  apollo: {
    feeds: {
      prefetch: true,
      query: feeds,
    },
  },
}
</script>
