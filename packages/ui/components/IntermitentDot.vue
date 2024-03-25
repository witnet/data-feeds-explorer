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
    box-shadow: 0 0 8px 2px var(--witnet-green);
  }
  100% {
    opacity: 0.7;
    box-shadow: 0 0 0px 0px transparent;
  }
}
.square {
  height: 8px;
  width: 8px;
  background-color: var(--witnet-green);
  animation: glowing 2000ms infinite;
}
</style>
