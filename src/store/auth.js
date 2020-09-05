import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8081'

export default {
  state: {
    token: localStorage.getItem('access_token') || null
  },
  getters: {
    isLoggedIn(state) {
      return state.token !== null
    }

  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    removeToken(state) {
      state.token = null
    }

  },
  actions: {
    async retrieveToken(context, credentials) {

      try {
        const response = await axios.post('/api/users/login', {
          username: credentials.username,
          password: credentials.password
        })
        const token = response.data.token
        localStorage.setItem('access_token', token)
        context.commit('retrieveToken', token)
        return response
      }
      catch (error) {
        console.log(error)
      }
    },
    removeToken(context) {
      if (context.getters.isLoggedIn) {
        localStorage.removeItem('access_token')
        context.commit('removeToken')
      }
    }
  }
}