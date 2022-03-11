<template>
  <div class="main">
    <NetworkOptions
      v-if="networks && networks.length > 1"
      :options="navBarOptions"
    />
    <div v-if="selected && selected.length" class="feeds-container">
      <div class="title-container">
        <div class="title bold">
          <SvgIcon class="logo" :name="selected[0].chain.toLowerCase()" />{{
            selected[0].chain
          }}
        </div>
        <p class="subtitle light-text bold">
          {{ $t('main.network_subtitle') }}
          <span class="bold text">{{ selectedNetworks }}</span
          >.
        </p>
      </div>
      <div
        v-for="(option, index) in selected"
        :key="option.key"
        class="list-container"
      >
        <div class="title light-text bold">{{ option.label }}</div>
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
import networks from '@/apollo/queries/networks.gql'
import { generateSelectOptions } from '../utils/generateSelectOptions'
import { generateNavOptions } from '../utils/generateNavOptions'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'

export default {
  apollo: {
    networks: {
      prefetch: true,
      query: networks,
    },
  },
  data() {
    return {
      feedExist: true,
      currentPage: 1,
      itemsPerPage: 28,
    }
  },
  computed: {
    selected() {
      return this.$store.state.selectedNetwork
    },
    options() {
      if (this.networks) {
        return generateSelectOptions(this.networks)
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
      return result.join(', ').replace(/, ([^,]*)$/, ' and $1')
    },
    network() {
      return this.$route.params.network || 'ethereum'
    },
  },
  mounted() {
    this.$store.commit('updateSelectedNetwork', {
      network: this.options[this.network],
    })
  },
  methods: {
    capitalizeFirstLetter,
    updateOptions(index) {
      this.$store.commit('deleteEmptyNetwork', { index })
    },
    handleCurrentChange(val) {
      this.currentPage = val
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
