<template>
  <div class="main">
    <NetworkOptions
      v-if="networks && networks.length > 1"
      :options="navBarOptions"
    />
    <div v-if="ecosystem" class="feeds-container-wrapper">
      <div class="title-container">
        <h2 class="title bold">
          <SvgIcon class="logo" :svg="ecosystem.logo" />
          {{ capitalizeFirstLetter(ecosystem.name) }}
        </h2>
        <p class="subtitle light-text bold">
          {{ $t('main.network_subtitle') }}
          <span v-if="selectedNetworks.first" class="bold text">{{
            selectedNetworks.first
          }}</span>
          <span v-if="selectedNetworks.first">{{ $t('and') }}</span>
          <span class="bold text">{{ selectedNetworks.last }}</span
          >.
        </p>
      </div>
      <div
        v-for="ecosystemNetwork in populatedEcosystem.networks"
        :key="ecosystemNetwork.key"
        class="list-container"
      >
        <h3 class="title light-text bold">
          {{ ecosystemNetwork.networkLabel }}
        </h3>
        <div class="feeds-container">
          <LazyFeedCard
            v-for="feed in ecosystemNetwork.feeds"
            :key="feed.name + feed.network + feed.value + feed.color"
            :details-path="feed.detailsPath"
            :name="feed.name"
            :decimals="feed.decimals"
            :time-to-update="feed.timeToUpdate"
            :svg="feed.svg"
            :value="feed.value"
            :last-result-timestamp="feed.lastResultTimestamp"
            :label="feed.label"
            :network="feed.network"
            :chain="feed.chain"
            :color="feed.color"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { generateSelectOptions } from '@/utils/generateSelectOptions'
import { generateNavOptions } from '@/utils/generateNavOptions'
import ecosystem from '@/apollo/queries/ecosystem.gql'
import { formatSvgName } from '@/utils/formatSvgName'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
export default {
  name: 'NetworkPage',
  async asyncData(ctx) {
    const { network } = ctx.route.params
    const client = await ctx.app.apolloProvider.defaultClient
    const query = ecosystem
    const variables = { ecosystem: network }
    const result = await client.query({ query, variables })

    return {
      ecosystem: result.data.ecosystem,
      feeds: result.data.feeds,
      networks: result.data.networks,
    }
  },
  i18n: {
    seo: true,
  },
  data() {
    return {
      feedExist: true,
      currentPage: 1,
      itemsPerPage: 28,
      currentNetwork: this.$route.params.network.toUpperCase(),
      interval: setInterval(() => {
        this.fetchEcosystem()
      }, 5000),
    }
  },
  head() {
    return {
      title: `Witnet Data Feeds on ${this.currentNetwork}`,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: `Witnet Data Feeds on ${this.currentNetwork}`,
        },
        {
          hid: 'description',
          name: 'description',
          content: `Explore the list of decentralized data feeds on ${this.currentNetwork}, using the Witnet oracle network`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `Witnet Data Feeds on ${this.currentNetwork}`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Explore the list of decentralized data feeds on ${this.currentNetwork}, using the Witnet oracle network`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `Witnet Data Feeds on ${this.currentNetwork}`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Explore the list of decentralized data feeds on ${this.currentNetwork}, using the Witnet oracle network`,
        },
      ],
    }
  },
  computed: {
    populatedEcosystem() {
      return {
        networks: this.ecosystem.networks.map((network) => {
          return {
            network: network.network,
            networkLabel: network.network
              .split('-')
              .map(capitalizeFirstLetter)
              .join(' '),
            total: network.total,
            feeds: network.feeds
              .filter((feed) => {
                return feed.lastResult && Number(feed.lastResultTimestamp) > 0
              })
              .map((feed) => {
                return {
                  detailsPath: {
                    name: 'network-id',
                    params: {
                      network: this.$route.params.network || 'ethereum',
                      id: feed.feedFullName,
                    },
                  },
                  decimals: parseInt(feed.feedFullName.split('_').pop()) || 3,
                  name: feed.name,
                  value: feed.lastResult,
                  lastResultTimestamp: feed.lastResultTimestamp || '0',
                  label: feed.label,
                  timeToUpdate: feed.heartbeat
                    ? Number(feed.heartbeat) + Number(feed.finality)
                    : null,
                  img: {
                    name: formatSvgName(feed.name),
                    alt: feed.name,
                  },
                  network: feed.network,
                  chain: feed.chain,
                  color: feed.color,
                  blockExplorer: feed.blockExplorer,
                  svg: feed.logo,
                }
              })
              .sort((feed1, feed2) => feed1.name.localeCompare(feed2.name)),
          }
        }),
        logo: this.ecosystem.logo,
        name: this.ecosystem.name,
      }
    },
    currentEcosystemNetworks() {
      return this.$store.state.selectedNetwork
    },
    options() {
      if (this.networks) {
        const options = generateSelectOptions(this.networks)
        this.setCurrentNetwork(options)
        return options
      } else {
        return null
      }
    },
    navBarOptions() {
      return generateNavOptions(Object.values(this.options))
    },
    selectedNetworks() {
      const result = this.currentEcosystemNetworks.map((option) => {
        return option.label
      })
      const last = result.pop()
      return {
        first: result.join(', '),
        last,
      }
    },
    network() {
      return this.$route.params.network || 'ethereum'
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
    const networks = this.options[this.network.split('-')[0]]
    this.$store.commit('updateSelectedNetwork', {
      network: networks,
    })
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    async fetchEcosystem() {
      const client = this.$apolloProvider.defaultClient
      const query = ecosystem
      const variables = { ecosystem: this.network }
      const result = await client.query({ query, variables })

      this.feeds = result.data.feeds
    },
    capitalizeFirstLetter,
    updateOptions(index) {
      this.$store.commit('deleteEmptyNetwork', { index })
    },
    setCurrentNetwork(options) {
      this.currentNetwork =
        options[this.$route.params.network.split('-')[0]][0].chain.toLowerCase()
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-gap: 32px;

  .feeds-container-wrapper {
    height: max-content;
    margin-bottom: 24px;

    .title-container {
      margin-bottom: 32px;
      .title {
        font-size: var(--text-size-title);
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        .logo {
          margin-right: 8px;
          display: flex;
        }
      }
      .subtitle {
        font-size: var(--text-size);
      }
    }

    .list-container {
      display: grid;
      min-height: 90%;
      grid-template: 1fr max-content/ 1fr;
      justify-items: flex-start;
      align-items: flex-start;
      row-gap: 16px;
      margin-bottom: 24px;
      .title {
        font-size: var(--text-size);
      }

      .feeds-container {
        display: grid;
        grid-gap: 16px;
        width: 100%;
        grid-template-rows: repeat(auto-fill, 80px);
        grid-template-columns: repeat(3, minmax(300px, 1fr));
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
}

@media screen and (max-width: 1100px) {
  .main {
    margin: 0 16px;
    .feeds-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media screen and (max-width: 900px) {
  .feeds-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
  }
}

@media (max-width: 850px) {
  .main {
    grid-template-columns: 1fr;
    margin: 0;
    padding: 0 24px;
  }
}

@media (max-width: 600px) {
  .main {
    grid-template-columns: 1fr;
    .list-container {
      margin-right: 0;
    }

    .feeds-container {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      padding: 0;
      justify-content: center;
    }
  }
}

@media screen and (max-width: 300px) {
  .main {
    padding: 0 16px;
    .feeds-container {
      padding: 0;
      justify-content: center;
      grid-template-rows: repeat(auto-fill, 120px);
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }
}
</style>
