<template>
  <client-only>
    <div
      class="bg-white-100 dark:bg-black-950 rounded-[24px] grid grid-cols-[max-content_max-content_max-content] gap-xl justify-items-center justify-center w-max h-max px-lg py-sm"
    >
      <div class="item text-bold">
        <p class="title text-2xl">
          {{ feeds }}
        </p>
        <p class="text">
          {{ $t('data_feeds') }}
        </p>
      </div>
      <div class="item text-bold">
        <p class="title text-2xl">
          {{ networks }}
        </p>
        <p class="text">
          {{ $t('networks') }}
        </p>
      </div>
      <div class="item text-bold">
        <p class="title text-2xl">
          {{ chains }}
        </p>
        <p class="text">
          {{ $t('chains') }}
        </p>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
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
  },
}
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
