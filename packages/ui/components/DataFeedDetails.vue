<template>
  <div v-if="normalizedFeed" class="content">
    <LazyChart
      v-if="feed"
      class="chart"
      :data="chartData"
      :logo="feed.logo"
      :last-result-timestamp="normalizedFeed.lastResultTimestamp"
      :last-result-value="lastResultValue"
      :data-label="feed.label"
      :name="normalizedFeed.name"
      :time-to-update="maxTimeToResolve"
      :decimals="normalizedFeed.decimals"
      @change-range="updateQuery"
    />
    <DataFeedDescription
      :is-routed="normalizedFeed.isRouted"
      :feed-name="normalizedFeed.name"
      :network-name="normalizedFeed.networkName"
      :last-result-value="lastResultValue"
      :last-result-date="lastResultDate"
      :feed-time-to-update="feedTimeToUpdate"
      :deviation="normalizedFeed.deviation"
    />
    <Fieldset
      v-if="maxTimeToResolve || normalizedFeed.deviation"
      :title="$t('data_feed_details.trigger_parameters')"
    >
      <DataFeedTriggerParams
        :deviation="normalizedFeed.deviation"
        :max-time-to-resolve="maxTimeToResolve"
        :last-result-timestamp="transactions ? transactions[0].timestamp : ''"
      />
    </Fieldset>
    <Fieldset :title="$t('data_feed_details.contract_address')">
      <IntegrationDetails
        :network="normalizedFeed.networkName"
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
        this.$emit('feed-name', this.feed.name.toUpperCase())
        this.$emit('network', this.feed.networkName)
        return {
          name: this.feed.name.toUpperCase(),
          isRouted: this.feed.isRouted,
          address: this.feed.address,
          proxyAddress: this.feed.proxyAddress,
          contractId: this.feed.contractId,
          finality: Number(this.feed.finality),
          deviation: this.feed.deviation,
          heartbeat: Number(this.feed.heartbeat),
          decimals: this.feed.feedFullName.split('_').pop() || 3,
          chain: this.feed.chain,
          lastResultValue: this.feed.lastResult,
          lastResultTimestamp: this.feed.lastResultTimestamp || '',
          networkName: this.feed.networkName,
          label: this.feed.label,
          network: this.feed.network,
          urlUnderlyingContract: this.feed.blockExplorer.replace(
            `{address}`,
            this.feed.address
          ),
          urlProxyContract: this.feed.blockExplorer.replace(
            `{address}`,
            this.feed.proxyAddress
          ),
          logo: this.feed.logo,
        }
      } else {
        return null
      }
    },
    lastResultDate() {
      if (this.normalizedFeed) {
        this.$emit(
          'feed-date',
          formatTimestamp(this.normalizedFeed.lastResultTimestamp)
        )
        return formatTimestamp(this.normalizedFeed.lastResultTimestamp)
      } else {
        return ''
      }
    },
    feedTimeToUpdate() {
      return this.normalizedFeed.heartbeat
        ? formatMilliseconds(
            this.normalizedFeed.heartbeat + this.normalizedFeed.finality,
            ` ${this.$t('and')} `,
            this.$i18n.locale
          )
        : null
    },
    lastResultValue() {
      if (this.normalizedFeed) {
        const dataFeedLastValue = `${this.normalizedFeed.label}${formatNumber(
          parseFloat(this.normalizedFeed.lastResultValue) /
            10 ** this.normalizedFeed.decimals
        )} `
        this.$emit('feed-value', dataFeedLastValue)
        return dataFeedLastValue
      } else {
        return null
      }
    },
    maxTimeToResolve() {
      if (this.normalizedFeed.heartbeat) {
        return this.normalizedFeed.heartbeat + this.normalizedFeed.finality
      } else {
        return null
      }
    },
    numberOfPages() {
      return this.requests
        ? Math.ceil(this.requests.total / this.itemsPerPage)
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
      if (this.requests && this.requests.total > 0) {
        return this.requests.requests.map((request) => ({
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
  watch: {
    normalizedFeed: {
      deep: true,
      handler(value) {
        if (value) {
          this.$store.commit('updateSelectedNetwork', {
            network: [
              {
                chain: value.chain,
                key: value.network,
                label: value.networkName,
              },
            ],
          })
        }
      },
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
