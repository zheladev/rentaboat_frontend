<template>
  <v-container fluid class="no-padding">
    <v-parallax
      dark
      src="https://images.reference.com/amg-cms-reference-images/media/oceans-seas-surround-africa_ac189a10d9c855c0.jpg"
    >
      <v-row align="center" justify="center" class="parallax">
        <v-col class="text-center parallax-text" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">Rentaboat</h1>
          <h4 class="subheading">Building bridges beween people.</h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container fluid class="content-container no-padding">
      <v-container fluid class="even">
        <h2>Concept</h2>
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
        <h2>Motivation</h2>
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
        <h2>What do we want?</h2>
        <p>
          The gradual phase-out of animal testing over the next three years.
        </p>
      </v-container>
      <v-divider></v-divider>
      <v-container fluid class="even">
        <h2>When do we want it?</h2>
        <p>Over the next three years.</p>
      </v-container>
      <v-divider></v-divider>
      <v-container fluid class="odd">
        <h2>About the author.</h2>
        <p>Zhel is a pretty cool guy — Someone, sometime.</p>
      </v-container>
    </v-container>
  </v-container>
</template>

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