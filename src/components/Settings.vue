<template>
  <!-- Same deal as with clientDashboard, nav drawer on the left (General, account, whatever) -->
  <v-container fluid pa-0>
    <v-navigation-drawer app clipped permanent>
      <v-list nav dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          link
          exact
          :to="{ name: item.link }"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    isLoaded: false,
    menuItems: [
      {
        title: "General",
        link: "generalSettings",
        icon: "settings",
      },
      {
        title: "Account",
        link: "accountSettings",
        icon: "person",
      },
    ],
  }),
};
</script>

<style>
</style>