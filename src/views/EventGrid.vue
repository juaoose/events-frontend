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
              :src="card.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>
            <v-card-subtitle v-text="card.description"></v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" :retain-focus="false" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" text>Get ticket</v-btn>
                </template>

                <v-card>
                  <v-img
                    :src="card.image"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                  >
                    <v-card-title>Confirm purchase</v-card-title>
                  </v-img>
                  <br />
                  <v-card-subtitle>
                    <b>Description:</b>
                    {{card.description}}
                  </v-card-subtitle>
                  <v-card-subtitle>
                    <b>When:</b>
                    {{card.date}}
                  </v-card-subtitle>
                  <v-card-subtitle>
                    <b>Where:</b>
                    {{card.location}}
                  </v-card-subtitle>
                  <v-card-text>The cost of the ticket is {{card.price}} USD</v-card-text>
                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="purchase(card)">Buy</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
    dialog: false,
    searchText: "",
    flex: 3,
  }),
  created() {
    this.$store.dispatch("retrieveEvents");
  },
  computed: {
    retrieveEvents() {
      return this.$store.getters.filteredEvents(this.searchText);
    },
  },
  methods: {
    filter(event) {
      this.searchText = event;
    },
    purchase(card) {
      console.log(card);
      this.dialog = false;
      const userId = this.$store.getters.getUserId;
      const newTicket = { eventId: card.id, buyerId: userId };
      console.log(newTicket);
      this.$store.dispatch("createTicket", newTicket);
    },
  },
};
</script>
