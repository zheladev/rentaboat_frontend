<template>
  <v-container pa-0>
    <landing-carousel />
    <boat-grid :boats="allBoats" />
  </v-container>
</template>

<script>
import BoatGrid from '../components/BoatGrid.vue';
import LandingCarousel from '../components/LandingCarousel.vue';
import { mapActions, mapGetters } from "vuex";

export default {
  components: { LandingCarousel, BoatGrid },
  name: "Landing",
  methods: {
    ...mapActions(["fetchBoats"]),
  },
  computed: mapGetters(["allBoats"]),
  mounted() {
    this.fetchBoats();
  },
};
</script>

<style>
</style>