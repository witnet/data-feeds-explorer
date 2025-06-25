<template>
  <div class="card-border">
    <nuxt-link :to="localeRoute(feedPath)">
      <div class="card-container">
        <div class="feed-title">
          <FeedIcon class="img" :class="{ placeholder: loading }" :svg="svg" />
          <p class="name text feed-title" :class="{ placeholder: loading }">
            {{ name.toUpperCase() }}
          </p>
        </div>
        <p class="value text" :class="{ placeholder: loading }">
          {{ label }} {{ formatedValue }}
        </p>
        <p class="timestamp small-text" :class="{ placeholder: loading }">
          {{ formattedTimestamp }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FeedIcon from './FeedIcon.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  decimals: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: 'Name',
  },
  svg: {
    type: String,
    default: 'Icn',
  },
  value: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: '',
  },
  lastResultTimestamp: {
    type: String,
    default: '',
  },
  timeToUpdate: {
    type: Number,
    default: 0,
  },
  network: {
    type: String,
    default: '',
  },
})
const localeRoute = useLocaleRoute()
const feedPath = computed(() => {
  return {
    name: 'pair',
    params: {
      pair: props.name.replace('/', '-'),
    },
  }
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
  return calculateTimeAgo(props.lastResultTimestamp)
})
</script>

<style lang="scss" scoped>
.card-border {
  @apply border border-white-200 dark:border-black-800 border-t-0 border-x-0;
  width: 100%;
  cursor: pointer;
  height: max-content;
}
.card-container {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: max-content max-content;
  align-content: center;
  justify-items: flex-start;
  width: 100%;
  height: max-content;
  font-weight: bold;
  row-gap: 8px;
  padding: 16px;
  transition: box-shadow 0.3s;
  .feed-title {
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
    font-weight: normal;
  }
  .name {
    display: flex;
    align-items: center;
  }
  .value {
    justify-self: flex-end;
  }
  .placeholder {
    @apply bg-gray-50 dark:bg-black-900 bg-opacity-60;
    border-radius: 24px;
    color: transparent;
  }
}
@media (max-width: 300px) {
  .card-container {
    width: 100%;
    grid-template-columns: 1fr;
  }
}
</style>
