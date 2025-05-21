<template>
  <WSection>
    <template #content>
      <WInput
        :type="InputType.Icon"
        :placeholder="$t('search')"
        :outlined="true"
        content-type="text"
      />
      <div class="flex gap-sm">
        <WSwitch v-model="includeTestnets" />
        <p class="subtitle font-bold">{{ $t('include_testnets') }}</p>
      </div>
      <NetworkOptions class="network-options" :options="navBarOptions" />
      <DataFeeds
        :feeds="feeds"
        :total-feeds="totalFeeds"
        :loading="loadingFeeds"
        :empty="noFeedsAvailable"
      />
    </template>
  </WSection>
</template>

<script setup lang="ts">
import { generateSelectOptions } from '../utils/generateSelectOptions'
import { WSection, WInput, WSwitch, InputType } from 'wit-vue-ui'

const store = useStore()
const selectedNetworks = computed(() => store.selectedEcosystem)
const loadingFeeds = ref(true)
const noFeedsAvailable = ref(false)
const feeds = computed(() => store.feeds)
const totalFeeds = computed(() => store.totalFeeds)

const includeTestnets = ref(true)
watch(includeTestnets, async (valX, _valY) => {
  console.log('Updated switch value:', valX)
  loadingFeeds.value = true
  if (!valX) {
    await store.fetchFeeds({ mainnet: true })
  } else {
    await store.fetchFeeds({ mainnet: null })
  }
  loadingFeeds.value = false
})
watch(feeds, (value) => {
  console.log('watch feeds', value)
  console.log('watch feeds total', totalFeeds.value)
  if (feeds.value) {
    loadingFeeds.value = false
    if (value.length < 1) {
      noFeedsAvailable.value = true
    } else {
      noFeedsAvailable.value = false
    }
  }
})
watch(selectedNetworks, async (value) => {
  console.log('selected network', value)
  if (value.length) {
    await store.fetchFeeds({ mainnet: null, network: value })
  }
})

const ecosystemsList = computed(() => generateSelectOptions(store.networks))
const navBarOptions = computed(() => {
  return generateNavOptions(Object.values(ecosystemsList.value))
})

onMounted(async () => {
  store.updateSelectedNetwork({ networks: [] })
  if (store.networks.length < 1) {
    await store.fetchNetworks()
  }
  await store.fetchFeeds({ mainnet: null })
})
</script>
