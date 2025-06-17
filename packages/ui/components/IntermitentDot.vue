<template>
  <div class="square"></div>
</template>

<style scoped lang="scss">
@keyframes glowing {
  0% {
    opacity: 0.7;
    box-shadow: 0 0 0px 0px transparent;
  }
  50% {
    opacity: 1;
    @apply shadow-[0_0_8px_2px] shadow-wit-blue-500;
  }
  100% {
    opacity: 0.7;
    box-shadow: 0 0 0px 0px transparent;
  }
}
.square {
  height: 8px;
  width: 8px;
  @apply bg-wit-blue-500 rounded-full;
  animation: glowing 2000ms infinite;
}
</style>
