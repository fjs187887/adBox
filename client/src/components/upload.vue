<script>
import Vue from 'vue'
import { API_HOST } from '../boot/axios/config'
// import { Uploader } from 'vant'
// console.log(Uploader)
const uploader = Vue.component('QUploader')
export default {
  name: 'upload',
  extends: uploader,
  props: {
    url: {
      type: String,
      default () {
        return API_HOST.http + 'app/user/upload'
      }
    },
    headers: {
      type: [Array, Function],
      default () {
        return Object.keys(this.$store.getters.token || {}).map(key => {
          return { name: key, value: this.$store.getters.token[key] }
        }).concat({
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        })
      }
    }
  }
}
</script>
