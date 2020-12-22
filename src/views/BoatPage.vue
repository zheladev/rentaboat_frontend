<template>
  <v-container fluid py-0>
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