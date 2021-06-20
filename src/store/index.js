import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const state = {
  isLogged:false,
  role:null,
  id:null,
}

const mutations = {

  set (state, [variable, value]) {
    state[variable] = value
  }
}

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state,
  mutations
})
