<template>
  <div :class="{ drop: isMenuVisible }">
    <nav class="navbar" :class="{ open: isMenuVisible }">
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
      <transition name="dropdown" class="dropdown">
        <ul class="tab-container" :class="{ visible: isMenuVisible }">
          <div
            v-if="networks"
            class="networks"
            :class="{ visible: isMenuVisible }"
            @click="closeMenu"
          >
            <div
              v-for="option in sidebarOptions"
              :key="optionFromSelected(option)"
              class="option"
              :class="{
                selected: optionFromSelected(option) === selectedOption,
              }"
              @click="updateSelected(option)"
            >
              {{ capitalizeFirstLetter(optionFromSelected(option)) }}
            </div>
          </div>
          <li class="tab" @click="closeMenu">
            <a :href="requestDataFeedUrl" target="_blank">
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
import {
  generateSelectOptions,
  capitalizeFirstLetter,
} from '../utils/generateSelectOptions'

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
    sidebarOptions() {
      return Object.values(this.options)
    },
    options() {
      if (this.networks) {
        return generateSelectOptions(this.networks)
      } else {
        return null
      }
    },
    selectedOption() {
      return (this.selected[0] ? this.selected[0].network : '').toLowerCase()
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
    optionFromSelected(options) {
      return (options[0] ? options[0].network : '').toLowerCase()
    },
    capitalizeFirstLetter,
    updateSelected(selectedOption) {
      this.$store.commit('updateSelectedNetwork', { network: selectedOption })
      this.$router.push('/')
    },
    closeMenu() {
      this.isMenuVisible = false
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible
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
    padding: 16px 16px 16px 0;
    text-decoration: none;
    column-gap: 8px;

    .witnet-logo {
      width: 90px;
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
    .networks {
      display: none;
      &.visible {
        background: var(--bg);
        display: block;
        padding: 0;
        margin-top: 24px;
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
      .btn {
        max-width: max-content;
        margin: 16px 0;
        margin: 0;
      }
      .slash {
        color: $green-1;
      }

      &:hover {
        color: $green-1;
      }
      &:last-child {
        padding-right: 0;
        padding-top: 24px;
      }
    }
    .option {
      padding: 16px 24px;
      text-align: center;
      cursor: pointer;
      &.selected {
        font-weight: bold;
        background: var(--tab-gradient-selected);
      }
    }
  }
}

@media screen and (max-width: 1100px) {
  .navbar {
    padding: 0 24px;
    margin: 0;
    height: max-content;
    .logo-container {
      padding: 16px;
    }

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

@media screen and (max-width: 950px) {
  .drop {
    position: fixed;
    top: 0;
    overflow: hidden;
    overflow-y: hidden;
    height: 100%;
    z-index: 15;
  }

  .navbar {
    display: block;
    padding: 0;
    .logo-container {
      padding: 16px;
    }
    .responsive-menu {
      display: block;
      cursor: pointer;
      position: absolute;
      top: 8px;
      width: 32px;
      right: 24px;
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
