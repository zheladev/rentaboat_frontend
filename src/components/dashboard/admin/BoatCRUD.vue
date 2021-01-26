<template>
  <v-container fluid pa-0>
    <v-container class="content-section-container">
      <div class="headline">Boat admin panel</div>
      <v-container>
        <v-data-table :headers="headers" :items="getBoats" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-btn color="grey" dark icon class="mb-2">
                <v-icon color="grey" size="48" v-text="'add'"></v-icon>
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{}">
            <v-icon small class="mr-2"> mdi-pencil </v-icon>
            <v-icon small> mdi-delete </v-icon>
          </template>
          <v-btn color="primary"> Reset </v-btn>
        </v-data-table>
      </v-container>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BoatCRUD",
  data: () => ({
    dialogDelete: false,
    dialog: false,
  }),
  computed: {
    ...mapGetters(["allBoats"]),
    headers() {
      return [
        {
          text: "Boat name",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Price per day",
          align: "center",
          sortable: true,
          value: "pricePerDay",
        },
        {
          text: "Passenger Capacity",
          align: "center",
          sortable: false,
          value: "passengerCapacity",
        },
        {
          text: "Length",
          align: "center",
          sortable: false,
          value: "length",
        },
        {
          text: "Port",
          align: "center",
          sortable: false,
          value: "portName",
        },
        {
          text: "Owner",
          align: "center",
          sortable: false,
          value: "ownerName",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ];
    },
    getBoats() {
      console.log(this.allBoats);
      return this.allBoats.map((b) => {
        return {
          name: b.name,
          pricePerDay: b.pricePerDay,
          passengerCapacity: b.passengerCapacity,
          length: b.length,
          portName: b.port.name,
          ownerName: `${b.user.firstName} ${b.user.lastName}`,
        };
      });
    },
  },
  methods: {
    ...mapActions(["fetchBoats"]),
  },
  async mounted() {
    await this.fetchBoats({ limit: 200, page: 0 });
  },
};
</script>

<style scoped>
.content-section-container {
  padding: 2em 2em 1em 2em;
}
</style>