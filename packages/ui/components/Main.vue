<template>
  <div class="main">
    <NetworkOptions
      v-if="networks && networks.length > 1"
      :options="navBarOptions"
    />
    <div v-if="selected && selected.length" class="feeds-container">
      <div class="title-container">
        <h2 class="title bold">
          <SvgIcon class="logo" :svg="selected[0].logo" />
          {{ selected[0].chain }}
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
        v-for="(option, index) in selected"
        :key="option.key"
        class="list-container"
      >
        <h3 class="title light-text bold">{{ option.label }}</h3>
        <DataFeeds
          :network="option"
          :network-index="index"
          @empty="updateOptions"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { generateSelectOptions } from '../utils/generateSelectOptions'
import { generateNavOptions } from '../utils/generateNavOptions'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'
import { formatSvgChainName } from '../utils/formatSvgChainName'
import networks from '@/apollo/queries/networks.gql'

export default {
  apollo: {
    networks: {
      prefetch: true,
      query: networks,
    },
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
    selected() {
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
      const result = this.selected.map((option) => {
        return option.label
      })
      const last = result.pop()
      return {
        first: result.join(', '),
        last,
      }
    },
    network() {
      const network = this.$route.params.network || 'ethereum'
      this.$emit('set-network', network.toUpperCase())
      return network
    },
  },
  mounted() {
    const networks = this.options[this.network]
    this.$store.commit('updateSelectedNetwork', {
      network: networks,
    })
  },
  methods: {
    capitalizeFirstLetter,
    formatSvgChainName,
    updateOptions(index) {
      this.$store.commit('deleteEmptyNetwork', { index })
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    setCurrentNetwork(options) {
      this.currentNetwork = options[this.$route.params.network][0].chain
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-gap: 32px;
  grid-template-rows: 1fr;
}
.section-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .section-title {
    font-size: 18px;
    align-self: flex-end;
    font-weight: 600;
  }
}
.feeds-container {
  height: max-content;
  margin-bottom: 24px;
}
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
  .title {
    font-size: var(--text-size);
  }
  .pagination {
    margin-bottom: 16px;
    justify-self: center;
  }
}
@media screen and (max-width: 1100px) {
  .list-container {
    margin-right: 16px;
  }
}

@media (max-width: 850px) {
  .list-container {
    margin-right: 0;
  }
  .main {
    grid-template-columns: 1fr;
    padding: 0 24px;
  }
  .section-header {
    padding: 0 32px 32px 32px;
  }
}
@media (max-width: 600px) {
  .main {
    grid-template-columns: 1fr;
  }
  .section-header {
    padding: 0 16px 16px 16px;
  }
  .list-container {
    margin-right: 0;
    .pagination {
      margin-bottom: 48px;
    }
  }
}
@media screen and (max-width: 300px) {
  .main {
    padding: 0 16px;
  }
}
</style>
