<template>
  <div>
    <v-row class="stretch" no-gutters>
      <v-col xs="12" md="8">
        <v-sheet class="payment-sheet grey lighten-4 pa-2">
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Billing information
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    <v-slide-group v-model="slideModel" show-arrows v-if="userBillingInfo">
                      <!-- Not working yet as billing info is not implemented in backend -->
                      <v-slide-item
                        v-for="(billingInfo, i) in userBillingInfo"
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
                              selectBillingInfo(i);
                            }
                          "
                        >
                          <v-row
                            class="billing-card fill-height grey--text text--darken-2 mx-0"
                            align="center"
                            justify="center"
                          >
                            <v-container
                              no-gutters
                              class="pl-10"
                              justify="center"
                              align="center"
                            >
                              <div class="text-truncate">
                                {{ billingInfo.address }}
                              </div>
                              <div>
                                {{ billingInfo.zipCode }} {{ billingInfo.city }}
                              </div>
                              <div>{{ billingInfo.country }}</div>
                            </v-container>
                          </v-row>
                        </v-card>
                      </v-slide-item>
                      <v-slide-item v-slot="{ toggle }" v-if="billingInformationArray">
                        <v-card
                          class="ma-4 grey lighten-3"
                          height="150"
                          width="200"
                          mx-0
                          @click="toggle"
                        >
                          <v-dialog
                            v-model="dialog"
                            persistent
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-row
                                class="fill-height mx-0"
                                align="center"
                                justify="center"
                                v-bind="attrs"
                                v-on="on"
                              >
                                <v-icon
                                  color="grey"
                                  size="48"
                                  v-text="'add'"
                                ></v-icon>
                              </v-row>
                            </template>
                            <v-card>
                              <v-card-title>
                                <span class="headline"
                                  >New Billing Address</span
                                >
                              </v-card-title>
                              <v-card-text>
                                <v-container>
                                  <form @submit.prevent>
                                    <v-row>
                                      <v-col>
                                        <v-text-field
                                          v-model="newBillingInfo.address"
                                          :error-messages="addressErrors"
                                          label="Address"
                                          required
                                          @input="
                                            $v.newBillingInfo.address.$touch()
                                          "
                                          @blur="
                                            $v.newBillingInfo.address.$touch()
                                          "
                                        />
                                      </v-col>
                                    </v-row>
                                    <v-row>
                                      <v-col cols="4">
                                        <v-text-field
                                          v-model="newBillingInfo.zipCode"
                                          label="Zip Code"
                                          :error-messages="zipCodeErrors"
                                          required
                                          @input="
                                            $v.newBillingInfo.zipCode.$touch()
                                          "
                                          @blur="
                                            $v.newBillingInfo.zipCode.$touch()
                                          "
                                        />
                                      </v-col>
                                      <v-col>
                                        <v-text-field
                                          v-model="newBillingInfo.city"
                                          :error-messages="cityErrors"
                                          label="City"
                                          required
                                          @input="
                                            $v.newBillingInfo.city.$touch()
                                          "
                                          @blur="
                                            $v.newBillingInfo.city.$touch()
                                          "
                                        />
                                      </v-col>
                                    </v-row>
                                    <v-row>
                                      <v-col>
                                        <v-select
                                          v-model="newBillingInfo.country"
                                          :items="countryList"
                                          :error-messages="countryErrors"
                                          label="Country"
                                          required
                                          @input="
                                            $v.newBillingInfo.country.$touch()
                                          "
                                          @blur="
                                            $v.newBillingInfo.country.$touch()
                                          "
                                        />
                                      </v-col>
                                    </v-row>
                                  </form>
                                </v-container>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text @click="dialog = false">
                                  Close
                                </v-btn>
                                <v-btn text @click="submitBillingInfo">
                                  Save
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-card>
                      </v-slide-item>
                    </v-slide-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <form @submit.prevent>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="billingInfo.address"
                            label="Address"
                            required
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4">
                          <v-text-field
                            v-model="billingInfo.zipCode"
                            label="Zip Code"
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="billingInfo.city"
                            label="City"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-select
                            v-model="billingInfo.country"
                            :items="countryList"
                            label="Country"
                          />
                        </v-col>
                      </v-row>
                    </form>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header> Payment </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-expansion-panels accordion>
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      >Credit Card</v-expansion-panel-header
                    >
                    <v-expansion-panel-content
                      >NOT IMPLEMENTED</v-expansion-panel-content
                    >
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Paypal</v-expansion-panel-header>
                    <v-expansion-panel-content
                      >NOT IMPLEMENTED</v-expansion-panel-content
                    >
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-col class="hidden-md-and-up grey lighten-4">
            <v-sheet class="ma-4" elevation="1">
              <v-container>
                <v-row>
                  <v-col
                    ><div class="headline text-center">
                      Order Summary
                    </div></v-col
                  >
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="2"><v-icon>directions_boat</v-icon></v-col>
                  <v-col cols="10"
                    ><div class="text-truncate text-right">
                      {{ currBoat.name }}
                    </div></v-col
                  >
                </v-row>
                <v-row>
                  <v-col cols="2"><v-icon>today</v-icon></v-col>
                  <v-col cols="10"
                    ><div class="text-truncate text-right">
                      {{ startDate }} ~ {{ endDate }}
                    </div></v-col
                  >
                </v-row>
                <v-row>
                  <v-col cols="2"><v-icon>schedule</v-icon></v-col>
                  <v-col cols="10"
                    ><div class="text-truncate text-right">
                      {{ durationInDays + 1 }}
                      {{ durationInDays + 1 > 1 ? "days" : "day" }}
                    </div></v-col
                  >
                </v-row>
                <v-divider></v-divider>
                <v-row class="display-1">
                  <v-col cols="4"><div>Total</div></v-col>
                  <v-col cols="8"
                    ><div class="text-right">
                      {{ totalPrice.toFixed(2) }}€
                    </div></v-col
                  >
                </v-row>
              </v-container>
            </v-sheet>
            <div class="text-center">
              <v-btn
                class="text-center"
                rounded
                color="green"
                dark
                @click="submit"
              >
                Rent boat
              </v-btn>
            </div>
          </v-col>
        </v-sheet>
      </v-col>
      <v-divider vertical class="hidden-sm-and-down"></v-divider>
      <v-col class="hidden-sm-and-down grey lighten-4">
        <v-sheet class="ma-4" elevation="1">
          <v-container>
            <v-row>
              <v-col
                ><div class="headline text-center">Order Summary</div></v-col
              >
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="2"><v-icon>directions_boat</v-icon></v-col>
              <v-col cols="10"
                ><div class="text-truncate text-right">
                  {{ currBoat.name }}
                </div></v-col
              >
            </v-row>
            <v-row>
              <v-col cols="2"><v-icon>today</v-icon></v-col>
              <v-col cols="10"
                ><div class="text-truncate text-right">
                  {{ startDate }} ~ {{ endDate }}
                </div></v-col
              >
            </v-row>
            <v-row>
              <v-col cols="2"><v-icon>schedule</v-icon></v-col>
              <v-col cols="10"
                ><div class="text-truncate text-right">
                  {{ durationInDays + 1 }}
                  {{ durationInDays + 1 > 1 ? "days" : "day" }}
                </div></v-col
              >
            </v-row>
            <v-divider></v-divider>
            <v-row class="display-1">
              <v-col cols="4"><div>Total</div></v-col>
              <v-col cols="8"
                ><div class="text-right">
                  {{ totalPrice.toFixed(2) }}€
                </div></v-col
              >
            </v-row>
          </v-container>
        </v-sheet>
        <div class="text-center">
          <v-btn class="text-center" rounded color="green" dark @click="submit">
            Rent boat
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  name: "RentalPayment",
  data: () => ({
    panel: [0],
    dialog: false,
    slideModel: null,
    newBillingInfo: {
      address: "",
      zipCode: "",
      city: "",
      country: "",
    },
    activeBillingInfo: 0,
    billingInfo: {
      address: "",
      zipCode: "",
      city: "",
      country: "",
    },
    countryList: [
      "Afghanistan",
      "Albania",
      "Algeria",
      "American Samoa",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antarctica",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bonaire, Sint Eustatius and Saba",
      "Bosnia and Herzegovina",
      "Botswana",
      "Bouvet Island",
      "Brazil",
      "British Indian Ocean Territory",
      "Brunei Darussalam",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cabo Verde",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cayman Islands",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Christmas Island",
      "Cocos Islands",
      "Colombia",
      "Comoros",
      "Congo",
      "Congo",
      "Cook Islands",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Curaçao",
      "Cyprus",
      "Czechia",
      "Côte d'Ivoire",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Eswatini",
      "Ethiopia",
      "Falkland Islands",
      "Faroe Islands",
      "Fiji",
      "Finland",
      "France",
      "French Guiana",
      "French Polynesia",
      "French Southern Territories",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Heard Island and McDonald Islands",
      "Holy See",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "South Korea",
      "Kuwait",
      "Kyrgyzstan",
      "Lao People's Democratic Republic",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macao",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Martinique",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Mexico",
      "Micronesia",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Niue",
      "Norfolk Island",
      "Northern Mariana Islands",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestine, State of",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Pitcairn",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Republic of North Macedonia",
      "Romania",
      "Russian Federation",
      "Rwanda",
      "Réunion",
      "Saint Barthélemy",
      "Saint Helena, Ascension and Tristan da Cunha",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Martin",
      "Saint Pierre and Miquelon",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Sint Maarten",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Georgia and the South Sandwich Islands",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Svalbard and Jan Mayen",
      "Sweden",
      "Switzerland",
      "Syrian Arab Republic",
      "Taiwan",
      "Tajikistan",
      "Tanzania, United Republic of",
      "Thailand",
      "Timor-Leste",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks and Caicos Islands",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom of Great Britain and Northern Ireland",
      "United States Minor Outlying Islands",
      "United States of America",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela",
      "Viet Nam",
      "Virgin Islands (British)",
      "Virgin Islands (U.S.)",
      "Wallis and Futuna",
      "Western Sahara",
      "Yemen",
      "Zambia",
      "Zimbabwe",
      "Åland Islands",
    ],
  }),
  validations: {
    newBillingInfo: {
      address: { required },
      zipCode: { required, numeric },
      city: { required },
      country: { required },
    },
  },
  props: ["boatId", "startDate", "endDate"],
  computed: {
    ...mapGetters([
      "user",
      "currBoat",
      "hasSuccessfullyCreatedRental",
      "billingInformationArray",
    ]),
    addressErrors() {
      const errors = [];
      if (!this.$v.newBillingInfo.address.$dirty) return errors;
      !this.$v.newBillingInfo.address.required &&
        errors.push("You must provide an address.");
      return errors;
    },
    zipCodeErrors() {
      const errors = [];
      if (!this.$v.newBillingInfo.zipCode.$dirty) return errors;
      !this.$v.newBillingInfo.zipCode.required &&
        errors.push("You must provide a zip code.");
      !this.$v.newBillingInfo.zipCode.numeric &&
        errors.push("You must provide a valid zip code.");
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.newBillingInfo.city.$dirty) return errors;
      !this.$v.newBillingInfo.city.required &&
        errors.push("You must provide a city.");
      return errors;
    },
    countryErrors() {
      const errors = [];
      if (!this.$v.newBillingInfo.country.$dirty) return errors;
      !this.$v.newBillingInfo.country.required &&
        errors.push("You must provide a country.");
      return errors;
    },
    totalPrice() {
      return this.currBoat.pricePerDay * (this.durationInDays + 1);
    },
    durationInDays() {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      return Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24));
    },
    userBillingInfo() {
      return this.billingInformationArray;
    },
  },
  methods: {
    ...mapActions([
      "createRental",
      "fetchBoatById",
      "fetchBillingInformation",
      "createBillingInformation",
    ]),
    clearObject(obj) {
      for (const key of Object.keys(obj)) {
        obj[key] = "";
      }
    },
    async submitBillingInfo() {
      this.$v.newBillingInfo.$touch();
      if (this.$v.newBillingInfo.$invalid) {
        //invalid data
      } else {
        const data = JSON.parse(JSON.stringify(this.newBillingInfo));
        await this.createBillingInformation({ ...data, id: this.user.id});
        this.dialog = false;
        this.$v.$reset();
        this.clearObject(this.newBillingInfo)
      }
    },
    selectBillingInfo(idx) {
      this.activeBbillingInfo = idx;
      const selectedBillingInfo = this.userBillingInfo[idx];
      if (selectedBillingInfo) {
        this.billingInfo = {
          ...selectedBillingInfo,
        };
      }
    },
    async submit() {
      try {
        await this.createRental({
          startDate: this.startDate,
          durationInDays: `P${this.durationInDays}D`,
          boatId: this.boatId,
        });
      } catch (e) {
        this.$router.push("/notFound");
      }

      if (this.hasSuccessfullyCreatedRental) {
        this.$router.push("/clientDashboard/upcomingRentals"); //change
      }
    },
  },
  async mounted() {
    await this.fetchBoatById(this.boatId);
    await this.fetchBillingInformation(this.user.id);
  },
};
</script>

<style>
.payment-sheet {
  min-height: 85vh;
}
.stretch {
  align-items: stretch;
}
.billing-card > * {
  padding: 0;
}
</style>