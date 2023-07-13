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
      :feeds="chainsFeeds.total"
    />
    <h2 class="title">{{ $t('landing.upcoming_chains.title') }}</h2>
    <UpcomingChains />
    <h2 class="title">{{ $t('landing.partners.title') }}</h2>
    <Partners />
  </div>
</template>

<script setup>
import { generateSelectOptions } from '../utils/generateSelectOptions'
const networksQuery = gql`
  query networks {
    networks {
      label,
      key,
      chain,
      logo
    }
  }`
    
const networksFetch = await useAsyncQuery(networksQuery)

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
const feedsFetch = await useAsyncQuery(feedsQuery, variables)


const chainsFeeds = computed(() => {
  return feeds || []
})

const networks = computed(() => {
  return networksFetch?.data?.value?.networks
})
const networksLength = computed(() => {
  return networks.value ? networks.length : 0
})

const feeds = computed(() => {
  return feedsFetch?.data?.value?.feeds?.feeds
})

const supportedChains = computed(() => {
      if (networks.value) {
        return Object.values(generateSelectOptions(networks.value))
          .filter((network) => network && network[0])
          .map((network) => {
            const chain = network[0].chain
            return {
              name: chain,
              count:
                feeds.value?.filter((feed) => feed.chain === chain)
                  .length || 0,
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
      } else {
        return []
      }
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
