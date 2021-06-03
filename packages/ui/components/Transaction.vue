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
import { defineComponent } from '@nuxtjs/composition-api'
import { formatNumber } from '@/utils/formatNumber'
import { calculateTimeAgo } from '@/utils/calculateTimeAgo'
import { cropString } from '@/utils/cropString'

export default defineComponent({
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
  setup(props) {
    const value = `${props.data.label} ${formatNumber(props.data.value)}`
    const croppedEtherscanLink = cropString(props.etherscanLink, 28)
    const croppedWitnetLink = cropString(props.witnetLink, 28)
    return { value, calculateTimeAgo, croppedWitnetLink, croppedEtherscanLink }
  },
})
</script>
