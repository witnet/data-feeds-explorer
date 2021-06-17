<template>
  <li class="item-container">
    <div class="attribute-container links">
      <DataTooltip
        :label="`${witnetLink}1`"
        class="attribute"
        :value="witnetLink"
      />
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
