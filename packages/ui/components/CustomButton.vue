<template>
  <button class="btn text-small-bold" :class="[type]">
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
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &.primary {
    color: var(--btn-primary-color);
    background: var(--btn-primary-background-color);
    border: 1px solid var(--btn-primary-border-color);
    &:hover {
      background: var(--btn-primary-background-color-active);
    }
  }
  &.secondary {
    color: var(--btn-secondary-color);
    background: transparent;
    border: 1px solid var(--btn-secondary-border-color);
    transition: all 0.3 ease;
    &:hover {
      opacity: 0.7;
    }
  }
  &.disable {
    opacity: 0.6;
    cursor: no-drop;
  }
}
</style>
