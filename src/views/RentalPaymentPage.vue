<template>
  <v-container fluid py-0>
      <rental-payment :boatId="boatId" :startDate="startDate" :endDate="endDate"/>
  </v-container>
</template>

<script>
import RentalPayment from "@/components/RentalPayment.vue"

export default {
    components: { RentalPayment },
    name: 'RentalPaymentPage',
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
}
</script>

<style>

</style>