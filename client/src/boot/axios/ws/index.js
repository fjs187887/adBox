const sym = {
  _h: Symbol('heart'),
  _i: Symbol('instance'),
  _c: Symbol('connecting')
}

export const HEART_TIME = 50

export default class WS {
  constructor (url, version, events) {
    Object.defineProperties(this, {
      url: { get: () => url },
      version: { get: () => version },
      events: { get: () => events || {} }
    })
  }
  wsclose () {
    if (this[sym._i]) {
      this[sym._i].close()
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
      }).catch(e => reject(e))
    }).then(ws => this.heartbeat())
  }
  heartbeat () {
    if (this[sym._h]) {
      clearTimeout(this[sym._h])
    }
    this[sym._h] = setTimeout(() => {
      let ws = this[sym._i]
      if (ws && ws.readyState === ws.OPEN) {
        this.send({ type: 'HEARTBEAT' })
      }
    }, HEART_TIME * 1000)
  }
  getWsInstance () {
    let Instance = this[sym._i]
    let Connecting = this[sym._c]
    return new Promise((resolve, reject) => {
      if (Connecting) {
        Connecting.then(ws => resolve(ws)).catch(e => reject(e))
      } else {
        if (!Instance || [Instance.CLOSED, Instance.CLOSING].some(s => s === Instance.readyState)) {
          this[sym._c] = new Promise((resolve, reject) => {
            if (typeof this.events.start === 'function') this.events.start()
            let instance = this[sym._i] = new WebSocket(this.url)
            instance.addEventListener('close', event => this[sym._c] && reject(event))
            instance.addEventListener('open', event => this[sym._c] && (this.heartbeat(), resolve(instance)))
            for (let event in this.events) {
              if (this.events.hasOwnProperty(event)) {
                instance.addEventListener(event, this.events[event])
              }
            }
          })
          this[sym._c].then(ws => {
            this[sym._c] = null
            resolve(ws)
          })
          this[sym._c].catch(e => {
            this[sym._c] = null
            reject(e)
          })
        } else resolve(Instance)
      }
    })
  }
}
