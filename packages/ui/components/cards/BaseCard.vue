<template>
  <div class="card-border">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card-border {
  width: 100%;
  background-color: var(--card-background);
  box-shadow: var(--card-box-shadow);
  border-radius: 4px;
  cursor: pointer;
  height: max-content;
  border: var(--card-border);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--card-box-selected-shadow);
  }
}
</style>
