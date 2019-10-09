import Vue from 'vue'
import TimeStamp from 'time-stamp'
import { API_HOST } from './axios/config'
import CityCodes from '../assets/jsons/city.json'
import deepEach from '../boot/functions/deep-each.js'
export default async () => {
  Vue.filter('toSource', function (src) {
    if (/^((https?|ftp):)?\/\//.test(src)) return src
    return API_HOST.http + src
  })
  Vue.filter('toCityName', function (code, deepShow = true, defaultText = '') {
    if (isNaN(code)) return defaultText
    let name = []
    deepEach(CityCodes, function callback (item, _break) {
      if ((item.id <= code && code < item.max_id) || (item.id === code)) {
        _break()
        if (deepShow || !item.children || !item.children.length) name.push(item.name)
        if (item.children) return item.children
      }
    })
    return name.join('-')
  })
  Vue.filter('toTime', function (timeStamp, format = 'YYYY-MM-DD HH:mm:ss') {
    if (timeStamp instanceof Date) {
      return TimeStamp.utc(format, timeStamp)
    } else {
      return TimeStamp.utc(format, new Date(timeStamp * 1000))
    }
  })
}
