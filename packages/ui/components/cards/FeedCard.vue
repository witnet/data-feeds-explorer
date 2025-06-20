<template>
  <BaseCard v-if="!empty">
    <nuxt-link :to="localeRoute(detailsPath)">
      <div class="card-container font-bold">
        <div class="header">
          <SvgIcon class="img" :svg="svg" />
          <p class="title-small">
            {{ name.toUpperCase() }}
          </p>
        </div>
        <p class="justify-self-end title-small">
          {{ label }} {{ formatedValue }}
        </p>
        <p class="timestamp text-2-sm">
          {{ formattedTimestamp }}
        </p>
      </div>
      <div class="flex gap-md py-sm px-md justify-end text-small">
        <p v-if="sources" class="timestamp text-2-sm">
          {{ sources }} {{ t('sources') }}
        </p>
        <p v-else class="timestamp text-2-sm">{{ t('routed_pricefeed') }}</p>
        <p class="timestamp text-2-sm">
          {{ networks.length }} {{ t('networks') }}
        </p>
        <NetworksCard :icons="icons" :show-more="availableChains.length > 4" />
      </div>
    </nuxt-link>
  </BaseCard>
  <div v-else>
    <FeedSkeleton />
  </div>
</template>

<script setup>
import { formatNumber } from '@/utils/formatNumber'
import { calculateTimeAgo } from '@/utils/calculateTimeAgo'
const { locale, t } = useI18n()
const localeRoute = useLocaleRoute()

const props = defineProps({
  empty: {
    type: Boolean,
    default: false,
  },
  detailsPath: {
    type: Object,
    default: () => {},
  },
  decimals: {
    type: Number,
    default: 2,
  },
  name: {
    type: String,
    default: 'Name',
  },
  svg: {
    type: String,
    default: 'svg',
  },
  value: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: 'label',
  },
  lastResultTimestamp: {
    type: String,
    default: 'lastResultTimestamp',
  },
  networks: {
    type: Array,
    required: true,
  },
  sources: {
    type: Number,
    default: 0,
  },
})
const availableChains = computed(() =>
  props.networks.map((network) => {
    return network.match(/^[^-]+/)[0]
  }),
)
const icons = computed(() => {
  return [...new Set(availableChains.value)].slice(0, 4)
})
const formatedValue = computed(() => {
  const lastResult = parseFloat(props.value) / 10 ** props.decimals
  const hasMeaningfullZeros = `${lastResult.toFixed(3)}`.split('.')[1] === '000'
  const adjustedDecimals =
    lastResult < 1 || props.decimals < 3 || hasMeaningfullZeros
      ? props.decimals
      : 3
  const formatedLastResult = lastResult.toFixed(adjustedDecimals)
  return formatNumber(formatedLastResult)
})
const formattedTimestamp = computed(() => {
  if (props.lastResultTimestamp.length < 11 && locale.value) {
    return calculateTimeAgo(props.lastResultTimestamp, locale.value)
  } else {
    return 'NaN time ago'
  }
})
</script>

<style lang="scss">
.card-container {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: max-content max-content;
  align-content: center;
  justify-items: flex-start;
  width: 100%;
  height: max-content;
  row-gap: 8px;
  padding: 8px 16px;
  transition: box-shadow 0.3s;
  .header {
    grid-row: 1 / span 2;
    justify-content: center;
    align-items: center;
    display: flex;
    grid-column-gap: 8px;
    .img {
      display: flex;
      justify-content: center;
      align-self: center;
    }
  }
  .timestamp {
    font-style: italic;
    justify-self: flex-end;
  }
  .name {
    font-size: 18px;
    display: flex;
    align-items: center;
  }
}
@media (max-width: 300px) {
  .card-container {
    width: 100%;
    grid-template-columns: 1fr;
  }
}
</style>
