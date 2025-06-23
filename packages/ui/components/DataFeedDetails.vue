<template>
  <div v-if="status === 'success' && normalizedFeed" class="content">
    <ClientOnly>
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
    </ClientOnly>
    <DataFeedDescription
      :is-routed="normalizedFeed.isRouted"
      :feed-name="normalizedFeed.name"
      :network-name="normalizedFeed.networkName"
      :last-result-value="lastResultValue ?? ''"
      :last-result-date="lastResultDate"
      :feed-time-to-update="feedTimeToUpdate ?? ''"
      :deviation="normalizedFeed.deviation"
      :sources="normalizedFeed.sources"
    />
    <ClientOnly>
      <FieldsetCard
        v-if="
          !normalizedFeed.isRouted &&
          (maxTimeToResolve || normalizedFeed.deviation)
        "
        :title="$t('data_feed_details.trigger_parameters')"
      >
        <DataFeedTriggerParams
          :deviation="normalizedFeed.deviation"
          :max-time-to-resolve="maxTimeToResolve ?? 0"
          :last-result-timestamp="transactions ? transactions[0].timestamp : ''"
        />
      </FieldsetCard>
    </ClientOnly>
    <FieldsetCard :title="$t('data_feed_details.contract_address')">
      <ClientOnly>
        <IntegrationDetails
          :network="normalizedFeed.networkName"
          :proxy-address="normalizedFeed.proxyAddress"
          :feed-address="normalizedFeed.address"
          :contract-id="normalizedFeed.contractId"
          :url-underlying-contract="normalizedFeed.urlUnderlyingContract"
          :url-proxy-contract="normalizedFeed.urlProxyContract"
        />
      </ClientOnly>
    </FieldsetCard>
    <TransactionsList
      v-if="transactions"
      class="transactions"
      :transactions="transactions"
    />
    <WPagination
      v-if="totalItems && totalItems > itemsPerPage"
      v-model:page="currentPage"
      class="justify-self-center"
      :total="totalItems"
      :page-size="itemsPerPage"
    />
  </div>
  <DetailsSkeleton v-else />
</template>

<script setup lang="ts">
import type { AreaData, Time } from 'lightweight-charts'
import { WPagination } from 'wit-vue-ui'
import { getWitnetBlockExplorerLink } from '@/utils/getWitnetBlockExplorerLink'
import { CHART_RANGE, POLLER_MILLISECONDS } from '@/constants'
import { formatTimestamp } from '@/utils/formatTimestamp'
import { formatNumber } from '@/utils/formatNumber'
import { formatMilliseconds } from '@/utils/formatMilliseconds'
import { getTimestampByRange } from '@/utils/getTimestampByRange.js'
import { AsyncInterval } from '@/utils/asyncInterval'
import { type Ref } from 'vue'
import { ClientOnly } from '#components'

const store = useStore()
const router = useRouter()
const asyncFeedsInterval = new AsyncInterval(POLLER_MILLISECONDS)
const timestamp = ref(getTimestampByRange(CHART_RANGE.w.value))
const ranges = CHART_RANGE
const currentRange: Ref<number | null> = ref(null)
const currentPage = ref(1)
const itemsPerPage = ref(25)
const { locale, t } = useI18n({ useScope: 'global' })

watch(currentPage, (valX, _valY) => {
  handleCurrentChange()
})

const props = defineProps({
  feedFullName: {
    type: String,
    required: true,
  },
})

const fetchData = async () => {
  await store.fetchFeedInfo({
    feedFullName: props.feedFullName,
    timestamp: timestamp.value,
  })
  await store.fetchPaginatedFeedRequests({
    feedFullName: props.feedFullName,
    page: currentPage.value,
    size: itemsPerPage.value,
  })
  if (!store.feed) {
    router.push('/')
    return false
  } else {
    return true
  }
}
const feedId = computed(() => props.feedFullName)
const { status, refresh } = await useAsyncData('feed', fetchData)
onMounted(() => {
  asyncFeedsInterval.setAsyncInterval(refresh)
})
onBeforeUnmount(() => {
  asyncFeedsInterval.clearAsyncInterval()
})
watch(feedId, () => {
  asyncFeedsInterval.clearAsyncInterval()
  asyncFeedsInterval.setAsyncInterval(refresh)
})
const { feed } = storeToRefs(store)
const normalizedFeed = computed(() => {
  if (feed.value) {
    return {
      name: feed.value.name?.toUpperCase(),
      isRouted: feed.value.isRouted,
      sources: feed.value.sources,
      address: feed.value.address,
      proxyAddress: feed.value.proxyAddress,
      contractId: feed.value.contractId,
      finality: Number(feed.value.finality),
      deviation: feed.value.deviation,
      heartbeat: Number(feed.value.heartbeat),
      decimals: feed.value.feedFullName.split('_').pop() || '3',
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
        10 ** parseInt(normalizedFeed.value.decimals.toString())
      ).toString(),
    )} `
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

const feedName = computed(() => normalizedFeed.value?.name ?? '')
const networkName = computed(() => normalizedFeed.value?.networkName ?? '')

const chartData: Ref<AreaData<Time>[]> = computed(() => {
  if (feed.value && feed.value?.requests.length > 0) {
    return feed.value?.requests
      .map((request: any) => {
        return {
          time: Number(request.timestamp),
          value:
            parseFloat(request.result) /
            10 ** parseInt((normalizedFeed.value?.decimals ?? 3).toString()),
        } as AreaData<Time>
      })
      .sort((t1: any, t2: any) => t1.time - t2.time)
  } else {
    return [{ time: 0, value: 0 } as AreaData<Time>]
  }
})
const transactions = computed(() => {
  if (store.paginatedFeedRequest && store.paginatedFeedRequest.total > 0) {
    return store.paginatedFeedRequest.requests.map((request) => ({
      witnetLink: getWitnetBlockExplorerLink(request.drTxHash),
      drTxHash: request.drTxHash,
      data: {
        label: feed.value?.label,
        value: request.result,
        decimals: normalizedFeed.value?.decimals,
      },
      timestamp: request.timestamp,
    }))
  } else {
    return null
  }
})
const totalItems = computed(() => store.paginatedFeedRequest?.total ?? 0)

const handleCurrentChange = async () => {
  await store.fetchPaginatedFeedRequests({
    feedFullName: props.feedFullName,
    page: currentPage.value,
    size: itemsPerPage.value,
  })
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
        feedFullName: props.feedFullName,
        timestamp: timestamp.value,
      })
    }
  }
}
useHead({
  title: `${feedName.value} Witnet Data Feed on ${networkName.value}`,
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'viewport-fit=cover, width=device-width, initial-scale=1',
    },
    {
      name: 'title',
      content: `${feedName.value} Witnet Data Feed on ${networkName.value}`,
    },
    {
      name: 'description',
      content: `Last result of ${feedName.value} Witnet Data Feed on ${networkName.value} is ${lastResultValue.value} at ${lastResultDate.value}`,
    },
    {
      name: 'twitter:title',
      content: `${feedName.value} Witnet Data Feed on ${networkName.value}`,
    },
    {
      name: 'twitter:description',
      content: `Last result of ${feedName.value} Witnet Data Feed on ${networkName.value} is ${lastResultValue.value} at ${lastResultDate.value}`,
    },
    {
      name: 'twitter:image',
      content: 'https://feeds.witnet.io/meta-image.png',
    },
    {
      name: 'twitter:image:alt',
      content: 'Witnet data feeds explorer',
    },
    {
      property: 'og:title',
      content: `${feedName.value} Witnet Data Feed on ${networkName.value}`,
    },
    {
      property: 'og:description',
      content: `Last result of ${feedName.value} Witnet Data Feed on ${networkName.value} is ${lastResultValue.value} at ${lastResultDate.value}`,
    },
    {
      property: 'og:image',
      content: 'https://feeds.witnet.io/meta-image.png',
    },
    {
      property: 'og:image:secure_url',
      content: 'https://feeds.witnet.io/meta-image.png',
    },
    {
      property: 'og:image:alt',
      content: 'Witnet data feeds explorer',
    },
  ],
})
useSeoMeta({
  ogTitle: () => `${feedName.value} Witnet Data Feed on ${networkName.value}`,
  title: () => `${feedName.value} Witnet Data Feed on ${networkName.value}`,
  description: () =>
    `Last result of ${feedName.value}} Witnet Data Feed on ${networkName.value} is ${lastResultValue.value} at ${lastResultDate.value}`,
  ogDescription: () =>
    `Last result of ${feedName.value}} Witnet Data Feed on ${networkName.value} is ${lastResultValue.value} at ${lastResultDate.value}`,
  twitterTitle: () =>
    `${feedName.value}} Witnet Data Feed on ${networkName.value}`,
  twitterDescription: () =>
    `Last result of ${feedName.value} Witnet Data Feed on ${networkName.value} is ${lastResultValue.value} at ${lastResultDate.value}`,
})
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template: max-content max-content max-content max-content 1fr / 1fr;
  @apply gap-md;
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
