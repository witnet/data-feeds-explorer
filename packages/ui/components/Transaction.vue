<template>
  <li class="item-container">
    <div class="attribute-container links">
      <div class="attribute">{{ croppedWitnetLink }}</div>
      <div class="attribute">{{ croppedEtherscanLink }}</div>
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
import { cropString } from '@/utils/cropString'

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
    croppedEtherscanLink() {
      return cropString(this.etherscanLink, 28)
    },
    croppedWitnetLink() {
      return cropString(this.witnetLink, 28)
    },
  },
  methods: {
    calculateTimeAgo,
  },
}
</script>
