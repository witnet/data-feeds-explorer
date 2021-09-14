<template>
  <nuxt-link v-if="value" :to="localeRoute(detailsPath)">
    <div class="card-container">
      <div class="title">
        <SvgIcon class="img" :name="img.name" />
        <p class="name">{{ name.toUpperCase() }}</p>
      </div>
      <p class="value">{{ formatedValue }}</p>
      <Networks :network="network" :color="color" />
    </div>
  </nuxt-link>
</template>

<script>
import { formatNumber } from '@/utils/formatNumber'

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
  width: 250px;
  height: max-content;
  border: var(--card-border);
  background: var(--card-background);
  box-shadow: var(--card-box-shadow);
  font-weight: bold;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content max-content;
  row-gap: 16px;
  align-content: center;
  border-radius: 4px;
  column-gap: 24px;
  padding: 18px 24px;
  cursor: pointer;
  .title {
    display: flex;
    align-items: center;
  }
  .img {
    align-self: center;
    margin-right: 8px;
  }
  .name {
    margin: 8px 0 4px 0;
    color: var(--name-color);
    font-size: 24px;
  }
  .value {
    color: var(--value-color);
    font-size: 18px;
  }
}
</style>
