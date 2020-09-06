<template>
  <div>
    <v-toolbar>
      <v-text-field :v-model="searchText" @input="filter" hide-details single-line></v-text-field>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col v-for="card in retrieveEvents" :key="card.title" :cols="flex">
          <v-card max-width="350px">
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchText: "",
    flex: 3,
  }),
  created() {
    //this.$store.dispatch("retrieveEvents");
  },
  computed: {
    retrieveEvents() {
      return this.$store.getters.filteredEvents(this.searchText);
    },
  },
  methods: {
    filter(event) {
      this.searchText = event
    },
  },
};
</script>
