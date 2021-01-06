<template>
  <h2>Owner Boat {{boatId}}</h2>
</template>

<script>
export default {
    name: 'OwnerBoat',
    props: ["id"]
}
</script>

<style scoped>
.content-section-container {
  padding: 2em 2em 1em 2em;
}
</style>