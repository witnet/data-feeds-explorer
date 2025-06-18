<!-- eslint-disable vue/no-v-html -->
<template>
  <!-- We are using v-html assuming we never use user-provided content -->
  <div v-if="svg" class="icon" v-html="svg" />
  <customIcon v-else-if="name" :class="twStyles" />
</template>

<script setup lang="ts">
const props = defineProps({
  svg: { type: String, default: '' },
  className: {
    type: String,
    default: null,
  },
  twStyles: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: null,
  },
})
const customIcon = defineAsyncComponent(() => {
  try {
    const icon = import(`@/assets/svg/${url.value}.svg`)
    return icon
  } catch (err) {
    console.log('Error getting svg', err)
    return import(`@/assets/svg/ethereum.svg`)
  }
})
const url = computed(() => `${props.name}`.trim())
</script>

<style lang="scss">
.icon {
  display: flex;
  justify-content: center;
}
.witnet-logo {
  max-width: 250px;
  height: 100%;
}
.socials-size {
  width: 18px;
  height: 18px;
}
.icon-size {
  width: 24px;
  height: 30px;
  transition: all 0.3s ease;
}
.fill {
  @apply fill-black-950 dark:fill-white-100;
}
.reverse-fill {
  @apply fill-white-50 dark:fill-black-950;
}
.partner-size {
  width: 140px;
  height: 40px;
}
.active {
  .fill {
    @apply fill-wit-blue-500;
  }
}

.border {
  @apply stroke-black-950 dark:stroke-white-100;
}
@media (max-width: 300px) {
  .witnet-logo {
    max-width: 200px;
  }
}
</style>
