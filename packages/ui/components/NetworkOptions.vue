<template>
  <div :class="type">
    <div v-for="option in options" :key="option.name" class="option">
      <LazyNetworkLink :name="option.name" :svg="option.logo" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'sidebar',
      validator(value) {
        return ['navbar', 'sidebar'].includes(value)
      },
    },
    options: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  display: grid;
  grid-template-columns: repeat(auto-fit, 88px);
  grid-template-rows: 88px;
  grid-gap: 16px;
  color: var(--light-text);
  .option {
    font-size: var(--text-size-medium);
    text-align: center;
    cursor: pointer;
    color: var(--light-text);
    font-weight: bold;
    &.selected {
      border-radius: 4px;
    }
  }
}
.navbar {
  .option {
    text-align: center;
    cursor: pointer;
    color: var(--light-text);
    font-weight: bold;
  }
}
@media (max-width: 850px) {
  .sidebar {
    display: none;
  }
}
</style>
