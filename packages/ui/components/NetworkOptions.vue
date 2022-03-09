<template>
  <div :class="type">
    <div
      v-for="option in options"
      :key="option"
      class="option"
      :class="{ selected: isSelected(option) }"
    >
      <nuxt-link
        :to="
          localeRoute({
            name: 'network',
            params: {
              network: option,
            },
          })
        "
      >
        {{ capitalizeFirstLetter(option) }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
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
  computed: {
    selected() {
      return this.$store.state.selectedNetwork
    },
    selectedOption() {
      return (
        this.$route.params.network ||
        this.$store.state.selectedNetwork[0]?.network.toLowerCase()
      )
    },
  },
  methods: {
    capitalizeFirstLetter,
    isSelected(option) {
      return option.toLowerCase() === this.selectedOption
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
    }
  }
}
.selected {
  font-weight: bold;
  color: var(--btn-primary-color);
  background: var(--tab-background);
  background: var(--tab-gradient-selected);
}
.navbar {
  .option {
    padding: 16px 24px;
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
