<template>
  <div class="flex">
    <SvgIcon
      v-for="icon in icons"
      :key="icon"
      :name="icon"
      tw-styles="[&&]:w-[18px] [&&]:h-[18px] p-[1px] rounded-full bg-white-50 dark:bg-black-950 -ml-1 first:ml-0 z-10"
    />
    <span v-if="showMore">...</span>
  </div>
</template>
<script setup lang="ts">
defineProps({
  icons: {
    type: Array<String>,
    required: true,
  },
  showMore: {
    type: Boolean,
    default: false,
  },
})
</script>
