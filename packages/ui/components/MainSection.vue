<template>
  <div class="main-section">
    <slot name="navbar"></slot>
    <slot name="content"></slot>
    <ThemeSwitch class="theme-switch" />
  </div>
</template>

<style lang="scss" scoped>
.main-section {
  color: var(--text);
  padding: 0 180px;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 150px 1fr;
  grid-template-columns: 1fr;
  max-width: 1500px;
  row-gap: 24px;
  margin: 0 auto;
  padding-bottom: 48px;
  .theme-switch {
    position: fixed;
    bottom: 0;
    z-index: 5;
    right: 0;
  }
}
@media (max-width: 1200px) {
  .main-section {
    padding: 0;
  }
}
</style>
