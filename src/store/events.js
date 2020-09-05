import axios from 'axios'

axios.defaults.baseURL = ''

export default {
  state: {
    events: []
  },
  getters: {
    listEvents(state) {
      return state.event
    }

  },
  mutations: {
    createEvent(state, event) {
      state.event.push(event)
    },
    editEvent(state, event) {
      const index = state.event.findIndex(item => item.id == event.id)
      state.event.splice(index, 1, event)
    },
    removeEvent(state, id) {
      const index = state.events.findIndex(item => item.id == id)
      state.event.splice(index, 1)
    },
    retrieveEvents(state, events) {
      state.events = events;
    }

  },
  actions: {
    retrieveEvents(context) {
      axios.get('/events')
        .then(response => context.commit('retrieveEvents', response.data))
        .catch(error => console.log(error))
    },
    createEvent(context, event) {
      const accessToken = ''
      axios.post('/events', event, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(response => context.commit('createEvent', response.data))
        .catch(error => console.log(error))
    },
    deleteEvent(context, id) {
      axios.delete('/events' + id)
        .then(context.commit('deleteEvent', id))
        .catch(error => console.log(error))
    }
  }
}