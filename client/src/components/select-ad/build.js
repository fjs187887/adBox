import './build.styl'
import adboxTop from './ad-box/top'
import adboxBottom from './ad-box/bottom'
import components from './ad-views/index'
import QBtn from 'quasar/src/components/btn/QBtn'
import QIcon from 'quasar/src/components/icon/QIcon'
import QBadge from 'quasar/src/components/badge/QBadge'
if (window.Vue) {
  window.Vue.use({
    install: function (Vue, globalOptions) {
      Vue.component('QBtn', QBtn)
      Vue.component('QIcon', QIcon)
      Vue.component('QBadge', QBadge)
      for (let name in components) {
        if (components.hasOwnProperty(name)) {
          Vue.component(name, components[name])
        }
      }
      Vue.component('adboxTop', adboxTop)
      Vue.component('adboxBottom', adboxBottom)
    }
  })
}
