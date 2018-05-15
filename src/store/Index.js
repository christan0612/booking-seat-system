import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: false
}

const mutations = {
  setIsLoading (state, data) {
    state.isLoading = data
  }
}

const actions = {
}

const getters = {
}

export default new Vuex.Store({
  modules: {
  },
  state,
  mutations,
  actions,
  getters
})
