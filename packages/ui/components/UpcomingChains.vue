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
          name: 'Fantom',
          path: 'https://fantom.foundation/',
          img: 'upcoming_fantom',
        },
        {
          name: 'Obscuro',
          path: 'https://obscu.ro/',
          img: 'upcoming_obscuro',
        },
        {
          name: 'Router',
          path: 'https://www.routerprotocol.com/',
          img: 'router',
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
