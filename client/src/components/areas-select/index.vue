<style lang="less" scoped>
/deep/.van-picker__cancel,
/deep/.van-picker__confirm{
  color: #ff853a;
}
/deep/.van-picker-column{
  font-size: 13px;
}
</style>

<template>
  <van-popup position="bottom" get-container="body" v-model="isShow" :close-on-click-overlay="false">
    <van-area :area-list="areaList" @confirm="confirm" @cancel="cancel"/>
  </van-popup>
</template>
<script>

import area from '../../assets/jsons/citycode'

export default {
  // props: ['value'],
  props: {
    value: Boolean,
    delctry: Boolean
  },
  data () {
    return {
      areaList: area,
      isShow: false
    }
  },
  watch: {
    value (value) {
      this.isShow = value
    }
  },
  created () {
    if (this.delctry) {
      delete this.areaList.province_list['1000000000']
    }
  },
  methods: {
    confirm (value) {
      var code = ''
      var name = ''
      var showName = ''
      console.log(value)
      for (var i of value) {
        if (i) {
          code = i.code
          name += i.name
        }
      }
      if (value[1]) {
        showName = value[1].name // 如果有市级 显示市
      } else if (value[0]) { // 否则 如果有省级 显示省
        showName = value[0].name
      }
      this.isShow = false
      this.$emit('input', false)
      this.$emit('onBack', { 'id': code, 'name': name, 'showName': showName })
    },
    cancel (value) {
      this.isShow = false
      this.$emit('input', false)
    }
  }
}
</script>
