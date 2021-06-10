<template>
  <div class="feeds-container">
    <FeedCard
      v-for="(feed, index) in feeds"
      :key="index"
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

<style>
.feeds-container {
  display: grid;
  column-gap: 24px;
  row-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(150px, 1fr));
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
