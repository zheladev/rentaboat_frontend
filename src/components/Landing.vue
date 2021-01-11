<template>
  <v-container fluid class="pa-0">
    <parallax-image
      height="300"
      img="https://images.reference.com/amg-cms-reference-images/media/oceans-seas-surround-africa_ac189a10d9c855c0.jpg"
    >
      <v-col class="text-center px-0" cols="12">
        <h1 class="display-1 font-weight-thin mb-4">Rentaboat</h1>
        <h4 class="subheading">Building bridges beween people.</h4>
      </v-col>
    </parallax-image>
    <v-container>
      <v-sheet class="blue lighten-5" elevation="1">
        <div class="text-center headline pt-4">
          Find the boat of your dreams
        </div>
        <v-form>
          <v-row class="pa-2">
            <v-col>
              <v-sheet class="blue lighten-5">
                <v-row no-gutters>
                  <v-col>
                    <v-select
                      class="pr-4 pl-2"
                      label="Port"
                      prepend-icon="location_on"
                      v-model="port"
                      :items="availablePorts"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class="blue lighten-5">
                <v-row no-gutters>
                  <v-col>
                    <v-sheet class="blue lighten-5">
                      <v-menu
                        ref="dateMenu"
                        v-model="dateMenu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-row no-gutters>
                            <v-text-field
                              label="Rental duration"
                              prepend-icon="mdi-calendar"
                              readonly
                              :value="formattedDate"
                              v-on="on"
                            ></v-text-field>
                          </v-row>
                        </template>
                        <v-date-picker
                          v-model="dates"
                          @input="formatDates"
                          range
                        >
                        </v-date-picker>
                      </v-menu>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class="blue lighten-5">
                <v-row no-gutters>
                  <v-col cols="5">
                    <v-select
                      class="pl-4 text-truncate"
                      label="Filter"
                      prepend-icon="euro"
                      v-model="filter"
                      :items="filterTypes"
                    ></v-select>
                    {{ filter }}
                  </v-col>
                  <v-col>
                    <v-text-field
                      class="pr-4"
                      v-model="price"
                      label="Price per day"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class="blue lighten-5">
                <v-row>
                  <v-col class="text-center">
                    <v-btn
                      class="green lighten-1"
                      width="200"
                      @click="searchBoats"
                      >Find</v-btn
                    >
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>
          </v-row>
        </v-form>
      </v-sheet>
    </v-container>
    <v-container pa-0>
      <boat-grid :boats="allBoats" />
      <v-pagination
        v-if="allBoats.length > 0"
        v-model="page"
        :length="pages"
        @input="updateBoats"
      ></v-pagination>
    </v-container>
  </v-container>
</template>

<script>
import BoatGrid from "./BoatGrid.vue";
import { mapActions, mapGetters } from "vuex";
import ParallaxImage from "./common/ParallaxImage.vue";

export default {
  components: { BoatGrid, ParallaxImage },
  name: "Landing",
  data: () => ({
    isFiltered: false,
    dates: [
      new Date().toISOString().split("T")[0],
      new Date().toISOString().split("T")[0],
    ],
    formattedDate: "",
    filter: null,
    price: null,
    dateMenu: false,
    page: 1,
    limit: 15,
    port: null,
    filterTypes: [
      {
        text: " - ",
        value: null,
      },
      {
        text: "Max",
        value: "<:",
      },
      {
        text: "Min",
        value: ">:",
      },
    ],
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  }),
  computed: {
    ...mapGetters(["allBoats", "maxPages", "allPorts"]),
    pages() {
      return Math.ceil(this.maxPages);
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
  },
  methods: {
    ...mapActions(["fetchBoats", "fetchPorts"]),
    getSearchParams() {
      const port = this.port;
      const startDate = this.dates[0];
      const endDate = this.dates.length < 2 ? this.dates[0] : this.dates[1];
      const price = this.price;

      let searchParams = "";
      if (port !== null) {
        searchParams = searchParams.concat(`port:${port.id},`);
      }

      if (price !== null) {
        const filterOp = this.filter === null ? ":" : this.filter;
        searchParams = searchParams.concat(`price${filterOp}${price}`);
      }

      searchParams = searchParams = searchParams.concat(
        `&startDate=${startDate}&endDate=${endDate}`
      );

      return searchParams !== "" ? searchParams : null;
    },
    async searchBoats() {
      await this.fetchBoats({
        page: 0,
        limit: this.limit,
        searchParams: this.getSearchParams(),
      });

      this.page = 1;
      this.isFiltered = true;
    },
    async updateBoats() {
      await this.fetchBoats({
        page: this.page - 1,
        limit: this.limit,
        searchParams: this.isFiltered ? this.getSearchParams() : null,
      });
    },
    formatDates() {
      if (!this.dates || !this.dates[0]) return null;

      if (this.dates[1] && new Date(this.dates[0]) > new Date(this.dates[1])) {
        const buffer = this.dates[0];
        this.dates[0] = this.dates[1];
        this.dates[1] = buffer;
      }

      const [, startMonth, startDay] = this.dates[0].split("-");
      const [, endMonth, endDay] = this.dates[1]
        ? this.dates[1].split("-")
        : this.dates[0].split("-");

      this.formattedDate = `${startDay} ${
        this.months[startMonth - 1]
      } ~ ${endDay} ${this.months[endMonth - 1]}`;
    },
  },
  async mounted() {
    await this.fetchBoats({
      page: this.page - 1,
      limit: this.limit,
    });
    await this.fetchPorts();
    this.formatDates();
  },
};
</script>

<style>
.v-select__selection--comma {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
</style>