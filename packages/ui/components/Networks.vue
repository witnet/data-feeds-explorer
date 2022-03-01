<template>
  <div class="networks">
    <p class="network" :style="{ color, border: `1px solid ${color}` }">
      {{ formatedNetwork[0] }}
    </p>
    <p class="network" :style="{ color, border: `1px solid ${color}` }">
      {{ formatedNetwork[1] }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    network: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  computed: {
    formatedNetwork() {
      return [this.network.split('-')[0], this.network.split('-')[1]]
    },
  },
}
</script>

<style lang="scss" scoped>
.networks {
  display: flex;
  .network {
    margin-right: 8px;
    padding: 4px 8px;
    font-weight: 400;
    font-size: var(--text-size);
    border-radius: 4px;
    width: max-content;
    text-transform: capitalize;
  }
  .network:last-of-type {
    margin-right: 0;
  }
}
</style>
