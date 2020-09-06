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
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form id="login-form" @submit.prevent="login">
                <v-text-field
                  label="Login"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="username"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" form="login-form" color="primary">Login</v-btn>
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
  name: 'login',
  data () {
    return {
      showErrorSnackbar: false,
      errorSnackbarText: '',
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('retrieveToken', {
          username: this.username,
          password: this.password
        })
        this.$router.push({ name: 'events' })
      } catch (error) {
        this.showErrorSnackbar = true
        this.username = ''
        this.password = ''
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
