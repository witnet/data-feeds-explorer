<template>
  <div class="main">
    <SideBar
      v-if="networks.length > 1"
      :default-option="selected"
      :options="options"
      @update-selected="updateSelected"
    />
    <div class="feeds-container">
      <div class="title-container">
        <p class="title">{{ selected[0].network }}</p>
        <p class="subtitle">
          Witnet price feeds currently available on
          {{ selected[0].network }} {{ selectedNetworks }}.
        </p>
      </div>
      <div
        v-for="option in selected"
        :key="option.label"
        class="list-container"
      >
        <div>{{ option.key }}</div>
        <DataFeeds :network="option" />
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
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    updateSelected(selectedOption) {
      console.log('selected option----', selectedOption)
      this.selected = selectedOption
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: 1fr;
}
.section-header {
  padding: 0 16px 24px 16px;
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
  margin: 16px;
  .title {
    font-size: 24px;
    margin-bottom: 4px;
  }
  .subtitle {
    font-size: 16px;
  }
}

.list-container {
  margin-left: 16px;
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
