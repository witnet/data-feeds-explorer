<template>
  <div class="main">
    <SideBar
      v-if="networks && networks.length > 1"
      :default-option="selected"
      :options="options"
      @update-selected="updateSelected"
    />
    <div v-if="selected && selected.length" class="feeds-container">
      <div class="title-container">
        <p class="title bold">
          <SvgIcon class="logo" :name="selected[0].network.toLowerCase()" />{{
            selected[0].network
          }}
        </p>
        <p class="subtitle light-text bold">
          Witnet price feeds currently available on
          <span class="bold text">{{ selected[0].network }}</span>
          <span class="bold text">{{ selectedNetworks }}</span
          >.
        </p>
      </div>
      <div
        v-for="(option, index) in selected"
        :key="option.label"
        class="list-container"
      >
        <div class="light-text bold">{{ option.key }}</div>
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
import {
  generateSelectOptions,
  capitalizeFirstLetter,
} from '../utils/generateSelectOptions'

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
      selected: [
        {
          label: 'ethereum-mainnet',
          key: 'Ethereum Mainnet',
          network: 'Ethereum',
        },
      ],
    }
  },
  computed: {
    options() {
      if (this.networks) {
        return generateSelectOptions(this.networks)
      } else {
        return null
      }
    },
    selectedNetworks() {
      const result = this.selected.map((option) => {
        return capitalizeFirstLetter(option.label.split('-')[1])
      })
      return result.join(', ').replace(/, ([^,]*)$/, ' and $1')
    },
  },
  mounted() {},
  methods: {
    updateOptions(index) {
      this.selected.splice(index, 1)
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    updateSelected(selectedOption) {
      this.selected = selectedOption
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
    font-size: 24px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    .logo {
      margin-right: 8px;
    }
  }
  .subtitle {
    font-size: 16px;
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

@media (max-width: 1200px) {
  .section-header {
    padding: 0 32px 32px 32px;
  }
}
@media (max-width: 600px) {
  .section-header {
    padding: 0 32px 32px 32px;
  }
  .list-container {
    .pagination {
      margin-bottom: 48px;
    }
  }
}
</style>
