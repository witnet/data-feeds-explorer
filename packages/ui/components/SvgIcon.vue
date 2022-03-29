<template>
  <!-- We are using v-html assuming we never use user-provided content -->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="require(`~/assets/svg/${name}.svg?raw`)" />
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
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
}
.fill {
  fill: var(--text);
}
.partner-size {
  width: 140px;
  height: 40px;
}

.witnet-green {
  fill: var(--witnet-green);
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
