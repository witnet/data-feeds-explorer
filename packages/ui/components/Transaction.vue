<template>
  <li class="item-container">
    <div class="attribute-container links">
      <a :href="witnetLink" target="_blank" class="link truncate">
        {{ drTxHash }}
      </a>
    </div>
    <div class="attribute-container values-time">
      <DataTooltip :label="`${value}2`" class="attribute" :value="value" />
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
    drTxHash: {
      type: String,
      required: true,
    },
    witnetLink: {
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
.link {
  text-decoration: none;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
