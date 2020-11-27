<template>
  <div>
      <h3 v-for="boat in allBoats" :key="boat.id">{{boat.user.username}}</h3>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Boats",
  methods: {
    ...mapActions(["fetchBoats"]),
  },
  computed: mapGetters(["allBoats"]),
  created() {
    this.fetchBoats();
  }
};
</script>

<style>

</style>