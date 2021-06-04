<template>
  <nuxt-link :to="detailsPath">
    <div class="card-container">
      <p class="network" :class="network">{{ networkName }}</p>
      <p class="name">{{ name }}</p>
      <p class="value">{{ label }} {{ formatedValue }}</p>
      <img class="img" :src="url" :alt="img.alt" />
    </div>
  </nuxt-link>
</template>

<script>
import { formatNumber } from '@/utils/formatNumber'

export default {
  name: 'FeedCard',
  props: {
    detailsPath: {
      type: String,
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
  },
  computed: {
    formatedValue() {
      return formatNumber(this.value)
    },
    networkName() {
      return this.network.toUpperCase()
    },
    url() {
      return require(`~/assets/svg/${this.img.name}.svg`)
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
  width: max-content;
  height: max-content;
  border: var(--card-border);
  background: var(--card-background);
  font-weight: bold;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: max-content max-content max-content;
  border-radius: 4px;
  column-gap: 24px;
  padding: 16px;
  cursor: pointer;
  .network {
    font-size: 24px;

    &.mainnet {
      color: var(--mainnet-network-color);
    }
    &.rinkeby {
      color: var(--rinkeby-network-color);
    }
    &.goerly {
      color: var(--goerly-network-color);
    }
  }
  .img {
    grid-row: 1 / span 3;
    grid-column: 2;
    align-self: center;
  }
  .name {
    margin: 8px 0 4px 0;
    color: var(--name-color);
    font-size: 34px;
  }
  .value {
    margin-bottom: 8px;
    color: var(--value-color);
    font-size: 24px;
  }
}
</style>
