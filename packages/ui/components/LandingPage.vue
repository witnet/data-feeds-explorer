<template>
  <div class="landing-page">
    <div class="text">
      <h2 class="title">{{ $t('landing.supported_chains.title') }}</h2>
      <p class="subtitle">{{ $t('landing.supported_chains.subtitle') }}</p>
    </div>
    <SupportedChains :chains="supportedChains" />
    <DataFeedsCount
      :chains="supportedChains.length"
      :networks="networksLength"
      :feeds="total"
    />
    <h2 class="title">{{ $t('landing.upcoming_chains.title') }}</h2>
    <UpcomingChains />
    <h2 class="title">{{ $t('landing.partners.title') }}</h2>
    <Partners />
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import { gql } from "@apollo/client/core"
import { getSupportedChains } from '../utils/supportedChains';

const networksQuery = gql`
  query networks {
    networks {
      label,
      key,
      chain,
      logo
    }
  }`
    
const { result: networksQueryResult } = await useQuery(networksQuery)

const variables = { network: 'all'}

const feedsQuery = gql`
  query homePageData {
    feeds (network: "all") {
      feeds {
        chain
      }
      total
    }
  }`
const { result } = await useQuery(feedsQuery, variables)

const total = computed(() => {
  return result?.value?.feeds?.total
})

const networks = computed(() => {
  return networksQueryResult.value?.networks
})
const networksLength = computed(() => {
  return networks.value ? networks.value.length : 0
})

const feeds = computed(() => {
  return result?.value?.feeds?.feeds
})

const supportedChains = computed(() => {
  return getSupportedChains(networks.value, feeds.value)
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
