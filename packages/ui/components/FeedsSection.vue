<template>
  <WSection>
    <template #content>
      <WInput
        :type="InputType.Icon"
        :placeholder="$t('search')"
        :outlined="true"
        content-type="text"
      />
      <FeedFilters @empty="handleEmpty" @loading="handleLoading" />
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
import { WSection, WInput, InputType } from 'wit-vue-ui'

const store = useStore()
const loadingFeeds = ref(true)
const noFeedsAvailable = ref(false)
const feeds = computed(() => store.feeds)
const totalFeeds = computed(() => store.totalFeeds)

onMounted(async () => {
  store.updateSelectedNetwork({ networks: [] })
  await store.fetchAllNetworks()
  store.updateNavBarSelection(store.networks)
  if (store.mainnetFeeds.length < 1 && store.testnetFeeds.length < 1) {
    await store.fetchAllFeeds()
  }
  store.updateSelectedFeeds({ all: true })
})

function handleEmpty(value: boolean) {
  noFeedsAvailable.value = value
}
function handleLoading(value: boolean) {
  loadingFeeds.value = value
}
</script>
