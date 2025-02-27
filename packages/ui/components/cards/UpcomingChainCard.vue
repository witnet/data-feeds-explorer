<template>
  <BaseCard>
    <a
      :href="path"
      target="_blank"
    >
      <div class="card-container font-bold">
        <div class="title">
          <SvgIcon
            class="img"
            :name="img"
          />
          <p class="name title">{{ name }}</p>
        </div>
      </div>
    </a>
  </BaseCard>
</template>

<script>
export default {
  name: 'FeedCard',
  props: {
    path: {
      type: String,
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
  },
}
</script>

<style lang="scss" scoped>
.card-container {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: flex-start;
  align-items: center;
  width: 100%;
  height: max-content;
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
}
@media (max-width: 300px) {
  .card-container {
    width: 100%;
    grid-template-columns: 1fr;
  }
}
</style>
