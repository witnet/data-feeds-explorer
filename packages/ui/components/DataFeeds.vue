<template>
  <div class="feeds-container">
    <FeedCard
      v-for="feed in allFeeds"
      :key="feed.name + feed.network + feed.value + feed.color"
      :details-path="feed.detailsPath"
      :name="feed.name"
      :decimals="feed.decimals"
      :time-to-update="feed.timeToUpdate"
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
          network: this.network.label.toLowerCase(),
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
              timeToUpdate: Number(feed.heartbeat) + Number(feed.finality),
              img: {
                name: formatSvgName(feed.name),
                alt: feed.name,
              },
              network: feed.network,
              color: feed.color,
              blockExplorer: feed.blockExplorer,
            }
          })
          .sort((feed1, feed2) => (feed1.name > feed2.name ? 1 : -1))
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
