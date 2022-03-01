<template>
  <div class="sidebar">
    <div
      v-for="option in sidebarOptions"
      :key="option"
      class="option"
      :class="{ selected: option === selectedOption }"
      @click="selectOption(option)"
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
    defaultOption: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: this.options,
    }
  },
  computed: {
    sidebarOptions() {
      return Object.keys(this.options)
    },
    selectedOption() {
      return (this.selected[0] ? this.selected[0].network : '').toLowerCase()
    },
  },
  watch: {
    selected: {
      handler(selected) {
        this.$emit('update-selected', selected)
      },
      deep: true,
    },
  },
  mounted() {
    this.selectOption('ethereum')
  },
  methods: {
    capitalizeFirstLetter,
    selectOption(option) {
      this.selected = this.options[option]
    },
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
