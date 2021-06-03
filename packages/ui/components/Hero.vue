<template>
  <div class="section">
    <NavBar />
    <TransactionsList />
    <!-- <div class="main"> -->
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
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    .main {
      max-width: 100%;
      padding: 40px 40px;
    }
  }
}
</style>
