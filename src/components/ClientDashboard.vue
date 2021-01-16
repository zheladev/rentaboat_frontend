<template>
  <v-container fluid pa-0>
    <v-navigation-drawer
      class="light-blue lighten-5"
      app
      clipped
      :mini-variant.sync="mini"
      permanent
      expand-on-hover
    >
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
import { mapGetters } from "vuex";
export default {
  name: "ClientDashboard",
  data: () => ({
    isLoaded: false,
    mini: true,
  }),
  computed: {
    ...mapGetters(["user"]),
    isOwner() {
      return this.user.userType.intValue === 2;
    },
    menuItems() {
      return [
        {
          title: "Profile",
          name: "ownerOverview",
          icon: "person",
        },
        {
          title: "View upcoming rentals",
          link: "upcomingRentals",
          icon: "today",
        },
        {
          title: "View past rentals",
          link: "rentalHistory",
          icon: "restore",
        },
        {
          title: "Messages",
          link: "clientMessages",
          icon: "message",
        },
        {
          title: "Become an owner",
          link: "upgradeAccount",
          icon: "upgrade",
        },
        {
          title: "Contact support",
          link: "clientSupport",
          icon: "help",
        },
      ];
    },
  },
  methods: {},
  mounted() {
    this.$forceUpdate();
    this.isLoaded = true;
  },
};
</script>

<style>
</style>