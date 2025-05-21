<template>
  <div class="nav-link" @click="setEcosystem">
    <SvgIcon :svg="svg" />
    {{ name }}
  </div>
</template>

<script setup lang="ts">
const store = useStore()
const ecosystemsList = computed(() => generateSelectOptions(store.networks))
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  svg: {
    type: String,
    required: true,
  },
})
function setEcosystem() {
  const selectedEcosystemNetworks =
    ecosystemsList.value[props.name.toLocaleLowerCase()]
  store.updateSelectedNetwork({ networks: selectedEcosystemNetworks })
}
</script>

<style lang="scss" scoped>
.nav-link {
  font-size: 14px;
  padding: 8px 0;
  height: 100%;
  border-radius: 4px;
  margin: 4px 0;
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-gap: 4px;
  justify-content: center;
  align-items: center;
  align-items: flex-end stretch;
  z-index: 1;
  @apply text-black-950 dark:text-white-50 bg-black-300 dark:bg-black-950 border-black-950 dark:border-white-50;

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
