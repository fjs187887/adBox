export default {
  state: {
    LoginBack: '',
    options: {
      message: {
        showNickname: true
      }
    }
  },
  getters: {
    showNickname: state => state.options.message.showNickname
  },
  mutations: {
    saveLoginBack (state, value) {
      state.LoginBack = value
    }
  },
  actions: {
    updateLoginBack ({ commit }, url) {
      commit('saveLoginBack', url)
    },
    clearLoinBack ({ commit }) {
      commit('saveLoginBack', null)
    }
  }
}
