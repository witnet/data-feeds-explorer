<template>
  <div class="h-screen w-full">
    <div class="p-sm grid gap-md">
      <div class="grid gap-md w-[200px]">
        <WLoadingPlaceholder width="200px" height="16px" border-radius="24px" />
        <WLoadingPlaceholder width="100px" height="16px" border-radius="24px" />
      </div>
      <WLoadingPlaceholder width="100" height="500px" border-radius="0px" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { WLoadingPlaceholder } from 'wit-vue-ui'
</script>
