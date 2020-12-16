<template>
  <div>
    <p>{{ currBoat }}</p>
    <v-date-picker
      v-model="dates"
      range
      :min="new Date().toISOString().split('T')[0]"
      :allowed-dates="allowedDates(datePickerFormattedNotAllowedDates)"
    >
    </v-date-picker>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Boat",
  data: () => ({
    datePickerFormattedNotAllowedDates: [],
    isLoading: false,
    dates: []
  }),
  props: ["id"],
  methods: {
    ...mapActions(["fetchBoatById", "fetchRentalsByBoat"]),
    allowedDates: (datesNotAllowed) => {
      return (date) => {
        let isAllowed = true;
        if (datesNotAllowed.includes(date)) {
          isAllowed = false;
        }
        return isAllowed;
      };
    },
    getDaysArray: (start, end) => {
      for (
        var arr = [], dt = new Date(start);
        dt <= end;
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(new Date(dt));
      }
      return arr;
    },
  },
  computed: {
    ...mapGetters(["currBoat", "boatRentals"]),
  },
  mounted() {
    this.isLoading = true;
    this.fetchBoatById(this.id);
    this.fetchRentalsByBoat(this.id).then(() => {
      let formattedDates = [];
      for (let rental of this.boatRentals) {
        const startDate = new Date(rental.startDate);
        const endDate = new Date(startDate);
        endDate.setDate(
          startDate.getDate() + parseInt(rental.durationInDays.days)
        );

        const datesArr = this.getDaysArray(startDate, endDate);
        formattedDates = formattedDates.concat(
          datesArr.map((date) => date.toISOString().split("T")[0])
        );
      }
      this.datePickerFormattedNotAllowedDates = formattedDates;
    });

    this.isLoading = false;
  },
};
</script>

<style>
</style>