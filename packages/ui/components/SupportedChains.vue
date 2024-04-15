<template>
  <div class="chains-container">
    <client-only fallback-tag="div">
      <ChainCard
        v-for="chain in chains"
        :key="chain.label"
        :name="chain.name"
        :details-path="chain.detailsPath"
        :svg="chain.svg"
        :count="chain.count"
      />
      <template #fallback>
        <ChainCard
          v-for="chain in defaultChains"
          :key="chain.label"
          :name="chain.name"
          :details-path="chain.detailsPath"
          :svg="chain.svg"
          :count="chain.count"
        />
      </template>
    </client-only>
  </div>
</template>

<script>
import { getDefaultEcosystems } from '@/utils/getDefaultEcosystems'
export default {
  props: {
    chains: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      defaultChains: getDefaultEcosystems(),
    }
  },
}
</script>

<style lang="scss" scoped>
.chains-container {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fill, max-content);
  grid-gap: 16px;
  display: grid;
  row-gap: 16px;
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
