import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_SERVICE_URL

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
    async register(context, user) {
      await axios.post('/api/users/', {
        username: user.username,
        email: user.email,
        password: user.password
      })
    },
    async retrieveToken(context, credentials) {
      const response = await axios.post('/api/users/login', {
        username: credentials.username,
        password: credentials.password
      })
      const token = response.data.token
      localStorage.setItem('access_token', token)
      localStorage.setItem('user_name', response.data.username)
      localStorage.setItem('user_id', response.data.id)
      context.commit('retrieveToken', response.data)
      return response

    },
    removeToken(context) {
      if (context.getters.isLoggedIn) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_name')
        localStorage.removeItem('user_id')
        context.commit('removeToken')
      }
    }
  }
}