<template>
  <v-container fluid class="no-padding">
    <parallax-image height="300" img="https://images.reference.com/amg-cms-reference-images/media/oceans-seas-surround-africa_ac189a10d9c855c0.jpg">
        <v-col class="text-center px-0" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">Rentaboat</h1>
          <h4 class="subheading">Building bridges beween people.</h4>
        </v-col>
    </parallax-image>
    <v-container fluid class="content-container no-padding">
      <v-container fluid class="even">
        <div class="display-1 py-2">Concept</div>
        <p>
          At Rentaboat, our goal is to connect people with matching necessities.
        </p>
        <ol>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, hic! Iusto sunt aperiam quidem vel nisi natus cumque vitae ipsam libero earum quas voluptate dicta, veritatis et, sit excepturi rem!</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, eum impedit quos tenetur fugit repellat, quam provident doloribus voluptatem tempora unde consectetur dicta inventore quae iure aliquid nobis dignissimos atque!</li>
        </ol>
      </v-container>
      <v-divider></v-divider>
      <v-container fluid class="odd">
        <div class="display-1 py-2">Motivation</div>
        <p>I just want my degree, maaaaaaan.</p>
      </v-container>
      <v-divider></v-divider>
      <v-container fluid class="even">
        <h2>Lorem ipsum</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          neque culpa natus velit? Porro alias saepe illum, facilis voluptatem
          vel cumque eius hic ullam quidem quis quaerat perspiciatis omnis
          temporibus!.
        </p>
      </v-container>
      <v-divider></v-divider>
      <v-container fluid class="odd">
        <div class="display-1 py-2">What do we want?</div>
        <p>
          The gradual phase-out of animal testing over the next three years.
        </p>
      </v-container>
      <v-divider></v-divider>
      <v-container fluid class="even">
        <div class="display-1 py-2">When do we want it?</div>
        <p>Over the next three years.</p>
      </v-container>
      <v-divider></v-divider>
      <v-container fluid class="odd">
        <div class="display-1 py-2">About the author</div>
        <p>Zhel is a pretty cool guy — Someone, sometime.</p>
      </v-container>
    </v-container>
  </v-container>
</template>

<script>

import ParallaxImage from '@/components/common/ParallaxImage.vue';
export default {
  components: { ParallaxImage },
    name: 'About'
}
</script>

<style scoped>
.parallax {
    background-color: rgba(0, 0, 0, 0.281);
}
.no-padding {
  padding: 0px;
}
.parallax-text {
  padding-left: 0px;
  padding-right: 0px;
}
.content-container > div {
  padding: 5em;
}
.content-container > div {
  padding: 5em;
}
.content-container > .even {
  background-color: aliceblue;
}
.content-container > .odd {
  background-color: rgb(206, 217, 226);
}
</style>

<style>
.v-parallax__content {
    padding: 0px 0px !important;
}
</style>