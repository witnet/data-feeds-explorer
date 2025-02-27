<template>
  <BaseCard>
    <nuxt-link :to="localeRoute(detailsPath)">
      <div class="card-container">
        <div class="title">
          <SvgIcon class="img" :svg="svg" />
          <p class="name title">{{ name }}</p>
        </div>
        <p class="count text-2-sm">{{ count }} {{ $t('feeds') }}</p>
      </div>
    </nuxt-link>
  </BaseCard>
</template>

<script>
export default {
  name: 'ChainCard',
  props: {
    detailsPath: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    svg: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.card-container {
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
  justify-items: flex-start;
  width: 100%;
  min-height: 50px;
  padding: 8px 16px;
  cursor: pointer;
  .title {
    justify-content: center;
    align-items: center;
    display: flex;
    grid-column-gap: 8px;
    .img {
      display: flex;
      justify-content: center;
      align-self: center;
    }
  }
  .count {
    justify-self: flex-end;
  }
}
@media (max-width: 300px) {
  .card-container {
    width: 100%;
    grid-template-columns: 1fr;
    min-height: 70px;
  }
}
</style>
