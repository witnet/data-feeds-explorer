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
.icon-size {
  width: 24px;
  height: 30px;
}
.fill {
  fill: var(--text);
}

.reverse-fill {
  fill: var(--bg);
}

.border {
  stroke: var(--text);
}
</style>
