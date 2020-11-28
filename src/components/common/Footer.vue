<template>
  <v-footer
    class="d-block text-center"
  >
    <div flex>
      v{{ appVersion }} - By Rentaboat
      <v-icon small class="red--text mx-0 px-0">mdi-cards-heart</v-icon>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    appVersion: 0.1,
  }),
};
</script>
