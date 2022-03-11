<template>
  <div :class="type">
    <div
      v-for="option in options"
      :key="option"
      class="option"
      :class="{ selected: isSelected(option) }"
    >
      <nuxt-link
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
  display: block;
  color: var(--light-text);
}
.selected {
  font-weight: bold;
  color: var(--btn-primary-color);
  background: var(--tab-background);
  background: var(--tab-gradient-selected);
  .nav-link {
    color: var(--btn-primary-color);
  }
}
.sidebar {
  position: relative;
  text-align: right;
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
