<template>
  <div :class="{ drop: isMenuVisible }">
    <nav class="navbar" :class="{ open: isMenuVisible }">
      <div class="menu-container">
        <nuxt-link :to="$localePath('/')" aria-label="home">
          <SvgIcon name="witnet-logo" class="logo" />
        </nuxt-link>
        <button aria-label="menu" class="responsive-menu" @click="toggleMenu">
          <div class="target-burger" :class="{ visible: isMenuVisible }">
            <ul class="buns">
              <li class="bun"></li>
              <li class="bun"></li>
            </ul>
          </div>
        </button>
      </div>
      <transition name="dropdown" class="dropdown">
        <div
          v-if="isMenuVisible"
          class="tab-container"
          :class="{ visible: isMenuVisible }"
        >
          <div
            v-if="networks && isMenuVisible"
            class="networks"
            :class="{ visible: isMenuVisible }"
            @click="closeMenu"
          >
            <NetworkOptions type="navbar" :options="navBarOptions" />
          </div>
          <div class="tab last-item" @click="closeMenu">
            <RequestDataFeedBtn class="btn-container" />
          </div>
        </div>
      </transition>
    </nav>
  </div>
</template>

<script setup>
import { generateNavOptions } from '../utils/generateNavOptions'
import { generateSelectOptions } from '../utils/generateSelectOptions'
const store = useStore()
const { data } = await useAsyncData('networks', store.fetchNetworks)
const emit = defineEmits(['update-selected', 'scroll'])

const isMenuVisible = ref(false)
const networks = computed(() => data.value)
const navBarOptions = computed(() => {
  return generateNavOptions(Object.values(options.value))
})
const selected = ref(store.selectedNetwork)
const options = computed(() => {
  if (data.value) {
    return generateSelectOptions(data.value)
  } else {
    return null
  }
})

watch(
  selected,
  () => {
    emit('update-selected', selected)
  },
  { deep: true },
)

function resizeHandler(event) {
  if (event.target.outerWidth > 850) {
    closeMenu()
  }
}
function closeMenu() {
  isMenuVisible.value = false
  emit('scroll', isMenuVisible.value)
}
function toggleMenu() {
  isMenuVisible.value = !isMenuVisible.value
  emit('scroll', isMenuVisible.value)
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})

onMounted(() => window.addEventListener('resize', resizeHandler))
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg);
  height: 100px;
  transition: background-color 0.3s ease;
  .responsive-menu {
    display: none;
    font-size: 34px;
  }
  .tab-container {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 0;
    .networks {
      &.visible {
        background: var(--bg);
        display: block;
        padding: 32px 0;
      }
    }
    &.visible {
      background: var(--bg);
      display: block;
      padding: 0;
    }
    .tab {
      font-size: 1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: color 0.1s ease;
      &.last-item {
        display: flex;
        justify-content: center;
      }
      .btn-container {
        width: max-content;
      }
      .btn {
        max-width: 100%;
        margin: 16px 0;
        margin: 0;
      }
      .slash {
        color: var(--nav-bar-slash-color);
      }

      &:hover {
        color: var(--nav-bar-slash-color);
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
}

@media screen and (max-width: 1100px) {
  .navbar {
    height: max-content;
    margin: 0 16px;
    &.open {
      height: 100vh;
    }
  }
  .drop {
    position: absolute;
  }
}

@media screen and (max-width: 850px) {
  .drop {
    position: fixed;
    top: 0;
    height: 100%;
    z-index: 15;
    overflow-y: auto;
  }

  .navbar {
    display: block;
    margin: 0;
    margin-top: 16px;
    .menu-container {
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
    }
    .responsive-menu {
      background: none;
      border: none;
      justify-content: center;
      display: block;
      cursor: pointer;
      width: 32px;
      padding: 0;
    }
    .tab-container {
      list-style: none;
      display: none;
      text-align: center;
      width: 100vw;
      margin: 0;
      cursor: pointer;
      &.visible {
        box-sizing: border-box;
        display: block;
        padding: 0;
      }
      .tab {
        cursor: pointer;
        display: block;
        align-items: center;
        text-decoration: none;
        &.last-item {
          padding-bottom: 24px;
        }
        .social {
          display: none;
        }
      }
    }
  }
}

.target-burger {
  display: block;
  transition: 0.5s;
  height: 32px;
  &:hover {
    cursor: pointer;
    opacity: 0.45;
  }
  &.visible {
    ul.buns {
      width: 32px;
      height: 32px;
      li.bun {
        -webkit-transform: rotate(45deg) translateZ(0);
        transform: rotate(45deg) translateZ(0);
        &:last-child {
          -webkit-transform: rotate(-45deg) translateZ(0);
          transform: rotate(-45deg) translateZ(0);
        }
      }
    }
  }
  .buns {
    width: 32px;
    height: 32px;
    list-style: none;
    padding: 0;
    position: absolute;
    -webkit-transition:
      -webkit-transform 1s cubic-bezier(0.23, 1, 0.32, 1),
      color 1s cubic-bezier(0.23, 1, 0.32, 1);
    transition:
      transform 1s cubic-bezier(0.23, 1, 0.32, 1),
      color 1s cubic-bezier(0.23, 1, 0.32, 1);
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    color: var(--text);
    .bun {
      width: 100%;
      height: 3px;
      background-color: var(--text);
      position: absolute;
      top: 50%;
      margin-top: -0.75px;
      -webkit-transform: translateY(-3.75px) translateZ(0);
      transform: translateY(-3.75px) translateZ(0);
      -webkit-transition:
        -webkit-transform 1s cubic-bezier(0.23, 1, 0.32, 1),
        background-color 1s cubic-bezier(0.23, 1, 0.32, 1);
      transition:
        transform 1s cubic-bezier(0.23, 1, 0.32, 1),
        background-color 1s cubic-bezier(0.23, 1, 0.32, 1);
      &:last-child {
        -webkit-transform: translateY(3.75px) translateZ(0);
        transform: translateY(3.75px) translateZ(0);
      }
    }
  }
}
</style>
