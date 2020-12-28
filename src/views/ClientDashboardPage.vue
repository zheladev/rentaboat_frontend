<template>
      <client-dashboard></client-dashboard>
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
