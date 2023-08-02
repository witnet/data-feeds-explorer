<template>
  <div class="main">
    <NetworkOptions
      v-if="networks && networks.length > 1"
      class="network-options"
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

<script setup>
import { useQuery, useResult } from '@vue/apollo-composable'
import { generateSelectOptions } from '../utils/generateSelectOptions'
import { generateNavOptions } from '../utils/generateNavOptions'
import { gql } from "@apollo/client/core"
console.log(1)
const store = useNetwork()

const emit = defineEmits(['set-network'])

const networksQuery = gql`
  query networks {
    networks {
      label,
      key,
      chain,
      logo
    }
  }`
    
const { result } = await useQuery(networksQuery)

const networks = computed(() => {
  console.log('result///-', result.value)
  return result.value?.networks
})

const route = useRoute()
const currentPage = ref(1)
const currentNetwork = ref(route.params.network.toUpperCase())

const selected = computed(() => {
  return store.selectedNetwork
})
const options = computed(() => {  
  if (networks.value) {
    const options = generateSelectOptions(unref(networks))
    return options
  } else {
    return null
  }
})

const navBarOptions = computed(() => {
  return generateNavOptions(Object.values(options.value))
})

const selectedNetworks = computed(() => {
  const result = selected.value.map((option) => {
    return option.label
  })
  const last = result.pop()
  return {
    first: result.join(', '),
    last,
  }
})

const network = computed(() => {
  const network = route.params.network || 'ethereum'
  emit('set-network', network.toUpperCase())
  return network
})

watch(() => options.value, (newOptions) => {
  if (newOptions) {
    setCurrentNetwork(newOptions)
  }
  const networks = newOptions?.[network.value]
  store.updateSelectedNetwork(networks)
})

function updateOptions(index) {
  store.deleteEmptyNetwork({ index })
}

function handleCurrentChange(val) {
  currentPage.value = val
}

function setCurrentNetwork(options) {
  currentNetwork.value = options[route.params.network][0].chain
}
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-gap: 32px;
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
  .main {
    margin: 0 16px;
  }
}

@media (max-width: 850px) {
  .main {
    grid-template-columns: 1fr;
    margin: 0;
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
