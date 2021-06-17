<template>
  <li class="item-container">
    <div class="attribute-container links">
      <div class="attribute truncate">{{ witnetLink }}</div>
    </div>
    <div class="attribute-container values-time">
      <div class="attribute">{{ value }}</div>
      <div class="attribute">
        {{ calculateTimeAgo(timestamp, $i18n.locale) }}
      </div>
    </div>
  </li>
</template>

<script>
import { formatNumber } from '@/utils/formatNumber'
import { calculateTimeAgo } from '@/utils/calculateTimeAgo'

export default {
  name: 'Transaction',
  props: {
    witnetLink: {
      type: String,
      required: true,
    },
    etherscanLink: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
  },
  computed: {
    value() {
      return `${this.data.label} ${formatNumber(this.data.value)}`
    },
  },
  methods: {
    calculateTimeAgo,
  },
}
</script>

<style lang="scss" scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
