<template>
  <div class="fieldset">
    <h3 class="title">{{ title.toUpperCase() }}</h3>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fieldset',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.fieldset {
  display: grid;
  grid-template-rows: max-content max-content;
  max-width: 100vw;
  padding: 16px;
  .title {
    color: var(--fieldset-title);
    font-weight: bold;
    font-size: var(--text-size);
    padding: 16px 0 16px 0;
  }
  .content {
    background: var(--fieldset-background);
    box-shadow: var(--card-box-shadow);
    border-radius: 4px;
    height: max-content;
  }
}
</style>
