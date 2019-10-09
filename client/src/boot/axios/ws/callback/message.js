import { $http } from '../../index'
import store from 'src/store'
export default function (data) {
  let session = store.getters.sessions[data.session_id] || store.getters.systemSessions[data.session]
  if (!session) {
    $http.getMessageSessionById(data.session_id, ({ data, errcode, message }) => {
      store.dispatch('pushSessionList', data)
      store.dispatch('pushSessionMessage', {
        sid: data.session_id,
        message: data
      })
    })
  } else {
    store.dispatch('pushSessionMessage', {
      sid: data.session_id,
      message: data
    })
  }
}
