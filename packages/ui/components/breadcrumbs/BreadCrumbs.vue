<template>
  <div class="breadcrumbs container">
    <nuxt-link
      v-for="option in breadCumbsOptions"
      :key="option.key"
      :class="{ selected: option.selected }"
      :to="localeRoute(option.path)"
      class="breadcrumbs-link"
    >
      <p v-if="option.label" class="breadcrumbs">
        <span class="breadcrumbs-label">{{ option.label }}</span> /
      </p>
    </nuxt-link>
  </div>
</template>

<script>
import { formatBreadcrumbsPath } from './formatBreadcrumbsPath'

export default {
  computed: {
    selected() {
      return this.$store.state.selectedNetwork
    },
    breadCumbsOptions() {
      return [
        {
          label: this.$store.state.selectedNetwork[0]?.chain || 'Ethereum',
          path: {
            name: 'network',
            params: {
              network: this.$route.params.network || 'Ethereum',
            },
          },
          selected: false,
        },
        {
          label: formatBreadcrumbsPath(this.$route.params.id),
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
}
</script>

<style lang="scss">
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
@media (max-width: 850px) {
  .breadcrumbs {
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
