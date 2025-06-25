<template>
  <p v-if="count" class="title text-2xl">
    {{ count }}
  </p>
  <p v-else class="min-h-[32px] text [&&]:text-opacity-50">...</p>
</template>
<script setup>
defineProps({
  count: {
    type: Number,
    required: true,
  },
})
</script>
