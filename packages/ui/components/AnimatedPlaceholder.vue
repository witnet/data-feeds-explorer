<template>
  <div class="placeholder">&nbsp;</div>
</template>
<script setup>
defineProps({
  height: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
  borderRadius: {
    type: String,
    required: true,
  },
})
</script>
<style scoped lang="scss">
@keyframes bgAnimate {
  0% {
    background-position: 50% 0;
  }
  100% {
    background-position: -150% 0;
  }
}
.placeholder {
  background-color: var(--placeholder-bg-color);
  height: v-bind(height);
  width: v-bind(width);
  border-radius: v-bind(borderRadius);
  background-image: var(--placeholder-gradient);
  background-size: 200% 200%;
  box-shadow: var(--card-box-shadow);
  animation: bgAnimate 1.2s linear infinite;
}
</style>
