<template>
  <v-container fluid pa-0>
    <v-container class="content-section-container">
      <div class="headline pb-5">Upgrade account</div>

      <div class="text-body-1">Become part of Rentaboat's family. Rent your boat now.</div>
    </v-container>
    <v-container>
        <v-btn @click="upgradeAccount">
            Rent your boat
        </v-btn>
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
        ...mapActions(["fetchBillingInformation", "promoteToOwner"]),
        async upgradeAccount() {
            await this.promoteToOwner(this.user.id);
            this.$router.push('/ownerDashboard');
        }
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