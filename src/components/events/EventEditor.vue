<template>
  <v-dialog v-model="show" :retain-focus="false" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ getTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row cols="12" sm="6" md="4">
            <v-text-field v-model="eventProp.title" label="Title"></v-text-field>
          </v-row>
          <v-row cols="12" sm="6" md="4">
            <v-text-field v-model="eventProp.description" label="Description"></v-text-field>
          </v-row>
          <v-row cols="12" sm="6" md="4">
            <v-text-field type="number" v-model="eventProp.maxCapacity" label="Max. Capacity"></v-text-field>
          </v-row>
          <v-row cols="12" sm="6" md="4">
            <v-text-field type="datetime-local" v-model="eventProp.date" label="Date"></v-text-field>
          </v-row>
          <v-row cols="12" sm="6" md="4">
            <v-text-field v-model="eventProp.location" label="Location"></v-text-field>
          </v-row>
          <v-row cols="12" sm="6" md="4">
            <v-text-field type="number" v-model="eventProp.price" label="Price"></v-text-field>
          </v-row>
          <v-row cols="12" sm="6" md="4">
            <v-file-input accept="image/*" @change="handleImage" label="Image"></v-file-input>
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
</template>

<script>
export default {
  name: 'event-editor',
  props: {
    eventProp: {
      type: Object,
      required: true
    },
    newEvent: {
      type: Boolean,
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
    getTitle () {
      return this.newEvent ? 'New event' : 'Edit event'
    }
  },
  methods: {
    save () {
      if (!this.newEvent) {
        this.$store.dispatch('updateEvent', this.eventProp)
      } else {
        this.$store.dispatch('createEvent', this.eventProp)
      }
      this.show = false
      this.close()
    },
    close () {
      this.show = false
    },
    async handleImage (event) {
      const image = await this.readFileAsync(event)
      this.eventProp.encodedImage = image
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
