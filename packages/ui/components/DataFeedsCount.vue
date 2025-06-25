<template>
  <div
    class="w-full bg-white-100 dark:bg-black-950 rounded-[24px] grid grid-cols-[max-content_max-content_max-content] gap-xl [&&]:sm:gap-md justify-items-center justify-center h-max px-lg py-sm"
  >
    <div class="item text-bold">
      <DataCount :count="feeds" />
      <p class="text">
        {{ $t('data_feeds') }}
      </p>
    </div>
    <div class="item text-bold">
      <DataCount :count="networks" />
      <p class="text">
        {{ $t('networks') }}
      </p>
    </div>
    <div class="item text-bold">
      <DataCount :count="chains" />
      <p class="text">
        {{ $t('chains') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  chains: {
    type: Number,
    default: 0,
  },
  networks: {
    type: Number,
    default: 0,
  },
  feeds: {
    type: Number,
    default: 0,
  },
})
</script>

<style lang="scss" scoped>
.count-strip-container {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  column-gap: 24px;
  justify-content: center;
  border-radius: 4px;
  padding: 32px 0;
}
.item {
  display: grid;
  justify-items: center;
  @apply w-max;
}
@media (max-width: 300px) {
  .count-strip-container {
    width: 100%;
    grid-template-columns: 1fr;
  }
}
</style>
