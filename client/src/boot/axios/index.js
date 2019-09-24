import axios from 'axios'
import Http from './http'
import Ws from './ws'

export const $ws = new Ws()
export const $axios = axios
export const $http = new Http()
export default async ({ Vue }) => {
  Vue.prototype.$ws = $ws
  Vue.prototype.$http = $http
  Vue.prototype.$axios = $axios
}
