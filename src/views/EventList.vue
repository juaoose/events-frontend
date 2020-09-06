<template>
  <v-data-table :headers="headers" :items="retrieveEvents" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Events</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New event</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.maxCapacity" label="Max. Capacity"></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.date" label="Date"></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.location" label="Location"></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.currency" label="Currency"></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.epoch="{item}">{{createDate(item.epoch)}}</template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Title",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "Date", value: "date" },
      { text: "Max Capacity", value: "maxCapacity" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id: 0,
      title: "",
      date: 0,
      description: "",
      maxCapacity: 0,
      price: 0,
      currency: "USD",
      organizer: "LaMonta",
    },
    defaultItem: {
      title: "",
      date: 0,
      description: "",
      maxCapacity: 0,
      price: 0,
      currency: "USD",
      organizer: "LaMonta",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Event" : "Edit Event";
    },
    retrieveEvents() {
      return this.$store.getters.listEvents;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.$store.dispatch("retrieveEvents");
  },

  methods: {
    editItem(item) {
      this.editedIndex = 1;
      console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch("deleteEvent", item.id);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      console.log("editedIndex " + this.editedIndex);
      if (this.editedIndex === 1) {
        this.$store.dispatch("updateEvent", this.editedItem);
      } else {
        this.$store.dispatch("createEvent", this.editedItem);
      }
      this.close();
    },

    createDate(epoch) {
      return new Date(epoch * 1000).toLocaleDateString("es-CO");
    },

    seeResults(input) {
      this.$router.push({ name: "results", params: { eventId: input.id } });
    },
  },
};
</script>