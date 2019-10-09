import Vue from 'vue'
import deepcopy from 'deepcopy'
import { sum } from 'src/boot/functions/sum'
import LocalStorage from 'src/libs/local-storage'
import SessionStorage from 'src/libs/session-storage'

export const STORAGE_KEY_CACHE_NAME = 'cache->name'
export const STORAGE_KEY_SESSION = 'storage->session'
export const SROTAGE_KEY_SESSION_PAGE = 'storage->session_page'
export const STORAGE_KEY_FANS_SESSION = 'storage->fans_session'
export const STORAGE_KEY_SYSTEM_SESSION = 'storage->system_session'
export const STORAGE_KEY_MESSAGE_SENDING = 'storage->message_sending'
const MStorage = new LocalStorage('MSG::')
const MSession = new SessionStorage('MSG::')

export default {
  state: {
    outClear: false,
    page: MSession.get(SROTAGE_KEY_SESSION_PAGE)[1] || 1,
    cache: MSession.get(STORAGE_KEY_CACHE_NAME)[1] || !1,
    sessions: MStorage.get(STORAGE_KEY_SESSION)[1] || [],
    fansSessions: MStorage.get(STORAGE_KEY_FANS_SESSION)[1] || [],
    systemSessions: MStorage.get(STORAGE_KEY_SYSTEM_SESSION)[1] || [],
    sendingMessages: MStorage.get(STORAGE_KEY_MESSAGE_SENDING)[1] || {},
    currentSessionId: null
  },
  getters: {
    page: (state, getters) => getters.hasCache ? state.page || 1 : 1,
    // 是否有当前用户的消息缓存
    hasCache: (state, getters) => !!(state.cache && getters.info && (state.cache === getters.info.id)),
    // 当前用户未读消息数量
    unread: (state, getters) => getters.hasCache ? sum(session => session.unread, ...state.sessions, ...state.systemSessions) : 0,
    // 以ID为key的session列表
    sessions: (state, getters) => getters.hasCache ? Object.assign({}, ...state.sessions.map(session => ({ [session.id]: session }))) : {},
    fansSessions: (state, getters) => getters.hasCache ? Object.assign({}, ...state.fansSessions.map(session => ({ [session.id]: session }))) : {},
    systemSessions: (state, getters) => getters.hasCache ? Object.assign({}, ...state.systemSessions.map(session => ({ [session.id]: session }))) : {},
    systemCtrlIDs: (state, getters) => getters.hasCache ? Object.assign({}, ...state.systemSessions.map(session => ({ [session.controller || session.id]: session.id }))) : {},
    // 当前session
    currentSession: (state, getters) => getters.hasCache ? getters.sessions[state.currentSessionId] || state.systemSessions[state.currentSessionId] : void 0,
    currentSendingMessage: (state) => deepcopy((state.sendingMessages[state.currentSessionId] && Object.values(state.sendingMessages[state.currentSessionId])) || []),
    // 当前session的消息列表
    currentSessionMessage: (state, getters) => deepcopy((getters.currentSession && getters.currentSession.messages) || []).concat(getters.currentSendingMessage).sort((a, b) => a.create_time > b.create_time ? 1 : -1),
    // 当前session成员
    currentSessionMembers: (state, getters) => getters.currentSession ? Object.assign({}, ...(getters.currentSession.members || []).map(member => ({ [member.uid]: deepcopy(member) }))) : {}
  },
  mutations: {
    'session::list->set_page' (state, page) {
      state.page = page
    },
    'session::list->set_system' (state, sessions) {
      if (sessions) {
        if (sessions instanceof Array) {
          state.systemSessions = sessions
        } else if (this.getters.systemSessions[sessions.id]) {
          state.systemSessions = state.systemSessions.map(s => {
            if (s.id === sessions.id) return sessions
            else return s
          })
        } else state.systemSessions.push(sessions)
        MSession.put(STORAGE_KEY_CACHE_NAME, state.cache)
        MStorage.put(STORAGE_KEY_SYSTEM_SESSION, state.systemSessions)
      }
    },
    'session::list->set' (state, value) {
      let { uid, sessions } = value || {}
      if (uid && sessions) {
        state.cache = uid
        state.sessions = sessions || []
        MSession.put(STORAGE_KEY_CACHE_NAME, state.cache)
        MStorage.put(STORAGE_KEY_SESSION, state.sessions)
      }
    },
    'session::list->push' (state, session) {
      if (session) {
        if (session instanceof Array) {
          state.sessions.splice(0, 0, ...session.reverse())
        } else {
          let exist = this.getters.sessions[session.id]
          if (exist) {
            state.sessions[state.sessions.indexOf(exist)] = session
          } else {
            state.sessions.splice(0, 0, session)
          }
        }
        MStorage.put(STORAGE_KEY_SESSION, state.sessions)
      }
    },
    'session::current->set' (state, id) {
      state.currentSessionId = id
    },
    'session::unread->setinc' (state, { sid, inc }) {
      let session = this.getters.systemSessions[sid] || this.getters.sessions[sid]
      if (session) {
        if (inc === void 0) {
          session.unread = 0
        } else {
          session.unread += isNaN(inc) ? 0 : Number(inc)
        }
        MStorage.put(STORAGE_KEY_SESSION, state.sessions)
        MStorage.put(STORAGE_KEY_SYSTEM_SESSION, state.systemSessions)
      }
    },
    'message::list->push' (state, { sid, message, prev }) {
      let session = this.getters.systemSessions[sid] || this.getters.sessions[sid]
      if (session) {
        let lastMessage = session.messages[0] && session.messages[0].id
        if (!(message instanceof Array)) message = [message]
        if (prev) {
          session.messages.splice(0, 0, ...message.filter(m => (!lastMessage) || m.id > lastMessage))
        } else {
          session.messages.push(...message.filter(m => (!lastMessage) || m.id > lastMessage))
        }
        if (sid === state.currentSessionId) {
          state.outClear = true
        }
        MStorage.put(STORAGE_KEY_SESSION, state.sessions)
        MStorage.put(STORAGE_KEY_SYSTEM_SESSION, state.systemSessions)
      }
    },
    'message::list->reset' (state, { sid, messages }) {
      let session = this.getters.systemSessions[sid] || this.getters.sessions[sid]
      if (session) {
        if (!(messages instanceof Array)) messages = []
        session.messages = messages
        MStorage.put(STORAGE_KEY_SESSION, state.sessions)
        MStorage.put(STORAGE_KEY_SYSTEM_SESSION, state.systemSessions)
      }
    },
    'message::list->push_sending' (state, { sid, message }) {
      if (!state.sendingMessages[sid]) {
        Vue.set(state.sendingMessages, sid, {})
      }
      Vue.set(state.sendingMessages[sid], message.uuid, message)
      MStorage.put(STORAGE_KEY_MESSAGE_SENDING, state.sendingMessages)
    },
    'message::list->reset_sending' (state, sid) {
      if (sid === void 0) {
        state.sendingMessages = {}
      } else {
        Vue.set(state.sendingMessages, sid, {})
      }
      MStorage.put(STORAGE_KEY_MESSAGE_SENDING, state.sendingMessages)
    },
    'message::list->remove_sending' (state, { sid, uuid }) {
      if (state.sendingMessages[sid]) {
        if (state.sendingMessages[sid][uuid]) {
          Vue.delete(state.sendingMessages[sid], uuid)
          MStorage.put(STORAGE_KEY_MESSAGE_SENDING, state.sendingMessages)
        }
      }
    },
    'message::unread->outclear' (state, value) {
      state.outClear = value
    }
  },
  actions: {
    /**
     * 操作会话列表界面的页码
     * */
    resetPage ({ commit }) {
      commit('session::list->set_page', 1)
    },
    pageSetInc ({ commit, getters }) {
      commit('session::list->set_page', getters.page + 1)
    },

    /**
     * 操作会话列表
     * */
    setSessionList ({ commit }, { type, ...value }) {
      if (type === 'system') {
        commit('session::list->set_system', value.sessions)
      } else {
        commit('session::list->set', value)
      }
    },
    pushSessionList ({ commit }, list = []) {
      commit('session::list->push', list)
    },

    /**
     * 设置当前会话
     * */
    setCurrentSession ({ commit }, value) {
      commit('session::current->set', value)
    },
    unsetCurrentSession ({ commit }) {
      commit('session::current->set', null)
    },

    /**
     * 修改未读消息数量
     * */
    clearSessionUnread ({ commit, state }, sid) {
      commit('session::unread->setinc', { sid })
    },
    clearCurrentSessionUnread ({ commit, state }) {
      commit('session::unread->setinc', { sid: state.currentSessionId })
      commit('message::unread->outclear', false)
    },
    setIncSessionUnread ({ commit }, value) {
      commit('session::unread->setinc', value)
    },

    /**
     * 修改消息列表
     * */
    pushSessionMessage ({ commit, getters, state }, { sid, message, prev }) {
      commit('message::list->push', { sid, message, prev })
    },
    resetCurrentMessage ({ commit, state }, messages = []) {
      commit('message::list->reset', { sid: state.currentSessionId, messages })
      commit('message::list->reset_sending', state.currentSessionId)
    },
    pushCurrentSessionMessage ({ commit, state }, { message, prev }) {
      commit('message::list->push', { sid: state.currentSessionId, message, prev })
    },

    /**
     * 正在发送的消息列表
     * */
    resetSendingMessage ({ commit }, sid) {
      commit('message::list->reset_sending', sid)
    },
    pushSendingMessage ({ commit }, { sid, message }) {
      commit('message::list->push_sending', { sid, message })
    },
    moveSending ({ commit, state }, { sid, uuid, mid }) {
      if (state.sendingMessages[sid] && state.sendingMessages[sid][uuid]) {
        let message = deepcopy(state.sendingMessages[sid][uuid])
        commit('message::list->push', { sid, message: Object.assign(message, { id: mid }) })
        commit('message::list->remove_sending', { sid, uuid })
      }
    },
    removeSendingMessage ({ commit }, { sid, uuid }) {
      commit('message::list->remove_sending', { sid, uuid })
    }
  }
}
