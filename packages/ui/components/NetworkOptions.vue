<template>
  <div :class="type">
    <div v-for="option in options" :key="option" class="option">
      <nuxt-link
        :key="
          ((selected[0] && selected[0].chain.toLowerCase()) || 'ethereum') ===
          option.toLowerCase()
        "
        class="nav-link"
        :to="
          localeRoute({
            name: 'network',
            params: {
              network: option.toLowerCase(),
            },
          })
        "
      >
        {{ option }}
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
      return this.$route.params.network || 'ethereum'
    },
  },
  methods: {
    capitalizeFirstLetter,
    isSelected(option) {
      return option.toLowerCase() === this.selectedOption.toLowerCase()
    },
  },
}
</script>

<style lang="scss">
.nav-link {
  font-size: 14px;
  padding: 16px 24px;
  border-radius: 4px;
  margin: 4px 0;
  display: flex;
  justify-content: center;
  align-items: flex-end stretch;
  z-index: 1;
  color: var(--network-color);
  border: var(--network-border);
  background: var(--network-background);

  &:hover {
    opacity: 0.8;
  }
  &.nuxt-link-active {
    color: var(--network-selected-color);
    border: var(--network-selected-border);
    background: var(--network-selected-background);
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
  }
}
.sidebar {
  display: grid;
  grid-template-columns: repeat(auto-fit, 98px);
  grid-template-rows: max-content;
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
