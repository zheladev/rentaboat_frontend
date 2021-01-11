<template>
  <div>
    <v-row class="boat-content" no-gutters>
      <v-col xs="12" md="8">
        <v-sheet class="grey lighten-4 boat-data-sheet">
          <v-container class="boat-header">
            <v-img
              class="boat-img"
              src="https://www.lanoria.net/368-large_default/cherokee-30.jpg"
              :aspect-ratio="16 / 9"
            >
              <v-container
                v-if="currBoat.user !== undefined"
                class="boat-image-overlay"
                no-gutters
                fill-height
              >
                <!-- fix for smaller views -->
                <v-row>
                  <v-col class="align-center justify-center">
                    <v-container>
                      <v-avatar
                        class="white--text mx-2"
                        color="purple"
                        size="42"
                      >
                        <span
                          >{{ currBoat.user.firstName.charAt(0)
                          }}{{ currBoat.user.lastName.charAt(0) }}</span
                        >
                      </v-avatar>
                      <div
                        class="text-body-1 grey--text text--lighten-4 boat-image-overlay-text"
                      >
                        {{ currBoat.user.firstName }}
                        {{ currBoat.user.lastName }}
                      </div>
                    </v-container>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col
                    class="align-center justify-center text-center image-rating-container"
                  >
                    <v-container>
                      <v-rating
                        :value="avgRating"
                        color="yellow accent-4"
                        readonly
                        half-increments
                        :clearable="false"
                        size="32"
                      />
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </v-img>
            <div class="display-2 text-capitalize text-left">
              {{ currBoat.name }}
            </div>
          </v-container>
          <v-divider></v-divider>
          <v-container class="boat-description">
            <div class="text-overline">Description</div>
            <div class="text-subtitle-1 boat-subtitle">
              {{ currBoat.description }}
            </div>
          </v-container>
          <v-divider></v-divider>
          <v-container class="boat-characteristics">
            <div class="text-overline">Characteristics</div>
            <v-simple-table v-if="currBoat">
              <tbody>
                <tr v-for="(row, i) in getCharacteristics(currBoat)" :key="i">
                  <td>{{ row.name }}</td>
                  <td>{{ row.value }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-container>
          <v-divider></v-divider>

          <!-- MOBILE RENTAL FORM -->

          <v-container class="boat-ratings">
            <div class="text-overline">Ratings</div>
            <v-list v-if="currBoat.ratings !== undefined">
              <template v-for="(rating, i) in currBoat.ratings">
                <v-list-item :key="i">
                  <v-list-item-avatar>
                    <v-img
                      src="https://i1.sndcdn.com/avatars-000411292317-dt2f28-t500x500.jpg"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      <span>{{ "Name Placeholder" }}</span>
                      <v-rating
                        :value="rating.rating"
                        color="yellow accent-4"
                        dense
                        readonly
                        :clearable="false"
                        size="18"
                      />
                    </v-list-item-title>
                    <v-list-item-subtitle class="rating-comment">
                      {{ getDateString(rating.createdAt) }}
                    </v-list-item-subtitle>
                    <div class="text-body-1">
                      {{ rating.comment }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="i < currBoat.ratings.length - 1"
                  :key="`${i}-divider`"
                ></v-divider>
              </template>
              <div class="text-body-1" v-if="currBoat.ratings.length === 0">
                No ratings found.
              </div>
            </v-list>
          </v-container>
          <v-divider></v-divider>

          <v-container class="boat-comments">
            <div class="text-overline">Comments</div>
            <v-list v-if="currBoat.comments !== undefined">
              <template v-for="(comment, i) in currBoat.comments">
                <v-list-item :key="i">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ "NAME PLACEHOLDER" }}
                    </v-list-item-title>
                    <div class="text-body-1">
                      {{ comment.comment }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="i < currBoat.comments.length - 1"
                  :key="`${i}-divider`"
                ></v-divider>
              </template>
            </v-list>
          </v-container>
        </v-sheet>
      </v-col>
      <v-divider vertical class="hidden-sm-and-down"></v-divider>

      <!-- Date picker web -->

      <v-col class="hidden-sm-and-down">
        <v-container py-0 class="grey lighten-4 fill-height align-start">
          <v-row>
            <v-col cols="12">
              <v-sheet class="ma-4" elevation="1">
                <v-container py-0>
                  <v-row>
                    <v-col>
                      <div class="headline text-center">
                        {{ currBoat.name }}
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
                <v-divider></v-divider>
                <v-container py-0>
                  <v-row>
                    <v-col class="pa-0">
                      <v-menu
                        ref="startDateMenu"
                        v-model="startDateMenu"
                        :close-on-content-click="false"
                        :return-value.sync="startDate"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <div
                            class="datepicker-item"
                            v-on="on"
                            :class="startDateMenu ? 'active' : ''"
                          >
                            <v-container pa-0>
                              <v-row no-gutters>
                                <v-col cols="9" class="py-0">
                                  <div
                                    class="text-overline text-right text-truncate"
                                  >
                                    start date
                                  </div>
                                </v-col>
                                <v-col cols="1" class="py-0">
                                  <v-icon
                                    class="mx-1"
                                    :class="
                                      startDateMenu
                                        ? 'datepicker-icon-active'
                                        : ''
                                    "
                                    >arrow_drop_down</v-icon
                                  >
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col class="py-0">
                                  <div class="text-center">
                                    {{ dmyDate(startDate) }}
                                  </div>
                                </v-col>
                              </v-row>
                            </v-container>
                          </div>
                        </template>
                        <v-date-picker
                          class="start-date-picker"
                          v-model="startDate"
                          no-title
                          scrollable
                          :min="new Date().toISOString().split('T')[0]"
                          @click:date="
                            $refs.startDateMenu.save(startDate);
                            startDate > endDate
                              ? (endDate = startDate)
                              : ''; /*I hate myself*/
                          "
                          :allowed-dates="
                            allowedDates(datePickerFormattedNotAllowedDates)
                          "
                        >
                          <div class="flex-grow-1"></div>
                          <v-btn
                            text
                            color="primary"
                            @click="startDateMenu = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.startDateMenu.save(startDate)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col class="pa-0">
                      <v-menu
                        ref="endDateMenu"
                        v-model="endDateMenu"
                        :close-on-content-click="false"
                        :return-value.sync="endDate"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <div
                            class="datepicker-item"
                            v-on="on"
                            :class="endDateMenu ? 'active' : ''"
                          >
                            <v-container pa-0>
                              <v-row no-gutters>
                                <v-col cols="8" class="py-0">
                                  <div
                                    class="text-overline text-right text-truncate"
                                  >
                                    end date
                                  </div>
                                </v-col>
                                <v-col cols="1" class="py-0">
                                  <v-icon
                                    class="mx-1"
                                    :class="
                                      endDateMenu
                                        ? 'datepicker-icon-active'
                                        : ''
                                    "
                                    >arrow_drop_down</v-icon
                                  >
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col class="py-0">
                                  <div class="text-center">
                                    {{ dmyDate(endDate) }}
                                  </div>
                                </v-col>
                              </v-row>
                            </v-container>
                          </div>
                        </template>
                        <v-date-picker
                          v-model="endDate"
                          no-title
                          scrollable
                          @click:date="$refs.endDateMenu.save(endDate)"
                          :allowed-dates="
                            allowedDates(datePickerFormattedNotAllowedDates)
                          "
                          :min="startDate"
                        >
                          <div class="flex-grow-1"></div>
                          <v-btn
                            text
                            color="primary"
                            @click="endDateMenu = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.endDateMenu.save(endDate)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
                <v-divider></v-divider>
                <v-container py-0>
                  <v-row>
                    <v-col>
                      <div class="headline text-center">
                        Rent now for {{ totalPrice.toFixed(2) }} €
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-sheet>
            </v-col>
            <v-col cols="12 text-center pt-0 pb-6">
              <v-btn
                class="light-blue darken-2 grey--text text--lighten-4"
                link
                :to="{
                  name: 'rentalPayment',
                  params: { boatId: id },
                  query: { startDate: startDate, endDate: endDate },
                }"
                >Proceed with rental</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <!-- <v-date-picker
      v-model="dates"
        range
      :min="new Date().toISOString().split('T')[0]"
      :allowed-dates="allowedDates(datePickerFormattedNotAllowedDates)"
    /> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Boat",
  data: () => ({
    datePickerFormattedNotAllowedDates: [],
    isLoading: true,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    startDateMenu: false,
    endDateMenu: false,
    avgRating: 0,
  }),
  props: ["id"],
  methods: {
    ...mapActions(["fetchBoatById", "fetchRentalsByBoat"]),
    allowedDates: (datesNotAllowed) => {
      return (date) => {
        let isAllowed = true;
        if (datesNotAllowed.includes(date)) {
          isAllowed = false;
        }
        return isAllowed;
      };
    },
    getDaysArray: (start, end) => {
      for (
        var arr = [], dt = new Date(start);
        dt <= end;
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(new Date(dt));
      }
      return arr;
    },
    getCharacteristics: (boat) => {
      return [
        {
          name: "Passenger Capacity",
          value: boat.passengerCapacity,
        },
        {
          name: "Number of Cabins",
          value: boat.numberOfCabins,
        },
        {
          name: "Boat Length",
          value: `${boat.length} cm`,
        },
        {
          name: "Bathrooms",
          value: boat.numberOfBathrooms,
        },
      ];
    },
    dmyDate(strDate) {
      return strDate
        .split("-")
        .reverse()
        .reduce((acc, curr) => acc.concat(`/${curr}`));
    },
    getDateString: (ISODate) => {
      const date = new Date(ISODate);
      return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    },
    toggleStartDateMenu() {
      this.startDateMenu = !this.startDateMenu;
    },
    toggleEndDateMenu() {
      this.endDateMenu = !this.endDateMenu;
    },
  },
  computed: {
    ...mapGetters(["currBoat", "boatRentals"]),
    totalPrice() {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const basePrice = this.currBoat.pricePerDay;
      const d1 = new Date(this.startDate),
        d2 = new Date(this.endDate);

      const days = Math.floor((d2 - d1) / _MS_PER_DAY) + 1;
      return basePrice * days;
    },
  },
  mounted() {
    this.fetchBoatById(this.id).then(() => {
      this.currBoat.ratings.forEach((r) => {
        this.avgRating += r.rating;
      });
      this.avgRating = parseFloat(
        (this.avgRating / this.currBoat.ratings.length).toFixed(1)
      );
    });

    this.fetchRentalsByBoat(this.id).then(() => {
      let formattedDates = [];
      for (let rental of this.boatRentals) {
        const startDate = new Date(rental.startDate);
        const endDate = new Date(startDate);
        endDate.setDate(
          startDate.getDate() + parseInt(rental.durationInDays.days)
        );

        const datesArr = this.getDaysArray(startDate, endDate);
        formattedDates = formattedDates.concat(
          datesArr.map((date) => date.toISOString().split("T")[0])
        );
      }
      this.datePickerFormattedNotAllowedDates = formattedDates;
    });

    this.isLoading = false;
  },
};
</script>

<style scoped>
.no-padding {
  padding: 0px;
}
.boat-img {
  margin-bottom: 1em;
}
.boat-subtitle {
  overflow-wrap: break-word;
}
.boat-content {
  align-items: stretch;
}
.boat-image-overlay {
  align-content: flex-end;
  padding: 0px;
  background: linear-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, 0.8));
}
.boat-image-overlay {
  align-content: flex-end;
  padding: 0px;
}
.boat-image-overlay-text {
  padding: 0px 0px 0px 5px;
  display: inline;
}
.datepicker-icon-active {
  transform: rotate(-180deg);
}
.boat-rental-sheet > * {
  margin: 0px !important;
}
.datepicker-item {
  padding: 1em;
}

.datepicker-item:hover {
  cursor: pointer;
  background-color: #28b0ed;
  transition: 0.3s cubic-bezier(0.4, 0, 0.6, 1) 0s;
}
.datepicker-item.active {
  background-color: #1b7ba6;
  transition: 0.2s cubic-bezier(0.4, 0, 0.6, 1) 0s;
}
.datepicker-column {
  padding: 0px;
}
.image-rating-container {
  padding: 6px;
}
</style>