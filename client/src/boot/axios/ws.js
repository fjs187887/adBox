import Ws from './ws/index'
import store from 'src/store'
import { $http } from './index'
import libs from 'src/libs/functions'
import callbacks from './ws/callback'
import {
  WS_STATE_CONNECTING,
  WS_STATE_CONNECTED,
  WS_STATE_CLOSED
} from 'src/store/module/websocket'
import {
  API_HOST,
  API_VERSION
} from './config'

export default class {
  constructor () {
    let ws = new Ws(API_HOST.ws, API_VERSION, {
      message: (...args) => this.onMessage(...args),
      close: () => this.disconnect(),
      open: () => store.dispatch('updateWsConnectState', WS_STATE_CONNECTED),
      start: () => store.dispatch('updateWsConnectState', WS_STATE_CONNECTING)
    })
    this.waiting = []
    Object.defineProperty(this, 'ws', { get: () => ws })
    setTimeout(() => {
      if (store.getters.logined) this.login()
      store.watch(() => store.getters.WsLogined, l => l && this.sendwait())
      store.watch(() => store.getters.logined, l => l ? this.login() : this.disconnect())
    })
  }
  connect () {
    this.ws.getWsInstance().then(ws => this.login())
  }
  sendMessage (message) {
    return this.send(message)
  }
  login () {
    $http.getAccess('ws', ({ errcode, data, message }) => {
      if (errcode === 0) this.send(data, 'login')
    })
  }
  disconnect () {
    this.ws.wsclose()
    store.dispatch('updateWsConnectState', WS_STATE_CLOSED)
  }
  sendwait () {
    let message = this.waiting.shift()
    while (message) {
      if (store.getters.WsLogined) {
        this.send(message.data, message.type)
        message = this.waiting.shift()
      } else break
    }
  }
  send (data, type = 'send') {
    let token = store.state.websocket.token
    if (store.getters.WsLogined || type === 'login') {
      return this.ws.send({ type, data, token })
    } else {
      this.waiting.push({ data, type })
      return new Promise(resolve => resolve())
    }
  }
  onMessage (MessageEvent) {
    let { data } = MessageEvent
    data = libs.safeJsonParse(data, data)
    if (data.type && typeof callbacks[data.type] === 'function') {
      callbacks[data.type].call(this, data.data)
    }
  }
}
