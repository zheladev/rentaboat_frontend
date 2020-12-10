<template>
  <v-container>
    <h1>This is a boat with id {{id}}</h1>
    <boat :id="id"/>
  </v-container>
</template>

<script>
import Boat from '../components/Boat.vue';
export default {
  components: { Boat },
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