<template>
  <div class="breacrumbs-wrapper">
    <div class="breadcrumbs container">
      <client-only>
        <nuxt-link
          v-for="option in breadCumbsOptions.filter((option) => option.label)"
          :key="option.label"
          :aria-label="option.label"
          :class="{ selected: option.selected }"
          :to="localeRoute(option.path)"
          class="breadcrumbs-link"
        >
          <transition name="slide-in">
            <h3 v-if="option.label" class="breadcrumbs">
              <span class="breadcrumbs-label">{{ option.label }}</span> /
            </h3>
          </transition>
        </nuxt-link>
      </client-only>
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
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-4px);
}
.slide-in-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-in-leave-to {
  opacity: 0;
  transform: translateX(-4px);
}
.breacrumbs-wrapper {
  display: grid;
  grid-template-columns: max-content max-content;
  grid-template-rows: max-content;
  justify-content: space-between;
  grid-gap: 16px;
}
.breadcrumbs {
  height: min-content;
  display: flex;
  color: var(--text);
  font-size: var(--text-size-medium);
  .breadcrumbs-label {
    color: var(--selected-option);
    font-weight: bold;
    font-size: var(--text-size-medium);
    margin-right: 4px;
    transition: all 0.3 ease-in-out;
    &:hover {
      opacity: 0.8;
    }
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
