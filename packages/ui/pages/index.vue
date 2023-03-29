<template>
  <div v-if="supportedEcosystems" class="landing-page">
    <div class="text">
      <h2 class="title">{{ $t('landing.supported_chains.title') }}</h2>
      <p class="subtitle">{{ $t('landing.supported_chains.subtitle') }}</p>
    </div>
    <SupportedChains :chains="supportedEcosystems" />
    <DataFeedsCount
      :chains="supportedEcosystems.length"
      :networks="totalNetworks"
      :feeds="totalFeeds"
    />
    <h2 class="title">{{ $t('landing.upcoming_chains.title') }}</h2>
    <UpcomingChains />
    <h2 class="title">{{ $t('landing.partners.title') }}</h2>
    <Partners />
  </div>
</template>

<script>
import { generateSelectOptions } from '../utils/generateSelectOptions'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'
import feeds from '@/apollo/queries/feeds.gql'

export default {
  name: 'Ecosystems',
  async asyncData(ctx) {
    const client = await ctx.app.apolloProvider.defaultClient
    const variables = { networks: 'all' }
    const result = await client.query({
      query: feeds,
      variables,
    })

    return {
      feeds: result.data.feeds,
      networks: result.data.networks,
    }
  },
  computed: {
    totalFeeds() {
      return this.feeds.reduce((total, feedPage) => {
        return total + feedPage.total
      }, 0)
    },
    ecosystemLogos() {
      if (!this.options) {
        return []
      }
      return Object.values(this.options).reduce((logos, [network]) => {
        const ecosystem = network.chain.toLowerCase()
        return {
          ...logos,
          [ecosystem]: network.logo,
        }
      }, {})
    },
    options() {
      if (this.networks) {
        return generateSelectOptions(this.networks)
      } else {
        return null
      }
    },
    totalNetworks() {
      return this.feeds.reduce((acc, feedPage) => {
        const networkName = feedPage.network.toLowerCase()

        if (!acc.includes(networkName)) {
          acc.push(networkName)
        }

        return acc
      }, []).length
    },
    supportedEcosystems() {
      if (!this.feeds) {
        return null
      }
      const ecosystemsMap = this.feeds.reduce((ecosystems, feedPage) => {
        const networkName = feedPage.network.toLowerCase()
        const ecosystem = networkName.split('-')[0]

        return {
          ...ecosystems,
          [ecosystem]: {
            name: capitalizeFirstLetter(ecosystem),
            count: feedPage.total + (ecosystems?.[ecosystem]?.count || 0),
            detailsPath: {
              name: 'network',
              params: {
                network: ecosystem,
              },
            },
            svg: this.ecosystemLogos[ecosystem] || '',
          },
        }
      }, {})

      return Object.values(ecosystemsMap).sort((feed1, feed2) =>
        feed1.name.localeCompare(feed2.name)
      )
    },
  },
  watch: {
    networks: {
      immediate: true,
      handler(networks) {
        this.$store.commit('setNetworks', {
          networks,
        })
      },
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
