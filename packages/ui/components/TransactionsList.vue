<template>
  <Fieldset
    :title="$t('transactions_list.transactions')"
    class="transactions-container"
  >
    <div class="collection collection-container">
      <li class="item-container blur">
        <div class="attribute-container links">
          <div class="attribute">
            {{ $t('transactions_list.witnet_explorer') }}
          </div>
        </div>
        <div class="attribute-container values-time">
          <div class="attribute">
            {{ $t('transactions_list.value') }}
          </div>
          <div class="attribute">{{ $t('transactions_list.time') }}</div>
        </div>
      </li>
      <Transaction
        v-for="(transaction, index) in transactions"
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
}
</script>

<style lang="scss">
.item-container {
  padding: 16px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
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
    align-items: center;
    column-gap: 16px;
    row-gap: 24px;
  }
  .links {
    --column-width-min: 150px;
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
