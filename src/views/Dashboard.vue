<template>
  <v-container>
      <client-dashboard></client-dashboard>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import ClientDashboard from "../components/ClientDashboard.vue";
export default {
  components: {
    ClientDashboard,
  },
  name: "Dashboard",
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style>
</style>
