import store from 'src/store'
const connecting = Symbol('connecting')
const instance = Symbol('instance')
const heart = Symbol('heart')

export const HEART_TIME = 50

export default class WS {
  constructor (url, version, events) {
    let { open, close, error, message } = events || {}
    Object.defineProperties(this, {
      url: {
        get: () => url
      },
      version: {
        get: () => version
      },
      open: { get: () => open },
      close: { get: () => close },
      error: { get: () => error },
      message: { get: () => message }
    })
  }
  wsclose () {
    if (this[instance]) {
      this[instance].close()
    }
  }
  send (message) {
    return new Promise((resolve, reject) => {
      this.getWsInstance().then(ws => {
        try {
          ws.send(JSON.stringify(message))
          resolve(ws)
        } catch (e) {
          reject(e)
        }
      }).catch(e => {
        reject(e)
      })
    }).then(ws => WS.heartbeat(this, ws))
  }
  static heartbeat (instance, ws) {
    if (instance[heart]) {
      clearTimeout(instance[heart])
    }
    instance[heart] = setTimeout(() => {
      if (ws.readyState === ws.OPEN) {
        instance.send({ type: 'HEARTBEAT' })
      }
    }, HEART_TIME * 1000)
  }
  getWsInstance () {
    return new Promise((resolve, reject) => {
      if (this[connecting]) {
        this[connecting].then(ws => resolve(ws)).catch(e => reject(e))
      } else {
        if (!this[instance] || [this[instance].CLOSED, this[instance].CLOSING].some(s => s === this[instance].readyState)) {
          store.dispatch('updateConnectState', true)
          this[connecting] = new Promise((resolve, reject) => {
            let done = false
            let ws = new WebSocket(this.url)
            ws.onerror = this.onerror
            ws.onmessage = this.message
            ws.onclose = event => {
              done || reject(event)
              if (typeof this.close === 'function') this.close(event)
            }
            ws.onopen = event => {
              resolve(ws)
              done = true
              if (typeof this.open === 'function') this.open(event)
            }
          }).then(ws => {
            resolve(ws)
            this[instance] = ws
            this[connecting] = null
            WS.heartbeat(this, ws)
            store.dispatch('updateConnectState', false)
          })
          this[connecting].catch(e => {
            reject(e)
            this[instance] = null
            this[connecting] = null
            store.dispatch('updateConnectState', false)
          })
        } else resolve(this[instance])
      }
    })
  }
}
