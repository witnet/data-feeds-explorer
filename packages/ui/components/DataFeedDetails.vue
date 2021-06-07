<template>
  <div class="content">
    <div class="section-header">
      <nuxt-link class="back-to-list" :to="localePath('/')">
        <font-awesome-icon class="icon" icon="arrow-alt-circle-left" />
      </nuxt-link>
      <SvgIcon name="bitcoin" />
    </div>
    <Chart class="chart" :data="data" data-label="$" name="BTC/USD" />
    <Fieldset :title="$t('contract_address')" class="contract-container">
      <a
        href="https://rinkeby.etherscan.io/address/0x6cEEa6Bf8C6D914b3723678D4FDA51c5A4b30507#code"
        target="_blank"
        class="contract-address"
      >
        0x6cEEa6Bf8C6D914b3723678D4FDA51c5A4b30507
      </a>
    </Fieldset>
    <TransactionsList class="transactions" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
      ],
    }
  },
  mounted() {
    setTimeout(() => {
      this.data = [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 },
        { time: '2019-04-20', value: 74.43 },
        { time: '2019-04-21', value: 5.43 },
        { time: '2019-04-22', value: 6.43 },
        { time: '2019-04-23', value: 7.43 },
        { time: '2019-04-24', value: 8.43 },
        { time: '2019-04-25', value: 9.43 },
      ]
    }, 10000)
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-rows: max-content max-content max-content 1fr;
  grid-template-columns: 1fr;
  row-gap: 16px;
}
.contract-container {
  margin: 16px;
  margin-top: 150px;
  .contract-address {
    font-size: 24px;
    padding: 24px;
    display: block;
    cursor: pointer;
    color: var(--contract-address);
  }
}
.chart {
  height: 400px;
}
.section-header {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 16px;
  width: 100%;
  .back-to-list {
    position: absolute;
    left: 120px;
    .icon {
      font-size: 24px;
      color: var(--text);
    }
    &:hover {
      .icon {
        color: var(--text-hover);
      }
    }
  }
}
@media (max-width: 1200px) {
  .section-header {
    .back-to-list {
      left: 16px;
    }
  }
}
</style>
