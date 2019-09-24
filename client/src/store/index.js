import Vue from 'vue'
import Vuex from 'vuex'

import app from './module/app'
import user from './module/user'
import message from './module/messages'
import websocket from './module/websocket'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export default new Vuex.Store({
  modules: { app, user, message, websocket },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})
