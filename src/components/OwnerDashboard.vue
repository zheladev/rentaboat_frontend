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
          :to="item.path ? { path: item.path } : { name: item.link }"
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "OwnerDashboard",
  data: () => ({
    isLoaded: false,
    mini: true,
  }),
  computed: {
    ...mapGetters(["user"]),
    menuItems() {
      return [
        {
          title: "Profile",
          link: "ownerDashboard",
          path: "/ownerDashboard",
          icon: "person",
        },
        {
          title: "Your boats",
          link: "ownerBoats",
          icon: "directions_boat",
        },
        {
          title: "View upcoming rentals",
          link: "ownerUpcomingRentals",
          icon: "today",
        },
        {
          title: "View past rentals",
          link: "ownerRentalHistory",
          icon: "restore",
        },
        {
          title: "Messages",
          link: "ownerMessages",
          icon: "message",
        },
        {
          title: "Contact support",
          link: "ownerSupport",
          icon: "help",
        },
      ];
    },
  },
  methods: {
    ...mapActions([]),
  },
  mounted() {
    //prevent child view from being overlapped by nav drawer
    this.$forceUpdate();
    this.isLoaded = true;
  },
};
</script>

<style>
</style>