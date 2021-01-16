<template>
  <v-container fluid pa-0>
    <!--TODO: add styling -->
    <v-container class="content-section-container">
      <v-row>
        <v-col>
          <div class="headline pb-5">Upgrade account</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-body-1">
            Become part of Rentaboat's family. Rent your boat now.
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col class="text-center">
          <v-btn color="green lighten-2" @click="upgradeAccount"> Start renting your boat </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UpgradeAccount",
  computed: {
    ...mapGetters(["billingInformationArray", "user"]),
  },
  methods: {
    ...mapActions(["fetchBillingInformation", "promoteToOwner", "logout"]),
    async upgradeAccount() {
        console.log(this.$store)
      await this.promoteToOwner(this.user.id);
      this.$router.push("/ownerDashboard");
    },
  },
  async mounted() {
    await this.fetchBillingInformation(this.user.id);
  },
};
</script>

<style>
.content-section-container {
  padding: 2em 2em 1em 2em;
}
</style>