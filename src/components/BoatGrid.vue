<template>
  <v-container>
    <v-row v-if="boats.length > 0">
      <v-col
        v-for="(boat, idx) in boats"
        :key="idx"
        cols="10"
        sm="6"
        md="4"
        lg="3"
      >
      <!-- TODO: use boat image -->
        <v-img
          src="https://www.lanoria.net/368-large_default/cherokee-30.jpg"
        />
        {{ boat.name }}
        <v-spacer />
        {{ boat.pricePerDay }}$ a day
        <v-spacer />
        By: {{ boat.user.firstName }} {{ boat.user.lastName }}
        <v-btn text :to="{ name: 'boat', params: { id: boat.id } }">Go</v-btn>
      </v-col>
    </v-row>
    <v-row v-else> No boats found. </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BoatGrid",
  props: ['boats'],
};
</script>

<style>
</style>