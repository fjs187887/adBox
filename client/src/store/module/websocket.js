export const ONLINE_STATE_LOGINED = 0x1
export const ONLINE_STATE_CONNECTED = 0x2

export default {
  state: {
    token: null,
    ws_state: 0,
    ws_connecting: false
  },
  getters: {
    WS_online: state => (state.ws_state & ONLINE_STATE_CONNECTED) === ONLINE_STATE_CONNECTED,
    WS_logined: state => state.token
  },
  mutations: {
    'state.online' (state, value) {
      if (value) {
        state.ws_state = state.ws_state | ONLINE_STATE_CONNECTED
      } else {
        state.ws_state = state.ws_state & ~ONLINE_STATE_CONNECTED
        state.ws_state = state.ws_state & ~ONLINE_STATE_LOGINED
      }
    },
    'state.logined' (state, value) {
      state.token = value
    },
    'state.connecting' (state, value) {
      state.ws_connecting = value
    }
  },
  actions: {
    onlineState ({ commit }, state) {
      commit('state.online', state)
    },
    loginState ({ commit }, state) {
      commit('state.logined', state)
    },
    updateConnectState ({ commit }, state) {
      commit('state.connecting', state)
    }
  }
}
