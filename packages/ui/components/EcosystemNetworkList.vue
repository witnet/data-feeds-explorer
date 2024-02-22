<template>
  <div class="main">
    <NetworkOptions
      v-if="store.networks && store.networks.length > 1"
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

<script setup lang="ts">
import { generateSelectOptions } from '../utils/generateSelectOptions'
import { generateNavOptions } from '../utils/generateNavOptions'

const store = useStore()
const route = useRoute()
const emit = defineEmits(['set-network'])

useServerSeoMeta({
  ogTitle: () => `Witnet Data Feeds on ${currentNetwork.value}`,
  title: () => `Witnet Data Feeds on ${currentNetwork.value}`,
  description: () =>
    `Explore the list of decentralized data feeds on ${currentNetwork.value}, using the Witnet oracle network`,
  ogDescription: () =>
    `Explore the list of decentralized data feeds on ${currentNetwork.value}, using the Witnet oracle network`,
  twitterTitle: () => `Witnet Data Feeds on ${currentNetwork.value}`,
  twitterDescription: () =>
    `Explore the list of decentralized data feeds on ${currentNetwork.value}, using the Witnet oracle network`,
})

const currentNetwork: Ref<string> = ref(
  route.params.network.toString().toUpperCase(),
)
const selected = computed(() => store.selectedEcosystem)
const options = computed(() => {
  if (store.networks) {
    const options = generateSelectOptions(store.networks)
    setCurrentNetwork(options)
    return options
  } else {
    return null
  }
})
const navBarOptions = computed(() =>
  generateNavOptions(Object.values(options.value)),
)
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
  const network = currentNetwork.value || 'ethereum'
  emit('set-network', network.toLowerCase())
  return network.toLowerCase()
})
onMounted(() => {
  const networks = options.value[network.value]
  store.updateSelectedNetwork({ networks })
})
function updateOptions(index: number) {
  store.deleteEmptyNetwork({ index })
}
function setCurrentNetwork(options: any) {
  currentNetwork.value = options[route.params.network.toString()][0].chain
}

useHead({
  title: `Witnet Data Feeds on ${currentNetwork.value}`,
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'viewport-fit=cover, width=device-width, initial-scale=1',
    },
    {
      hid: 'title',
      name: 'title',
      content: `Witnet Data Feeds on ${currentNetwork.value}`,
    },
    {
      hid: 'description',
      name: 'description',
      content: `Explore the list of decentralized data feeds on ${currentNetwork.value}, using the Witnet oracle network`,
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: `Witnet Data Feeds on ${currentNetwork.value}`,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: `Explore the list of decentralized data feeds on ${currentNetwork.value}, using the Witnet oracle network`,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: 'https://feeds.witnet.io/meta-image.png',
    },
    {
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: 'Witnet data feeds explorer',
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Data Feeds Explorer | Witnet',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: `Explore the list of decentralized data feeds on ${currentNetwork.value}, using the Witnet oracle network`,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: 'https://feeds.witnet.io/meta-image.png',
    },
    {
      hid: 'og:image:secure_url',
      property: 'og:image:secure_url',
      content: 'https://feeds.witnet.io/meta-image.png',
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: 'Witnet data feeds explorer',
    },
  ],
})
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
