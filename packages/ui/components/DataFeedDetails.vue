<template>
  <div v-if="feed" class="content">
    <div class="section-header">
      <nuxt-link class="back-to-list" :to="localePath('/')">
        <font-awesome-icon class="icon" icon="arrow-alt-circle-left" />
      </nuxt-link>
      <SvgIcon name="btcusd" />
      <p class="network" :class="feed.network">{{ network }}</p>
    </div>
    <Chart class="chart" :data="chartData" data-label="$" :name="feedName" />
    <Fieldset
      :title="$t('data_feed_details.contract_address')"
      class="contract-container"
    >
      <a
        :href="`https://rinkeby.etherscan.io/address/${feedAddress}#code`"
        target="_blank"
        class="contract-address"
      >
        {{ feedAddress }}
        <font-awesome-icon class="icon" icon="external-link-alt" />
      </a>
    </Fieldset>
    <TransactionsList
      v-if="transactions"
      class="transactions"
      :transactions="transactions"
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
</template>

<script>
import feed from '@/apollo/queries/feed.gql'
import requests from '@/apollo/queries/requests.gql'
import { formatTimestamp } from '@/utils/formatTimestamp'
import { getWitnetBlockExplorerLink } from '@/utils/getWitnetBlockExplorerLink'

export default {
  apollo: {
    feed: {
      prefetch: true,
      query: feed,
      variables() {
        return {
          id: this.id,
          page: this.currentPage,
          size: this.itemsPerPage,
        }
      },
      pollInterval: 60000,
    },
    requests: {
      prefetch: true,
      query: requests,
      variables() {
        return {
          feedId: this.id,
          page: this.currentPage,
          size: this.itemsPerPage,
        }
      },
      pollInterval: 60000,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 6,
      id: this.$route.params.id,
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.feed.requests.length / this.itemsPerPage)
    },
    feedName() {
      return this.feed.name.toUpperCase()
    },
    feedAddress() {
      return this.feed.address
    },
    network() {
      return this.feed.network.toUpperCase()
    },
    chartData() {
      if (this.feed.requests.length > 0) {
        return this.feed.requests.map((request) => {
          return {
            time: formatTimestamp(request.timestamp),
            value: request.result,
          }
        })
      } else {
        return [{ time: formatTimestamp('0'), value: 0 }]
      }
    },
    transactions() {
      if (this.requests.length > 0) {
        return this.requests.map((request) => ({
          witnetLink: getWitnetBlockExplorerLink(request.drTxHash),
          drTxHash: request.drTxHash,
          data: {
            label: this.feed.label,
            value: request.result,
          },
          timestamp: request.timestamp,
        }))
      } else {
        return null
      }
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template: max-content max-content max-content 1fr / 1fr;
  row-gap: 16px;
  .contract-container {
    margin-top: 150px;
    .contract-address {
      display: flex;
      align-items: center;
      line-break: loose;
      word-break: break-all;
      font-size: 24px;
      padding: 24px;
      cursor: pointer;
      color: var(--contract-address);
      .icon {
        margin-left: 16px;
      }
    }
  }
  .pagination {
    justify-self: center;
  }
  .chart {
    height: 400px;
  }
  .section-header {
    display: grid;
    grid-template: 1fr / 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    margin-top: 16px;
    width: 100%;
    .network {
      font-size: 16px;
      justify-self: flex-end;
      font-weight: bold;
      &.mainnet {
        color: var(--mainnet-network-color);
      }
      &.rinkeby {
        color: var(--rinkeby-network-color);
      }
      &.goerli {
        color: var(--goerli-network-color);
      }
      &.kovan {
        color: var(--kovan-network-color);
      }
    }
    .back-to-list {
      justify-self: flex-start;
      .icon {
        font-size: 24px;
        color: var(--text);
      }
      &:hover {
        .icon {
          color: var(--text-hover);
        }
      }
    }
  }
}
@media (max-width: 1200px) {
  .content {
    .section-header {
      .back-to-list {
        margin-left: 16px;
      }
      .network {
        margin-right: 16px;
      }
    }
  }
}
</style>
