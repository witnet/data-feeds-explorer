<template>
  <div class="feeds-container">
    <FeedCard
      v-for="(feed, index) in feeds"
      :key="feed.name + feed.network + index"
      :details-path="feed.detailsPath"
      :name="feed.name"
      :img="feed.img"
      :value="feed.value"
      :label="feed.label"
      :network="feed.network"
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
      minmax(300px, 1fr)
    );
  justify-items: center;
  align-items: center;
}

@media screen and (max-width: 600px) {
  .feeds-container {
    padding: 0 16px 16px 16px;
  }
}
@media screen and (max-width: 1200px) {
  .feeds-container {
    padding: 0 32px 32px 32px;
  }
}
</style>
