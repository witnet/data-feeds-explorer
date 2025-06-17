<template>
  <FieldsetCard
    :title="$t('transactions_list.transactions')"
    class="transactions-container"
  >
    <div>
      <WTable :data="table" :labels="labels" :long="false" />
    </div>
  </FieldsetCard>
</template>

<script setup lang="ts">
import { formatNumber } from '@/utils/formatNumber'
import { formatTimestamp } from '@/utils/formatTimestamp'

import {
  Sort,
  WTable,
  type Column,
  type Row,
  type Label,
  type Chip,
} from 'wit-vue-ui'

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
})

type Transaction = {
  timestamp: string
  data: any
  witnetLink: string
  drTxHash: string
}

const getValue = (data: { label: string; value: string; decimals: number }) => {
  return `${data.label} ${formatNumber(
    (parseFloat(data.value) / 10 ** data.decimals).toString(),
  )}`
}

const table = computed(() => {
  return eventsListToTableRows(props.transactions as Transaction[])
})
const labels: Array<Label> = [
  {
    sortType: Sort.alphabetically,
    break: false,
    label: 'Time',
    index: 0,
  },
  {
    sortType: Sort.alphabetically,
    break: true,
    label: 'Transaction in Witnet Block Explorer',
    index: 1,
  },
  {
    sortType: Sort.descendant,
    label: 'Value',
    break: false,
    index: 2,
  },
]

function eventsListToTableRows(transaction: Transaction[]): Row[] {
  return transaction.map((tx: Transaction) => [
    valueToCol(formatTimestamp(tx.timestamp), labels[0].label),
    valueToCol('0x' + tx.drTxHash, labels[1].label, tx.witnetLink),
    valueToCol(getValue(tx.data), labels[2].label),
  ])
}
function valueToCol(
  value: string | number | Chip[],
  label: string,
  url?: string,
): Column {
  if (typeof value === 'object') {
    return {
      chips: value,
      label: label,
    }
  } else {
    return {
      value: value,
      label: label,
      url: url,
    }
  }
}
</script>

<style lang="scss">
td {
  a {
    @apply font-mono font-bold break-all;
  }
}
</style>
