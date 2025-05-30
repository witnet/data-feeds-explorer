<template>
  <div class="flex gap-sm">
    <WSwitch v-model="includeTestnets" />
    <p class="subtitle font-bold">{{ $t('include_testnets') }}</p>
  </div>
  <NetworkOptions :options="navBarOptions" />
</template>

<script setup lang="ts">
import { generateSelectOptions } from '../utils/generateSelectOptions'
import { WSwitch } from 'wit-vue-ui'
const store = useStore()
const feeds = computed(() => store.feeds)
const includeTestnets = ref(true)
const emit = defineEmits(['loading', 'empty'])
watch(includeTestnets, async (valX, _valY) => {
  store.handleIncludeTestnets(valX)
  emit('loading', true)
  store.getFilteredFeeds()
  emit('loading', false)
})

watch(feeds, (value) => {
  if (value) {
    emit('loading', false)
    if (value.length < 1) {
      emit('empty', true)
    } else {
      emit('empty', false)
    }
  }
})

const ecosystemsList = computed(() =>
  generateSelectOptions(store.navBarSelection),
)
const navBarOptions = computed(() => {
  return generateNavOptions(Object.values(ecosystemsList.value))
})
</script>
