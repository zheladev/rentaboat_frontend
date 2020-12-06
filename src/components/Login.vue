<template>
  <v-layout align-center justify-center>
      <v-flex class="login-form">
        <div class="login-form-header-container"> 
          <v-icon>directions_boat</v-icon>
        </div>

        <v-card class="login-form-card" light>
          <v-card-text subheading> Log in to Rentaboat </v-card-text>
          <v-form @submit.prevent>
            <v-text-field v-model="username" light prepend-icon="person" />
            <v-text-field
              v-model="password"
              light
              prepend-icon="lock"
              type="password"
            ></v-text-field>
            <v-btn block v-on:click="doLogin" type="submit">Sign in</v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Login',
    data: () => ({
        username: '',
        password: '',
        hasFailedLogin: false,
    }),
    computed: {
        ...mapGetters(["isLoggedIn"]),
    },
    methods: {
        ...mapActions(["login"]),
        async doLogin() {
            const loginInfo = {
                username: this.username,
                password: this.password
            }
            await this.$store.dispatch('login', loginInfo);
            console.log(this.isLoggedIn)
            if (this.isLoggedIn) {
                this.$router.push('/');
            }
        }
    },
    created() {
        if(this.isLoggedIn) {
            this.$router.push('/');
        }
    }
}
</script>

<style>
.login-form-header-container {
    text-align: center;
}

.login-form-card {
    margin-top: 1em;
    padding: 10px;
}

.login-form {
    max-width: 500px;
}
</style>