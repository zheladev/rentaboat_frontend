<template>
  <v-container fluid pa-0>
    <v-container class="content-section-container">
      <div class="headline">Upgrade account</div>
      <v-container>
          {{billingInformationArray}}
      </v-container>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'UpgradeAccount',
    computed: {
        ...mapGetters(["billingInformationArray", "user"])
    },
    methods: {
        ...mapActions(["fetchBillingInformation"])
    },
    async mounted() {
        await this.fetchBillingInformation(this.user.id);
    }
}
</script>

<style>
.content-section-container {
  padding: 2em 2em 1em 2em;
}
</style>