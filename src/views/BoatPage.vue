<template>
  <v-container>
    <h1>This is a boat with id {{id}}</h1>
  </v-container>
</template>

<script>
export default {
    name: "BoatPage",
    data () {
        return {
            id: '0',
        }
    },
    created() {
        this.id = this.$route.params.id;
    }
};
</script>

<style>
</style>