<template>
  <div v-if="empty" class="empty-state">
    <p class="text">EMPTY STATE</p>
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
      :networks="feed.availableNetworks"
      :sources="feed.sources.length"
      :chain="feed.chain"
      :color="feed.color"
    />
  </div>
  <div v-else class="feeds-container">
    <FeedCard
      v-for="feed in ['1', '2', '3']"
      :key="feed"
      :empty="true"
      :networks="[]"
    />
  </div>
</template>

<script setup lang="ts">
import { formatSvgName } from '../utils/formatSvgName'
import {
  type FeedInfo,
  type GeneralFeedInfo,
  type FormatedFeedInfo,
} from '@/types'
const props = defineProps({
  feeds: {
    type: Object as PropType<FeedInfo[]>,
    required: true,
  },
  totalFeeds: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    default: true,
  },
  empty: {
    type: Boolean,
    default: false,
  },
})
const allFeeds = computed(() => {
  if (props.totalFeeds) {
    const feeds = props.feeds
      .filter((feed: FeedInfo) => {
        return feed.lastResult && Number(feed.lastResultTimestamp) > 0
      })
      .map((feed: FeedInfo) => {
        return {
          detailsPath: {
            name: 'pair',
            params: {
              pair: feed.name.replace('/', '-'),
            },
          },
          decimals: parseInt(feed.feedFullName.split('_').pop() ?? '3'),
          name: feed.name,
          value: feed.lastResult,
          lastResultTimestamp: feed.lastResultTimestamp || '0',
          label: feed.label,
          timeToUpdate: feed.heartbeat
            ? Number(feed.heartbeat) + Number(feed.finality)
            : undefined,
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
      .reduce(
        (
          acc: Record<string, Array<FormatedFeedInfo & GeneralFeedInfo>>,
          feed: FormatedFeedInfo,
        ) => {
          const feedWithSourceAndNetwork = {
            ...feed,
            //TODO: retrieve sources
            sources: [],
            availableNetworks: acc[feed.name]
              ? [...acc[feed.name][0].availableNetworks, ...feed.network]
              : [feed.network],
          }
          return {
            ...acc,
            [feed.name]: acc[feed.name]
              ? [...acc[feed.name], feedWithSourceAndNetwork]
              : [feedWithSourceAndNetwork],
          } as Record<string, Array<FormatedFeedInfo & GeneralFeedInfo>>
        },
        {},
      )
    return Object.values(feeds)
      .map((feeds) => feeds[feeds.length - 1])
      .sort((feed1: any, feed2: any) => feed1.name.localeCompare(feed2.name))
  } else {
    return []
  }
})
</script>

<style lang="scss" scoped>
.feeds-container {
  display: grid;
  grid-gap: 16px;
  width: 100%;
  grid-template-rows: repeat(auto-fill, 105px);
  grid-template-columns: repeat(2, minmax(300px, 1fr));
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
    grid-template-columns: repeat(1, 1fr);
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
