<template>
  <div v-if="options.length" class="nav-container" :class="type">
    <div class="networks">
      <NetworkLink v-if="!hideAll" :name="'All'" />
      <div
        v-for="option in aggregatedOptions"
        :key="option.name"
        class="option"
      >
        <NetworkLink :name="option.name" :svg="option.logo" />
      </div>
    </div>
    <div
      v-if="hiddenEcosystems.length"
      class="show-more-btn text-small-bold mt-md"
      @click="toggleShowAll"
    >
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
import { type Ref } from 'vue'
import type { NetworkOption } from '~/types'
const store = useStore()
const props = defineProps({
  hideAll: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array<NetworkOption>,
    required: true,
  },
})
const priorityEcosystemNames: Array<string> = [
  'all',
  'ethereum',
  'avalanche',
  'polygon',
]
const showAll: Ref<boolean> = ref(false)
const selectedEcosystemName = computed(() => store.selectedEcosystemName)
const aggregatedOptions = computed(() =>
  showAll.value
    ? [...mainOptions.value, ...hiddenEcosystems.value]
    : mainOptions.value,
)

const priorityEcosystems = computed(() => {
  return props.options.filter((option) => {
    return priorityEcosystemNames.includes(option.name.toLowerCase())
  })
})

const networksLeft = computed(() => {
  return `(${hiddenEcosystems.value.length}+)`
})

const selectedEcosystem = computed(() => {
  return props.options.filter((option) => {
    return (
      option.name.toLowerCase() ===
      selectedEcosystemName.value.toLocaleLowerCase()
    )
  })[0]
})

const hiddenEcosystems = computed(() => {
  return props.options.filter((option) => {
    return (
      !priorityEcosystemNames.includes(option.name.toLowerCase()) &&
      option.name.toLowerCase() !== selectedEcosystemName.value.toLowerCase()
    )
  })
})

const maxOptionsNumber = computed(() => (props.hideAll ? 7 : 6))

const mainOptions: Ref<NetworkOption[]> = computed(() => {
  let options: NetworkOption[] = []
  if (
    priorityEcosystemNames.includes(selectedEcosystemName.value.toLowerCase())
  ) {
    options = priorityEcosystems.value
  } else {
    options = [selectedEcosystem.value, ...priorityEcosystems.value]
  }
  const spliceIdx = maxOptionsNumber.value - options.length
  return options.length > maxOptionsNumber.value
    ? options
    : [...options, ...hiddenEcosystems.value.splice(0, spliceIdx)]
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
  grid-template-columns: repeat(auto-fit, 90px);
  margin-bottom: 16px;
  grid-template-rows: 95px;
  grid-gap: 16px;
  .option {
    text-align: center;
    cursor: pointer;
    &.selected {
      border-radius: 4px;
    }
  }
}
.show-more-btn {
  display: flex;
  background-color: var(--network-background);
  width: 100%;
  justify-content: center;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-style: italic;
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
  }
}
@media (max-width: 850px) {
  .navbar {
    .networks {
      grid-template-columns: repeat(6, 88px);
    }
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
