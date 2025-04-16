<template>
  <BaseCard>
    <nuxt-link :to="$localeRoute(detailsPath)">
      <div class="card-container">
        <div class="title">
          <SvgIcon class="img" :svg="svg" />
          <p class="name title">{{ name }}</p>
        </div>
        <p class="count">{{ count }} {{ $t('feeds') }}</p>
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
.nuxt-link-exact-active {
  color: var(--value-color);
}
.nuxt-link-active {
  color: var(--value-color);
}
a {
  color: var(--value-color);
}
.card-container {
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
  justify-items: flex-start;
  width: 100%;
  min-height: 50px;
  font-weight: bold;
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
    color: var(--value-color);
    font-size: var(--text-size-small);
    font-family: 'Avenir Next Variable W05 Itali', sans-serif;
    justify-self: flex-end;
    font-weight: normal;
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
