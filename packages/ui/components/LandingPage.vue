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
      :feeds="chainsFeeds.total"
    />
    <h2 class="title">{{ $t('landing.upcoming_chains.title') }}</h2>
    <UpcomingChains />
    <h2 class="title">{{ $t('landing.partners.title') }}</h2>
    <Partners />
  </div>
</template>

<script>
import { generateSelectOptions } from '../utils/generateSelectOptions'
import networks from '@/apollo/queries/networks.gql'
import homePageData from '@/apollo/queries/homePageData.gql'

export default {
  apollo: {
    networks: {
      prefetch: true,
      query: networks,
    },
    feeds: {
      prefetch: true,
      query: homePageData,
    },
  },
  computed: {
    chainsFeeds() {
      return this.feeds ? this.feeds : []
    },
    supportedChains() {
      if (this.networks) {
        return Object.values(generateSelectOptions(this.networks))
          .filter((network) => network && network[0])
          .map((network) => {
            const chain = network[0].chain
            return {
              name: chain,
              count:
                this.feeds?.feeds.filter((feed) => feed.chain === chain)
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
    },
  },
  mounted() {
    this.$store.commit('updateSelectedNetwork', {
      network: [],
    })
  },
}
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
