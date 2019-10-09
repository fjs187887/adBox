export const WS_STATE_CLOSED = 0
export const WS_STATE_CONNECTING = 1
export const WS_STATE_CONNECTED = 2

export default {
  state: {
    token: null,
    connected: false
  },
  getters: {
    WsLogined: state => state.token,
    WsConnected: state => state.connected === WS_STATE_CONNECTED,
    WsConnecting: state => state.connected === WS_STATE_CONNECTING
  },
  mutations: {
    'state.logined' (state, value) {
      state.token = value
    },
    'state.connected' (state, value) {
      state.connected = value
    }
  },
  actions: {
    updateWsLoginState ({ commit }, state) {
      commit('state.logined', state)
    },
    updateWsConnectState ({ commit }, state) {
      commit('state.connected', state)
    }
  }
}
