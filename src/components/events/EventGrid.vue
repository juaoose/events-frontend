<template>
  <div>
    <v-toolbar>
      <v-text-field :v-model="searchText" @input="filter" hide-details single-line></v-text-field>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid>
      <EventEditor :eventProp="currentEvent" :enabledProp="editorDialog" :newEvent="newEvent" @close="editorDialog=false"/>
      <EventDetail :eventProp="currentEvent" :enabledProp="dialog" @close="dialog=false" />
      <v-row>
        <v-col v-for="event in retrieveEvents" :key="event.title" :cols="flex">
          <v-card max-width="350px">
            <v-img
              :src="event.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="event.title"></v-card-title>
            </v-img>
            <v-card-subtitle v-text="event.description"></v-card-subtitle>
            <v-card-actions>
              <v-btn v-if="isEditable(event)" @click="editEventDialog(event)" icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn v-if="isEditable(event)" @click="deleteItem(event)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="detailDialog(event)" text>Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EventDetail from './EventDetail.vue'
import EventEditor from './EventEditor'

export default {
  components: {
    EventDetail,
    EventEditor
  },
  data: () => ({
    currentEvent: {},
    newEvent: true,
    dialog: false,
    editorDialog: false,
    searchText: '',
    flex: 3
  }),
  created () {
    this.$store.dispatch('retrieveEvents')
  },
  computed: {
    retrieveEvents () {
      return this.$store.getters.filteredEvents(this.searchText)
    }

  },
  methods: {
    filter (event) {
      this.searchText = event
    },
    detailDialog (event) {
      this.currentEvent = event
      this.dialog = true
    },
    editEventDialog (event) {
      this.currentEvent = event
      this.newEvent = false
      this.editorDialog = true
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
      this.editorDialog = true
    },
    isEditable (event) {
      return this.$store.getters.getUserId === event.organizer
    },
    deleteItem (event) {
      confirm('Are you sure you want to delete this item?') &&
        this.$store.dispatch('deleteEvent', event.id)
    }
  }
}
</script>
