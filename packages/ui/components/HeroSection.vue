<template>
  <WSection
    frame-classes="dark:bg-black-900"
    content-classes="[&&]:sm:p-[32px_32px_70px_32px]"
  >
    <template #content>
      <div
        class="grid grid-cols-2 md:grid-cols-none justify-center gap-lg items-center"
      >
        <div
          class="grid grid-rows-[max-content_max-content] justify-center items-center gap-lg sm:mb-md"
        >
          <div class="text h-max max-w-[500px] sm:px-md">
            <h2 class="title text-2xl mb-md">
              {{ $t('landing.title') }}
            </h2>
            <p class="text">
              {{ $t('landing.description') }}
            </p>
          </div>
          <DataFeedsCount
            :chains="supportedChains.length"
            :networks="networks.length"
            :feeds="totalFeeds"
          />
        </div>
        <ClientOnly>
          <WLatestUpdates class="justify-self-center w-full sm:px-md" />
        </ClientOnly>
      </div>
    </template>
  </WSection>
</template>

<script setup lang="ts">
import { generateSelectOptions } from '../utils/generateSelectOptions'
import { WSection } from 'wit-vue-ui'
const store = useStore()
const {
  mainnetFeeds,
  testnetFeeds,
  totalTestnetFeeds,
  totalMainnetFeeds,
  networks,
} = storeToRefs(store)
const { data } = await useAsyncData('ecosystems', store.fetchEcosystems)
const totalFeeds = computed(
  () => totalTestnetFeeds.value + totalMainnetFeeds.value,
)
const allFeeds = computed(() => [...mainnetFeeds.value, ...testnetFeeds.value])

const supportedChains = computed(() => {
  return Object.values(generateSelectOptions(allFeeds.value))
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
