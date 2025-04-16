<template>
  <BaseCard v-if="!empty" :class="dataFeedStatus.key">
    <nuxt-link :to="$localeRoute(detailsPath)">
      <div class="card-container">
        <div class="title">
          <SvgIcon class="img" :svg="svg" />
          <p class="name title">{{ name.toUpperCase() }}</p>
          <InfoTooltip
            v-if="dataFeedStatus.key !== 'operational'"
            :show-icon="false"
            :value="$t(`chart.${dataFeedStatus.key}`)"
          >
            <WarningStatus
              v-if="dataFeedStatus.key !== 'operational'"
              :color="dataFeedStatus.color"
            />
          </InfoTooltip>
        </div>
        <p class="value">{{ label }} {{ formatedValue }}</p>
        <p class="timestamp">
          {{ formattedTimestamp }}
        </p>
      </div>
    </nuxt-link>
  </BaseCard>
  <div v-else>
    <FeedSkeleton />
  </div>
</template>

<script>
import { formatNumber } from '@/utils/formatNumber'
import { calculateTimeAgo } from '@/utils/calculateTimeAgo'
import { getDataFeedStatus } from '@/utils/getDataFeedStatus'

export default {
  name: 'FeedCard',
  props: {
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
    timeToUpdate: {
      type: Number,
      default: null,
    },
    network: {
      type: String,
      default: 'Network',
    },
    color: {
      type: String,
      default: 'color',
    },
  },
  computed: {
    formatedValue() {
      const lastResult = parseFloat(this.value) / 10 ** this.decimals
      const hasMeaningfullZeros =
        `${lastResult.toFixed(3)}`.split('.')[1] === '000'
      const adjustedDecimals =
        lastResult < 1 || this.decimals < 3 || hasMeaningfullZeros
          ? this.decimals
          : 3
      const formatedLastResult = lastResult.toFixed(adjustedDecimals)
      return formatNumber(formatedLastResult)
    },
    dataFeedStatus() {
      return getDataFeedStatus(this.timeToUpdate, this.lastResultTimestamp)
    },
    formattedTimestamp() {
      return calculateTimeAgo(this.lastResultTimestamp, this.$i18n.locale)
    },
  },
}
</script>

<style lang="scss">
.nuxt-link-exact-active {
  color: var(--value-color);
}
.nuxt-link-active {
  color: var(--value-color);
}
a {
  color: var(--value-color);
}
.card-border {
  &.operational {
    border: var(--card-border);
  }
  &.delay {
    border: var(--delay-status-border);
  }
  &.error {
    border: var(--error-status-border);
  }
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
  padding: 8px 16px;
  transition: box-shadow 0.3s;
  .title {
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
    color: var(--value-color);
    font-size: var(--text-size-small);
    font-style: italic;
    font-family: 'Avenir Next Variable W05 Itali', sans-serif;
    justify-self: flex-end;
    font-weight: normal;
  }
  .name {
    color: var(--name-color);
    font-size: 18px;
    display: flex;
    align-items: center;
  }
  .value {
    color: var(--value-color);
    font-size: 18px;
    justify-self: flex-end;
  }
}
@media (max-width: 300px) {
  .card-container {
    width: 100%;
    grid-template-columns: 1fr;
  }
}
</style>
