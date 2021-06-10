<template>
  <div>
    <Main />
  </div>
</template>

<script>
import Main from '@/components/Main.vue'
import feeds from '@/apollo/queries/feeds.gql'

export default {
  apollo: {
    feeds: {
      prefetch: true,
      query: feeds,
    },
  },
  components: {
    Main,
  },
}
</script>
