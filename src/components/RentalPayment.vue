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
                    <v-slide-group v-model="slideModel" show-arrows>
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
                              setBillingInfo();
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
                      <v-slide-item v-slot="{ toggle }">
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
                                          label="Address"
                                          required
                                        />
                                      </v-col>
                                    </v-row>
                                    <v-row>
                                      <v-col cols="4">
                                        <v-text-field
                                          v-model="newBillingInfo.zipCode"
                                          label="Zip Code"
                                        />
                                      </v-col>
                                      <v-col>
                                        <v-text-field
                                          v-model="newBillingInfo.city"
                                          label="City"
                                        />
                                      </v-col>
                                    </v-row>
                                    <v-row>
                                      <v-col>
                                        <v-select
                                          v-model="newBillingInfo.country"
                                          :items="countryList"
                                          label="Country"
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
                                <v-btn text @click="dialog = false">
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
              Order Summary
              <v-divider></v-divider>
              <div>{{ currBoat.name }}</div>
              <div>from: {{ startDate }}</div>
              <div>to: {{ endDate }}</div>
              <div>days: {{ durationInDays + 1 }}</div>
              <v-divider></v-divider>
              total
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
          Order Summary
          <v-divider></v-divider>
          <div>{{ currBoat.name }}</div>
          <div>from: {{ startDate }}</div>
          <div>to: {{ endDate }}</div>
          <div>days: {{ durationInDays + 1 }}</div>
          <v-divider></v-divider>
          total
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
export default {
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
  props: ["boatId", "startDate", "endDate"],
  computed: {
    ...mapGetters(["currBoat", "hasSuccessfullyCreatedRental"]),
    durationInDays() {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      return Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24));
    },
    userBillingInfo() {
      //fetch from backend once implemented
      return [
        {
          address: "C/ Falsa 123 5",
          zipCode: "45723",
          city: "Valencia",
          country: "Spain",
        },
        {
          address: "C/ Verdadera 123 5",
          zipCode: "42223",
          city: "Madrid",
          country: "Spain",
        },
        {
          address: "C/ Ik ben zurren mein zimbrelen 123 5",
          zipCode: "28374",
          city: "Den Haag",
          country: "Netherlands",
        },
        {
          address: "C/ Verdadera 123 5",
          zipCode: "42223",
          city: "Madrid",
          country: "Spain",
        },
        {
          address: "C/ Ik ben zurren mein zimbrelen 123 5",
          zipCode: "28374",
          city: "Den Haag",
          country: "Netherlands",
        },
      ];
    },
  },
  methods: {
    ...mapActions(["createRental", "fetchBoatById"]),
    setBillingInfo() {
      const selectedBillingInfo = this.userBillingInfo[this.slideModel];
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
        this.$router.push("/dashboard/upcomingRentals"); //change
      }
    },
  },
  async mounted() {
    await this.fetchBoatById(this.boatId);
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