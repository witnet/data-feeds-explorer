<template>
  <div class="feeds-container">
    <FeedCard
      v-for="feed in allFeeds"
      :key="feed.name + feed.network + feed.value + feed.color"
      :details-path="feed.detailsPath"
      :name="feed.name"
      :decimals="feed.decimals"
      :img="feed.img"
      :value="feed.value"
      :last-result-timestamp="feed.lastResultTimestamp"
      :label="feed.label"
      :network="feed.network"
      :color="feed.color"
    />
  </div>
</template>

<script>
import feeds from '@/apollo/queries/feeds.gql'
import { formatSvgName } from '../utils/formatSvgName'

export default {
  apollo: {
    feeds: {
      prefetch: true,
      query: feeds,
      variables() {
        return {
          page: this.currentPage,
          pageSize: this.itemsPerPage,
          network: this.network.label,
        }
      },
      pollInterval: 60000,
    },
  },
  name: 'DataFeeds',
  props: {
    network: {
      type: Object,
      required: true,
    },
    networkIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 28,
    }
  },
  computed: {
    allFeeds() {
      if (this.feeds) {
        const feeds = this.feeds.feeds
          .filter((feed) => {
            return !!feed.lastResult
          })
          .map((feed) => {
            return {
              detailsPath: {
                name: 'feeds-id',
                params: { id: feed.feedFullName },
              },
              decimals: parseInt(feed.feedFullName.split('_').pop()) || 3,
              name: feed.name,
              value: feed.lastResult,
              lastResultTimestamp: feed.lastResultTimestamp || '0',
              label: feed.label,
              img: {
                name: formatSvgName(feed.name),
                alt: feed.name,
              },
              network: feed.network,
              color: feed.color,
              blockExplorer: feed.blockExplorer,
            }
          })
        return feeds
      } else {
        return []
      }
    },
  },
  watch: {
    allFeeds() {
      if (this.allFeeds.length < 1) {
        this.$emit('empty', this.networkIndex)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.feeds-container {
  display: grid;
  grid-gap: 16px;
  width: 100%;
  grid-template: repeat(auto-fit, 80px) / repeat(auto-fit, 300px);
  justify-content: flex-start;
  align-items: center;
}

@media screen and (max-width: 600px) {
  .feeds-container {
    padding: 0;
  }
}
@media screen and (max-width: 1200px) {
  .feeds-container {
    padding: 0;
    justify-content: center;
  }
}
</style>
