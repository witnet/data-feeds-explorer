<template>
  <nuxt-link
    :key="
      ((selected[0] && selected[0].chain.toLowerCase()) || 'ethereum') ===
      name.toLowerCase()
    "
    class="nav-link"
    :to="
      localeRoute({
        name: 'network',
        params: {
          network: name.toLowerCase(),
        },
      })
    "
  >
    <SvgIcon :svg="svg" />
    {{ name }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    svg: {
      type: String,
      required: true,
    },
  },
  computed: {
    selected() {
      return this.$store.state.selectedNetwork
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-link {
  font-size: 14px;
  padding: 8px 0;
  height: 100%;
  border-radius: 4px;
  margin: 4px 0;
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-gap: 4px;
  justify-content: center;
  align-items: center;
  align-items: flex-end stretch;
  z-index: 1;
  color: var(--network-color);
  border: var(--network-border);
  background: var(--network-background);

  &:hover {
    opacity: 0.8;
  }
  &.nuxt-link-active {
    color: var(--network-selected-color);
    border: var(--network-selected-border);
    background: var(--network-selected-background);
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
