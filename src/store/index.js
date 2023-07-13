import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      catalogRefresh: false
    }
  },
  mutations: {
    set_catalogRefresh (state) {
      state.catalogRefresh = !state.catalogRefresh
    }
  },
  actions: {
  },
  modules: {
  }
})
