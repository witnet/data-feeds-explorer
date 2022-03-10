<template>
  <div v-if="normalizedFeed" class="content">
    <Chart
      v-if="feed"
      class="chart"
      :data="chartData"
      :last-result-timestamp="transactions ? transactions[0].timestamp : ''"
      :last-result-value="lastResultValue"
      :data-label="feed.label"
      :name="normalizedFeed.name"
      :time-to-update="maxTimeToResolve"
      :decimals="normalizedFeed.decimals"
      @change-range="updateQuery"
    />
    <DataFeedDescription
      :feed-name="normalizedFeed.name"
      :network="normalizedFeed.network"
      :chain="normalizedFeed.chain"
      :last-result-value="lastResultValue"
      :last-result-date="lastResultDate"
      :feed-time-to-update="feedTimeToUpdate"
      :deviation="normalizedFeed.deviation"
    />
    <Fieldset :title="$t('data_feed_details.trigger_parameters')">
      <DataFeedTriggerParams
        :deviation="normalizedFeed.deviation"
        :max-time-to-resolve="maxTimeToResolve"
        :last-result-timestamp="transactions ? transactions[0].timestamp : ''"
      />
    </Fieldset>
    <Fieldset :title="$t('data_feed_details.contract_address')">
      <IntegrationDetails
        :network="normalizedFeed.network"
        :chain="normalizedFeed.chain"
        :proxy-address="normalizedFeed.proxyAddress"
        :feed-address="normalizedFeed.address"
        :contract-id="normalizedFeed.contractId"
        :url-underlying-contract="normalizedFeed.urlUnderlyingContract"
        :url-proxy-contract="normalizedFeed.urlProxyContract"
      />
    </Fieldset>
    <TransactionsList
      v-if="transactions"
      class="transactions"
      :transactions="transactions"
    />
    <el-pagination
      v-if="feed && numberOfPages > 1"
      :small="small"
      class="pagination"
      layout="prev, pager, next"
      :pager-count="5"
      :page-count="numberOfPages"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import feed from '@/apollo/queries/feed.gql'
import requests from '@/apollo/queries/requests.gql'
import { getWitnetBlockExplorerLink } from '@/utils/getWitnetBlockExplorerLink'
import { CHART_RANGE } from '@/constants'
import { formatTimestamp } from '@/utils/formatTimestamp'
import { formatNumber } from '@/utils/formatNumber'
import { formatMilliseconds } from '@/utils/formatMilliseconds'
import { getTimestampByRange } from '@/utils/getTimestampByRange.js'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'

export default {
  apollo: {
    feed: {
      prefetch: true,
      query: feed,
      variables() {
        return {
          timestamp: this.timestamp,
          feedFullName: this.feedFullName,
        }
      },
      pollInterval: 60000,
    },
    requests: {
      prefetch: true,
      query: requests,
      variables() {
        return {
          feedFullName: this.feedFullName,
          page: this.currentPage,
          size: this.itemsPerPage,
        }
      },
      pollInterval: 60000,
    },
  },
  data() {
    return {
      ranges: CHART_RANGE,
      currentPage: 1,
      itemsPerPage: 25,
      range: 24,
      timestamp: getTimestampByRange(CHART_RANGE.w.value),
      feedFullName: this.$route.params.id,
    }
  },
  computed: {
    small() {
      return this.numberOfPages > 10
    },
    normalizedFeed() {
      if (this.feed) {
        return {
          name: this.feed.name.toUpperCase(),
          address: this.feed.address,
          proxyAddress: this.feed.proxyAddress,
          contractId: this.feed.contractId,
          finality: Number(this.feed.finality),
          deviation: this.feed.deviation,
          heartbeat: Number(this.feed.heartbeat),
          decimals: this.feed.feedFullName.split('_').pop() || 3,
          chain: this.feed.chain.split('.').map(capitalizeFirstLetter)[0],
          network: this.feed.network
            .split('-')
            .map(capitalizeFirstLetter)
            .join(' '),
          urlUnderlyingContract: this.feed.blockExplorer.replace(
            `{address}`,
            this.feed.address
          ),
          urlProxyContract: this.feed.blockExplorer.replace(
            `{address}`,
            this.feed.proxyAddress
          ),
        }
      } else {
        return null
      }
    },
    lastResultDate() {
      if (this.transactions) {
        return formatTimestamp(this.transactions[0].timestamp)
      } else {
        return ''
      }
    },
    feedTimeToUpdate() {
      return formatMilliseconds(
        this.normalizedFeed.heartbeat + this.normalizedFeed.finality,
        ` ${this.$t('and')} `,
        this.$i18n.locale
      )
    },
    lastResultValue() {
      if (this.transactions) {
        return `${this.transactions[0].data.label} ${formatNumber(
          parseFloat(this.transactions[0].data.value) /
            10 ** this.transactions[0].data.decimals
        )} `
      } else {
        return null
      }
    },
    maxTimeToResolve() {
      return this.normalizedFeed.heartbeat + this.normalizedFeed.finality
    },
    numberOfPages() {
      return this.feed
        ? Math.ceil(this.feed.requests.length / this.itemsPerPage)
        : 0
    },
    chartData() {
      if (this.feed && this.feed.requests.length > 0) {
        return this.feed.requests
          .map((request) => {
            return {
              time: Number(request.timestamp),
              value:
                parseFloat(request.result) / 10 ** this.normalizedFeed.decimals,
            }
          })
          .sort((t1, t2) => t1.time - t2.time)
      } else {
        return [{ time: 0, value: 0 }]
      }
    },
    transactions() {
      if (this.feed && this.requests && this.requests.length > 0) {
        return this.requests.map((request) => ({
          witnetLink: getWitnetBlockExplorerLink(request.drTxHash),
          drTxHash: request.drTxHash,
          data: {
            label: this.feed.label,
            value: request.result,
            decimals: this.normalizedFeed.decimals,
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
    updateQuery(val) {
      this.timestamp = getTimestampByRange(this.ranges[val].value)
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template: max-content max-content max-content max-content 1fr / 1fr;
  .pagination {
    padding-bottom: 16px;
    justify-self: center;
  }
}
@media (max-width: 850px) {
  .content {
    .chart {
      margin-top: 0;
    }
  }
}
</style>
