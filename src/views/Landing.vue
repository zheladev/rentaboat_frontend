<template>
  <v-container>
    <landing-carousel />
    <boat-grid />
  </v-container>
</template>

<script>
import BoatGrid from '../components/BoatGrid.vue';
import LandingCarousel from '../components/LandingCarousel.vue';

export default {
  components: { LandingCarousel, BoatGrid },
};
</script>

<style>
</style>