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
import { CHART_RANGE } from '@/constants'
import { formatMilliseconds } from '@/utils/formatMilliseconds'
import { formatNumber } from '@/utils/formatNumber'
import { formatTimestamp } from '@/utils/formatTimestamp'
import { getTimestampByRange } from '@/utils/getTimestampByRange.js'
import { getWitnetBlockExplorerLink } from '@/utils/getWitnetBlockExplorerLink'
import feed from '@/apollo/queries/feed.gql'

export default {
  name: 'FeedPage',
  async asyncData(ctx) {
    const { id } = ctx.route.params
    const client = await ctx.app.apolloProvider.defaultClient
    const query = feed
    const timestamp = getTimestampByRange(CHART_RANGE.w.value)

    const currentPage = 1
    const itemsPerPage = 25
    const feedFullName = id

    const variables = {
      timestamp,
      feedFullName,
      page: currentPage,
      size: itemsPerPage,
    }
    const result = await client.query({ query, variables })

    return {
      feed: result.data.feed,
      requests: result.data.requests,
      timestamp,
      currentPage,
      itemsPerPage,
      feedFullName,
    }
  },
  data() {
    return {
      ranges: CHART_RANGE,
      range: 24,
      interval: setInterval(() => {
        this.fetchFeed()
      }, 60000),
    }
  },
  i18n: {
    seo: true,
  },
  head() {
    return {
      title: `${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork}`,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: `${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork}`,
        },
        {
          hid: 'description',
          name: 'description',
          content: `Last result of ${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork} is ${this.lastResultValue} at ${this.lastResultDate}`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork}`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Last result of ${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork} is ${this.lastResultValue} at ${this.lastResultDate}`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork}`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Last result of ${this.currentFeedName} Witnet Data Feed on ${this.selectedNetwork} is ${this.lastResultValue} at ${this.lastResultDate}`,
        },
      ],
    }
  },
  computed: {
    selectedNetwork() {
      if (!this.feed) {
        return null
      }

      return this.feed.networkName
    },
    currentFeedName() {
      if (!this.feed) {
        return null
      }

      return this.feed.name.toUpperCase()
    },
    selectedDataFeed() {
      return this.$store.state.selectedNetwork
        ? this.$store.state.selectedNetwork[0]?.label
        : null
    },
    small() {
      return this.numberOfPages > 10
    },
    normalizedFeed() {
      if (this.feed) {
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
  watch: {
    networks: {
      immediate: true,
      handler(networks) {
        this.$store.commit('setNetworks', {
          networks,
        })
      },
    },
    normalizedFeed: {
      deep: true,
      immediate: true,
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
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    async fetchFeed() {
      const client = this.$apolloProvider.defaultClient

      const variables = {
        timestamp: this.timestamp,
        feedFullName: this.feedFullName,
        page: this.currentPage,
        size: this.itemsPerPage,
      }

      const result = await client.query({ query: feed, variables })

      this.ecosystem = result.data.ecosystem
      this.feeds = result.data.feeds
      this.networks = result.data.networks
    },
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
