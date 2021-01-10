<template>
  <v-parallax
      dark
      src="https://images.reference.com/amg-cms-reference-images/media/oceans-seas-surround-africa_ac189a10d9c855c0.jpg"
    >
      <v-row align="center" justify="center" class="parallax">
        <slot></slot>
      </v-row>
    </v-parallax>
</template>

<script>
export default {

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
</style>

<style>
.v-parallax__content {
    padding: 0px 0px !important;
}
</style>