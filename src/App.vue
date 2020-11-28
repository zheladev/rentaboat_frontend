<template>
  <v-app style="background: #E3F2FD;">
    <Toolbar/>
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/common/Footer.vue";
import Toolbar from "./components/common/Toolbar.vue";

export default {
  name: "App",

  components: {
    Footer,
    Toolbar
  },
  
    data: () => ({
    //
  }),
};
</script>
