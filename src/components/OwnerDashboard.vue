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
          title: "Your boats",
          link: "ownerBoats",
          icon: "directions_boat",
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
    this.fetchRentalsByUser(this.user.id);
    //prevent child view from being overlapped by nav drawer
    this.$forceUpdate(); 
    this.isLoaded = true;
  },
};
</script>

<style>
</style>