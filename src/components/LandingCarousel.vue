<template>
  <v-container>
    <v-carousel>
      <v-carousel-item
        v-for="(image, i) in carouselImages"
        :key="i"
        :src="image.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      />
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: "LandingCarousel",
  data: () => ({
    carouselImages: [
      {
        src:
          "https://www.quicksilver-boats.com/media/385689/875-cruiser-running-0012_b_1920x1080px.jpg",
      },
      {
        src:
          "https://southernboating.com/wp-content/uploads/2019/11/New-running-530-0832-1024x600.jpg",
      },
      {
        src:
          "https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/18/2020/01/botnia-targa-25-1-outboard-powered-boat-review-running-shot-credit-richard-langdon.jpg",
      },
    ],
  }),
};
</script>

<style>
</style>