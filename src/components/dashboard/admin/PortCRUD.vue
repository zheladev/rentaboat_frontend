<template>
  <v-container fluid pa-0>
    <v-container class="content-section-container">
      <div class="headline">Port admin panel</div>
      <v-container>
        <v-data-table
          :headers="headers"
          :items="ports"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:item.actions="{  }">
            <v-icon small class="mr-2">
              mdi-pencil
            </v-icon>
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
  name: "PortCRUD",
  data: () => ({
    dialogDelete: false,
    dialog: false,
  }),
  computed: {
    ...mapGetters(["allPorts"]),
    headers() {
      return [
        {
          text: "Port name",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Latitude",
          align: "center",
          sortable: false,
          value: "lat",
        },
        {
          text: "Longitude",
          align: "center",
          sortable: false,
          value: "long",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ];
    },
    ports() {
      return this.allPorts.map((p) => ({
        name: p.name,
        lat: p.coordinates.coordinates[0],
        long: p.coordinates.coordinates[1],
      }));
    },
  },
  methods: {
    ...mapActions(["fetchPorts"]),
  },
  async mounted() {
    await this.fetchPorts();
  },
};
</script>

<style scoped>
.content-section-container {
  padding: 2em 2em 1em 2em;
}
</style>