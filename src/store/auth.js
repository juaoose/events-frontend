import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8081'

export default {
  state: {
    userId: localStorage.getItem('user_id') || null,
    userName: localStorage.getItem('user_name') || null,
    token: localStorage.getItem('access_token') || null
  },
  getters: {
    isLoggedIn(state) {
      return state.token !== null
    },
    getAccessToken(state) {
      return state.token
    },
    getUserId(state) {
      return state.userId
    }

  },
  mutations: {
    retrieveToken(state, authInfo) {
      state.token = authInfo.token
      state.userId = authInfo.id
      state.userName = authInfo.username
    },
    removeToken(state) {
      state.token = null
      state.userId = null
      state.userName = null
    }

  },
  actions: {
    async retrieveToken(context, credentials) {
      const response = await axios.post('/api/users/login', {
        username: credentials.username,
        password: credentials.password
      })
      const token = response.data.token
      localStorage.setItem('access_token', token)
      context.commit('retrieveToken', response.data)
      return response

    },
    removeToken(context) {
      if (context.getters.isLoggedIn) {
        localStorage.removeItem('access_token')
        context.commit('removeToken')
      }
    }
  }
}