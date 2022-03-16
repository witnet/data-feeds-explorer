<template>
  <div :class="{ drop: isMenuVisible }">
    <nav class="navbar" :class="{ open: isMenuVisible }">
      <div class="menu-container">
        <nuxt-link :to="localePath('/')">
          <h1 class="logo-container">
            <WitnetLogo class="witnet-logo" />
            <p class="logo-subtitle">Witnet</p>
            <p class="logo-subtitle">Data Feeds</p>
          </h1>
        </nuxt-link>
        <label class="responsive-menu" @click="toggleMenu">
          <a class="target-burger" :class="{ visible: isMenuVisible }">
            <ul class="buns">
              <li class="bun"></li>
              <li class="bun"></li>
            </ul>
          </a>
        </label>
      </div>
      <transition name="dropdown" class="dropdown">
        <ul class="tab-container" :class="{ visible: isMenuVisible }">
          <div
            v-if="networks"
            class="networks"
            :class="{ visible: isMenuVisible }"
            @click="closeMenu"
          >
            <NetworkOptions type="navbar" :options="Object.keys(options)" />
          </div>
          <li class="tab last-item" @click="closeMenu">
            <a class="btn-container" :href="requestDataFeedUrl" target="_blank">
              <Button class="btn">{{ $t('navbar.request_data_feed') }}</Button>
            </a>
          </li>
        </ul>
      </transition>
    </nav>
  </div>
</template>

<script>
import networks from '@/apollo/queries/networks.gql'
import { requestDataFeedUrl } from '../constants'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'
import { generateSelectOptions } from '../utils/generateSelectOptions'

export default {
  apollo: {
    networks: {
      prefetch: true,
      query: networks,
    },
  },
  data() {
    return {
      hover: false,
      displayBox: false,
      isMenuVisible: false,
      requestDataFeedUrl,
    }
  },
  computed: {
    selected() {
      return this.$store.state.selectedNetwork
    },
    options() {
      if (this.networks) {
        return generateSelectOptions(this.networks)
      } else {
        return null
      }
    },
    selectedOption() {
      return this.selected[0]?.chain || ''
    },
  },
  watch: {
    selected: {
      handler(selected) {
        this.$emit('update-selected', selected)
      },
      deep: true,
    },
  },
  methods: {
    capitalizeFirstLetter,
    closeMenu() {
      this.isMenuVisible = false
      this.$emit('scroll', this.isMenuVisible)
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible
      this.$emit('scroll', this.isMenuVisible)
    },
    displayDropDown() {
      this.displayBox = !this.displayBox
    },
    onClose() {
      this.active = false
    },
  },
}
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg);
  height: 130px;
  .logo-container {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    padding-top: 16px;
    text-decoration: none;
    column-gap: 8px;

    .witnet-logo {
      grid-row: 1 / span 2;
    }
    .logo-subtitle-color {
      font-size: 18px;
      align-self: flex-start;
      color: var(--logo-dot);
    }
    .logo-subtitle {
      font-size: 18px;
      align-self: flex-end;
      color: var(--logo-main);
    }
  }
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
      display: none;
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
        padding-bottom: 24px;
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
    .logo {
      margin: 0;
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
    .menu-container {
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
    }
    .responsive-menu {
      justify-content: center;
      display: block;
      cursor: pointer;
      width: 32px;
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
  margin-top: 16px;
  &:hover {
    cursor: pointer;
    opacity: opacity(0.45);
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
    -webkit-transition: -webkit-transform 1s cubic-bezier(0.23, 1, 0.32, 1),
      color 1s cubic-bezier(0.23, 1, 0.32, 1);
    transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1),
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
      -webkit-transition: -webkit-transform 1s cubic-bezier(0.23, 1, 0.32, 1),
        background-color 1s cubic-bezier(0.23, 1, 0.32, 1);
      transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1),
        background-color 1s cubic-bezier(0.23, 1, 0.32, 1);
      &:last-child {
        -webkit-transform: translateY(3.75px) translateZ(0);
        transform: translateY(3.75px) translateZ(0);
      }
    }
  }
}
</style>
