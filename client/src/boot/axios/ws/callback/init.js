import store from 'src/store'
import { $http } from 'src/boot/axios/index'
export default function (data) {
  store.dispatch('loginState', data)
  if (data) {
    $http.getMessageUnread(({ errcode, data, message }) => {
      console.log(errcode)
    })
  }
}
