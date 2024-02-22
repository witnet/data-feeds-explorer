<template>
  <div v-if="normalizedFeed" class="content">
    <ChartWidget
      v-if="feed"
      class="chart"
      :data="chartData"
      :logo="feed.logo"
      :last-result-timestamp="normalizedFeed.lastResultTimestamp"
      :last-result-value="lastResultValue ?? ''"
      :data-label="feed.label"
      :name="normalizedFeed.name"
      :time-to-update="maxTimeToResolve ?? 0"
      :decimals="normalizedFeed.decimals"
      @change-range="updateQuery"
    />
    <DataFeedDescription
      :is-routed="normalizedFeed.isRouted"
      :feed-name="normalizedFeed.name"
      :network-name="normalizedFeed.networkName"
      :last-result-value="lastResultValue ?? ''"
      :last-result-date="lastResultDate"
      :feed-time-to-update="feedTimeToUpdate ?? ''"
      :deviation="normalizedFeed.deviation"
    />
    <FieldsetCard
      v-if="maxTimeToResolve || normalizedFeed.deviation"
      :title="$t('data_feed_details.trigger_parameters')"
    >
      <DataFeedTriggerParams
        :deviation="normalizedFeed.deviation"
        :max-time-to-resolve="maxTimeToResolve"
        :last-result-timestamp="transactions ? transactions[0].timestamp : ''"
      />
    </FieldsetCard>
    <FieldsetCard :title="$t('data_feed_details.contract_address')">
      <IntegrationDetails
        :network="normalizedFeed.networkName"
        :proxy-address="normalizedFeed.proxyAddress"
        :feed-address="normalizedFeed.address"
        :contract-id="normalizedFeed.contractId"
        :url-underlying-contract="normalizedFeed.urlUnderlyingContract"
        :url-proxy-contract="normalizedFeed.urlProxyContract"
      />
    </FieldsetCard>
    <TransactionsList
      v-if="transactions"
      class="transactions"
      :transactions="transactions"
    />
    <PaginationSection
      :items-length="itemsLength"
      @change-page="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import PaginationSection from './PaginationSection.vue'
import { getWitnetBlockExplorerLink } from '@/utils/getWitnetBlockExplorerLink'
import { CHART_RANGE, POLLER_MILLISECONDS } from '@/constants'
import { formatTimestamp } from '@/utils/formatTimestamp'
import { formatNumber } from '@/utils/formatNumber'
import { formatMilliseconds } from '@/utils/formatMilliseconds'
import { getTimestampByRange } from '@/utils/getTimestampByRange.js'
import { AsyncInterval } from '@/utils/asyncInterval'

const emit = defineEmits(['feed-name', 'network', 'feed-date', 'feed-value'])

const store = useStore()
const route = useRoute()
const asyncFeedsInterval = new AsyncInterval(POLLER_MILLISECONDS)
const timestamp = ref(getTimestampByRange(CHART_RANGE.w.value))
const ranges = CHART_RANGE
const currentRange = ref(null)
const currentPage = ref(1)
const itemsPerPage = ref(25)
const { locale, t } = useI18n({ useScope: 'global' })

onMounted(() => {
  asyncFeedsInterval.setAsyncInterval(fetchData)
})
onBeforeUnmount(() => {
  asyncFeedsInterval.clearAsyncInterval()
})
const feed = computed(() => store.feed)
const normalizedFeed = computed(() => {
  if (feed.value) {
    emit('feed-name', feed.value.name?.toUpperCase())
    emit('network', feed.value.networkName)
    return {
      name: feed.value.name?.toUpperCase(),
      isRouted: feed.value.isRouted,
      address: feed.value.address,
      proxyAddress: feed.value.proxyAddress,
      contractId: feed.value.contractId,
      finality: Number(feed.value.finality),
      deviation: feed.value.deviation,
      heartbeat: Number(feed.value.heartbeat),
      decimals: feed.value.feedFullName.split('_').pop() || 3,
      chain: feed.value.chain,
      lastResultValue: feed.value.lastResult,
      lastResultTimestamp: feed.value.lastResultTimestamp || '',
      networkName: feed.value.networkName,
      label: feed.value.label,
      network: feed.value.network,
      urlUnderlyingContract: feed.value.blockExplorer.replace(
        `{address}`,
        feed.value.address,
      ),
      urlProxyContract: feed.value.blockExplorer.replace(
        `{address}`,
        feed.value.proxyAddress,
      ),
      logo: feed.value.logo,
    }
  } else {
    return null
  }
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
  return normalizedFeed.value && normalizedFeed.value.heartbeat
    ? formatMilliseconds(
        normalizedFeed.value.heartbeat + normalizedFeed.value.finality,
        ` ${t('and')} `,
        locale.value,
      )
    : null
})
const lastResultValue = computed(() => {
  if (normalizedFeed.value) {
    const dataFeedLastValue = `${normalizedFeed.value.label}${formatNumber(
      (
        parseFloat(normalizedFeed.value.lastResultValue) /
        10 ** normalizedFeed.value.decimals
      ).toString(),
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

const itemsLength = computed(() => {
  return feed.value.requests.length
})
const fetchData = async () => {
  await store.fetchFeedInfo({
    feedFullName: route.params.id.toString(),
    timestamp: timestamp.value,
  })
  await store.fetchPaginatedFeedRequests({
    feedFullName: route.params.id.toString(),
    page: currentPage.value,
    size: itemsPerPage.value,
  })
}

const chartData = computed(() => {
  if (feed.value && feed.value.requests.length > 0) {
    return feed.value.requests
      .map((request: any) => {
        return {
          time: Number(request.timestamp),
          value:
            parseFloat(request.result) / 10 ** normalizedFeed.value?.decimals,
        }
      })
      .sort((t1: any, t2: any) => t1.time - t2.time)
  } else {
    return [{ time: 0, value: 0 }]
  }
})
const transactions = computed(() => {
  if (
    feed.value &&
    store.paginatedFeedRequest &&
    store.paginatedFeedRequest.length > 0
  ) {
    return store.paginatedFeedRequest.map((request: any) => ({
      witnetLink: getWitnetBlockExplorerLink(request.drTxHash),
      drTxHash: request.drTxHash,
      data: {
        label: feed.value.label,
        value: request.result,
        decimals: normalizedFeed.value?.decimals,
      },
      timestamp: request.timestamp,
    }))
  } else {
    return null
  }
})
const handleCurrentChange = async (val: number) => {
  if (currentPage.value !== val) {
    currentPage.value = val
    await store.fetchPaginatedFeedRequests({
      feedFullName: route.params.id.toString(),
      page: currentPage.value,
      size: itemsPerPage.value,
    })
  }
}
const updateQuery = async (val: string) => {
  let allowUpdateInfo: boolean = false
  if (currentRange.value) {
    allowUpdateInfo = true
  }
  if (currentRange.value !== ranges[val].value) {
    currentRange.value = ranges[val].value
    timestamp.value = getTimestampByRange(ranges[val].value)
    if (allowUpdateInfo) {
      await store.fetchFeedInfo({
        feedFullName: route.params.id.toString(),
        timestamp: timestamp.value,
      })
    }
  }
}
watch(
  normalizedFeed,
  (value) => {
    if (value) {
      store.updateSelectedNetwork({
        networks: [
          {
            chain: value.chain,
            key: value.network,
            label: value.networkName,
          },
        ],
      })
    }
  },
  { deep: true },
)

useSeoMeta({
  ogTitle: () =>
    `${normalizedFeed.value?.name ?? ''} Witnet Data Feed on ${normalizedFeed.value?.networkName ?? 'selected network'}`,
  title: () =>
    `${normalizedFeed.value?.name ?? ''} Witnet Data Feed on ${normalizedFeed.value?.networkName ?? 'selected network'}`,
  description: () =>
    `Last result of ${normalizedFeed.value?.name ?? ''} Witnet Data Feed on ${normalizedFeed.value?.networkName ?? 'selected network'} is ${lastResultValue.value} at ${lastResultDate.value}`,
  ogDescription: () =>
    `Last result of ${normalizedFeed.value?.name ?? ''} Witnet Data Feed on ${normalizedFeed.value?.networkName ?? 'selected network'} is ${lastResultValue.value} at ${lastResultDate.value}`,
  twitterTitle: () =>
    `${normalizedFeed.value?.name ?? ''} Witnet Data Feed on ${normalizedFeed.value?.networkName ?? 'selected network'}`,
  twitterDescription: () =>
    `Last result of ${normalizedFeed.value?.name ?? ''} Witnet Data Feed on ${normalizedFeed.value?.networkName ?? 'selected network'} is ${lastResultValue.value} at ${lastResultDate.value}`,
})
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
