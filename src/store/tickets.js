import axios from 'axios'

axios.defaults.baseURL = process.env.SERVICE_URL
const TICKETS_BASE_PATH = '/api/tickets/'

export default {
  state: {
    tickets: []
  },
  getters: {
    listTickets(state) {
      return state.tickets
    }
  },
  mutations: {
    createTicket(state, ticket) {
      state.tickets.push(ticket)
    },
    retrieveTickets(state, tickets) {
      state.tickets = tickets;
    }

  },
  actions: {
    async retrieveTickets(context, userId) {
      try {
        const response = await axios.get(TICKETS_BASE_PATH + '?userId=' + userId)
        context.commit('retrieveTickets', response.data)
      }
      catch (error) {
        console.log(error)
      }
    },
    async createTicket(context, ticket) {
      const accessToken = localStorage.getItem('access_token')
      try {
        const response = await axios.post(TICKETS_BASE_PATH, ticket, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        ticket.id = response.data.id
        context.commit('createTicket', ticket)
      }
      catch (error) {
        console.log(error)
      }
    }
  }
}