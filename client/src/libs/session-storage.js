import BaseStorage from 'localstorage'
import { SessionStorage } from 'quasar'
export default function (namespace) {
  let storage = new BaseStorage(namespace)
  storage._store = window.sessionStorage || SessionStorage
  return storage
}
