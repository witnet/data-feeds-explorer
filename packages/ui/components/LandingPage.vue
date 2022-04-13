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
import networks from '@/apollo/queries/networks.gql'
import feeds from '@/apollo/queries/feeds.gql'
import { formatSvgChainName } from '@/utils/formatSvgChainName'
import { generateNavOptions } from '../utils/generateNavOptions'
import { generateSelectOptions } from '../utils/generateSelectOptions'

export default {
  apollo: {
    networks: {
      prefetch: true,
      query: networks,
    },
    feeds: {
      prefetch: true,
      query: feeds,
      variables() {
        return {
          network: 'all',
        }
      },
    },
  },
  computed: {
    navBarOptions() {
      return generateNavOptions(Object.values(this.options))
    },
    chainsFeeds() {
      return this.feeds ? this.feeds : []
    },
    options() {
      if (this.networks) {
        return generateSelectOptions(this.networks)
      } else {
        return null
      }
    },
    supportedChains() {
      return this.navBarOptions.map((chain) => {
        return {
          name: chain,
          count:
            this.feeds?.feeds.filter((feed) => feed.chain === chain).length ||
            0,
          detailsPath: {
            name: 'network',
            params: {
              network: chain.toLowerCase(),
            },
          },
          img: formatSvgChainName(chain),
        }
      })
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
