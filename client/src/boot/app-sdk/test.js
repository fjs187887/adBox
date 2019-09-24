import LocalStorage from '../../libs/local-storage'
import testLogin from './login/test3rd'
if (process.env.DEV) {
  const saves = new LocalStorage('app-sdk-test:')
  window.JSInterface = {
    loginInfoFromJS (type, rsa, callback) {
      setTimeout(() => window[callback]('', testLogin[type]), 200)
    },
    shareInfoFromJS (title, desc, img, url, platform, type, callback) {
      setTimeout(() => window[callback]())
    },
    openCameraFromJS (type, callback) {
      setTimeout(() => window[callback]())
    },
    saveActFromJS (token, uid) {
      saves.put('uid', uid)
      saves.put('token', token)
    },
    getActFromNative (callback) {
      setTimeout(() => window[callback](saves.get('uid')[1], saves.get('token')[1]))
    },
    payFromNative (orderSN, SN, fn) {
      setTimeout(() => window[fn]({ status: 'success' }), 2000)
    }
  }
}
