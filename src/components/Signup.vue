<template>
  <v-layout align-center justify-center>
    <v-flex class="login-form">
      <div class="login-form-header-container">
        <v-icon>directions_boat</v-icon>
      </div>

      <v-card class="login-form-card" light>
        <v-card-text subheading> Register a new Rentaboat account </v-card-text>
        <form @submit.prevent>
          <v-divider></v-divider>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            prepend-icon="email"
            placeholder="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          />
          <v-text-field
            v-model="username"
            :error-messages="usernameErrors"
            prepend-icon="person"
            placeholder="Username"
            required
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
          />
          <v-row>
            <v-col cols="5 py-0">
              <v-text-field
                v-model="firstName"
                :error-messages="firstNameErrors"
                prepend-icon="perm_contact_calendar"
                placeholder="First name"
                required
                @input="$v.firstName.$touch()"
                @blur="$v.firstName.$touch()"
              />
            </v-col>
            <v-col cols="7 py-0">
              <v-text-field
                v-model="lastName"
                :error-messages="lastNameErrors"
                placeholder="Last name"
                required
                @input="$v.lastName.$touch()"
                @blur="$v.lastName.$touch()"
              />
            </v-col>
          </v-row>

          <v-text-field
            v-model="address"
            :error-messages="addressErrors"
            prepend-icon="apartment"
            placeholder="Address"
            required
            @input="$v.address.$touch()"
            @blur="$v.address.$touch()"
          />
          <v-row>
            <v-col cols="6 py-0">
              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                prepend-icon="lock"
                placeholder="Password"
                type="password"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              />
            </v-col>
            <v-col cols="6 py-0">
              <v-text-field
                v-model="repeatPassword"
                :error-messages="repeatPasswordErrors"
                placeholder="Repeat password"
                required
                type="password"
                @input="$v.repeatPassword.$touch()"
                @blur="$v.repeatPassword.$touch()"
              />
            </v-col>
          </v-row>
          <v-btn block v-on:click="submit" type="submit">Register</v-btn>
        </form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email, sameAs } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  mixins: [validationMixin],
  name: "Signup",
  data() {
    return {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      address: "",
      password: "",
      repeatPassword: "",
    };
  },
  validations: { //TODO: properly set constraints for fields
    email: { required, email },
    username: { required },
    firstName: { required },
    lastName: { required },
    address: { required },
    password: { required },
    repeatPassword: { required, sameAsPassword: sameAs("password") },
  },
  computed: {
    ...mapGetters(["hasSuccessfullyRegistered"]),
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("You must provide a name.");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("You must provide a surname.");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      !this.$v.address.required && errors.push("Address is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("You must provide a password.");
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;
      !this.$v.repeatPassword.required &&
        errors.push("This field is required.");
      !this.$v.repeatPassword.sameAsPassword &&
        errors.push("Passwords must be identical.");
      return errors;
    },
  },
  methods: {
    ...mapActions(["signup"]),
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.password = "";
        this.repeatPassword = "";
      } else {
        //validated
        await this.signup({
          email: this.email,
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          password: this.password,
          userType: 3,
        });
        if (this.hasSuccessfullyRegistered) {
          this.$router.push("/login");
        } else {
          //TODO: handle registration failure
          console.log("something went wrong dude");
        }
      }
    },
    clear() {
      this.$v.$reset();
      this.password = "";
      this.repeatPassword = "";
    },
  },
};
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