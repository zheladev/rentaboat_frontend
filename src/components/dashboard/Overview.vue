<template>
  <v-container fluid pa-0>
    <v-container class="content-section-container">
      <div class="headline">
        <span class="capitalize">{{ user.username }}</span
        >'s User Panel
      </div>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <v-img
              cols="12"
              sm="8"
              height="200"
              width="200"
              :src="getFilePath(user.path)"
            >
            </v-img>
          </v-col>
          <v-col>
            <v-row>
              <v-col class="pb-0">
                <div class="display-1 font-weight-light capitalize">
                  {{ user.firstName }} {{ user.lastName }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="text-subtitle-1">
                  <span class="email">{{ user.email }}</span> -
                  <span class="capitalize grey--text text--darken-1">{{
                    user.userType.name
                  }}</span>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-sheet elevation="1" class="grey lighten-4">
              <v-row>
                <v-col>
                  <div class="text-h5 text-center">Actions</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col align="center" v-for="(item, i) in menuItems" :key="i">
                  <v-sheet height="100" width="100" class="grey lighten-4">
                    <v-row
                      class="fill-height mx-0"
                      align="center"
                      justify="center"
                    >
                      <v-btn
                        size="54"
                        icon
                        text
                        link
                        :to="{ name: item.link }"
                        exact
                      >
                        <v-icon size="54">{{ item.icon }}</v-icon>
                      </v-btn>
                    </v-row>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-container>
</template>

<script>
import { fileRetrievalMixin } from "@/mixins/fileRetrievalMixin";
import { mapGetters } from "vuex";
export default {
  mixins: [fileRetrievalMixin],
  name: "Overview",
  data: () => ({
    ownerMenuItems: [
      {
        title: "Your boats",
        link: "ownerBoats",
        icon: "directions_boat",
      },
      {
        title: "View upcoming rentals",
        link: "ownerUpcomingRentals",
        icon: "today",
      },
      {
        title: "View past rentals",
        link: "ownerRentalHistory",
        icon: "restore",
      },
      {
        title: "Messages",
        link: "ownerMessages",
        icon: "message",
      },
      {
        title: "Contact support",
        link: "ownerSupport",
        icon: "help",
      },
    ],
    userMenuItems: [
      {
        title: "View upcoming rentals",
        link: "upcomingRentals",
        icon: "today",
      },
      {
        title: "View past rentals",
        link: "rentalHistory",
        icon: "restore",
      },
      {
        title: "Messages",
        link: "clientMessages",
        icon: "message",
      },
      {
        title: "Become an owner",
        link: "upgradeAccount",
        icon: "upgrade",
      },
      {
        title: "Contact support",
        link: "clientSupport",
        icon: "help",
      },
    ],
  }),
  computed: {
    ...mapGetters(["user"]),
    menuItems() {
      let menuItems = [];
      switch (this.user.userType.intValue) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          menuItems = this.ownerMenuItems;
          break;
        case 3:
          menuItems = this.userMenuItems;
          break;
        default:
          break;
      }
      return menuItems;
    },
  },
  methods: {},
};
</script>

<style scoped>
.content-section-container {
  padding: 2em 2em 1em 2em;
}
.email {
  color: rgb(6, 69, 173);
}
.capitalize {
  text-transform: capitalize;
}
</style>