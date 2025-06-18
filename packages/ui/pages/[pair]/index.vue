<template>
  <div>
    <WSection
      content-classes="[&&]:p-[45px_100px] [&&]:sm:p-[32px_32px_70px_32px] [&&]:xs:p-[32px_16px_70px_16px]"
    >
      <template #content>
        <FeedFilters @empty="handleEmpty" @loading="handleLoading" />
        <div class="flex gap-md my-lg">
          <div
            v-for="network in selectedEcosystem"
            :key="network.key"
            class="cursor-pointer text-small-bold dark:text-white-50 py-xs px-sm border-2 border-white-100 dark:border-white-500 rounded-full bg-black-100 dark:bg-black-900"
            :class="{ active: isActiveNetwork(network) }"
            @click="selectFeed(network)"
          >
            {{ network.label }}
          </div>
        </div>
        <DataFeedDetails
          v-if="selectedFeed"
          :feed-full-name="selectedFeed.feedFullName"
        />
        <div
          v-else-if="navBarSelection.length"
          class="grid gap-md justify-center justify-items-center w-full pb-2xl"
        >
          <SvgIcon name="empty" tw-styles="w-[250px] h-auto" />
          <p class="text">No available feed found for this network!</p>
          <a :href="URLS.requestDataFeed" target="_blank">
            <WButton :type="ButtonType.primary">
              {{ $t('navbar.request_data_feed') }}
            </WButton>
          </a>
        </div>
      </template>
    </WSection>
  </div>
</template>
<script setup lang="ts">
import { WSection, WButton, ButtonType } from 'wit-vue-ui'
import { URLS } from '@/constants'
import type { FeedInfo, Network } from '~/types'
const route = useRoute()
const store = useStore()
const { feeds, navBarSelection } = storeToRefs(store)
const selectedNetwork = ref('')
const selectedFeed: Ref<FeedInfo | null> = ref(null)
const currentPair = ref(route.params.pair.toString().replace('-', '/'))
const currentEcosystemSeoFormat = ref(currentPair.value.toUpperCase())
const selectedEcosystem = computed(() =>
  store.includeTestnets
    ? store.selectedEcosystem
    : store.mainnetSelectedEcosystem,
)
watch(feeds, () => {
  selectedFeed.value = defaultFeed.value
})
onMounted(async () => {
  store.updateSelectedNetwork({ networks: [] })
  store.setSelectedPair(currentPair.value.toLowerCase())
  await store.fetchFilteredNetworks()
  selectFeed(selectedEcosystem.value[0])
})
onBeforeUnmount(() => {
  store.setSelectedPair(null)
  store.updateSelectedNetwork({ networks: [] })
})
useHead({
  title: `Witnet Data Feeds for ${currentEcosystemSeoFormat.value}`,
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'viewport-fit=cover, width=device-width, initial-scale=1',
    },
    {
      name: 'title',
      content: `Witnet Data Feeds for ${currentEcosystemSeoFormat.value}`,
    },
    {
      name: 'description',
      content: `Explore the list of decentralized data feeds for ${currentEcosystemSeoFormat.value}, using the Witnet oracle network`,
    },
    {
      name: 'twitter:title',
      content: `Witnet Data Feeds for ${currentEcosystemSeoFormat.value}`,
    },
    {
      name: 'twitter:description',
      content: `Explore the list of decentralized data feeds for ${currentEcosystemSeoFormat.value}, using the Witnet oracle network`,
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
      content: `Witnet Data Feeds for ${currentEcosystemSeoFormat.value}`,
    },
    {
      property: 'og:description',
      content: `Explore the list of decentralized data feeds for ${currentEcosystemSeoFormat.value}, using the Witnet oracle network`,
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
  ogTitle: () => `Witnet Data Feeds for ${currentEcosystemSeoFormat.value}`,
  title: () => `Witnet Data Feeds for ${currentEcosystemSeoFormat.value}`,
  description: () =>
    `Explore the list of decentralized data feeds for ${currentEcosystemSeoFormat.value}, using the Witnet oracle network`,
  ogDescription: () =>
    `Explore the list of decentralized data feeds for ${currentEcosystemSeoFormat.value}, using the Witnet oracle network`,
  twitterTitle: () => `Witnet Data Feeds on ${currentEcosystemSeoFormat.value}`,
  twitterDescription: () =>
    `Explore the list of decentralized data feeds for ${currentEcosystemSeoFormat.value}, using the Witnet oracle network`,
})

const loadingFeeds = ref(true)
const noFeedsAvailable = ref(false)
const defaultFeed = computed(() => {
  return feeds.value.length
    ? feeds.value.reduce((acc, feed) => {
        const networkslist = selectedEcosystem.value.map(
          (ecosystem) => ecosystem.key,
        )
        if (networkslist.includes(feed.network)) {
          acc = feed
        }
        return acc
      })
    : null
})

function isActiveNetwork(network: Network) {
  return network.key === (selectedFeed.value?.network ?? selectedNetwork.value)
}

function handleEmpty(value: boolean) {
  noFeedsAvailable.value = value
}
function selectFeed(network: Network) {
  const selectedFeeds = feeds.value.filter(
    (feed: FeedInfo) => feed.network === network.key,
  )
  selectedFeed.value = selectedFeeds.length ? selectedFeeds[0] : null
  selectedNetwork.value = network.key
}
function handleLoading(value: boolean) {
  loadingFeeds.value = value
}
</script>

<style lang="scss">
.active {
  @apply bg-white-50 dark:bg-black-950 border-black-950 dark:border-white-50;
}
</style>
