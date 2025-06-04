<template>
  <WSection frame-classes="dark:bg-black-900">
    <template #content>
      <div class="grid gap-lg">
        <div class="grid gap-lg">
          <div class="text h-max max-w-[500px]">
            <h2 class="title text-2xl">
              {{ $t('landing.title') }}
            </h2>
            <p class="text">
              {{ $t('landing.description') }}
            </p>
          </div>
          <DataFeedsCount
            :chains="supportedChains.length"
            :networks="networks"
            :feeds="totalFeeds"
          />
        </div>
        <ClientOnly>
          <WLatestUpdates />
        </ClientOnly>
      </div>
    </template>
  </WSection>
</template>

<script setup lang="ts">
import { generateSelectOptions } from '../utils/generateSelectOptions'
import { WLatestUpdates, WSection } from 'wit-vue-ui'
const store = useStore()
const { data } = await useAsyncData('ecosystems', store.fetchEcosystems)
const totalFeeds = computed(() => store.totalFeeds)
const networks = computed(
  () => store.totalMainnetFeeds + store.totalTestnetFeeds,
)

const supportedChains = computed(() => {
  return Object.values(generateSelectOptions(networks.value))
    .filter((network: any) => network && network[0])
    .map((network: any) => {
      const chain = network[0].chain
      return {
        name: chain,
        count:
          data.value?.feeds.filter((feed: any) => feed.chain === chain)
            .length || 0,
        detailsPath: {
          name: 'network',
          params: {
            network: chain.toLowerCase(),
          },
        },
        svg: network[0].logo,
      }
    })
    .sort((chainA, chainB) => chainA.name.localeCompare(chainB.name))
})
</script>
