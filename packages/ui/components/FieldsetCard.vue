<template>
  <div class="fieldset-container">
    <h3 class="title text-bold">
      {{ title.toUpperCase() }}
    </h3>
    <div class="content fieldset">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldsetCard',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.fieldset-container {
  display: grid;
  grid-template-rows: max-content max-content;
  max-width: 100vw;
  padding: 16px;
  .title {
    padding: 16px 0 16px 0;
  }
  .content {
    border-radius: 4px;
    height: max-content;
  }
}
</style>
