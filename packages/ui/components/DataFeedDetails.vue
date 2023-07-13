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
    <Pagination
      class="pagination"
      :current-page="currentPage"
      :total-count="200"
      :page-size="itemsPerPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import feed from '@/apollo/queries/feed.gql'
import requests from '@/apollo/queries/requests.gql'
import { getWitnetBlockExplorerLink } from '@/utils/getWitnetBlockExplorerLink'
import { CHART_RANGE } from '@/constants'
import { formatTimestamp } from '@/utils/formatTimestamp'
import { formatNumber } from '@/utils/formatNumber'
import { formatMilliseconds } from '@/utils/formatMilliseconds'
import { getTimestampByRange } from '@/utils/getTimestampByRange.js'


const feedQuery = gql`
  query feed($feedFullName: String!, $timestamp: Int!) {
    feed(feedFullName: $feedFullName) {
      feedFullName 
      isRouted
      name
      address
      contractId
      lastResult
      lastResultTimestamp
      network
      networkName
      chain
      label
      deviation
      proxyAddress
      heartbeat
      finality
      requests(timestamp: $timestamp) {
        feedFullName 
        result
        drTxHash
        requestId
        timestamp
      }
      blockExplorer
      color
      logo
    }
  }`
    
const variables = { timestamp: this.timestamp, feedFullName: this.feedFullName }
// pollInterval: 60000,
const feed = await useAsyncQuery(feedQuery, variables)

const requests = gql`
query requests($feedFullName: String!, $page: Int!, $size: Int!) {
  requests(feedFullName: $feedFullName, page: $page, size: $size) {
    feedFullName
    result
    drTxHash,
    requestId
    timestamp
  }
}`

const store = useNetwork()
const route = useRoute()

// pollInterval: 60000,
const requestsVariables = {
  feedFullName: this.feedFullName,
  page: this.currentPage,
  size: this.itemsPerPage,
}

const ranges = ref(CHART_RANGE)
const currentPage = ref(1)
const itemsPerPage = ref(25)
const range = ref(24)
const timestamp = ref(getTimestampByRange(CHART_RANGE.w.value))
const feedFullName = ref(route.params.id)

const small = computed(() => {
  return numberOfPages.value > 10
})
const normalizedFeed = computed(() => {
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
})
const lastResultDate = computed(() => {
  if (normalizedFeed.value) {
    this.$emit(
      'feed-date',
      formatTimestamp(normalizedFeed.value.lastResultTimestamp)
    )
    return formatTimestamp(normalizedFeed.value.lastResultTimestamp)
  } else {
    return ''
  }
})
const feedTimeToUpdate = computed(() => {
  return normalizedFeed.value.heartbeat
    ? formatMilliseconds(
        normalizedFeed.value.heartbeat + normalizedFeed.value.finality,
        ` ${this.$t('and')} `,
        this.$i18n.locale
      )
    : null
})
const lastResultValue = computed(() => {
  if (normalizedFeed.value) {
    const dataFeedLastValue = `${normalizedFeed.value.label}${formatNumber(
      parseFloat(normalizedFeed.value.lastResultValue) /
        10 ** normalizedFeed.value.decimals
    )} `
    this.$emit('feed-value', dataFeedLastValue)
    return dataFeedLastValue
  } else {
    return null
  }
})
const maxTimeToResolve = computed(() => {
  if (normalizedFeed.value.heartbeat) {
    return normalizedFeed.value.heartbeat + normalizedFeed.value.finality
  } else {
    return null
  }
})
const numberOfPages = computed(() => {
  return this.feed
    ? Math.ceil(this.feed.requests.length / itemsPerPage.value)
    : 0
})
const chartData = computed(() => {
  if (this.feed && this.feed.requests.length > 0) {
    return this.feed.requests
      .map((request) => {
        return {
          time: Number(request.timestamp),
          value:
            parseFloat(request.result) / 10 ** normalizedFeed.value.decimals,
        }
      })
      .sort((t1, t2) => t1.time - t2.time)
  } else {
    return [{ time: 0, value: 0 }]
  }
})
const transactions = computed(() => {
  if (this.feed && this.requests && this.requests.length > 0) {
    return this.requests.map((request) => ({
      witnetLink: getWitnetBlockExplorerLink(request.drTxHash),
      drTxHash: request.drTxHash,
      data: {
        label: this.feed.label,
        value: request.result,
        decimals: normalizedFeed.value.decimals,
      },
      timestamp: request.timestamp,
    }))
  } else {
    return null
  }
})

watch(
  () => normalizedFeed,
  () => {
    if (value) {
      store.updateSelectedNetwork({
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
  { deep: true }
)

function handleCurrentChange(val) {
  this.currentPage = val
}

function updateQuery(val) {
  this.timestamp = getTimestampByRange(ranges.value[val].value)
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
