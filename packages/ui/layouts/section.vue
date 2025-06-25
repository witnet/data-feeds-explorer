<template>
  <div :class="`w-full h-full ${frameClasses}`">
    <div
      :class="`content m-[0_auto] max-w-[1100px] p-[100px_32px_100px_32px] sm:p-[32px_32px_70px_32px] xs:p-[32px_16px_70px_16px] w-full z-50 ${contentClasses}`"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  frameClasses: {
    type: String,
    default: '',
  },
})
</script>
