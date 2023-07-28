<template>
  <div class="feeds-container">
    <FeedCard
      v-for="feed in allFeeds"
      :key="feed.name + feed.network + feed.value + feed.color"
      :details-path="feed.detailsPath"
      :name="feed.name"
      :decimals="feed.decimals"
      :time-to-update="feed.timeToUpdate"
      :svg="feed.svg"
      :value="feed.value"
      :last-result-timestamp="feed.lastResultTimestamp"
      :label="feed.label"
      :network="feed.network"
      :chain="feed.chain"
      :color="feed.color"
    />
  </div>
</template>

<script setup>
import { formatSvgName } from '../utils/formatSvgName'
// import feeds from '@/apollo/queries/feeds.gql'

const emit = defineEmits(['empty'])

const props = defineProps({
    network: {
      type: Object,
      required: true,
    },
    networkIndex: {
      type: Number,
      required: true,
    },
  })

const route = useRoute()

const feedsQuery = gql`query feeds ($network: String!) {
  feeds (network: $network) {
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
}`

const variables = { 
  network: props.network.key.toLowerCase()
}

// pollInterval: 60000,

const feeds = await useAsyncQuery(feedsQuery, variables)
// const currentPage = ref(1)
// const itemsPerPage = ref(28)

const allFeeds = computed(() => {
  if (feeds.data.value.feeds) {
    const adaptedFeeds = feeds.data.value.feeds.feeds
      .filter((feed) => {
        return feed.lastResult && Number(feed.lastResultTimestamp) > 0
      })
      .map((feed) => {
        return {
          detailsPath: {
            name: 'network-id',
            params: {
              network: route.params.network || 'ethereum',
              id: feed.feedFullName,
            },
          },
          decimals: parseInt(feed.feedFullName.split('_').pop()) || 3,
          name: feed.name,
          value: feed.lastResult,
          lastResultTimestamp: feed.lastResultTimestamp || '0',
          label: feed.label,
          timeToUpdate: feed.heartbeat
            ? Number(feed.heartbeat) + Number(feed.finality)
            : null,
          img: {
            name: formatSvgName(feed.name),
            alt: feed.name,
          },
          network: feed.network,
          chain: feed.chain,
          color: feed.color,
          blockExplorer: feed.blockExplorer,
          svg: feed.logo,
        }
      })
      .sort((feed1, feed2) => feed1.name.localeCompare(feed2.name))
    return adaptedFeeds 
  } else {
    return []
  }
})

watch(allFeeds, (allFeedsNew) => {
  if (allFeedsNew.length < 1) {
    emit('empty', props.networkIndex)
  }
})
</script>

<style lang="scss" scoped>
.feeds-container {
  display: grid;
  grid-gap: 16px;
  width: 100%;
  grid-template-rows: repeat(auto-fill, 80px);
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  justify-content: flex-start;
  align-items: center;
}

@media screen and (max-width: 1100px) {
  .feeds-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 900px) {
  .feeds-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
  }
}
@media screen and (max-width: 600px) {
  .feeds-container {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding: 0;
    justify-content: center;
  }
}
@media screen and (max-width: 300px) {
  .feeds-container {
    padding: 0;
    justify-content: center;
    grid-template-rows: repeat(auto-fill, 120px);
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
