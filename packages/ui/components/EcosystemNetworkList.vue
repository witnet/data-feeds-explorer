<template>
  <div class="main">
    <client-only>
      <NetworkOptions class="network-options" :options="navBarOptions" />
    </client-only>
    <div
      v-if="selectedEcosystem && selectedEcosystem.length"
      class="feeds-container"
    >
      <div class="title-container">
        <h2 class="title bold">
          <SvgIcon class="logo" :svg="selectedEcosystem[0].logo" />
          {{ selectedEcosystem[0].chain }}
        </h2>
        <p class="subtitle text bold">
          {{ $t('main.network_subtitle') }}
          <span v-if="ecosystemNetworksNames.first" class="bold text">{{
            ecosystemNetworksNames.first
          }}</span>
          <span v-if="ecosystemNetworksNames.first" class="networks-separator">
            {{ $t('and') }}
          </span>
          <span class="bold text">{{ ecosystemNetworksNames.last }}</span
          >.
        </p>
      </div>
      <div
        v-for="(option, index) in selectedEcosystem"
        :key="option.key"
        class="list-container"
      >
        <h3 class="title bold">
          {{ option.label }}
        </h3>
        <DataFeeds
          :network="option"
          :network-index="index"
          @empty="updateOptions"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateSelectOptions } from '../utils/generateSelectOptions'
import { generateNavOptions } from '../utils/generateNavOptions'

const store = useStore()

// const currentEcosystem = ref(route.params.network.toString())
const selectedEcosystem = computed(() => store.selectedEcosystem)
const ecosystemsList = computed(() => generateSelectOptions(store.networks))
const navBarOptions = computed(() => {
  return generateNavOptions(Object.values(ecosystemsList.value))
})
const ecosystemNetworksNames = computed(() => {
  const result = selectedEcosystem.value.map((option) => {
    return option.label
  })
  const last = result.pop()
  return {
    first: result.join(', '),
    last,
  }
})
onMounted(async () => {
  if (store.networks.length < 1) {
    await store.fetchNetworks()
  }
  const selectedEcosystemNetworks = Object.values(
    ecosystemsList.value,
  ) as Networks[]
  if (selectedEcosystemNetworks) {
    store.updateSelectedNetwork({ networks: selectedEcosystemNetworks })
  } else {
    router.push('/')
  }
})
function updateOptions(index: number) {
  store.deleteEmptyNetwork({ index })
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
}
.feeds-container {
  height: max-content;
  margin-bottom: 24px;
}
.title-container {
  margin-bottom: 32px;
  .title {
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    .logo {
      margin-right: 8px;
      display: flex;
    }
  }
  .subtitle {
    .networks-separator {
      margin: 0 4px 0 4px;
    }
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
