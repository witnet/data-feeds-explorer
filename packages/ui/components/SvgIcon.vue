<template>
  <!-- We are using v-html assuming we never use user-provided content -->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-if="name" v-html="require(`~/assets/svg/${name}.svg?raw`)" />
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-else-if="svg" v-html="svg" />
</template>

<script>
export default {
  props: {
    name: { type: String, default: '' },
    svg: { type: String, default: '' },
  },
}
</script>

<style lang="scss">
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
