<template>
  <v-container fluid>
    <EventEditor
      :eventProp="currentEvent"
      :enabledProp="dialog"
      :newEvent="newEvent"
      @close="dialog=false"
    />
    <v-data-table :headers="headers" :items="retrieveEvents" sort-by="date" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Events</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="newEventDialog()">New event</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.epoch="{ item }">{{createDate(item.epoch)}}</template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editEventDialog(item)">mdi-pencil</v-icon>
        <v-icon small color="red" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:item.image="{ item }">
        <v-btn icon :href="item.image" target="_blank">Open</v-btn>
      </template>
      <template v-slot:no-data>
        <div>No events found</div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import EventEditor from './EventEditor'

export default {
  components: {
    EventEditor
  },
  data: () => ({
    dialog: false,
    newEvent: true,
    currentEvent: {},
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
    ]
  }),
  computed: {
    retrieveEvents () {
      return this.$store.getters.listEvents
    }
  },
  created () {
    this.$store.dispatch('retrieveEvents')
  },
  methods: {
    editEventDialog (event) {
      this.currentEvent = Object.assign({}, event)
      this.newEvent = false
      this.dialog = true
    },
    createDate (epoch) {
      return new Date(epoch * 1000).toLocaleDateString('es-CO')
    },
    newEventDialog () {
      this.currentEvent = {
        title: '',
        date: Date.now(),
        description: '',
        maxCapacity: 0,
        price: 0,
        organizer: this.$store.getters.getUserId,
        image: '',
        encodedImage: ''
      }
      this.newEvent = true
      this.dialog = true
    }
  }
}
</script>
