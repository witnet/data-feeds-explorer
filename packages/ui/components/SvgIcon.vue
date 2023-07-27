<template>
  <!-- We are using v-html assuming we never use user-provided content -->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <!-- <div v-if="name" v-html="import.meta.glob(`./assets/svg/${name}.svg`, { as: 'raw' })" /> -->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="svg" />
</template>

<script setup>
  const props = defineProps({ name: String, svg: String })
  // TODO: avoid load all icons 
  const icons = Object.fromEntries(
    Object.entries(import.meta.glob('~/assets/svg/*.svg', { as: 'raw' }))
    .map(
      ([key, value]) => {
        const filename = key.split('/').pop().split('.').shift()
        return [filename, value]
      },
    ),
  )

let svg
if (props.svg) {
  svg = props.svg
} else if (icons[props.name]) {
  svg = await icons[props.name]() 
} else {
  svg = '<svg></svg>'
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
