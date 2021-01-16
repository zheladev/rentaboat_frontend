<template>
  <v-container fluid pa-0>
    <v-navigation-drawer
      v-if="!xs"
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
    <v-expansion-panels v-model="mobileMenuDropdown" v-else focusable>
      <v-expansion-panel>
        <v-expansion-panel-header class="" :ripple="true">
          <div>Dashboard</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="">
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
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
    mobileMenuDropdown: false,
  }),
  computed: {
    ...mapGetters(["user"]),
    xs() {
      return this.$vuetify.breakpoint.xs;
    },
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