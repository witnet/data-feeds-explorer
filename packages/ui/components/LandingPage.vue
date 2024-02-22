<template>
  <div class="landing-page">
    <div class="text">
      <h2 class="title">{{ $t('landing.supported_chains.title') }}</h2>
      <p class="subtitle">{{ $t('landing.supported_chains.subtitle') }}</p>
    </div>
    <SupportedChains :chains="supportedChains" />
    <DataFeedsCount
      :chains="supportedChains.length"
      :networks="networks.length"
      :feeds="totalFeeds"
    />
    <h2 class="title">{{ $t('landing.upcoming_chains.title') }}</h2>
    <UpcomingChains />
    <h2 class="title">{{ $t('landing.partners.title') }}</h2>
    <PartnersSection />
  </div>
</template>

<script setup lang="ts">
import { generateSelectOptions } from '../utils/generateSelectOptions'
const store = useStore()

useServerSeoMeta({
  ogTitle: () => 'Data Feeds Explorer | Witnet',
  title: () => 'Data Feeds Explorer | Witnet',
  description: () =>
    'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
  ogDescription: () =>
    'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
  twitterTitle: () => 'Data Feeds Explorer | Witnet',
  twitterDescription: () =>
    'Explore the list of decentralized data feeds to connect your smart contracts to real world events, using the Witnet oracle network',
})

const feeds = computed(() => store.ecosystems)
const totalFeeds = computed(() => store.totalFeeds)
const networks = computed(() => store.networks)
const supportedChains = computed(() => {
  return Object.values(generateSelectOptions(networks.value))
    .filter((network: any) => network && network[0])
    .map((network: any) => {
      const chain = network[0].chain
      return {
        name: chain,
        count:
          feeds.value.filter((feed: any) => feed.chain === chain).length || 0,
        detailsPath: {
          name: 'network',
          params: {
            network: chain.toLowerCase(),
          },
        },
        svg: network[0].logo,
      }
    })
    .sort((chainA, chainB) => chainA.name.localeCompare(chainB.name))
})

onMounted(async () => {
  store.updateSelectedNetwork({ network: [] })
  await store.fetchEcosystems()
  await store.fetchNetworks()
})
</script>

<style lang="scss" scoped>
.landing-page {
  display: grid;
  row-gap: 32px;
  .text {
    display: grid;
    row-gap: 16px;
  }
  .title {
    font-size: var(--text-size-title);
  }
}
@media screen and (max-width: 1100px) {
  .landing-page {
    padding: 0 24px;
  }
}

@media (max-width: 600px) {
  .landing-page {
    padding: 0 24px;
  }
}
@media (max-width: 300px) {
  .landing-page {
    padding: 0 16px;
  }
}
</style>
