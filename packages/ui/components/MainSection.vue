<template>
  <div class="main-section-container">
    <div class="main-section">
      <slot name="navbar"></slot>
      <slot name="breadcrumbs"></slot>
      <slot name="cover"></slot>
      <slot name="content"></slot>
      <ThemeSwitch class="theme-switch" />
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<style lang="scss" scoped>
.main-section-container {
  min-height: 100vh;
  min-width: 100vw;
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-template-columns: 1fr;
}
.main-section {
  color: var(--text);
  display: grid;
  min-height: max-content;
  grid-template-rows: max-content max-content 1fr max-content;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: var(--desktop-margin);
  row-gap: 24px;
  margin: 0 auto;
  .theme-switch {
    position: fixed;
    bottom: 0;
    z-index: 5;
    right: 0;
  }
}
@media (max-width: 850px) {
  .main-section {
    grid-template-rows: max-content max-content max-content;
    padding: 0;
  }
}
</style>
