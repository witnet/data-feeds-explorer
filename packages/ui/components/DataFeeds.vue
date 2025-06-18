<template>
  <div v-if="loading" class="feeds-container">
    <FeedCard
      v-for="feed in ['1', '2', '3']"
      :key="feed"
      :empty="true"
      :networks="[]"
    />
  </div>
  <div v-else-if="allFeeds.length" class="feeds-container">
    <FeedCard
      v-for="feed in allFeeds"
      :key="feed.name + feed.network + feed.value + feed.color"
      :details-path="feed.detailsPath"
      :name="feed.name"
      :decimals="feed.decimals"
      :svg="feed.svg"
      :value="feed.value"
      :last-result-timestamp="feed.lastResultTimestamp"
      :label="feed.label"
      :networks="feed.availableNetworks"
      :sources="feed.sources.length"
    />
  </div>
  <div v-else-if="empty" class="empty-state">
    <p class="text">EMPTY STATE</p>
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
          sources: feed.sources,
          network: feed.network,
          chain: feed.chain,
          color: feed.color,
          blockExplorer: feed.blockExplorer,
          svg: feed.logo,
        }
      })
      .reduce(
        (
          acc: Record<string, FormatedFeedInfo & GeneralFeedInfo>,
          feed: FormatedFeedInfo,
        ) => {
          return {
            ...acc,
            [feed.name]: acc[feed.name]
              ? {
                  ...feed,
                  availableNetworks: [
                    ...acc[feed.name].availableNetworks,
                    feed.network,
                  ],
                }
              : {
                  ...feed,
                  availableNetworks: [feed.network],
                },
          } as Record<string, FormatedFeedInfo & GeneralFeedInfo>
        },
        {},
      )
    return Object.values(feeds).sort((feed1: any, feed2: any) =>
      feed1.name.localeCompare(feed2.name),
    )
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
