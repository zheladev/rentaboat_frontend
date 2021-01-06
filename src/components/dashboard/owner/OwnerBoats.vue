<template>
  <v-container fluid pa-0>
    <v-container class="content-section-container">
      <div class="headline">Your Boats</div>
      <v-container class="py-0">
        <v-row>
          <v-col>
            <v-slide-group v-if="ownerBoats" show-arrows>
              <!-- Not working yet as billing info is not implemented in backend -->
              <v-slide-item
                v-for="(ownerBoat, i) in ownerBoats"
                :key="i"
                v-slot="{ active, toggle }"
              >
                <v-card
                  class="ma-4"
                  :class="active ? 'grey lighten-2' : 'grey lighten-3'"
                  height="150"
                  width="200"
                  mx-0
                  @click="
                    () => {
                      toggle();
                      selectBoat(i);
                    }
                  "
                >
                  <v-row
                    class="fill-height grey--text text--darken-2 mx-0"
                    align="center"
                    justify="center"
                  >
                    <v-container
                      no-gutters
                      class="pl-10"
                      justify="center"
                      align="center"
                    >
                      {{ ownerBoat.name }}
                    </v-container>
                  </v-row>
                </v-card>
              </v-slide-item>
              <v-slide-item v-if="ownerBoats">
                <v-card
                  class="ma-4 grey lighten-3"
                  height="150"
                  width="200"
                  mx-0
                  ><v-row
                    class="fill-height mx-0"
                    align="center"
                    justify="center"
                  >
                    <v-icon color="grey" size="48" v-text="'add'"></v-icon>
                  </v-row>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-divider></v-divider>
    <!-- Boat details -->
    <v-container
      v-if="activeBoat !== null"
      class="content-section-container pt-0"
    >
      <v-row class="pa-0">
        <!-- TODO: Make responsive -->
        <v-col lg="7" md="12" class="fill-width">
          <v-row>
            <v-col>
              <div class="headline">Boat Details</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5"
              ><v-img
                max-height="200"
                max-width="300"
                src="https://www.lanoria.net/368-large_default/cherokee-30.jpg"
            /></v-col>
            <v-col>
              <v-text-field
                v-model="activeBoatObj.name"
                label="Boat name"
                prepend-icon="directions_boat"
              />
              <v-text-field
                v-model="activeBoatObj.pricePerDay"
                label="Price per day"
                prepend-icon="euro"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="activeBoatObj.description"
                filled
                auto-grow
                label="Description"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="activeBoatObj.numberOfCabins"
                label="Nº of cabins"
                prepend-icon="meeting_room"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="activeBoatObj.numberOfBathrooms"
                label="Nº of bathrooms"
                prepend-icon="waves"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="activeBoatObj.passengerCapacity"
                label="Passenger Capacity"
                prepend-icon="person"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn>EDIT NIGGA</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="fill-width">
          <v-row>
            <v-col>
              <div class="headline">Upcoming Rentals</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              ><v-sheet class="calendar-sheet-container">
                <v-toolbar class="calendar-toolbar py-0">
                  <v-btn fab text small color="grey darken-2" @click="prev">
                    <v-icon small> mdi-chevron-left </v-icon>
                  </v-btn>
                  <v-btn fab text small color="grey darken-2" @click="next">
                    <v-icon small> mdi-chevron-right </v-icon>
                  </v-btn>
                  <v-toolbar-title> {{ calendarTitle }} </v-toolbar-title>
                </v-toolbar>
              </v-sheet>
              <v-sheet>
                <v-calendar
                  ref="calendar"
                  v-model="focus"
                  :weekdays="[0, 1, 2, 3, 4, 5, 6]"
                  type="month"
                  :events="getEventsFromRentals(activeBoatRentals)"
                  event-overlap-mode="stack"
                  :event-overlap-threshold="30"
                  :event-color="getEventColor"
                  @change="updateTitle"
                  @click:event="showRentalDetails"
                ></v-calendar> </v-sheet
            ></v-col>
          </v-row>
          <v-row v-if="selectedElement">
            <v-col class="py-0">
              <div class="text-overline">Rental Details</div>
            </v-col>
          </v-row>
          <v-row v-if="selectedElement">
            <v-col>
              <v-list class="flat-sheet">
                <v-list-item>
                  <v-list-item-avatar  class="white--text" color="purple">
                      <!-- TODO: load avatar -->
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ selectedRental.rental.renter.firstName }}
                      {{
                        selectedRental.rental.renter.lastName
                      }}</v-list-item-title
                    >
                  </v-list-item-content>

                  <v-list-item-action>
                    <!-- TODO: open chat with user -->
                    <v-btn class="orange--text" icon>
                      <v-icon>chat</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-row>
                    <v-col cols="2"><v-icon>today</v-icon></v-col>
                    <v-col cols="10"
                      ><div class="text-truncate text-right">
                        {{ getDateInterval(selectedRental.rental) }}
                      </div></v-col
                    >
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row>
                    <v-col cols="2"><v-icon>location_on</v-icon></v-col>
                    <v-col cols="10"
                      ><div class="text-truncate text-right">
                        {{ ownerBoats[activeBoat].port.name }}
                      </div></v-col
                    >
                  </v-row>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "OwnerBoats",
  data: () => ({
    activeBoat: 0, //change to null
    calendarTitle: "",
    focus: "",
    selectedRental: {},
    selectedElement: null,
    activeBoatObj: {
      name: "asdasd",
      description: "asdasd",
      pricePerDay: "123",
      length: "123",
      passengerCapacity: "12",
      numberOfCabins: "1",
      numberOfBathrooms: "1",
    },
    activeBoatRentals: [],
  }),
  computed: {
    ...mapGetters(["ownerBoats", "user"]),
  },
  methods: {
    ...mapActions(["fetchBoatsByOwnerId"]),
    selectBoat(idx) {
      this.activeBoat = idx;
      this.activeBoatObj = {
        name: this.ownerBoats[idx].name,
        description: this.ownerBoats[idx].description,
        pricePerDay: this.ownerBoats[idx].pricePerDay,
        length: this.ownerBoats[idx].length,
        passengerCapacity: this.ownerBoats[idx].passengerCapacity,
        numberOfCabins: this.ownerBoats[idx].numberOfCabins,
        numberOfBathrooms: this.ownerBoats[idx].numberOfBathrooms,
      };
      this.activeBoatRentals = this.ownerBoats[idx].rentals;
    },
    showRentalDetails({ nativeEvent, event }) {
      this.selectedRental = event;
      this.selectedElement = nativeEvent.target;
    },
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
              name: `${r.renter.firstName} ${r.renter.lastName}`,
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
    getDateInterval(r) {
      const startDate = new Date(r.startDate);
      const endDate = new Date(r.startDate);
      endDate.setDate(startDate.getDate() + parseInt(r.durationInDays.days));
      return `${startDate.toISOString().split("T")[0]} ~ ${
        endDate.toISOString().split("T")[0]
      }`;
    },
  },
  async mounted() {
    await this.fetchBoatsByOwnerId(this.user.id);
    this.calendarTitle = this.$refs.calendar.title;
  },
};
</script>

<style scoped>
.content-section-container {
  padding: 2em 2em 1em 2em;
}
.calendar-toolbar {
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  box-shadow: 1px 0px 0px 0px#e0e0e0 !important;
}
.flat-sheet {
  border: 1px solid #e0e0e0;
}
</style>