<template>
  <div v-if="!$apollo.loading">
    <div class="section-header">
      <p class="section-title">{{ $t('main.data_feeds') }}</p>
      <!-- <Select
        :options="options"
        :default-option="selected"
        @update-selected="updateSelected"
      /> -->
    </div>
    <div class="list-container">
      <DataFeeds :feeds="allFeeds" />
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
      variables() {
        return {
          page: this.currentPage,
          pageSize: this.itemsPerPage,
        }
      },
      pollInterval: 60000,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 25,
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
      return Math.ceil(this.feeds.total / this.itemsPerPage)
    },
    allFeeds() {
      return this.feeds.feeds.map((feed) => {
        return {
          detailsPath: {
            name: 'feeds-id',
            params: { id: feed.feedFullName },
          },
          name: feed.name,
          value: feed.lastResult,
          label: feed.label,
          img: {
            name: this.formatSvgName(feed.name),
            alt: feed.name,
          },
          network: feed.network,
          color: feed.color,
          blockExplorer: feed.blockExplorer,
        }
      })
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    formatSvgName(name) {
      return name.split('/').join('')
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

.list-container {
  display: grid;
  min-height: 90%;
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
  .list-container {
    .pagination {
      margin-bottom: 48px;
    }
  }
}
</style>
