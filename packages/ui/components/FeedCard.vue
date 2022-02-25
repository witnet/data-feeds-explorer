<template>
  <nuxt-link :to="localeRoute(detailsPath)">
    <div class="card-container">
      <div class="title">
        <SvgIcon class="img" :name="img.name" />
        <p class="name">{{ name.toUpperCase() }}</p>
      </div>
      <p class="value">{{ label }} {{ formatedValue }}</p>
      <p class="timestamp">
        {{ calculateTime() }}
      </p>
    </div>
  </nuxt-link>
</template>

<script>
import { formatNumber } from '@/utils/formatNumber'
import { calculateTimeAgo } from '@/utils/calculateTimeAgo'

export default {
  name: 'FeedCard',
  props: {
    detailsPath: {
      type: Object,
      required: true,
    },
    decimals: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    img: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    lastResultTimestamp: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  computed: {
    formatedValue() {
      return formatNumber(parseFloat(this.value) / 10 ** this.decimals)
    },
  },
  methods: {
    calculateTime() {
      return calculateTimeAgo(this.lastResultTimestamp, this.$i18n.locale)
    },
  },
}
</script>

<style lang="scss" scoped>
.nuxt-link-exact-active {
  color: var(--value-color);
}
.nuxt-link-active {
  color: var(--value-color);
}
a {
  color: var(--value-color);
}
.card-container {
  width: 300px;
  height: max-content;
  border: var(--card-border);
  background: var(--card-background);
  box-shadow: var(--card-box-shadow);
  font-weight: bold;
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: max-content max-content;
  row-gap: 8px;
  align-content: center;
  justify-items: flex-start;
  border-radius: 4px;
  column-gap: 16px;
  padding: 8px 16px;
  cursor: pointer;
  .title {
    grid-row: 1 / span 2;
    justify-content: center;
    align-items: center;
    display: flex;
    .img {
      align-self: center;
      margin-right: 8px;
    }
  }
  .timestamp {
    color: var(--value-color);
    font-size: 12px;
    font-style: italic;
    justify-self: flex-end;
    font-weight: normal;
  }
  .name {
    color: var(--name-color);
    font-size: 18px;
  }
  .value {
    color: var(--value-color);
    font-size: 18px;
    justify-self: flex-end;
  }
}
@media (max-width: 300px) {
  .card-container {
    width: 250px;
    grid-template-columns: 1fr;
  }
}
</style>
