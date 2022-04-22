<template>
  <div :class="type">
    <div v-for="option in options" :key="option" class="option">
      <transition name="fill" mode="out-in">
        <nuxt-link
          :key="
            ((selected[0] && selected[0].chain.toLowerCase()) || 'ethereum') ===
            option.toLowerCase()
          "
          class="nav-link"
          :to="
            localeRoute({
              name: 'network',
              params: {
                network: option.toLowerCase(),
              },
            })
          "
        >
          {{ option }}
        </nuxt-link>
      </transition>
    </div>
  </div>
</template>

<script>
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
export default {
  props: {
    type: {
      type: String,
      default: 'sidebar',
      validator(value) {
        return ['navbar', 'sidebar'].includes(value)
      },
    },
    options: {
      type: Array,
      required: true,
    },
  },
  computed: {
    selected() {
      return this.$store.state.selectedNetwork
    },
    selectedOption() {
      return this.$route.params.network || 'ethereum'
    },
  },
  methods: {
    capitalizeFirstLetter,
    isSelected(option) {
      return option.toLowerCase() === this.selectedOption.toLowerCase()
    },
  },
}
</script>

<style lang="scss">
.fill-enter-to,
.fill-leave {
  &::after {
    left: 100%;
    opacity: 1;
  }
}

.fill-enter,
.fill-leave-to {
  transition: all 0.5s ease-in-out;
  &::after {
    transition: all 0.3s ease-in-out;
    opacity: 1;
    left: -0%;
  }
}

.nav-link {
  font-size: 14px;
  padding: 16px 24px;
  border-radius: 4px;
  margin: 4px 0;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end stretch;
  z-index: 1;
  color: var(--light-text);
  &:hover {
    opacity: 0.8;
  }
  &.nuxt-link-active {
    color: var(--btn-primary-color);
    &:hover {
      opacity: 1;
    }
    &::after {
      content: '';
      width: 100%;
      height: 60px;
      position: absolute;
      z-index: -1;
      top: 0;
      background: var(--tab-gradient-selected);
    }
  }
}
.sidebar {
  position: relative;
  text-align: right;
  color: var(--light-text);
  .option {
    font-size: var(--text-size-medium);
    text-align: center;
    cursor: pointer;
    color: var(--light-text);
    font-weight: bold;
    &.selected {
      border-radius: 4px;
    }
  }
}
.navbar {
  .option {
    text-align: center;
    cursor: pointer;
    color: var(--light-text);
    font-weight: bold;
  }
}
@media (max-width: 850px) {
  .sidebar {
    display: none;
  }
}
</style>
