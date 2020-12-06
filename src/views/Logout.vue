<template>
  <div>Logging out...</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "Logout",
    methods: {
        ...mapActions(["logout"]),
    },
    created() {
        this.logout();
        this.$router.push('/');
    }
}
</script>

<style>

</style>