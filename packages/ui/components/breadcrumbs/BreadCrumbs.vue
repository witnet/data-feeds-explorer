<template>
  <client-only>
    <div class="breacrumbs-wrapper">
      <div class="breadcrumbs container">
        <nuxt-link
          v-for="option in breadCumbsOptions"
          :key="option.label"
          :aria-label="option.label"
          :class="{ selected: option.selected }"
          :to="$localeRoute(option.path)"
          class="breadcrumbs-link"
        >
          <transition name="slide-in">
            <h3 v-if="option.label" class="breadcrumbs">
              <span class="breadcrumbs-label">{{ option.label }}</span> /
            </h3>
          </transition>
        </nuxt-link>
      </div>
      <SocialLinks />
    </div>
  </client-only>
</template>

<script setup>
const store = useStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (!selected.value) {
    router.push('/')
  }
})

const selected = computed(() => {
  return store.selectedEcosystem
})
const currentParams = computed(() => {
  return route.params
})
const breadCumbsOptions = computed(() => {
  return [
    {
      label: 'Home',
      path: {
        name: 'index',
      },
      selected: false,
    },
    {
      label: selected.value ? selected.value[0]?.chain : null,
      path: {
        name: 'network',
        params: {
          network: currentParams.value.network || 'ethereum',
        },
      },
      selected: false,
    },
    {
      label:
        currentParams.value.id && selected.value
          ? selected.value[0]?.label
          : null,
      path: {
        name: 'network-id',
        params: {
          network: currentParams.value.network,
          id: currentParams.value.id,
        },
      },
      selected: false,
    },
  ]
})
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
