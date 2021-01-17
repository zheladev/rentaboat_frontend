<template>
      <admin-dashboard></admin-dashboard>
</template>

<script>
import { mapGetters } from "vuex";
import AdminDashboard from "../components/AdminDashboard.vue";
export default {
  components: {
    AdminDashboard,
  },
  name: "Dashboard",
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style>
</style>
