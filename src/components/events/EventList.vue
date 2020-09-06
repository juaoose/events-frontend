<template>
  <v-data-table :headers="headers" :items="retrieveEvents" sort-by="date" class="elevation-1">
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
                  <v-text-field
                    type="number"
                    v-model="editedItem.maxCapacity"
                    label="Max. Capacity"
                  ></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                  <v-text-field type="datetime-local" v-model="editedItem.date" label="Date"></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.location" label="Location"></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                  <v-text-field type="number" v-model="editedItem.price" label="Price"></v-text-field>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                  <v-file-input accept="image/*" @change="handleImage" label="Image"></v-file-input>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn :disabled="loadingImage" color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.epoch="{ item }">{{createDate(item.epoch)}}</template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small color="red" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:item.image="{ item }">
      <v-btn icon :href="item.image" target="_blank">Open</v-btn>
    </template>
    <template v-slot:no-data>
      <div>No events found</div>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    loadingImage: false,
    headers: [
      {
        text: 'Title',
        align: 'start',
        sortable: false,
        value: 'title'
      },
      { text: 'Description', sortable: false, value: 'description' },
      { text: 'Date', value: 'date' },
      { text: 'Max Capacity', value: 'maxCapacity' },
      { text: 'Image', sortable: false, value: 'image' },
      { text: 'Actions', sortable: false, value: 'actions' }
    ],
    editedIndex: -1,
    editedItem: {
      id: 0,
      title: '',
      date: Date.now(),
      description: '',
      maxCapacity: 0,
      price: 0,
      organizer: 0,
      image: '',
      encodedImage: ''
    },
    defaultItem: {
      title: '',
      date: Date.now(),
      description: '',
      maxCapacity: 0,
      price: 0,
      organizer: 0,
      image: '',
      encodedImage: ''
    }
  }),

  mounted () {
    this.defaultItem.organizer = this.$store.getters.getUserId
    this.editedItem.organizer = this.$store.getters.getUserId
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Event' : 'Edit Event'
    },
    retrieveEvents () {
      return this.$store.getters.listEvents
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.$store.dispatch('retrieveEvents')
  },

  methods: {
    editItem (item) {
      this.editedIndex = 1
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      confirm('Are you sure you want to delete this item?') &&
        this.$store.dispatch('deleteEvent', item.id)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex === 1) {
        this.$store.dispatch('updateEvent', this.editedItem)
      } else {
        this.$store.dispatch('createEvent', this.editedItem)
      }
      this.close()
    },
    createDate (epoch) {
      return new Date(epoch * 1000).toLocaleDateString('es-CO')
    },
    async handleImage (event, file) {
      this.loadingImage = true
      const image = await this.readFileAsync(event)
      this.editedItem.encodedImage = image
      this.loadingImage = false
    },
    readFileAsync (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.onerror = reject
        reader.readAsBinaryString(file)
      })
    }
  }
}
</script>
