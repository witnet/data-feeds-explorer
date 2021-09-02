<template>
  <div class="feeds-container">
    <FeedCard
      v-for="feed in feeds"
      :key="feed.name + feed.network + feed.value + feed.color"
      :details-path="feed.detailsPath"
      :name="feed.name"
      :img="feed.img"
      :value="feed.value"
      :label="feed.label"
      :network="feed.network"
      :color="feed.color"
    />
  </div>
</template>

<script>
export default {
  name: 'DataFeeds',
  props: {
    feeds: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.feeds-container {
  display: grid;
  grid-gap: 24px;
  width: 100%;
  grid-template: repeat(auto-fill, minmax(150px, 1fr)) / repeat(
      auto-fill,
      250px
    );
  justify-items: center;
  align-items: center;
}

@media screen and (max-width: 600px) {
  .feeds-container {
    padding: 0;
  }
}
@media screen and (max-width: 1200px) {
  .feeds-container {
    padding: 0;
    justify-content: center;
  }
}
</style>
