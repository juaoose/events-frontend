<template>
  <div>
    <v-toolbar>
      <v-text-field :v-model="searchText" @input="filter" hide-details single-line>Search</v-text-field>
      <v-btn v-if="isLoggedIn" icon @click="newEventDialog()">
        <v-icon large>mdi-plus-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid>
      <EventEditor
        :eventProp="currentEvent"
        :enabledProp="editorDialog"
        :newEvent="newEvent"
        @close="editorDialog=false"
      />
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
            <v-card-text>
              <v-icon>mdi-clock</v-icon>
              {{formatDate(event.date)}}
              <v-icon>mdi-map-marker</v-icon>
              {{event.location}}
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="isEditable(event)" @click="editEventDialog(event)" icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn v-if="isEditable(event)" @click="deleteItem(event)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-tooltip v-if="isLoggedIn && ticketsPurchased(event.id)" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="green" dark v-bind="attrs" v-on="on">mdi-calendar-check</v-icon>
                </template>
                <span>You have tickets to this event</span>
              </v-tooltip>
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
import moment from 'moment'

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
    if (this.$store.getters.isLoggedIn) {
      this.$store.dispatch('retrieveTickets', this.$store.getters.getUserId)
    }
  },
  computed: {
    retrieveEvents () {
      return this.$store.getters.filteredEvents(this.searchText)
    },
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    filter (event) {
      this.searchText = event
    },
    ticketsPurchased (eventId) {
      if (this.$store.getters.isLoggedIn) {
        const userTickets = this.$store.getters.listTickets
        return userTickets.some((ticket) => ticket.eventId === eventId)
      }
      return false
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
    },
    formatDate (date) {
      return moment(date).format('lll')
    }
  }
}
</script>
