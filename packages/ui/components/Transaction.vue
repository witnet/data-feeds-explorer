<template>
  <li class="item-container">
    <div class="attribute-container values-time">
      <div class="attribute">
        {{ formatTimestamp(timestamp) }}
      </div>
    </div>
    <div class="attribute-container links">
      <a :href="witnetLink" target="_blank" class="link truncate">
        0x{{ drTxHash }}
        <font-awesome-icon class="icon" icon="external-link-alt" />
      </a>
      <InfoTooltip
        class="value attribute"
        :value="value"
        :show-icon="false"
        :show-in-responsive="true"
      >
        {{ value }}
      </InfoTooltip>
    </div>
  </li>
</template>

<script>
import { formatNumber } from '@/utils/formatNumber'
import { formatTimestamp } from '@/utils/formatTimestamp'

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
    formatTimestamp,
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
.value {
  font-size: var(--text-size);
  padding: 8px 0;
  border-radius: 4px;
  color: var(--text);
}
.link {
  color: var(--witnet-transaction);
  font-family: Roboto Mono, monospace;
  .icon {
    font-size: var(--text-size-small);
  }
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
