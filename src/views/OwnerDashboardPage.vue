<template>
      <owner-dashboard></owner-dashboard>
</template>

<script>
import { mapGetters } from "vuex";
import OwnerDashboard from '@/components/OwnerDashboard.vue';
export default {
  components: {
    OwnerDashboard,
  },
  name: "OwnerDashboardPage",
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style>
</style>
