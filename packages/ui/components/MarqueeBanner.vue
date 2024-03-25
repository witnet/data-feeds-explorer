<template>
  <div class="marquee">
    <div class="marquee__inner" aria-hidden="true">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.marquee {
  overflow: hidden;
  font-weight: lighter;
  padding: 4px;

  --offset: 100vw;
  --move-initial: calc(-25% + var(--offset));
  --move-final: calc(-50% + var(--offset));
}

.marquee__inner {
  width: fit-content;
  display: flex;
  position: relative;
  gap: 32px;
  transform: translate3d(var(--move-initial), 0, 0);
  animation: marquee 30s linear infinite;

  /* animation-play-state: paused; */
}

.marquee span {
  font-size: 0.875rem;
  margin: 0 0.2rem;
}

/* .marquee:hover .marquee__inner {
  animation-play-state: running;
} */

@keyframes marquee {
  0% {
    transform: translate3d(var(--move-initial), 0, 0);
  }

  100% {
    transform: translate3d(var(--move-final), 0, 0);
  }
}
</style>
