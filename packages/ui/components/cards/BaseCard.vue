<template>
  <div class="feed-card card-border">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card-border {
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  height: max-content;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: var(--card-box-selected-shadow);
  }
}
</style>
