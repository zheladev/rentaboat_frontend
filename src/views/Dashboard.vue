<template>
  <v-container>
    <admin-dashboard v-if="(user.userType.intValue === 0)"></admin-dashboard>
    <support-dashboard
      v-else-if="(user.userType.intValue === 1)"
    ></support-dashboard>
    <renter-dashboard
      v-else-if="(user.userType.intValue === 2)"
    ></renter-dashboard>
    <client-dashboard
      v-else-if="(user.userType.intValue === 3)"
    ></client-dashboard>
    <h1 v-else>You're not supposed to be here.</h1>
    <!-- remove -->
    <client-dashboard></client-dashboard>
    
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import AdminDashboard from "../components/AdminDashboard.vue";
import ClientDashboard from "../components/ClientDashboard.vue";
import RenterDashboard from "../components/RenterDashboard.vue";
import SupportDashboard from "../components/SupportDashboard.vue";
export default {
  components: {
    ClientDashboard,
    SupportDashboard,
    AdminDashboard,
    RenterDashboard,
  },
  name: "Dashboard",
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
      console.log(this.user.userType.name)
  }
};
</script>

<style>
</style>
