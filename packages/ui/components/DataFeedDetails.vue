<template>
  <div>{{ lastResultValue }}</div>
  <div v-if="normalizedFeed" class="content">
    <LazyChart
      v-if="normalizedFeed"
      class="chart"
      :data="chartData"
      :logo="normalizedFeed.logo"
      :last-result-timestamp="normalizedFeed.lastResultTimestamp"
      :last-result-value="lastResultValue"
      :data-label="normalizedFeed.label"
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
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import {
  getAdaptedFeed,
  getChartData,
  getLastResultValue,
  getMaxTimeToResolve,
  getTransactions,
} from '../utils/dataFeedDetails'
import { CHART_RANGE } from '@/constants'
import { formatTimestamp } from '@/utils/formatTimestamp'
import { getTimestampByRange } from '@/utils/getTimestampByRange.js'

const store = useNetwork()
const route = useRoute()

const emit = defineEmits(['feed-name', 'network', 'feed-date', 'feed-value'])

const ranges = ref(CHART_RANGE)
const currentPage = ref(1)
const itemsPerPage = ref(25)
// const range = ref(24)
const timestamp = ref(getTimestampByRange(CHART_RANGE.w.value))
const feedFullName = ref(route.params.id)

const variables = {
  timestamp: timestamp.value,
  feedFullName: feedFullName.value,
}

const requestsQuery = gql`
  query requests($feedFullName: String!, $page: Int!, $size: Int!) {
    requests(feedFullName: $feedFullName, page: $page, size: $size) {
      feedFullName
      result
      drTxHash
      requestId
      timestamp
    }
  }
`

// pollInterval: 60000,
const requestsVariables = {
  feedFullName: feedFullName.value,
  page: currentPage.value,
  size: itemsPerPage.value,
}
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
  }
`

// pollInterval: 60000,
const feed = await useQuery(feedQuery, variables)
const requests = await useQuery(requestsQuery, requestsVariables)

// const small = computed(() => {
//   return numberOfPages.value > 10
// })

const normalizedFeed = computed(() => {
  const adaptedFeed = getAdaptedFeed(feed?.result?.value?.feed)
  if (adaptedFeed) {
    emit('feed-name', adaptedFeed.name.toUpperCase())
    emit('network', adaptedFeed.networkName)
  }
  return adaptedFeed
})

const lastResultDate = computed(() => {
  if (normalizedFeed.value) {
    emit('feed-date', formatTimestamp(normalizedFeed.value.lastResultTimestamp))
    return formatTimestamp(normalizedFeed.value.lastResultTimestamp)
  } else {
    return ''
  }
})
const feedTimeToUpdate = computed(() => {
  // todo: make i18n work here
  // return normalizedFeed.value && normalizedFeed.value.heartbeat
  //   ? formatMilliseconds(
  //       normalizedFeed.value.heartbeat + normalizedFeed.value.finality,
  //       ` ${$t('and')} `,
  //       $i18n.locale
  //     )
  //   : null
  return null
})
const lastResultValue = computed(() => {
  return getLastResultValue(normalizedFeed.value)
})

watch(lastResultValue.value, (value) => {
  if (value) {
    emit('feed-value', dataFeedLastValue)
  }
})

const maxTimeToResolve = computed(() => {
  return getMaxTimeToResolve(normalizedFeed.value)
})
// const numberOfPages = computed(() => {
//   return feed.result.value
//     ? Math.ceil(feed.result.value.feed.requests.length / itemsPerPage.value)
//     : 0
// })
const chartData = computed(() => {
  return getChartData(feed?.result?.value?.feed?.requests, normalizedFeed.value)
})
const transactions = computed(() => {
  return getTransactions(normalizedFeed.value, requests?.result.value?.requests)
})

watch(
  () => normalizedFeed,
  (value) => {
    if (value) {
      store.updateSelectedNetwork([
        {
          chain: value.chain,
          key: value.network,
          label: value.networkName,
        },
      ])
    }
  },
  { deep: true }
)

function handleCurrentChange(val) {
  currentPage.value = val
}

function updateQuery(val) {
  timestamp.value = getTimestampByRange(ranges.value[val].value)
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
