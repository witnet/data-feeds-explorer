<template>
  <div> {{ lastResultValue }}</div>
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
// import feed from '@/apollo/queries/feed.gql'
// import requests from '@/apollo/queries/requests.gql'
import { getWitnetBlockExplorerLink } from '@/utils/getWitnetBlockExplorerLink'
import { CHART_RANGE } from '@/constants'
import { formatTimestamp } from '@/utils/formatTimestamp'
import { formatNumber } from '@/utils/formatNumber'
import { formatMilliseconds } from '@/utils/formatMilliseconds'
import { getTimestampByRange } from '@/utils/getTimestampByRange.js'

const vm = getCurrentInstance();

const store = useNetwork()
const route = useRoute()

const emit = defineEmits(['feed-name', 'network', 'feed-date', 'feed-value'])

const ranges = ref(CHART_RANGE)
const currentPage = ref(1)
const itemsPerPage = ref(25)
const range = ref(24)
const timestamp = ref(getTimestampByRange(CHART_RANGE.w.value))
const feedFullName = ref(route.params.id)
    
const variables = { timestamp: timestamp.value, feedFullName: feedFullName.value }

const requestsQuery = gql`
query requests($feedFullName: String!, $page: Int!, $size: Int!) {
  requests(feedFullName: $feedFullName, page: $page, size: $size) {
    feedFullName
    result
    drTxHash,
    requestId
    timestamp
  }
}`

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
  }`


// pollInterval: 60000,
const feed = await useAsyncQuery(feedQuery, variables)
const requests = await useAsyncQuery(requestsQuery, requestsVariables)

// const small = computed(() => {
//   return numberOfPages.value > 10
// })

const normalizedFeed = computed(() => {
  if (feed.data.value) {
    const adaptedFeed = feed.data.value.feed
    emit('feed-name', adaptedFeed.name.toUpperCase())
    emit('network', adaptedFeed.networkName)
    return {
      name: adaptedFeed.name.toUpperCase(),
      isRouted: adaptedFeed.isRouted,
      address: adaptedFeed.address,
      proxyAddress: adaptedFeed.proxyAddress,
      contractId: adaptedFeed.contractId,
      finality: Number(adaptedFeed.finality),
      deviation: adaptedFeed.deviation,
      heartbeat: Number(adaptedFeed.heartbeat),
      decimals: adaptedFeed.feedFullName.split('_').pop() || 3,
      chain: adaptedFeed.chain,
      lastResultValue: adaptedFeed.lastResult,
      lastResultTimestamp: adaptedFeed.lastResultTimestamp || '',
      networkName: adaptedFeed.networkName,
      label: adaptedFeed.label,
      network: adaptedFeed.network,
      urlUnderlyingContract: adaptedFeed.blockExplorer.replace(
        `{address}`,
        adaptedFeed.address
      ),
      urlProxyContract: adaptedFeed.blockExplorer.replace(
        `{address}`,
        adaptedFeed.proxyAddress
      ),
      logo: adaptedFeed.logo,
    }
  } else {
    return null
  }
})

const lastResultDate = computed(() => {
  // console.log('normalizedfeed.value', normalizedFeed.value)
  if (normalizedFeed.value) {
    emit(
      'feed-date',
      formatTimestamp(normalizedFeed.value.lastResultTimestamp)
    )
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
  if (normalizedFeed.value) {
    const dataFeedLastValue = `${normalizedFeed.value.label}${formatNumber(
      parseFloat(normalizedFeed.value.lastResultValue) /
        10 ** normalizedFeed.value.decimals
    )} `
    emit('feed-value', dataFeedLastValue)
    return dataFeedLastValue
  } else {
    return null
  }
})
const maxTimeToResolve = computed(() => {
  if (normalizedFeed.value && normalizedFeed.value.heartbeat) {
    return normalizedFeed.value.heartbeat + normalizedFeed.value.finality
  } else {
    return null
  }
})
const numberOfPages = computed(() => {
  return feed.data.value
    ? Math.ceil(feed.data.value.feed.requests.length / itemsPerPage.value)
    : 0
})
const chartData = computed(() => {
  if (feed.data.value.feed && feed.data.value.feed.requests.length > 0) {
    return feed.data.value.feed.requests
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
  if (feed.data.value && requests.data.value && requests.data.value.requests.length > 0) {
    return requests.data.value.requests.map((request) => ({
      witnetLink: getWitnetBlockExplorerLink(request.drTxHash),
      drTxHash: request.drTxHash,
      data: {
        label: feed.data.value.feed.label,
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
  (value) => {
    if (value) {
      store.updateSelectedNetwork(
        [
          {
            chain: value.chain,
            key: value.network,
            label: value.networkName,
          },
        ],
        )
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
