<template>
  <div class="section">
    <NavBar />
    <!-- Chart example -->
    <!-- <ChartExample name="USD/BTC" data-label="$" :data="data" /> -->
    <!-- Select example -->
    <!-- <Select
        :options="options"
        :default-option="selected"
        @update-selected="updateSelected"
      /> -->
    <!-- FeedCard example -->
    <!-- <FeedCard
        details-path="/home"
        name="USD/BTC"
        :img="img"
        value="38213.18"
        label="$"
        network="mainnet"
      /> -->
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
      options: [
        { label: 'All' },
        { label: 'Rinkeby' },
        { label: 'Goerly' },
        { label: 'Mainnet' },
      ],
      selected: { label: 'All' },
      img: {
        name: 'bitcoin-card',
        alt: 'BTC/USD',
      },
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
  methods: {
    updateSelected(selectedOption) {
      this.selected = selectedOption
    },
  },
}
</script>

<style lang="scss" scoped>
.section {
  color: var(--text);
  padding: 0 180px;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 150px 1fr;
  grid-template-columns: 1fr;
  max-width: 1500px;
  margin: 0 auto;
  .text {
    background-color: var(--text-background);
    line-height: 1.5;
  }
  .highlight {
    color: $red;
  }
}
@media (max-width: 1200px) {
  .section {
    padding: 0 0;
  }
}
</style>
