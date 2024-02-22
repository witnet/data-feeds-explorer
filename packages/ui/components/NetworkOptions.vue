<template>
  <div class="nav-container" :class="type">
    <div class="networks">
      <div v-for="option in mainOptions" :key="option.name" class="option">
        <NetworkLink :name="option.name" :svg="option.logo" />
      </div>
    </div>
    <transition name="dropdown" class="dropdown">
      <div v-if="showAll" class="networks">
        <div
          v-for="option in filteredOptions"
          :key="option.name"
          class="option"
        >
          <NetworkLink :name="option.name" :svg="option.logo" />
        </div>
      </div>
    </transition>
    <div v-if="type === 'sidebar'" class="show-more-btn" @click="toggleShowAll">
      <p v-if="showAll">
        <span class="arrow">▲</span> {{ $t('less_networks') }}
        {{ networksLeft }}
        <span class="arrow">▲</span>
      </p>
      <p v-if="!showAll">
        <span class="arrow">▼</span> {{ $t('more_networks') }}
        {{ networksLeft }}
        <span class="arrow">▼</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useStore()
const props = defineProps({
  type: {
    type: String,
    default: 'sidebar',
    validator(value: string) {
      return ['navbar', 'sidebar'].includes(value)
    },
  },
  options: {
    type: Array<{ name: string; logo: string }>,
    required: true,
  },
})
const priorityNetworks: Array<string> = ['ethereum', 'avalanche', 'polygon']
const showAll: Ref<boolean> = ref(props.type === 'navbar')

const selectedEcosystemName = computed(() => {
  return store.selectedEcosystem && store.selectedEcosystem.length > 0
    ? store.selectedEcosystem[0].chain.toLowerCase()
    : 'ethereum'
})
const selectedOption = computed(() => {
  return props.options.filter((option) => {
    return option.name.toLowerCase() === selectedEcosystemName.value
  })[0]
})

const filteredOptions = computed(() => {
  return props.options.filter((option) => {
    return (
      !priorityNetworks.includes(option.name.toLowerCase()) &&
      option.name.toLowerCase() !== selectedEcosystemName.value.toLowerCase()
    )
  })
})
const networksLeft = computed(() => {
  return `(${filteredOptions.value.length}+)`
})
const mainOptions = computed(() => {
  const result = props.options.filter((option) => {
    return priorityNetworks.includes(option.name.toLowerCase())
  })
  const filteredNames = result.map((option) => option.name.toLowerCase())
  if (filteredNames.includes(selectedOption.value.name.toLowerCase())) {
    return result
  } else {
    return [...result, selectedOption.value]
  }
})
const toggleShowAll = () => (showAll.value = !showAll.value)
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
  font-family: 'Avenir Next Variable W05 Itali', sans-serif;
  .arrow {
    color: var(--light-icon);
    font-style: normal;
    font-size: 10px;
  }
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
  .navbar {
    .networks {
      grid-template-columns: repeat(6, 88px);
    }
  }
  .sidebar {
    display: none;
  }
}
@media (max-width: 600px) {
  .navbar {
    .networks {
      grid-template-columns: repeat(3, 88px);
    }
  }
}
@media (max-width: 300px) {
  .navbar {
    .networks {
      grid-template-columns: repeat(2, 88px);
    }
  }
}
</style>
