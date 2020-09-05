<template>
  <v-app dark>
    <Sidebar />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
  name: "App",
  components: { Sidebar },
  data() {
    return {
      //
    };
  },
};
</script>