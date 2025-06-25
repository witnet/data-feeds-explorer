<template>
  <NuxtLayout name="section" frame-classes="bg-wit-blue-500 dark:bg-black-950">
    <template #content>
      <!-- //TODO: Implement filter function
      <WInput
        :type="InputType.Icon"
        :placeholder="$t('search')"
        :outlined="true"
        content-type="text"
      /> -->
      <div class="mb-lg">
        <FeedFilters />
      </div>
      <DataFeeds
        :feeds="feeds"
        :total-feeds="totalFeeds"
        :loading="loadingFeeds"
        :empty="noFeedsAvailable"
      />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
const store = useStore()
const { loadingFeeds, feeds, totalFeeds } = storeToRefs(store)
const noFeedsAvailable = computed(
  () => !loadingFeeds.value && feeds.value.length < 1,
)

onMounted(async () => {
  store.updateNavBarSelection([])
  await store.fetchAllNetworks()
  store.updateNavBarSelection(store.networks)
  if (store.mainnetFeeds.length < 1 && store.testnetFeeds.length < 1) {
    await store.fetchAllFeeds()
  }
  store.updateSelectedFeeds({ all: true })
})
</script>
