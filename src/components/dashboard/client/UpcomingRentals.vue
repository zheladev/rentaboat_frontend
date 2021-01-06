<template>
  <v-container fluid pa-0>
    <v-container class="content-section-container">
      <div class="headline">Upcoming Rentals</div>
      <v-row class="fill-height">
        <v-col>
          <v-sheet class="calendar-sheet-container">
            <v-toolbar class="calendar-toolbar">
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
              <v-toolbar-title>
                {{ calendarTitle }}
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
              @click:event="showEvent"
            ></v-calendar>
            <!-- Event details -->
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-y
              :position-x="x"
              :position-y="y"
              max-width="360px"
            >
              <v-card color="grey lighten-4" max-width="360px" flat>
                <!-- TODO: use boat image -->
                <v-img
                  src="https://www.lanoria.net/368-large_default/cherokee-30.jpg"
                  height="200px"
                ></v-img>
                <v-card-title>
                  {{
                    selectedEvent.rental !== undefined
                      ? selectedEvent.rental.boat.name
                      : ""
                  }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-subtitle>
                  {{
                    selectedEvent.rental !== undefined
                      ? selectedEvent.rental.boat.description
                      : ""
                  }}
                </v-card-subtitle>
                <v-card-subtitle>
                    <v-icon class="location-icon">location_on</v-icon>
                  {{
                    selectedEvent.rental !== undefined
                      ? selectedEvent.rental.boat.port.name
                      : ""
                  }}
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn text color="secondary">
                    <!-- TODO -->
                    Contact owner
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn text color="secondary" @click="selectedOpen = false">
                    <!-- TODO -->
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container class="content-section-container">
      <div class="headline">PLACEHOLDER</div>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UpcomingRentals",
  data: () => ({
    focus: "",
    isLoaded: false,
    calendarTitle: "",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    x: 0,
    y: 0,
  }),
  computed: {
    ...mapGetters(["userRentals", "user"]),
  },
  methods: {
    ...mapActions(["fetchRentalsByUser"]),
    getEventsFromRentals: (rentals) => {
      const colors = [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ];
      let events = [];
      if (Array.isArray(rentals)) {
        events = rentals
          .filter((e) => {
            const d = new Date(e.startDate);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(23, 59, 59, 999);
            return d > yesterday;
          })
          .map((r, idx) => {
            const startDate = new Date(r.startDate);
            const endDate = new Date(r.startDate);
            endDate.setDate(
              startDate.getDate() + parseInt(r.durationInDays.days)
            );
            return {
              rental: r,
              name: r.boat.name,
              color: colors[idx % colors.length],
              start: startDate,
              end: endDate,
              timed: false,
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
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        console.log(event)
        console.log(nativeEvent.target)
        this.x = nativeEvent.clientX;
        this.y = nativeEvent.clientY;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
  mounted() {
    this.fetchRentalsByUser(this.user.id);
    this.calendarTitle = this.$refs.calendar.title;
    this.isLoaded = true;
  },
};
</script>

<style scoped>
/*  #e0e0e0 */
.calendar-toolbar {
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  box-shadow: 1px 0px 0px 0px#e0e0e0 !important;
}
.content-section-container {
  padding: 2em 2em 1em 2em;
}
.location-icon {
    vertical-align: -7px;
}
</style>