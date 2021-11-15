<template>
  <div>
    <div class="section-header">
      <p class="section-title">{{ $t('main.data_feeds') }}</p>
      <Select
        v-if="options.length > 1"
        :options="options"
        :default-option="selected"
        @update-selected="updateSelected"
      />
    </div>
    <div v-if="allFeeds.length > 0" class="list-container">
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
import { formatSvgName } from '../utils/formatSvgName'
import { generateSelectOptions } from '../utils/generateSelectOptions'

export default {
  apollo: {
    feeds: {
      prefetch: true,
      query: feeds,
      fetchPolicy: 'network-only',
      variables() {
        return {
          page: this.currentPage,
          pageSize: this.itemsPerPage,
          network: this.selected.label,
        }
      },
      pollInterval: 60000,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 25,
      selected: { label: 'all', key: 'All' },
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.feeds.total / this.itemsPerPage)
    },
    allFeeds() {
      if (this.feeds) {
        return this.feeds.feeds
          .map((feed) => {
            return {
              detailsPath: {
                name: 'feeds-id',
                params: { id: feed.feedFullName },
              },
              decimals: parseInt(feed.feedFullName.split('_').pop()) || 3,
              name: feed.name,
              value: feed.lastResult,
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
          .sort((feed1, feed2) => feed1.network < feed2.network)
      } else {
        return []
      }
    },
    options() {
      if (this.feeds) {
        return [
          { label: 'all', key: 'All' },
          ...generateSelectOptions(
            this.allFeeds.map((feed) => feed.network)
          ).sort((option1, option2) => option1.label < option2.label),
        ]
      } else {
        return [{ label: 'all', key: 'All' }]
      }
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    updateSelected(selectedOption) {
      this.selected = selectedOption
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
    font-size: 18px;
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
    padding: 0 32px 32px 32px;
  }
}
@media (max-width: 600px) {
  .section-header {
    padding: 0 32px 32px 32px;
  }
  .list-container {
    .pagination {
      margin-bottom: 48px;
    }
  }
}
</style>
