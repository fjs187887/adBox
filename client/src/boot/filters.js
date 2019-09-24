import Vue from 'vue'
import deepEach from '../boot/functions/deep-each.js'
import CityCodes from '../assets/jsons/city.json'
export default async () => {
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
}
