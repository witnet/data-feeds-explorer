<template>
  <a
    :href="url"
    target="_blank"
    class="text-highlighted font-mono [&&]:link-text break-all"
  >
    {{ label }}
    <div class="w-[10px] inline">
      <font-awesome-icon class="w-[10px]" icon="external-link-alt" />
    </div>
  </a>
</template>
<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
})
</script>
