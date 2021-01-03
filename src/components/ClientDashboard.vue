<template>
  <v-container fluid pa-0>
    <v-navigation-drawer app clipped :mini-variant.sync="mini" permanent expand-on-hover>
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ClientDashboard",
  data: () => ({
    isLoaded: false,
    mini: true,
  }),
  computed: {
    ...mapGetters(["userRentals", "user"]),
    isOwner() {
      return this.user.userType.intValue === 2;
    },
    menuItems() {
      return [
        {
          title: "View upcoming rentals",
          link: "upcomingRentals",
          icon: "today",
        },
        {
          title: "View past rentals",
          link: "rentalHistory",
          icon: "directions_boat",
        },
        {
          title: "Messages",
          link: "messages",
          icon: "message",
        },
        {
          title: "Contact support",
          link: "support",
          icon: "help",
        },
        // {
        //     title: "Rent your boat",
        //     link: "NOT_IMPLEMENTED",
        //     icon: "upgrade"
        // }
      ];
    },
  },
  methods: {
    ...mapActions(["fetchRentalsByUser"]),
  },
  mounted() {
    this.fetchRentalsByUser(this.user.id);
    //prevent child view from being overlapped by nav drawer
    this.$forceUpdate(); 
    this.isLoaded = true;
  },
};
</script>

<style>
</style>