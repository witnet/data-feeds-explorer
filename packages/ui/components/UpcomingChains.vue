<template>
  <div class="chains-container">
    <LazyUpcomingChainCard
      v-for="chain in chains"
      :key="chain.label"
      :name="chain.name"
      :path="chain.path"
      :img="chain.img"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chains: [
        {
          name: 'Algorand',
          path: 'https://www.algorand.com/',
          img: 'upcoming_algorand',
        },
        {
          name: 'Arbitrum',
          path: 'https://arbitrum.io/',
          img: 'upcoming_arbitrum',
        },
        {
          name: 'Aurora',
          path: 'https://aurora.dev/',
          img: 'upcoming_aurora',
        },
        {
          name: 'Gnosis',
          path: 'https://gnosis.io/',
          img: 'upcoming_gnosis',
        },
        {
          name: 'Optimism',
          path: 'https://www.optimism.io/',
          img: 'upcoming_optimism',
        },
        {
          name: 'Reef',
          path: 'https://reef.io/',
          img: 'upcoming_reef',
        },
        {
          name: 'Solana',
          path: 'https://solana.com/',
          img: 'upcoming_solana',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.chains-container {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fill, max-content);
  grid-gap: 16px;
  display: grid;
  row-gap: 16px;
  margin-bottom: 32px;
}
@media screen and (max-width: 600px) {
  .chains-container {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-content: center;
  }
}
@media screen and (max-width: 300px) {
  .chains-container {
    justify-content: center;
    grid-template-rows: repeat(auto-fill, max-content);
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
