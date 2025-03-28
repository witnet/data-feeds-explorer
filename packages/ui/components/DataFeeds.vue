<template>
  <div v-if="noFeedsAvailable" class="empty-state">
    <i18n-t keypath="empty_feeds" tag="p" scope="global">
      <span class="bold">{{ network.label }}</span>
    </i18n-t>
    <RequestDataFeedBtn />
  </div>
  <div v-else-if="!loading" class="feeds-container">
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
  <div v-else class="feeds-container">
    <FeedCard v-for="feed in ['1', '2', '3']" :key="feed" :empty="true" />
  </div>
</template>

<script setup lang="ts">
import { formatSvgName } from '../utils/formatSvgName'
import { type Ref } from 'vue'
const store = useStore()
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
const loading = ref(true)
const noFeedsAvailable = ref(false)
const networkFeeds: Ref<any> = ref(null)
const emptyFeeds = computed(() => allFeeds.value.length < 1)
const allFeeds = computed(() => {
  if (networkFeeds.value?.total) {
    const feeds = networkFeeds.value?.feeds
      .filter((feed: any) => {
        return feed.lastResult && Number(feed.lastResultTimestamp) > 0
      })
      .map((feed: any) => {
        const heartbeat = Number(feed.heartbeat || '0')
        const timeToUpdate =
          heartbeat && !feed.isRouted ? heartbeat + Number(feed.finality) : null

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
          timeToUpdate,
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
      .sort((feed1: any, feed2: any) => feed1.name.localeCompare(feed2.name))
    return feeds
  } else {
    return []
  }
})
watch(networkFeeds, () => {
  loading.value = false
  if (emptyFeeds.value) {
    noFeedsAvailable.value = true
  }
})
onMounted(async () => {
  const fetchedNetworks = await store.fetchFeeds({
    network: props.network.key.toLowerCase(),
    mainnet: null,
  })
  networkFeeds.value = fetchedNetworks
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
.empty-state {
  display: grid;
  grid-gap: 16px;
  width: 100%;
  grid-template-rows: 1fr;
  align-items: center;
  padding-bottom: 16px;
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
