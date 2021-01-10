<template>
  <v-container pa-0>
    <landing-carousel />
    <boat-grid :boats="allBoats" />
    <v-pagination v-if="allBoats.length>0"
        v-model="page"
        :length="pages"
        @input="updateBoats"></v-pagination>
  </v-container>
</template>

<script>
import BoatGrid from './BoatGrid.vue';
import LandingCarousel from './LandingCarousel.vue';
import { mapActions, mapGetters } from "vuex";

export default {
  components: { LandingCarousel, BoatGrid },
  name: "Landing",
  data: () => ({
      page: 1,
      limit: 15,
  }),
  computed: {
      ...mapGetters(["allBoats", "maxPages"]),
      pages() {
          return Math.ceil(this.maxPages);
      }
  },
  methods: {
    ...mapActions(["fetchBoats"]),
    async updateBoats() {
        await this.fetchBoats({
            page: this.page-1,
            limit: this.limit,
        })
    }
  },
  async mounted() {
    await this.fetchBoats({
        page: this.page-1,
        limit: this.limit,
    });
  },
};
</script>

<style scoped>
</style>