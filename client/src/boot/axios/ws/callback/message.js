import store from 'src/store'
export default function (data) {
  store.dispatch('pushSessionMessage', {
    sid: data.session_id,
    message: data
  })
}
