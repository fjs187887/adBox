import store from 'src/store'
export default function (data) {
  store.dispatch('updateWsLoginState', data)
}
