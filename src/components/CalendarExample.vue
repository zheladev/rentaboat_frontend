<template>
  <v-container fluid class="no-padding">
    <v-container>
      <h5>Upcoming rentals</h5>
      <v-row class="fill-height">
        <v-col>
          <v-sheet>
            <v-toolbar flat>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
              <v-toolbar-title>
                  {{calendarTitle}}
              </v-toolbar-title>
            </v-toolbar>
          </v-sheet>
          <v-sheet>
            <v-calendar
              ref="calendar"
              v-model="focus"
              :weekdays="[0, 1, 2, 3, 4, 5, 6]"
              type="month"
              :events="getEventsFromRentals(userRentals)"
              event-overlap-mode="stack"
              :event-overlap-threshold="30"
              :event-color="getEventColor"
              @change="updateTitle"
            ></v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <!-- Show rentals -->
    <!-- show previous rented boats -->
  </v-container>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ClientDashboard",
  data: () => ({
    focus: "",
    isLoaded: false,
    calendarTitle: '',
  }),
  computed: {
    ...mapGetters(["userRentals", "user"]),
  },
  methods: {
    ...mapActions(["fetchRentalsByUser"]),
    getEventsFromRentals: rentals => {
      const colors = [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1"
      ];
      let events = [];
      if (Array.isArray(rentals)) {
        events = rentals.map((r, idx) => {
          const startDate = new Date(r.startDate);
          const endDate = new Date(r.startDate);
          endDate.setDate(
            startDate.getDate() + parseInt(r.durationInDays.days)
          );
          return {
            name: r.boat.name,
            color: colors[idx % colors.length],
            start: startDate,
            end: endDate,
            timed: false
          };
        });
      }
      return events;
    },
    getEventColor(event) {
      return event.color;
    },
    next() {
      this.$refs.calendar.next();
    },
    prev() {
      this.$refs.calendar.prev();
    },
    updateTitle() {
        this.calendarTitle = this.$refs.calendar.title;
    }
  },
  mounted() {
    this.fetchRentalsByUser(this.user.id);
    this.calendarTitle = this.$refs.calendar.title;
    this.isLoaded = true;
  }
};
</script>

<style>
</style>