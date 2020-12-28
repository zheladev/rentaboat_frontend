<template>
  <v-container>
      Process rental payment and commit it to backend here
      {{boatId}}, {{startDate}}, {{endDate}}
  </v-container>
</template>

<script>
export default {
    name: 'RentalPayment',
    data: () => ({

    }),
    props: ["boatId"],
    computed: {
        startDate() {
            return this.$route.query.startDate;
        },
        endDate() {
            return this.$route.query.endDate;
        }
    },
    mounted() {
        console.log(this.id)
    }
}
</script>

<style>

</style>