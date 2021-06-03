<template>
  <div class="fieldset">
    <header class="title">{{ title.toUpperCase() }}</header>
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
  grid-template-rows: max-content 1fr;
  .title {
    color: var(--fieldset-title);
    font-weight: bold;
    font-size: 16px;
    padding: 16px 0 16px 0;
  }
  .content {
    background: var(--fieldset-background);
    border-radius: 4px;
  }
}
</style>
