<template>
  <div class="nav-container" :class="type">
    <div class="networks">
      <div v-for="option in mainOptions" :key="option.name" class="option">
        <LazyNetworkLink :name="option.name" :svg="option.logo" />
      </div>
    </div>
    <transition name="dropdown" class="dropdown">
      <div v-if="showAll" class="networks">
        <div
          v-for="option in filteredOptions"
          :key="option.name"
          class="option"
        >
          <LazyNetworkLink :name="option.name" :svg="option.logo" />
        </div>
      </div>
    </transition>
    <div v-if="type === 'sidebar'" class="show-more-btn" @click="toggleShowAll">
      <p v-if="showAll">↑ {{ $t('less_networks') }} {{ networksLeft }} ↑</p>
      <p v-if="!showAll">↓ {{ $t('more_networks') }} {{ networksLeft }} ↓</p>
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
  data() {
    return {
      priorityNetworks: ['ethereum', 'avalanche', 'polygon'],
      showAll: this.type === 'navbar',
    }
  },
  computed: {
    selectedNetwork() {
      return this.$store.state.selectedNetwork[0]
        ? this.$store.state.selectedNetwork[0].chain.toLowerCase()
        : 'ethereum'
    },
    selectedOption() {
      return this.options.filter((option) => {
        return option.name.toLowerCase() === this.selectedNetwork
      })[0]
    },
    filteredOptions() {
      return this.options.filter((option) => {
        return (
          !this.priorityNetworks.includes(option.name.toLowerCase()) &&
          option.name.toLowerCase() !== this.selectedOption.name.toLowerCase()
        )
      })
    },
    networksLeft() {
      return `(${this.filteredOptions.length}+)`
    },
    mainOptions() {
      const result = this.options.filter((option) => {
        return this.priorityNetworks.includes(option.name.toLowerCase())
      })
      const filteredNames = result.map((option) => option.name.toLowerCase())
      if (filteredNames.includes(this.selectedOption.name.toLowerCase())) {
        return result
      } else {
        return [...result, this.selectedOption]
      }
    },
  },
  methods: {
    toggleShowAll() {
      this.showAll = !this.showAll
    },
  },
}
</script>

<style lang="scss" scoped>
.dropdown-enter-active {
  transition: all 0.2s ease;
  opacity: 0.5;
  transform: translateY(-4px);
}
.dropdown-leave-active {
  transition: all 0.2s ease;
  opacity: 0.5;
  transform: translateY(0);
}
.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-leave-to {
  opacity: 0.5;
  transform: translateY(-4px);
}
.sidebar {
  display: grid;
  grid-template-rows: max-content max-content;
  grid-gap: 16px;
}
.networks {
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
.show-more-btn {
  display: flex;
  background-color: var(--network-background);
  font-size: var(--text-size-medium);
  color: var(--value-color);
  width: 100%;
  justify-content: center;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-style: italic;
  font-family: Avenir Next Variable W05 Itali, sans-serif;
}
.navbar {
  display: grid;
  grid-template-rows: max-content max-content;
  grid-gap: 16px;
  justify-content: center;
  .networks {
    display: grid;
    grid-template-columns: repeat(3, 88px);
    grid-template-rows: 88px;
    grid-gap: 16px;
  }
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
