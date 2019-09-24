import Vue from 'vue'
import axios from 'axios'
import Store from 'app/src/store'
import Router from 'app/src/router'
import URLs from './urls'
import { API_VERSION, API_HOST } from '../config'
import { ACCESS_TOKEN_KEY } from 'app/src/store/module/user'
import { CallAppSDK } from '../../app-sdk'

let login = null

export default class Http {
  constructor () {
    this.host = axios.defaults.baseURL = API_HOST.http + API_VERSION.replace(/(\w)$/, '$1/')
  }
  ajax (option, callback) {
    if (login) {
      return new Promise((resolve, reject) => {
        login.then(() => {
          this.ajax(option, callback).then(data => resolve(data)).catch(e => reject(e))
        }).catch(e => {
          this.ajax(option, callback).then(data => resolve(data)).catch(e => reject(e))
        })
      })
    }
    option.url = URLs[option.url] || option.url
    option.headers = Object.assign(option.headers || {}, Http.headers())
    let result = new Promise((resolve, reject) => {
      axios(option).then(response => {
        let { status, headers } = response
        if (/^2/.test(status)) {
          if (headers[ACCESS_TOKEN_KEY.toLowerCase()]) {
            Store.dispatch('updateToken', headers)
          }
        }
        if (typeof callback === 'function') {
          callback(response.data, response)
        }
        resolve(response)
      }).catch(error => {
        let { response } = error
        if (response && response.status === 401) {
          CallAppSDK('getActFromNative').then(([uid, token]) => {
            if (!uid || !token) return reject(error)
            else {
              Vue.prototype.$http.login({
                type: `auto-login|${uid}`,
                data: token
              }, ({ errcode }) => {
                if (errcode === 0) {
                  this.ajax(option, callback).then(response => resolve(response))
                } else reject(error)
              })
            }
          }).catch(e => reject(error))
        }
      })
    })
    if (option.url === '/app/login/index.html') {
      login = result
    }
    result.then(e => (login = null))
    result.catch(({ response }) => {
      login = null
      response && response.status === 401 && Router.push('/login')
    })
    return result
  }
  get () {
    let { url, data, callback } = Http.params.apply(this, arguments)
    return this.ajax({
      url: url,
      params: data,
      method: 'get',
      responseType: 'json'
    }, callback)
  }
  post () {
    let { url, data, callback } = Http.params.apply(this, arguments)
    return this.ajax({
      url: url,
      data: data,
      method: 'post',
      responseType: 'json'
    }, callback)
  }
  static headers () {
    return { 'X-Requested-With': 'XMLHttpRequest', ...(Store.getters.token || {}) }
  }
  static params (url, data, callback) {
    if (typeof data === 'function') {
      callback = data
      data = {}
    }
    return {
      url: URLs[url] || url,
      data: data,
      callback: callback
    }
  }
}
