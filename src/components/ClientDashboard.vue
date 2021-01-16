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
import { mapGetters } from "vuex";
export default {
  name: "ClientDashboard",
  data: () => ({
    mobileMenuDropdown: false,
    isLoaded: false,
    mini: true,
  }),
  computed: {
    ...mapGetters(["user"]),
    xs() {
      return this.$vuetify.breakpoint.xs;
    },
    isOwner() {
      return this.user.userType.intValue === 2;
    },
    menuItems() {
      return [
        {
          title: "Profile",
          name: "ownerOverview",
          path: "/clientDashboard",
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