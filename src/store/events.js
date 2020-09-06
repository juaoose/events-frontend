import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_SERVICE_URL
const EVENTS_BASE_PATH = '/api/events/'

export default {
  state: {
    events: []
  },
  getters: {
    listEvents (state) {
      return state.events
    },
    filteredEvents: (state) => (title) => {
      return state.events.filter(event => event.title.toUpperCase().includes(title.toUpperCase()))
    },
    filteredEventsById: (state) => (eventId) => {
      return state.events.filter((event) => event.id === eventId)
    }

  },
  mutations: {
    createEvent (state, event) {
      state.events.push(event)
    },
    editEvent (state, event) {
      const index = state.events.findIndex(originalEvt => originalEvt.id === event.id)
      state.events.splice(index, 1, event)
    },
    deleteEvent (state, id) {
      const index = state.events.findIndex(originalEvt => originalEvt.id === id)
      state.events.splice(index, 1)
    },
    retrieveEvents (state, events) {
      state.events = events
    }

  },
  actions: {
    async retrieveEvents (context) {
      try {
        const response = await axios.get(EVENTS_BASE_PATH)
        context.commit('retrieveEvents', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async createEvent (context, event) {
      const accessToken = localStorage.getItem('access_token')
      try {
        const response = await axios.post(EVENTS_BASE_PATH, event, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        event.id = response.data.id
        context.commit('createEvent', event)
      } catch (error) {
        console.log(error)
      }
    },
    async updateEvent (context, event) {
      const accessToken = localStorage.getItem('access_token')
      try {
        await axios.put(EVENTS_BASE_PATH + event.id, event, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        context.commit('editEvent', event)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteEvent (context, id) {
      const accessToken = localStorage.getItem('access_token')
      try {
        await axios.delete(EVENTS_BASE_PATH + id, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        context.commit('deleteEvent', id)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
