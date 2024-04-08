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

<script setup lang="ts">
import { formatSvgName } from '../utils/formatSvgName'
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
const networkFeeds: Ref<any> = ref(null)
const emit = defineEmits(['empty'])
const allFeeds = computed(() => {
  if (networkFeeds.value?.total) {
    const feeds = networkFeeds.value?.feeds
      .filter((feed: any) => {
        return feed.lastResult && Number(feed.lastResultTimestamp) > 0
      })
      .map((feed: any) => {
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
      .sort((feed1: any, feed2: any) => feed1.name.localeCompare(feed2.name))
    return feeds
  } else {
    return []
  }
})
watch(networkFeeds, () => {
  if (allFeeds.value.length < 1) {
    emit('empty', props.networkIndex)
  }
})
onMounted(async () => {
  networkFeeds.value = await store.fetchFeeds({
    network: props.network.key.toLowerCase(),
  })
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
