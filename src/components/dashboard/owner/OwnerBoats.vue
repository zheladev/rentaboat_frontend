<template>
    <v-container fluid pa-0>
    <v-container class="content-section-container">
      <div class="headline">owner boats (placeholder name)</div>
      <v-container>
          {{ownerBoats}}
      </v-container>
    </v-container>
    <v-divider></v-divider>
    <v-container class="content-section-container">
      <div class="headline">PLACEHOLDER</div>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'OwnerBoats',
    computed: {
        ...mapGetters(["ownerBoats", "user"]),

    },
    methods: {
        ...mapActions(["fetchBoatsByOwnerId"]),
    },
    async mounted() {
        await this.fetchBoatsByOwnerId(this.user.id);
    }
}
</script>

<style>

</style>