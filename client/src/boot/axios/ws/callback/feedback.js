import store from 'src/store'
export default function (data) {
  store.dispatch('moveSending', {
    sid: data.sid,
    mid: data.mid,
    uuid: data.uuid
  })
}
