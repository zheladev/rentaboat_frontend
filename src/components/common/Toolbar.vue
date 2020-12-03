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
        <!-- Add user area -->
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text :to="{ name: 'loginPage'}" exact hidden-sm-and-down> &nbsp;Log in <v-icon>login</v-icon></v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <!-- Add drawer -->
  </div>
</template>

<script>
export default {
  data: () => ({
    appTitle: "Rentaboat",
    isTokenSet: false,
    isDark: false,
    sidebar: false,
  }),
  computed: {
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
  },
};
</script>

<style>
</style>