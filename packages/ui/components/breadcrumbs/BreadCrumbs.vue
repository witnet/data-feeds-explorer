<template>
  <div class="breacrumbs-wrapper">
    <div class="breadcrumbs container">
      <nuxt-link
        v-for="option in breadCumbsOptions"
        :key="option.key"
        :class="{ selected: option.selected }"
        :to="localeRoute(option.path)"
        class="breadcrumbs-link"
      >
        <h3 v-if="option.label" class="breadcrumbs">
          <span class="breadcrumbs-label">{{ option.label }}</span> /
        </h3>
      </nuxt-link>
    </div>
    <Socials />
  </div>
</template>

<script>
export default {
  computed: {
    selected() {
      return this.$store.state.selectedNetwork
    },
    breadCumbsOptions() {
      return [
        {
          label: 'Home',
          path: {
            name: 'index',
          },
          selected: false,
        },
        {
          label: this.selected ? this.selected[0]?.chain : null,
          path: {
            name: 'network',
            params: {
              network: this.$route.params.network || 'ethereum',
            },
          },
          selected: false,
        },
        {
          label:
            this.$route.params.id && this.selected
              ? this.selected[0]?.label
              : null,
          path: {
            name: 'network-id',
            params: {
              network: this.$route.params.network,
              id: this.$route.params.id,
            },
          },
          selected: false,
        },
      ]
    },
  },
  mounted() {
    if (!this.selected) {
      this.$router.push('/')
    }
  },
}
</script>

<style lang="scss">
.breacrumbs-wrapper {
  display: grid;
  grid-template-columns: max-content max-content;
  grid-template-rows: max-content;
  justify-content: space-between;
  grid-gap: 16px;
}
.breadcrumbs {
  display: flex;
  color: var(--text);
  font-size: var(--text-size-medium);
  .breadcrumbs-label {
    color: var(--selected-option);
    font-weight: bold;
    font-size: var(--text-size-medium);
    margin-right: 4px;
  }
  .breadcrumbs-link {
    margin-left: 4px;
    &:first-of-type {
      margin-left: 0;
    }
  }
}
@media screen and (max-width: 1100px) {
  .breadcrumbs {
    &.container {
      padding: 0 24px;
    }
  }
}
@media (max-width: 600px) {
  .breacrumbs-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content max-content;
    justify-content: space-between;
  }
  .breadcrumbs {
    grid-row: 2;
    &.container {
      padding: 0 24px;
    }
  }
}
@media screen and (max-width: 300px) {
  .breadcrumbs {
    &.container {
      padding: 0 16px;
    }
  }
}
</style>
