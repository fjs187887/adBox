import BaseStorage from 'localstorage'
import { LocalStorage } from 'quasar'
export default function (namespace) {
  let storage = new BaseStorage(namespace)
  storage._store = window.localStorage || LocalStorage
  return storage
}
