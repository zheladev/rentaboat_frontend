<template>
  <v-container fluid class="pa-0">
    <parallax-image>
      <v-col class="text-center" cols="12">
        <v-col>
            <v-form dark>
          <v-row class="pa-2">
            <v-col class="blue">
              <v-text-field dark placerholder="hello"> </v-text-field>
            </v-col>
            <v-col class="red">
              <v-text-field dark> </v-text-field>
            </v-col>
          </v-row>
        </v-form>
        </v-col>
      </v-col>
    </parallax-image>
    <v-container pa-0>
      <boat-grid :boats="allBoats" />
      <v-pagination
        v-if="allBoats.length > 0"
        v-model="page"
        :length="pages"
        @input="updateBoats"
      ></v-pagination>
    </v-container>
  </v-container>
</template>

<script>
import BoatGrid from "./BoatGrid.vue";
import { mapActions, mapGetters } from "vuex";
import ParallaxImage from "./common/ParallaxImage.vue";

export default {
  components: { BoatGrid, ParallaxImage },
  name: "Landing",
  data: () => ({
    page: 1,
    limit: 15,
    port: '',
    passengerCapacity: '',
    numberOfBathrooms: '',
    numberOfCabins: '',
    date: '', // not implemented


  }),
  computed: {
    ...mapGetters(["allBoats", "maxPages"]),
    pages() {
      return Math.ceil(this.maxPages);
    },
  },
  methods: {
    ...mapActions(["fetchBoats"]),
    async updateBoats() {
      await this.fetchBoats({
        page: this.page - 1,
        limit: this.limit,
      });
    },
  },
  async mounted() {
    await this.fetchBoats({
      page: this.page - 1,
      limit: this.limit,
    });
  },
};
</script>

<style scoped>
</style>