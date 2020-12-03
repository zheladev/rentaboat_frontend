<template>
  <v-container>
    <v-row v-if="allBoats.length > 0">
      <v-col
        v-for="boat in allBoats"
        :key="boat.id"
        cols="10"
        sm="6"
        md="4"
        lg="3"
      >
        <v-img
          src="https://www.lanoria.net/368-large_default/cherokee-30.jpg"
        />
        {{ boat.shipyard.name.substring(1, 5) }}
        <v-spacer />
        {{ boat.pricePerDay }}$ a day
        <v-spacer />
        By: {{ boat.user.firstName }} {{ boat.user.lastName }}
      </v-col>
    </v-row>
    <v-row v-else>
        No boats found.
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "BoatGrid",
  methods: {
    ...mapActions(["fetchBoats"]),
  },
  computed: mapGetters(["allBoats"]),
  mounted() {
    this.fetchBoats();
  }
};
</script>

<style>
</style>