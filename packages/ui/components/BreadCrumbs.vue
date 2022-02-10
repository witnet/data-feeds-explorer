<template>
  <div class="breadcrumbs">
    <nuxt-link
      v-for="option in options"
      :key="option.label"
      :class="{ selected: option.selected }"
      :to="localeRoute(option.path)"
    >
      <p v-if="option.label" class="breadcrumbs">
        <span class="breadcrumbs-label">{{ option.label }}</span> /
      </p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.breadcrumbs {
  display: flex;
  color: var(--text);
  font-size: 16px;
  .breadcrumbs-label {
    color: var(--selected-option);
    font-weight: bold;
    font-size: 16px;
    margin-right: 4px;
    margin-left: 4px;
  }
}
@media (max-width: 1200px) {
  .breadcrumbs {
    padding-left: 8px;
  }
}
</style>
