import { createStore } from 'vuex'

export default createStore({
  state: {
    display_splash: true,
  },
  getters: {
    getCalculatorSplash: (state) => state.display_splash
  },
  mutations: {
    updateCalculatorSplash(state) {
      if (state.display_splash) {
        state.display_splash = false
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
