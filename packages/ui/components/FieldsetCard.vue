<template>
  <div class="fieldset-container">
    <h3 class="title">
      {{ title }}
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
    border-radius: 24px;
    height: max-content;
  }
}
</style>
