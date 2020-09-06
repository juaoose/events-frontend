<template>
  <v-app id="inspire">
    <v-snackbar v-model="showErrorSnackbar">
      {{ errorSnackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="showErrorSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Create an account</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-alert v-if="showErrorAlert" outlined type="error">{{alertMessage}}</v-alert>
              <v-form id="register-form" @submit.prevent="register">
                <v-text-field
                  label="Login"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="username"
                ></v-text-field>

                <v-text-field
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="email"
                  v-model="email"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                ></v-text-field>

                <v-text-field
                  id="password-repeat"
                  label="Repeat password"
                  name="passwordRepeat"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="passwordRepeat"
                  @input="verifyPasswords"
                ></v-text-field>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" form="register-form" color="primary">Register</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      showErrorSnackbar: false,
      errorSnackbarText: '',
      showErrorAlert: false,
      alertMessage: '',
      username: '',
      email: '',
      password: '',
      passwordRepeat: ''
    }
  },
  methods: {
    verifyPasswords () {
      if (this.passwordRepeat !== this.password) {
        this.showErrorAlert = true
        this.alertMessage = 'Passwords must match'
      } else {
        this.showErrorAlert = false
      }
    },
    async register () {
      try {
        await this.$store.dispatch('register', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        this.$router.push({ name: 'login' })
      } catch (error) {
        this.showErrorSnackbar = true
        this.username = ''
        this.password = ''
        this.passwordRepeat = ''
        if (error.response.status === 401) {
          this.errorSnackbarText = 'Incorrect login information'
        } else {
          this.errorSnackbarText = 'Unknown login error'
        }
      }
    }
  }
}
</script>
