import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/index'

import routes from './routes'
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
const router = new VueRouter({
  routes,
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ x: 0, y: 0 })
})
router.beforeEach((to, current, next) => {
  if (to.meta.QueryAuth === false || to.name === 'error-404') {
    next()
  } else {
    if (Store.getters.logined) next()
    else {
      Store.dispatch('updateLoginBack', to.fullPath)
      next({ path: '/login' })
    }
  }
})
export default router
