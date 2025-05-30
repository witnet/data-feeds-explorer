<template>
  <div
    class="nav-link-container text-small-bold cursor-pointer"
    :class="{ selected: isSelectedEcosystem }"
    @click="setEcosystem"
  >
    <div class="nav-link h-full">
      <SvgIcon v-if="svg" :svg="svg" />
      <SvgIcon v-else :name="'all'" />
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useStore()
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  svg: {
    type: String,
    default: null,
  },
})
const { selectedEcosystemName } = storeToRefs(store)
const isSelectedEcosystem = computed(
  () => props.name.toLowerCase() === selectedEcosystemName.value.toLowerCase(),
)
function setEcosystem() {
  store.selectEcosystem(props.name.toLocaleLowerCase())
}
</script>

<style lang="scss" scoped>
.nav-link-container {
  @apply border-2 rounded-[24px] border-white-100 dark:border-white-500 px-sm py-md h-full bg-black-100 dark:bg-black-900;
  &.selected {
    @apply bg-white-50 border-black-950 dark:bg-black-950 dark:border-white-50;
  }
}
.nav-link {
  font-size: 14px;
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-gap: 4px;
  justify-content: center;
  align-items: center;
  align-items: flex-end stretch;
  justify-items: center;
  z-index: 1;
  @apply text-black-950 dark:text-white-50 border-black-950 dark:border-white-50;

  &:hover {
    opacity: 0.8;
  }
  &.nuxt-link-active {
    @apply text-black-950 dark:text-white-50 bg-white-50 dark:bg-black-950 border-black-950 dark:border-white-50;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
