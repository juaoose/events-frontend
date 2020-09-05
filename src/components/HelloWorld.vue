<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to the event shop!</h1>

        <br />
        <p>This site allows you to browse and buy tickets to several events around the globe.</p>
        <br />
        <div class="my-2">
          <v-btn large color="primary" to="/events">Browse events</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>
