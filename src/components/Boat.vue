<template>
  <div>
    <v-row class="boat-content" no-gutters>
      <v-col xs="12" md="8">
        <v-sheet class="grey lighten-4">
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
                <v-row>
                  <v-col class="align-center justify-center">
                    <v-avatar class="white--text mx-2" color="purple" size="42">
                      <span
                        >{{ currBoat.user.firstName.charAt(0)
                        }}{{ currBoat.user.lastName.charAt(0) }}</span
                      >
                    </v-avatar>
                    <div
                      class="text-body-1 grey--text text--lighten-4 boat-image-overlay-text"
                    >
                      {{ currBoat.user.firstName }} {{ currBoat.user.lastName }}
                    </div>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col>
                      <v-rating
                        :value="avgRating"
                        color="yellow accent-4"
                        readonly
                        half-increments
                        :clearable="false"
                        size="32"
                      />
                      <!-- TODO: create rating component and add it here -->
                  </v-col>
                </v-row>
              </v-container>
            </v-img>
            <div class="text-h2 text-capitalize text-left">
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
                <v-divider :key="`${i}-divider`"></v-divider>
              </template>
              <div class="text-body-1" v-if="currBoat.ratings.length === 0">No ratings found.</div>
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
                                {{"NAME PLACEHOLDER"}}
                            </v-list-item-title>
                            <div class="text-body-1">
                                {{comment.comment}}
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="`${i}-divider`"></v-divider>
                </template>
            </v-list>
            <!-- TODO:  -->
          </v-container>
        </v-sheet>
      </v-col>
      <v-divider vertical class="hidden-sm-and-down"></v-divider>
      <v-col class="hidden-sm-and-down">
        <v-sheet class="grey lighten-4 fill-height boat-rental-sheet">
          WEB RENTAL PAYMENT DIV
        </v-sheet>
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
    dates: [],
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
    getDateString: (ISODate) => {
      const date = new Date(ISODate);
      return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    },
  },
  computed: {
    ...mapGetters(["currBoat", "boatRentals"]),
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

<style>
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
</style>