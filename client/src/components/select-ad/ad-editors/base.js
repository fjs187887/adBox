import deepcopy from 'deepcopy'
import { API_HOST } from 'src/boot/axios/config'
export default {
  props: ['value'],
  data () {
    return {
      ad: deepcopy(this.value),
      upload: `${API_HOST.http}app/task/upload`
    }
  },
  methods: {
    showErrorFormat (msg) {
      this.$Message.error('文件格式错误')
    },
    showErrorSize (msg) {
      this.$Message.error('文件超出规定大小（2M）')
    }
  },
  watch: {
    ad: {
      handler: function (nv) {
        this.$emit('input', nv)
      },
      deep: true
    }
  }
}
