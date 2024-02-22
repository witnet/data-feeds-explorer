<template>
  <ColorScheme>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ColorScheme>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-4px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-4px);
}
</style>
