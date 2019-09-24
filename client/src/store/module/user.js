import TimeStamp from 'time-stamp'
import { Base64 } from 'js-base64'
import LocalStorage from 'app/src/libs/local-storage'
import safeJsonParse from '../../boot/functions/safe-json-parse'

export const ACCESS_TOKEN_KEY = 'Access-token'
export const REFRESH_TOKEN_KEY = 'Refresh-token'
export const USER_STORAGE_KEY = 'info'
export const ACCESS_STORAGE_KEY = 'token.access'
export const REFRESH_STORAGE_KEY = 'token.refresh'

const storage = new LocalStorage('User:')
const session = new LocalStorage('User:')

export default {
  state: {
    info: storage.get(USER_STORAGE_KEY)[1],
    accessToken: session.get(ACCESS_STORAGE_KEY)[1],
    refreshToken: session.get(REFRESH_STORAGE_KEY)[1]
  },
  getters: {
    info (state, getters) {
      return getters.logined ? (state.info || getters.access_info) : null
    },
    HotVip (state, getters) {
      if (getters.info) {
        let date = new Date()
        let vipDate = new Date(getters.info.hot_vip * 1000)
        if (getters.info.hot_vip && !isNaN(getters.info.hot_vip) && date.getTime() <= vipDate.getTime()) {
          return TimeStamp.utc('YYYY-MM-DD', vipDate)
        }
      }
      return false
    },
    access_info (state) {
      if (state.accessToken) {
        let access = state.accessToken.split('.')
        return safeJsonParse(Base64.decode(access[1]), {}).data
      }
      return null
    },
    refresh_token (state) {
      if (state.refreshToken) {
        let refresh = state.refreshToken.split('.').map((item, index) => {
          if (index < 2) {
            return safeJsonParse(Base64.decode(item))
          }
          return item
        })
        return new Date().getTime() < refresh[1].exp * 1000 ? state.refreshToken : null
      }
      return null
    },
    logined (state, getters) {
      return !!(getters.refresh_token && getters.access_info)
    },
    token (state, getters) {
      if (getters.refresh_token) {
        return {
          [ACCESS_TOKEN_KEY]: state.accessToken,
          [REFRESH_TOKEN_KEY]: state.refreshToken
        }
      } else {
        return void 0
      }
    }
  },
  mutations: {
    'update:user' (state, value) {
      storage.put(USER_STORAGE_KEY, state.info = value)
    },
    'update:token:access' (state, value) {
      session.put(ACCESS_STORAGE_KEY, state.accessToken = value)
    },
    'update:token:refresh' (state, value) {
      session.put(REFRESH_STORAGE_KEY, state.refreshToken = value)
    }
  },
  actions: {
    updateToken ({ commit }, headers) {
      commit('update:token:access', headers[ACCESS_TOKEN_KEY.toLowerCase()])
      commit('update:token:refresh', headers[REFRESH_TOKEN_KEY.toLowerCase()])
    },
    setUserInfo ({ commit }, info) {
      commit('update:user', info)
    },
    updateUserInfo ({ commit, state }, info = {}) {
      commit('update:user', Object.assign({}, state.info || {}, info))
    },
    loginOut ({ commit, state }) {
      commit('update:user', null)
    }
  }
}
