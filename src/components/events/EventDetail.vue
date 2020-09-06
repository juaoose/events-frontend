<template>
  <v-dialog v-model="show" :retain-focus="false" width="500">
    <v-card>
      <v-img
        :src="eventProp.image"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
        <v-card-title>{{eventProp.title}}</v-card-title>
      </v-img>
      <br />
      <v-card-subtitle>
        <b>Description:</b>
        {{eventProp.description}}
      </v-card-subtitle>
      <v-card-subtitle>
        <b>When:</b>
        {{eventProp.date}}
      </v-card-subtitle>
      <v-card-subtitle>
        <b>Where:</b>
        {{eventProp.location}}
      </v-card-subtitle>
      <v-card-text>The cost of the ticket is {{eventProp.price}} USD</v-card-text>
      <v-divider />
      <v-card-actions v-if="isLoggedIn">
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="purchase(eventProp)">Buy</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'event-dialog',
  props: {
    eventProp: {
      type: Object,
      required: true
    },
    enabledProp: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    show: {
      get () {
        return this.enabledProp
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    },
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    purchase (event) {
      this.show = false
      const userId = this.$store.getters.getUserId
      const newTicket = { eventId: event.id, buyerId: userId }
      this.$store.dispatch('createTicket', newTicket)
    }
  }
}
</script>
