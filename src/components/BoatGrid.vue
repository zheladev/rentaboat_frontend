<template>
  <v-container>
    <v-row v-if="boats.length > 0" justify="center">
      <v-col
        v-for="(boat, idx) in boats"
        :key="idx"
        cols="12"
        sm="10"
        md="6"
        lg="4"
      >
        <v-card
          elevation="1"
          outlined
          class="fill-height"
          link
          :to="{ name: 'boat', params: { id: boat.id } }"
        >
          <v-card min-height="300" max-height="300">
              <v-img :src="getFilePath(boat.path)" min-height="300" max-height="300" />
          </v-card>
          <v-card-title class="pb-0"
            ><div class="text-truncate">{{ boat.name }}</div></v-card-title
          >
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="avgRating(boat.ratings)"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">
                {{
                  boat.ratings.length > 0
                    ? `${avgRating(boat.ratings)} (${boat.ratings.length})`
                    : `No ratings.`
                }}
              </div>
            </v-row>
            <v-row>
              <v-col class="pl-2 pb-0">
                <v-icon>location_on</v-icon> {{ boat.port.name }}
              </v-col>
              <v-col class="pl-2 pb-0">
                <div class="black--text text-right">
                  {{ boat.pricePerDay }} €/day
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <!-- TODO: Add icon name on hover (person -> passenger capacity etc) -->
            <v-row class="py-0">
              <v-col class="py-0">
                <div><v-icon>person</v-icon> {{ boat.passengerCapacity }}</div>
              </v-col>
              <v-col class="py-0">
                <div>
                  <v-icon>meeting_room</v-icon> {{ boat.numberOfCabins }}
                </div>
              </v-col>
              <v-col class="py-0">
                <div><v-icon>wc</v-icon> {{ boat.numberOfBathrooms }}</div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col>
                {{ boat.description }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <!-- 
        {{ boat.name }}
        <v-spacer />
        {{ boat.pricePerDay }}$ a day
        <v-spacer />
        By: {{ boat.user.firstName }} {{ boat.user.lastName }}
        <v-btn text :to="{ name: 'boat', params: { id: boat.id } }">Go</v-btn> -->
      </v-col>
    </v-row>
    <v-row v-else> No boats found. </v-row>
  </v-container>
</template>

<script>
import { fileRetrievalMixin } from "@/mixins/fileRetrievalMixin";
export default {
  mixins: [fileRetrievalMixin],
  name: "BoatGrid",
  props: ["boats"],
  methods: {
    avgRating(ratings) {
      return ratings.length > 0
        ? ratings.map((r) => r.rating).reduce((acc, curr) => acc + curr, 0) /
            ratings.length
        : 0;
    },
  },
};
</script>

<style>
</style>