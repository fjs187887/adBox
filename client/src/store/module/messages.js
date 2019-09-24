import deepcopy from 'deepcopy'
import { sum } from 'src/boot/functions/sum'
import LocalStorage from 'src/libs/local-storage'
import SessionStorage from 'src/libs/session-storage'

const STORAGE_KEY_SESSION = 'MSG.storage'
const STORAGE_KEY_CACHE_NAME = 'MSG.cache.name'
const SROTAGE_KEY_SESSION_PAGE = 'MSG.storage.page'
const MStorage = new LocalStorage('message:')
const MSession = new SessionStorage('message:')

export default {
  state: {
    outClear: false,
    page: MSession.get(SROTAGE_KEY_SESSION_PAGE)[1] || 1,
    cache: MSession.get(STORAGE_KEY_CACHE_NAME)[1] || !1,
    sessions: MStorage.get(STORAGE_KEY_SESSION)[1] || [],
    currentSessionId: null,
    currentSessionIndex: null
  },
  getters: {
    page: (state, getters) => getters.hasCache ? state.page || 1 : 1,
    // 是否有当前用户的消息缓存
    hasCache: (state, getters) => !!(state.cache && getters.info && (state.cache === getters.info.id)),
    // 当前用户未读消息数量
    unread: (state, getters) => getters.hasCache ? sum(session => session.unread, ...state.sessions) : 0,
    // 以ID为key的session列表
    sessions: (state, getters) => getters.hasCache ? Object.assign({}, ...state.sessions.map(session => ({ [session.id]: session }))) : {},
    // 当前session
    currentSession: (state, getters) => getters.hasCache ? getters.sessions[state.currentSessionId] || state.sessions[state.currentSessionIndex] : void 0,
    // 当前session的消息列表
    currentSessionMessage: (state, getters) => deepcopy(getters.currentSession ? getters.currentSession.messages || [] : []).reverse(),
    // 当前session成员
    currentSessionMembers: (state, getters) => getters.currentSession ? Object.assign({}, ...(getters.currentSession.members || []).map(member => ({ [member.uid]: deepcopy(member) }))) : {}
  },
  mutations: {
    'session:list.page.set' (state, page) {
      state.page = page
    },
    'session:list.reset' (state, value) {
      let { uid, sessions } = value || {}
      state.cache = uid
      state.sessions = sessions || []
      MSession.put(STORAGE_KEY_CACHE_NAME, state.cache)
      MStorage.put(STORAGE_KEY_SESSION, state.sessions)
    },
    'session:list.push' (state, value = []) {
      if (value instanceof Array) {
        state.sessions.push(...value)
        MStorage.put(STORAGE_KEY_SESSION, state.sessions)
      }
    },
    'session:list.push.new' (state, session) {
      if (session && !this.getters.sessions[session.id]) {
        state.sessions.splice(0, 0, session)
        MStorage.put(STORAGE_KEY_SESSION, state.sessions)
      }
    },
    'session:current.set' (state, { id, index }) {
      state.currentSessionId = id
      state.currentSessionIndex = index
    },
    // 清除当前会话的未读消息数量
    'session:current.clear.unread' (state) {
      if (this.getters.currentSession) {
        state.outClear = false
        if (this.getters.currentSession.unread > 0) {
          this.getters.currentSession.unread = 0
          MStorage.put(STORAGE_KEY_SESSION, state.sessions)
        }
      }
    },
    'session:setinc.unread' (state, { sid, inc }) {
      if (this.getters.sessions[sid]) {
        this.getters.session[sid].unread += isNaN(inc) ? 0 : Number(inc)
      }
    },
    'message:list.current.push' (state, { isNew, message }) {
      if (this.getters.currentSession && message) {
        if (!(message instanceof Array)) message = [message]
        if (isNew) {
          state.outClear = true
          this.getters.currentSession.messages.splice(0, 0, ...message)
        } else {
          this.getters.currentSession.messages.push(...message)
        }
        MStorage.put(STORAGE_KEY_SESSION, state.sessions)
      }
    },
    'message:list.current.reset' (state, value = []) {
      if (this.getters.currentSession) {
        if (!(value instanceof Array)) value = []
        this.getters.currentSession.messages = value
        MStorage.put(STORAGE_KEY_SESSION, state.sessions)
      }
    },
    'message:list.push.new' (state, { sid, message }) {
      if (this.getters.sessions[sid] && message) {
        this.getters.sessions[sid].messages.splice(0, 0, message)
        this.getters.sessions[sid].unread += 1
        MStorage.put(STORAGE_KEY_SESSION, state.sessions)
      }
    }
  },
  actions: {
    /**
     * 操作会话列表界面的页码
     * */
    resetPage ({ commit }) {
      commit('session:list.page.set', 1)
    },
    pageSetInc ({ commit, getters }) {
      commit('session:list.page.set', getters.page + 1)
    },

    /**
     * 操作会话列表
     * */
    resetSessionList ({ commit }, value) {
      commit('session:list.reset', value)
    },
    pushSessionList ({ commit }, list = []) {
      commit('session:list.push', list)
    },
    pushSessionNew ({ commit }, session) {
      commit('session:list.push.new', session)
    },
    setCurrentSession ({ commit }, value) {
      commit('session:current.set', value)
    },
    unsetCurrentSession ({ commit }) {
      commit('session:current.set', {})
    },
    clearCurrentSessionUnread ({ commit }) {
      commit('session:current.clear.unread')
    },
    setIncSessionUnread ({ commit }, value) {
      commit('session:setinc.unread', value)
    },
    pushCurrentSessionMessage ({ commit }, messages) {
      commit('message:list.current.push', messages)
    },
    resetCurrentMessage ({ commit }, value = []) {
      commit('message:list.current.reset', value)
    },
    pushSessionMessage ({ commit }, { sid, message }) {
      if (this.getters.currentSession && this.getters.currentSession.id === sid) {
        commit('message:list.current.push', { isNew: true, message })
      } else commit('message:list.push.new', { sid, message })
    }
  }
}
export { STORAGE_KEY_SESSION, STORAGE_KEY_CACHE_NAME }
