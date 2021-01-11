<template>
  <v-parallax
      dark
      :src="img"
      :height="height"
    >
      <v-row align="center" justify="center" class="parallax">
        <slot></slot>
      </v-row>
    </v-parallax>
</template>

<script>
export default {
    props: ['img', 'height']
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