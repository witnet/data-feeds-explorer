<template>
  <div>
    <div class="main-section">
      <slot name="navbar"></slot>
      <slot name="breadcrumbs"></slot>
      <slot name="content"></slot>
      <ThemeSwitch class="theme-switch" />
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<style lang="scss" scoped>
.main-section {
  color: var(--text);
  min-height: 100vh;
  display: grid;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-columns: 1fr;
  max-width: 1124px;
  row-gap: 24px;
  margin: 0 auto;
  .theme-switch {
    position: fixed;
    bottom: 0;
    z-index: 5;
    right: 0;
  }
}
@media (max-width: 950px) {
  .main-section {
    grid-template-rows: max-content max-content max-content;
    padding: 0;
  }
}
</style>
