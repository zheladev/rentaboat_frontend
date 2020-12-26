<template>
  <v-card>
    <v-app-bar
      clipped-left
      app
      color="light-blue lighten-2 blue--text text--darken-4"
      ref="toolbar"
    >
      <v-app-bar-nav-icon
        @click.stop="isDrawerOpen = !isDrawerOpen"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-5 app-title">
        {{ appTitle }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="navbar hidden-sm-and-down">
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            text
            v-for="(item, index) in menuItems"
            :key="index"
            :to="{ name: item.link }"
            exact
          >
            <v-icon left>{{ item.icon }}</v-icon>
            &nbsp;{{ item.title }}
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="!isLoggedIn">
            <v-btn text :to="{ name: 'signupPage' }" exact hidden-sm-and-down>
            <span class="mx-1">Sign up </span>
            <v-icon>mdi-account-plus</v-icon></v-btn
          >
          <v-btn text :to="{ name: 'loginPage' }" exact hidden-sm-and-down>
            <span class="mx-1">Log in </span>
            <v-icon>login</v-icon></v-btn
          >
        </v-toolbar-items>
        <!-- Add ripple effect -->
        <div
          v-else
          class="user-toolbar-item align-center justify-center"
          block
          v-on:click="toggleWebUserMenu"
          ref="userTooltipItem"
          :class="isWebUserMenuActive ? 'active' : ''"
        >
          <v-avatar class="white--text mx-2" color="purple" size="42">
            <span
              >{{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}</span
            >
          </v-avatar>
          <v-icon
            class="mx-1"
            :class="isWebUserMenuActive ? 'user-toolbar-icon-active' : ''"
            >arrow_drop_down</v-icon
          >
          <v-menu
            offset-y
            :close-on-content-click="false"
            v-model="isWebUserMenuActive"
            :position-x="x"
            :position-y="y"
          >
            <v-list dense>
              <!-- Top part of dropdown -->
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="title">
                      {{ user.username }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                      >{{ user.firstName }}
                      {{ user.lastName }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <!-- Dropdown links -->
              <v-list-item
                v-for="(item, index) in userDropdownItems"
                :key="index"
                link
                :to="{ name: item.link }"
                exact
              >
                <v-list-item-icon
                  ><v-icon>{{ item.icon }}</v-icon></v-list-item-icon
                >
                <v-list-item-content>
                  <!-- add routing -->
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-app-bar>

    <!-- mobile drawer -->
    <v-navigation-drawer
      v-model="isDrawerOpen"
      app
      color="white"
      disable-resize-watcher
    >
      <v-list dense>
        <v-list-item two-line>
          <v-list-item-avatar
            class="white--text justify-center"
            color="purple"
            size="42"
          >
            <span v-if="isLoggedIn"
              >{{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}</span
            >
            <span light v-else
              ><v-icon class="white--text">mdi-account</v-icon></span
            >
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{
              isLoggedIn ? user.username : "Guest"
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              isLoggedIn ? "Logged in" : "Discover Rentaboat"
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list v-if="!isLoggedIn">
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            link
            :to="{ name: item.link }"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="{ name: 'loginPage' }" exact>
            <v-list-item-icon>
              <v-icon>login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Log in</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="{ name: 'signupPage' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sign up</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item
            v-for="item in menuItems.concat(userDropdownItems)"
            :key="item.title"
            link
            :to="{ name: item.link }"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    appTitle: "Rentaboat",
    isDrawerOpen: false,
    isDrawerUserMenuOpen: false,
    x: 0,
    y: 0,
    isWebUserMenuActive: false,
    isMobileUserMenuActive: false,
  }),
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
    menuItems() {
      return [
        {
          title: "Home",
          link: "landing",
          icon: "home",
        },
        {
          title: "About",
          link: "about",
          icon: "help_outline",
          class: "btnAbout",
        },
      ];
    },
    userDropdownItems() {
      return [
        {
          title: "Dashboard",
          link: "dashboard",
          icon: "dashboard",
        },
        {
          title: "Settings",
          link: "settings",
          icon: "settings",
        },
        {
          title: "Log out",
          link: "logout",
          icon: "exit_to_app",
        },
      ];
    },
  },
  methods: {
    toggleWebUserMenu() {
      const toolbarBoundingClientRect = this.$refs.toolbar.$el.getBoundingClientRect();
      const userDivBoundingClientRect = this.$refs.userTooltipItem.getBoundingClientRect();
      this.x = userDivBoundingClientRect.x;
      this.y =
        toolbarBoundingClientRect.y + toolbarBoundingClientRect.height + 1;
      this.isWebUserMenuActive = !this.isWebUserMenuActive;
    },
    toggleMobileUserMenu() {
      const toolbarBoundingClientRect = this.$refs.toolbar.$el.getBoundingClientRect();
      const userDivBoundingClientRect = this.$refs.userTooltipItem.getBoundingClientRect();
      this.x = userDivBoundingClientRect.x;
      this.y =
        toolbarBoundingClientRect.y + toolbarBoundingClientRect.height + 1;
      this.isWebUserMenuActive = !this.isWebUserMenuActive;
    },
  },
};
</script>

<style>
.navbar {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  display: flex;
}
.user-toolbar-item {
  display: flex;
  position: relative;
  cursor: pointer;
}
.user-toolbar-item:hover {
  background-color: #4cbcee;
  transition: 0.3s cubic-bezier(0.4, 0, 0.6, 1) 0s;
}
.user-toolbar-item.active {
  background-color: #3789ad;
  transition: 0.2s cubic-bezier(0.4, 0, 0.6, 1) 0s;
}

.user-toolbar-icon-active {
  transform: rotate(-180deg);
}
.app-title {
  overflow: visible !important;
}
/* Add ripple effect
.user-toolbar-item.active::before {
    content: "a";
  position: absolute;
  transform: scale(0);
  animation: ripple 600ms linear;
  background-color: rgba(0, 0, 0, 0.8);
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
} */
</style>