<template>
  <div>
    <v-app-bar app color="light-blue lighten-2 blue--text text--darken-4">
      <v-toolbar-title class="mr-5">
        {{ appTitle }}
      </v-toolbar-title>

      <v-toolbar-items>
        <v-btn
          text
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
          :class="['hidden-sm-and-down', item.class]"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          &nbsp;{{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!isLoggedIn">
        <v-btn text :to="{ name: 'loginPage' }" exact hidden-sm-and-down>
          &nbsp;Log in <v-icon>login</v-icon></v-btn
        >
      </v-toolbar-items>
      <div v-else class="align-center">
        <v-avatar class="white--text" color="purple" size="42">
          <span
            >{{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}</span
          >
        </v-avatar>
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn text icon v-on="on">
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <!-- Top part of dropdown -->
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title">
                    {{ user.username }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{user.firstName}} {{user.lastName}}</v-list-item-subtitle>
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
    </v-app-bar>
    <!-- Add drawer -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    appTitle: "Rentaboat",
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
            icon: "exit_to_app"
        }
      ];
    },
  },
};
</script>

<style>
</style>