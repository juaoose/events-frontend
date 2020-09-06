
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import events from './events'
import tickets from './tickets'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    events,
    auth,
    tickets
  }
})
