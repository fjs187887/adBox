import Ws from './ws/index'
import store from 'src/store'
import { $http } from './index'
import { API_HOST, API_VERSION } from './config'
import libs from 'src/libs/functions'
import callbacks from './ws/callback'

export default class {
  constructor () {
    let ws = new Ws(API_HOST.ws, API_VERSION, {
      open: () => store.dispatch('onlineState', true),
      close: () => store.dispatch('onlineState', false),
      error: () => {},
      message: (...args) => this.onMessage(...args)
    })
    Object.defineProperty(this, 'ws', { get: () => ws })
    setTimeout(() => {
      if (store.getters.logined) this.init()
      store.watch(
        () => store.getters.logined,
        logined => {
          if (logined) this.init()
          else this.loginout()
        })
    })
  }
  sendMessage (message) {
    return this.send(message)
  }
  init () {
    $http.getAccess('ws', ({ errcode, data, message }) => {
      if (errcode === 0) {
        this.send(data, 'init')
      }
    })
  }
  loginout () {
    this.ws.wsclose()
  }
  send (data, type = 'message') {
    let token = store.state.websocket.token
    return this.ws.send({ type, data, token })
  }
  onMessage (MessageEvent) {
    let { data } = MessageEvent
    data = libs.safeJsonParse(data, data)
    if (data.type && typeof callbacks[data.type] === 'function') {
      callbacks[data.type].call(this, data.data)
    }
  }
}
