import './test'
import Vue from 'vue'
import funs from '../functions/_includes'

const JSInterface = window.JSInterface || null

export function CallAppSDK (name, args = [], prefix = 'app_sdk_') {
  let hash = prefix + funs.md5(`${new Date().getTime()}`)
  let promise = new Promise(resolve => {
    window[hash] = (...args) => {
      delete window[hash]
      resolve(args)
    }
    JSInterface[name](...args, hash)
  })
  promise.catch(e => {
    delete window[hash]
    console.error(e)
  })
  return promise
}
export function CallAppSdkNoCallback (name, args = []) {
  let promise = new Promise(resolve => {
    JSInterface[name](...args)
  })
  promise.catch(err => console.error(err))
  return promise
}
export default async () => {
  Vue.prototype.$callAppSDK = CallAppSDK
  Vue.prototype.$openCamera = function (type, callback) {
    return CallAppSDK('openCameraFromJS', [type], 'app_camera_')
      .then(args => typeof callback === 'function' && callback.call(this, ...args))
  }
  /**
   * 下载图片
   * @param imgList
   * @param callback
   * @returns {Promise<unknown>}
   */
  Vue.prototype.$saveImg = function (desc, platform = 0, imgList, callback) {
    return CallAppSDK('saveImgFromJS', [desc, platform, imgList], 'app_img_')
      .then(args => typeof callback === 'function' && callback.call(this, ...args))
  }
  Vue.prototype.$quickLogin = function (type, callback) {
    let promise = new Promise((resolve, reject) => {
      this.$http.getRsaKey().then(({ data: { errcode, data, message } }) => {
        if (errcode !== 0) return reject(message || '登录组件初始化失败')
        CallAppSDK('loginInfoFromJS', [type, data], 'app_login_')
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    }).then(args => typeof callback === 'function' && callback.call(this, ...args))
    promise.catch(e => console.warn(e))
    return promise
  }
  Vue.prototype.$share = function (title, desc = '', img, url, platform = 0, type = 0, callback) {
    return CallAppSDK(
      'shareInfoFromJS',
      [title, desc, img, url, platform, type], 'app_share_'
    ).then(args => typeof callback === 'function' && callback.call(this, ...args))
  }
  Vue.prototype.$Pay = function (order, callback) {
    return new Promise((resolve, reject) => {
      this.$http.getAccess('pay', ({ errcode, data, message }) => {
        if (errcode === 0) {
          CallAppSDK('payFromNative', [order, data]).then(([result]) => {
            if (result && result.data) {
              result.data = funs.safeJsonParse(result.data, result.data)
            }
            typeof callback === 'function' && callback.call(this, result)
            resolve(result)
          }).catch(error => reject(error))
        } else {
          resolve({ status: 'error', message })
        }
      })
    })
  }
}
