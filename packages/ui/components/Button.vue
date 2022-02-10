<template>
  <button class="btn" :class="[type]">
    <slot class="btn-content"> </slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary', 'disable'].includes(value)
      },
    },
  },
}
</script>

<style scoped lang="scss">
.btn {
  width: 100%;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: medium;
  font-size: 16px;
  cursor: pointer;

  &.primary {
    color: var(--btn-primary-color);
    background: var(--btn-primary-background-color);
    border: 1px solid var(--btn-primary-border-color);
  }
  &.secondary {
    color: var(--btn-secondary-color);
    background: transparent;
    border: 1px solid var(--btn-secondary-border-color);
  }
  &.disable {
    opacity: 0.6;
    cursor: no-drop;
  }
}
</style>
