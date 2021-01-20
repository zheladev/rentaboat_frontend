<template>
  <v-container fluid pa-0>
    <v-container class="content-section-container">
      <div class="headline">Your Boats</div>
      <v-container class="py-0">
        <v-row>
          <v-col>
            <v-slide-group v-if="ownerBoats" show-arrows>
              <!-- TODO: make responsive yo -->
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
              <v-slide-item v-slot="{ toggle }">
                <v-card
                  class="ma-4 grey lighten-3"
                  height="150"
                  width="200"
                  mx-0
                  @click="toggle"
                >
                  <!-- Boat post form dialog -->
                  <v-dialog v-model="dialog" persistent max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-row
                        class="fill-height mx-0"
                        align="center"
                        justify="center"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="grey" size="48" v-text="'add'"></v-icon>
                      </v-row>
                    </template>
                    <v-card>
                      <v-card-title>
                        <v-row>
                          <v-col>
                            <span class="headline">New Boat</span>
                          </v-col>
                        </v-row>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <form @submit.prevent>
                            <v-row>
                              <v-col>
                                <v-text-field
                                  v-model="createBoatData.name"
                                  :error-messages="nameErrors"
                                  label="Boat name"
                                  required
                                  @input="$v.createBoatData.name.$touch()"
                                  @blur="$v.createBoatData.name.$touch()"
                                ></v-text-field>
                              </v-col>
                              <v-col>
                                <v-text-field
                                  v-model="createBoatData.pricePerDay"
                                  :error-messages="pricePerDayErrors"
                                  label="Price per day"
                                  required
                                  @input="
                                    $v.createBoatData.pricePerDay.$touch()
                                  "
                                  @blur="$v.createBoatData.pricePerDay.$touch()"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-textarea
                                  v-model="createBoatData.description"
                                  :error-messages="descriptionErrors"
                                  label="Boat description"
                                  required
                                  filled
                                  @input="
                                    $v.createBoatData.description.$touch()
                                  "
                                  @blur="$v.createBoatData.description.$touch()"
                                ></v-textarea>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-select
                                  v-model="createBoatData.boatType"
                                  :error-messages="boatTypeErrors"
                                  label="Boat type"
                                  :items="boatTypes"
                                  required
                                  @input="$v.createBoatData.boatType.$touch()"
                                  @blur="$v.createBoatData.boatType.$touch()"
                                ></v-text-field>
                              </v-col>
                              <v-col>
                                <v-text-field
                                  v-model="createBoatData.model"
                                  :error-messages="modelErrors"
                                  label="Boat model"
                                  required
                                  @input="$v.createBoatData.model.$touch()"
                                  @blur="$v.createBoatData.model.$touch()"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-select
                                  v-model="createBoatData.port"
                                  label="Port"
                                  :items="availablePortsStr"
                                  :error-messages="portErrors"
                                  required
                                  @input="$v.createBoatData.port.$touch()"
                                  @blur="$v.createBoatData.port.$touch()"
                                >
                                </v-select>
                              </v-col>
                              <v-col>
                                <v-text-field
                                  v-model="createBoatData.shipyard"
                                  :error-messages="shipyardErrors"
                                  label="Boat shipyard"
                                  required
                                  @input="$v.createBoatData.shipyard.$touch()"
                                  @blur="$v.createBoatData.shipyard.$touch()"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-text-field
                                  v-model="createBoatData.length"
                                  :error-messages="lengthErrors"
                                  label="Boat length"
                                  required
                                  @input="$v.createBoatData.length.$touch()"
                                  @blur="$v.createBoatData.length.$touch()"
                                ></v-text-field>
                              </v-col>
                              <v-col>
                                <v-text-field
                                  v-model="createBoatData.passengerCapacity"
                                  :error-messages="passengerCapacityErrors"
                                  label="Passenger Capacity"
                                  required
                                  @input="
                                    $v.createBoatData.passengerCapacity.$touch()
                                  "
                                  @blur="
                                    $v.createBoatData.passengerCapacity.$touch()
                                  "
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-text-field
                                  v-model="createBoatData.numberOfCabins"
                                  :error-messages="numberOfCabinsErrors"
                                  label="Nº of cabins"
                                  required
                                  @input="
                                    $v.createBoatData.numberOfCabins.$touch()
                                  "
                                  @blur="
                                    $v.createBoatData.numberOfCabins.$touch()
                                  "
                                ></v-text-field>
                              </v-col>
                              <v-col>
                                <v-text-field
                                  v-model="createBoatData.numberOfBathrooms"
                                  :error-messages="numberOfBathroomsErrors"
                                  label="Nº of bathrooms"
                                  required
                                  @input="
                                    $v.createBoatData.numberOfBathrooms.$touch()
                                  "
                                  @blur="
                                    $v.createBoatData.numberOfBathrooms.$touch()
                                  "
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </form>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="closeBoatCreationDialog">
                          Close
                        </v-btn>
                        <v-btn text @click="submitBoat"> Save </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-divider></v-divider>
    <!-- Boat details -->
    <v-scroll-y-transition>
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
                ><v-img max-height="200" max-width="300" :src="filePath"
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
                  prepend-icon="wc"
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
              <v-col cols="6">
                <v-select
                  v-model="activeBoatObj.port"
                  label="Port"
                  prepend-icon="location_on"
                  :items="availablePorts"
                >
                  <!-- TODO: google map? -->
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn @click="updateBoat">EDIT</v-btn>
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
            <v-row>
              <v-col class="py-0">
                <div class="text-overline">Rental Details</div>
              </v-col>
            </v-row>
            <v-row v-if="!selectedElement">
              <v-scroll-y-transition>
                <v-col> Pick a rental. </v-col>
              </v-scroll-y-transition>
            </v-row>
            <v-scroll-y-transition>
              <v-row v-if="selectedElement">
                <v-col>
                  <v-list class="flat-sheet">
                    <v-list-item>
                      <v-list-item-avatar class="white--text" color="purple">
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
            </v-scroll-y-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-scroll-y-transition>
  </v-container>
</template>

<script>
import { fileRetrievalMixin } from "@/mixins/fileRetrievalMixin";
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, decimal, numeric, alphaNum } from "vuelidate/lib/validators";
//import * as easings from "vuetify/es5/services/goto/easing-patterns";
export default {
  mixins: [validationMixin, fileRetrievalMixin],
  name: "OwnerBoats",
  data: () => ({
    createBoatDialogLoading: false,
    dialog: false,
    activeBoat: null, //change to null
    calendarTitle: "",
    focus: "",
    selectedRental: {},
    selectedElement: null,
    activeBoatObj: null,
    activeBoatRentals: [],
    createBoatData: {
      shipyard: "",
      boatType: "",
      port: "",
      description: "",
      pricePerDay: "",
      length: "",
      model: "",
      passengerCapacity: "",
      numberOfCabins: "",
      numberOfBathrooms: "",
      name: "",
    },
  }),
  validations: {
    createBoatData: {
      name: { required },
      shipyard: { required, alphaNum },
      boatType: { required },
      port: { required },
      description: { required },
      pricePerDay: { required, decimal },
      length: { required, decimal },
      model: { required, alphaNum },
      passengerCapacity: { required, numeric },
      numberOfCabins: { required, numeric },
      numberOfBathrooms: { required, numeric },
    },
  },
  computed: {
    ...mapGetters(["ownerBoats", "user", "allPorts"]),
    filePath() {
      return this.activeBoatObj.path
        ? this.getFilePath(this.activeBoatObj.path)
        : "";
    },
    boatTypes() {
        //TODO: fetch from backend
        return [
            "yatch",
            "dinghy",
            "powerCat",
            "sailboat",
            "catamaran",
            "schooner",
            "motorboat"
        ];
    },
    availablePorts() {
      return this.allPorts.map((p) => ({
        text: p.name,
        value: p,
      }));
    },
    availablePortsStr() {
      return this.allPorts.map((p) => p.name);
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.createBoatData.name.$dirty) return errors;
      !this.$v.createBoatData.name.required &&
        errors.push("You must provide a boat name.");
      return errors;
    },
    shipyardErrors() {
      const errors = [];
      if (!this.$v.createBoatData.shipyard.$dirty) return errors;
      !this.$v.createBoatData.shipyard.required &&
        errors.push("Shipyard is required.");
      !this.$v.createBoatData.shipyard.alphaNum &&
        errors.push("Shipyards can only contain numbers and letters.");
      return errors;
    },
    boatTypeErrors() {
      const errors = [];
      if (!this.$v.createBoatData.boatType.$dirty) return errors;
      !this.$v.createBoatData.boatType.required &&
        errors.push("Boat type is required");
      return errors;
    },
    portErrors() {
      const errors = [];
      if (!this.$v.createBoatData.port.$dirty) return errors;
      !this.$v.createBoatData.port.required && errors.push("Port is required");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.createBoatData.description.$dirty) return errors;
      !this.$v.createBoatData.description.required &&
        errors.push("You must provide a description for the boat.");
      return errors;
    },
    pricePerDayErrors() {
      const errors = [];
      if (!this.$v.createBoatData.pricePerDay.$dirty) return errors;
      !this.$v.createBoatData.pricePerDay.required &&
        errors.push("You must provide a daily price.");
      !this.$v.createBoatData.pricePerDay.decimal &&
        errors.push("Please provide a numerical value.");
      return errors;
    },
    lengthErrors() {
      const errors = [];
      if (!this.$v.createBoatData.length.$dirty) return errors;
      !this.$v.createBoatData.length.required &&
        errors.push("length is required.");
      !this.$v.createBoatData.length.decimal &&
        errors.push("Please provide a numerical value.");
      return errors;
    },
    modelErrors() {
      const errors = [];
      if (!this.$v.createBoatData.model.$dirty) return errors;
      !this.$v.createBoatData.model.required &&
        errors.push("You must provide a model.");
      !this.$v.createBoatData.model.alphaNum &&
        errors.push("Models can only contain numbers and letters.");
      return errors;
    },
    passengerCapacityErrors() {
      const errors = [];
      if (!this.$v.createBoatData.passengerCapacity.$dirty) return errors;
      !this.$v.createBoatData.passengerCapacity.required &&
        errors.push("You must provide a Passenger Capacity.");
      !this.$v.createBoatData.passengerCapacity.numeric &&
        errors.push("Please provide a numeric value.");
      return errors;
    },
    numberOfCabinsErrors() {
      const errors = [];
      if (!this.$v.createBoatData.numberOfCabins.$dirty) return errors;
      !this.$v.createBoatData.numberOfCabins.required &&
        errors.push("You must provide a number of cabins.");
      !this.$v.createBoatData.numberOfCabins.numeric &&
        errors.push("Please provide a numeric value.");
      return errors;
    },
    numberOfBathroomsErrors() {
      const errors = [];
      if (!this.$v.createBoatData.numberOfBathrooms.$dirty) return errors;
      !this.$v.createBoatData.numberOfBathrooms.required &&
        errors.push("numberOfBathrooms is required.");
      !this.$v.createBoatData.numberOfBathrooms.numeric &&
        errors.push("Please provide a numeric value.");
      return errors;
    },
  },
  methods: {
    ...mapActions([
      "fetchBoatsByOwnerId",
      "modifyBoat",
      "fetchPorts",
      "createBoat",
    ]),
    selectBoat(idx) {
      this.activeBoat = idx;
      this.activeBoatObj = {
        id: this.ownerBoats[idx].id,
        name: this.ownerBoats[idx].name,
        description: this.ownerBoats[idx].description,
        pricePerDay: this.ownerBoats[idx].pricePerDay,
        length: this.ownerBoats[idx].length,
        passengerCapacity: this.ownerBoats[idx].passengerCapacity,
        numberOfCabins: this.ownerBoats[idx].numberOfCabins,
        numberOfBathrooms: this.ownerBoats[idx].numberOfBathrooms,
        port: this.ownerBoats[idx].port,
        path: this.ownerBoats[idx].path,
      };
      this.activeBoatRentals = this.ownerBoats[idx].rentals;
      this.selectedRental = {};
      this.selectedElement = null;
      this.focus = "";
    },
    closeBoatCreationDialog() {
      this.dialog = false;
      this.$v.$reset();
      this.clearObject(this.createBoatData);
    },
    clearObject(obj) {
      for (const key of Object.keys(obj)) {
        obj[key] = "";
      }
    },
    async submitBoat() {
      this.createBoatDialogLoading = true;
      this.$v.createBoatData.$touch();
      if (this.$v.createBoatData.$invalid) {
        //invalid data
      } else {
        //valid data
        console.log(this.createBoatData);
        await this.createBoat(this.createBoatData);
        this.createBoatDialogLoading = false;
        this.dialog = false;
        this.$v.$reset();
        this.clearObject(this.createBoatData);
      }
    },
    updateBoat() {
      this.modifyBoat({
        boatId: this.activeBoatObj.id,
        boatData: this.activeBoatObj,
      });
    },
    showRentalDetails({ nativeEvent, event }) {
      //const magic = 1500;
      this.selectedRental = event;
      this.selectedElement = nativeEvent.target;
      //   this.$vuetify.goTo(parseInt(document.body.scrollHeight) + magic, {
      //     duration: 2000,
      //     easing: easings.easeInOutCubic,
      //   });
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
    await this.fetchPorts();
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