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
    <v-sheet
      v-if="!mdAndDown"
      class="blue lighten-5"
      :class="mdAndDown ? '' : 'sticky'"
      elevation="1"
    >
      <div class="text-center headline pt-4">Find the boat of your dreams</div>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" lg="3">
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
            <v-col cols="12" md="6" lg="3">
              <v-sheet class="blue">
                <v-row no-gutters>
                  <v-col>
                    <v-sheet class="blue lighten-5 lighten-5 sticky">
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
                              class="pl-2 pr-4"
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
            <v-col cols="12" md="6" lg="3">
              <v-sheet class="blue lighten-5">
                <v-row no-gutters>
                  <v-col cols="4" sm="2" md="3" lg="5">
                    <v-select
                      class="pl-2 text-truncate"
                      label="Filter"
                      prepend-icon="euro"
                      v-model="filter"
                      :items="filterTypes"
                    ></v-select>
                  </v-col>
                  <v-col cols="8" sm="10" md="9" lg="7">
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
            <v-col cols="12" md="6" lg="3">
              <v-sheet class="blue lighten-5">
                <v-row>
                  <v-col cols="2" md="0"> </v-col>
                  <v-col cols="7" class="">
                    <v-btn
                      class="green lighten-1"
                      block
                      max-width="170"
                      @click="searchBoats"
                      >Find</v-btn
                    >
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      :class="isFiltered ? 'red--text' : ''"
                      :disabled="!isFiltered"
                      icon
                      @click="deleteFilter"
                      ><v-icon>delete</v-icon></v-btn
                    >
                  </v-col>
                  <v-col cols="1"> </v-col>
                </v-row>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-sheet>
    <v-expansion-panels
      v-model="mobileSearchPanel"
      v-else
      class="sticky"
      :style="searchDropdownStyle"
      focusable
    >
      <v-expansion-panel>
        <v-expansion-panel-header class="blue lighten-4" :ripple="true">
          <div>Search {{ mobileSearchPanel }}</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="blue lighten-5">
          <v-sheet class="blue lighten-5">
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6" lg="3">
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
                  <v-col cols="12" md="6" lg="3">
                    <v-sheet>
                      <v-row no-gutters>
                        <v-col>
                          <v-sheet class="blue lighten-5 sticky transparent">
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
                                    class="pl-2 pr-4"
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
                  <v-col cols="12" md="6" lg="3">
                    <v-sheet class="blue lighten-5">
                      <v-row no-gutters>
                        <v-col cols="4" sm="2" md="3" lg="5">
                          <v-select
                            class="pl-2 text-truncate"
                            label="Filter"
                            prepend-icon="euro"
                            v-model="filter"
                            :items="filterTypes"
                          ></v-select>
                        </v-col>
                        <v-col cols="8" sm="10" md="9" lg="7">
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
                  <v-col cols="12" md="6" lg="3">
                    <v-sheet class="blue lighten-5">
                      <v-row>
                        <v-col cols="2" md="0"> </v-col>
                        <v-col cols="7" class="">
                          <v-btn
                            class="green lighten-1"
                            block
                            max-width="170"
                            @click="searchBoats"
                            >Find</v-btn
                          >
                        </v-col>
                        <v-col cols="2">
                          <v-btn
                            :class="isFiltered ? 'red--text' : ''"
                            :disabled="!isFiltered"
                            icon
                            @click="deleteFilter"
                            ><v-icon>delete</v-icon></v-btn
                          >
                        </v-col>
                        <v-col cols="1"> </v-col>
                      </v-row>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-sheet>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
    mobileSearchPanel: undefined,
    formattedDate: "",
    filter: "",
    price: null,
    dateMenu: false,
    page: 1,
    limit: 15,
    port: null,
    filterTypes: [
      {
        text: "None",
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
    searchDropdownStyle() {
      const mdAndUpTop = "64px";
      const smAndDownTop = "56px";
      return {
        top: this.$vuetify.breakpoint.smAndDown ? smAndDownTop : mdAndUpTop,
      };
    },
    pages() {
      return Math.ceil(this.maxPages);
    },
    mdAndDown() {
      return this.$vuetify.breakpoint.mdAndDown;
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
        const filterOp =
          this.filter === null || this.filter === "" ? ":" : this.filter;
        searchParams = searchParams.concat(`pricePerDay${filterOp}${price},`);
      }

      searchParams = searchParams = searchParams.concat(
        `&startDate=${startDate}&endDate=${endDate}`
      );

      return searchParams !== "" ? searchParams : null;
    },
    async deleteFilter() {
      await this.fetchBoats({
        page: 0,
        limit: this.limit,
      });

      this.page = 1;
      this.isFiltered = false;
      this.mobileSearchPanel = undefined;
    },
    async searchBoats() {
      await this.fetchBoats({
        page: 0,
        limit: this.limit,
        searchParams: this.getSearchParams(),
      });

      this.page = 1;
      this.isFiltered = true;
      this.mobileSearchPanel = undefined;
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
.sticky {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>