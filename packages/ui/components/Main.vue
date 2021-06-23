<template>
  <div>
    <div class="section-header">
      <p class="section-title">{{ $t('main.data_feeds') }}</p>
      <!-- <Select
        :options="options"
        :default-option="selected"
        @update-selected="updateSelected"
      /> -->
    </div>
    <div class="feeds-container">
      <DataFeeds
        v-if="!$apollo.loading"
        :feeds="dataFeeds"
        class="data-feeds"
      />
      <el-pagination
        v-if="numberOfPages > 1"
        class="pagination"
        layout="prev, pager, next"
        :page-count="numberOfPages"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>
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
      currentPage: 1,
      itemsPerPage: 6,
      // options: [
      //   { label: 'All' },
      //   { label: 'Rinkeby' },
      //   { label: 'Goerly' },
      //   { label: 'Mainnet' },
      // ],
      // selected: { label: 'All' },
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.feeds.length / this.itemsPerPage)
    },
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
            name: 'btcusd',
            alt: 'BTC/USD',
          },
          network: feed.network,
        }
      })
    },
  },
  watch: {
    currentPage(value) {
      // get page from server
    },
  },
  mounted() {
    this.dataFeeds = this.allFeeds
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    //   updateSelected(selectedOption) {
    //     this.selected = selectedOption
    //     if (this.selected.label === 'All') {
    //       this.dataFeeds = this.allFeeds
    //     } else {
    //       this.dataFeeds = this.allFeeds.filter((feed) => {
    //         return feed.network === this.selected.label.toLowerCase()
    //       })
    //     }
    //   },
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

.feeds-container {
  display: grid;
  min-height: 60vh;
  grid-template: 1fr max-content/ 1fr;
  justify-items: flex-start;
  align-items: flex-start;
  .pagination {
    justify-self: center;
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
