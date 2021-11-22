<template>
  <li class="item-container">
    <div class="attribute-container links">
      <a :href="witnetLink" target="_blank" class="link truncate">
        0x{{ drTxHash }}
        <font-awesome-icon class="icon" icon="external-link-alt" />
      </a>
    </div>
    <div class="attribute-container values-time">
      <CopyTooltip :label="`${value}2`" class="attribute" :value="value" />
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
      return `${this.data.label} ${formatNumber(
        parseFloat(this.data.value) / 10 ** this.data.decimals
      )}`
    },
  },
  methods: {
    calculateTimeAgo,
  },
}
</script>

<style lang="scss" scoped>
.links {
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.link {
  color: var(--witnet-transaction);
  .icon {
    margin-left: 16px;
  }
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
