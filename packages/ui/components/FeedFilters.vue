<template>
  <div class="flex gap-sm mb-lg">
    <WSwitch v-model="includeTestnets" />
    <p class="text-small text-bold">{{ $t('include_testnets') }}</p>
  </div>
  <NetworkOptions :options="navBarOptions" :hide-all="hideAllOptions" />
</template>

<script setup lang="ts">
import { generateSelectOptions } from '../utils/generateSelectOptions'
import { WSwitch } from 'wit-vue-ui'
const store = useStore()
const includeTestnets = ref(true)
const route = useRoute()
const hideAllOptions = computed(() => !!route.params?.pair)
const emit = defineEmits(['loading', 'empty'])
onMounted(() => {
  includeTestnets.value = store.includeTestnets
})
watch(includeTestnets, async (valX, _valY) => {
  store.handleIncludeTestnets(valX)
  emit('loading', true)
  store.fetchFeeds({
    mainnet: store.includeTestnets ? null : true,
    network: store.selectedEcosystem,
    pair: store.selectedPair,
  })
  emit('loading', false)
})

const ecosystemsList = computed(() =>
  generateSelectOptions(store.navBarSelection),
)
const navBarOptions = computed(() => {
  return generateNavOptions(Object.values(ecosystemsList.value))
})
</script>
