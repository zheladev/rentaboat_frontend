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
          <template v-slot:top>
            <v-toolbar flat>

                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="grey"
                      dark
                      icon
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon color="grey" size="48" v-text="'add'"></v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">New port data</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Name"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Lat"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field label="long"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog=false"> Cancel </v-btn>
                      <v-btn color="blue darken-1" text @click="dialog=false"> Save </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text>Cancel</v-btn>
                      <v-btn color="blue darken-1" text>OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

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