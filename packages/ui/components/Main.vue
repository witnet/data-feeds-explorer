<template>
  <div>
    <div class="section-header">
      <p class="section-title">{{ $t('data_feeds') }}</p>
      <Select
        :options="options"
        :default-option="selected"
        @update-selected="updateSelected"
      />
    </div>
    <DataFeeds v-if="!$apollo.loading" :feeds="dataFeeds" class="data-feeds" />
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
  data() {
    return {
      dataFeeds: [],
      options: [
        { label: 'All' },
        { label: 'Rinkeby' },
        { label: 'Goerly' },
        { label: 'Mainnet' },
      ],
      selected: { label: 'All' },
    }
  },
  computed: {
    allFeeds() {
      return this.feeds.map((feed) => {
        return {
          detailsPath: {
            name: 'feeds-id',
            params: { id: feed.id },
          },
          name: feed.name,
          value: feed.lastResult,
          label: feed.label,
          img: {
            name: 'bitcoin',
            alt: 'BTC/USD',
          },
          network: feed.network,
        }
      })
    },
  },
  mounted() {
    this.dataFeeds = this.allFeeds
  },
  methods: {
    updateSelected(selectedOption) {
      this.selected = selectedOption
      if (this.selected.label === 'All') {
        this.dataFeeds = this.allFeeds
      } else {
        this.dataFeeds = this.allFeeds.filter((feed) => {
          return feed.network === this.selected.label.toLowerCase()
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.section-header {
  padding: 0 16px 24px 16px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  .section-title {
    font-size: 20px;
    align-self: flex-end;
    font-weight: 600;
  }
}

@media (max-width: 1200px) {
  .section-header {
    padding: 0 32px 24px 32px;
  }
}
@media (max-width: 600px) {
  .section-header {
    padding: 0 16px 24px 16px;
  }
}
</style>
