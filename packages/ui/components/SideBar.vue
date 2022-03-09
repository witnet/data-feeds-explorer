<template>
  <div class="sidebar">
    <div
      v-for="option in sidebarOptions"
      :key="option"
      class="option"
      :class="{ selected: option === selectedOption }"
      @click="$router.push(`/en/${option}`)"
    >
      {{ capitalizeFirstLetter(option) }}
    </div>
  </div>
</template>

<script>
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sidebarOptions() {
      return Object.keys(this.options)
    },
    selected() {
      return this.$store.state.selectedNetwork
    },
    selectedOption() {
      return (this.selected[0] ? this.selected[0].network : '').toLowerCase()
    },
  },
  methods: {
    capitalizeFirstLetter,
  },
}
</script>

<style lang="scss">
.sidebar {
  position: relative;
  text-align: right;
  .option {
    padding: 16px 24px;
    font-size: var(--text-size-medium);
    text-align: center;
    cursor: pointer;
    color: var(--light-text);
    font-weight: bold;
    &.selected {
      border-radius: 4px;
      font-weight: bold;
      color: var(--btn-primary-color);
      background: var(--tab-background);
      background: var(--tab-gradient-selected);
    }
  }
}
@media (max-width: 850px) {
  .sidebar {
    display: none;
  }
}
</style>
