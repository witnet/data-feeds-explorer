<template>
  <div>
    <!-- We are using v-html assuming we never use user-provided content -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="svg" class="icon" v-html="svg" />
    <customIcon v-else-if="name" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  svg: { type: String, default: '' },
  className: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
})
const customIcon = defineAsyncComponent(
  () => import(`@/assets/svg/${url.value}.svg`),
)
const url = computed(() => `${props.name}`.trim())
</script>

<style lang="scss">
.icon {
  display: flex;
  justify-content: center;
}
.witnet-logo {
  max-width: 250px;
  height: 100%;
}
.socials-size {
  width: 18px;
  height: 18px;
}
.icon-size {
  width: 24px;
  height: 30px;
  transition: all 0.3s ease;
}
.fill {
  fill: var(--text);
}
.partner-size {
  width: 140px;
  height: 40px;
}
.active {
  .fill {
    fill: var(--witnet-green);
  }
}

.reverse-fill {
  fill: var(--bg);
}

.border {
  stroke: var(--text);
}
@media (max-width: 300px) {
  .witnet-logo {
    max-width: 200px;
  }
}
</style>
