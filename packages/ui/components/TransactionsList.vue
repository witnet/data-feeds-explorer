<template>
  <Fieldset :title="$t('transactions')" class="transactions-container">
    <div class="collection collection-container">
      <!-- The first list item is the header of the table -->
      <li class="item-container blur">
        <div class="attribute-container links">
          <div class="attribute">
            {{ $t('witnet_explorer') }}
          </div>
          <div class="attribute">
            {{ $t('etherscan') }}
          </div>
        </div>
        <div class="attribute-container values-time">
          <div class="attribute">
            {{ $t('value') }}
          </div>
          <div class="attribute">{{ $t('time') }}</div>
        </div>
      </li>
      <Transaction
        v-for="(transaction, index) in transactionsExample"
        :key="transaction.witnetLink"
        :class="{ blur: index % 2 }"
        :witnet-link="transaction.witnetLink"
        :etherscan-link="transaction.etherscanLink"
        :data="transaction.data"
        :timestamp="transaction.timestamp"
      />
    </div>
  </Fieldset>
</template>

<script>
export default {
  name: 'FeedCard',
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      transactionsExample: [
        {
          witnetLink: '0x9aa619d0afa25ddbf71db619d0afa25ddbf71dbf74',
          etherscanLink: '0x9aa619d0afa25ddbf71db619d0afa25ddbf71dbf75',
          data: {
            label: '$',
            value: '38213.18',
          },
          timestamp: '1622717935',
        },
        {
          witnetLink: '0x9aa619d0afa25ddbf71db619d0afa25ddbf71dbf72',
          etherscanLink: '0x9aa619d0afa25ddbf71db619d0afa25ddbf71dbf73',
          data: {
            label: '$',
            value: '38213.18',
          },
          timestamp: '1622717935',
        },
        {
          witnetLink: '0x9aa619d0afa25ddbf71db619d0afa25ddbf71dbf70',
          etherscanLink: '0x9aa619d0afa25ddbf71db619d0afa25ddbf71dbf71',
          data: {
            label: '$',
            value: '38213.18',
          },
          timestamp: '1622717935',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.item-container {
  padding: 16px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 16px;
  row-gap: 24px;
  &.blur {
    background-color: var(--transaction-blur-background);
  }

  .attribute-container {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(var(--column-width-min), 1fr)
    );
    column-gap: 16px;
    row-gap: 24px;
  }
  .links {
    --column-width-min: 250px;
  }
  .values-time {
    --column-width-min: 100px;
  }
}

@media (max-width: 1200px) {
  .collection-container {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
