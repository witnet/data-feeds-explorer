<template>
  <client-only>
    <div class="count-strip-container">
      <div class="item text-bold">
        <p class="count">
          {{ feeds }}
        </p>
        <p class="title">
          {{ $t('data_feeds') }}
        </p>
      </div>
      <div class="item text-bold">
        <p class="count">
          {{ networks }}
        </p>
        <p class="title">
          {{ $t('networks') }}
        </p>
      </div>
      <div class="item text-bold">
        <p class="count">
          {{ chains }}
        </p>
        <p class="title">
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
  .count {
    font-size: 32px;
  }
}
@media (max-width: 300px) {
  .count-strip-container {
    width: 100%;
    grid-template-columns: 1fr;
  }
}
</style>
