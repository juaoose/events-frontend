
<template>
  <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" fixed clipped app permanent>
    <v-list-item class="px-2">
      <v-icon>mdi-dots-vertical</v-icon>
      <v-list-item-title>Event Shop</v-list-item-title>
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="item in availableOptions" :key="item.title" :to="{name : item.name}" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  components: {},
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Home",
          icon: "mdi-home-city",
          name: "home",
          requiresLogin: false,
        },
        {
          title: "Events",
          icon: "mdi-calendar",
          name: "events",
          requiresLogin: false,
        },
        {
          title: "Tickets",
          icon: "mdi-ticket",
          name: "segments",
          requiresLogin: true,
        },
        {
          title: "Login",
          icon: "mdi-login",
          name: "login",
          requiresLogin: false,
        },
        {
          title: "Logout",
          icon: "mdi-logout",
          name: "logout",
          requiresLogin: true,
        },
      ],
      mini: true,
    };
  },
  computed: {
    availableOptions: function () {
      const isLoggedIn = this.$store.getters.isLoggedIn;
      return this.items.filter((item) => item.requiresLogin === isLoggedIn);
    },
  },
};
</script>