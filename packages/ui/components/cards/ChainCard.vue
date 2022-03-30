<template>
  <nuxt-link :to="localeRoute(detailsPath)">
    <div class="card-container">
      <div class="title">
        <SvgIcon class="img" :name="img" />
        <p class="name title">{{ name }}</p>
      </div>
      <p class="count">{{ count }} {{ $t('feeds') }}</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'FeedCard',
  props: {
    detailsPath: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    img: {
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
  height: max-content;
  background: var(--card-background);
  border: var(--card-border);
  box-shadow: var(--card-box-shadow);
  border-radius: 4px;
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
    font-style: italic;
    justify-self: flex-end;
    font-weight: normal;
  }
}
@media (max-width: 300px) {
  .card-container {
    width: 100%;
    grid-template-columns: 1fr;
  }
}
</style>
