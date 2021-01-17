<template>
  <v-container fluid pa-0>
    <v-container class="content-section-container">
      <div class="headline">Past Rentals</div>
      <v-container>
        <v-expansion-panels
          v-if="userRentals.length > 0"
          accordion
          focusable
          tile
        >
          <v-expansion-panel v-for="(rental, i) in pastRentals" :key="i">
            <v-expansion-panel-header class="py-2">
              <v-row>
                <v-col cols="3">{{ rental.boat.name }}</v-col>
                <v-spacer></v-spacer>
                <v-col cols="4 text-right pr-4">{{ rental.pricePaid }} €</v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card elevation="0" pb-0>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-icon>today</v-icon>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col>
                      <div class="text-right">
                        {{ startDateStr(rental) }} ~ {{ endDateStr(rental) }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row>
                    <v-col>
                      <v-icon>location_on</v-icon>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col>
                      <div class="text-right">{{ rental.boat.port.name }}</div>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                </v-container>
                <v-card-actions>
                    <v-btn text color="primary"> Contact Owner </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn text color="secondary"> Open Ticket </v-btn>
                </v-card-actions>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PastRentals",
  data: () => ({}),
  computed: {
    ...mapGetters(["userRentals", "user"]),
    pastRentals() {
      return this.userRentals.filter((r) => {
        const d = new Date(r.startDate);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(23, 59, 59, 999);
        return d < yesterday;
      });
    },
  },
  methods: {
    ...mapActions(["fetchRentalsByUser"]),
    startDateStr(r) {
      return new Date(r.startDate).toISOString().split("T")[0];
    },
    endDateStr(r) {
      const d = new Date(r.startDate);
      const diff = parseInt(r.durationInDays.days);
      d.setDate(d.getDate() + (Number.isInteger(diff) ? diff : 0));
      return d.toISOString().split("T")[0];
    },
  },
  mounted() {
    this.fetchRentalsByUser(this.user.id);
  },
};
</script>

<style scoped>
.content-section-container {
  padding: 2em 2em 1em 2em;
}
.v-expansion-panel::before {
  box-shadow: 1px 0px 0px 0px #e0e0e0, 0px 1px 0px 0px #e0e0e0,
    0px 0px 1px 0px #e0e0e0, 0px 0px 0px 1px #e0e0e0;
}
</style>