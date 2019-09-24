<style scoped></style>
<template>
  <van-popup   position="bottom" v-model="isShow" :close-on-click-overlay="false">
    <van-area :area-list="areaList" value="cityCode" @confirm="confirm" @cancel="cancel"/>
  </van-popup>
</template>
<script>

import area from '../../assets/jsons/citycode'

export default {
  props: ['value'],
  data () {
    return {
      cityCode: '',
      areaList: area,
      isShow: false
    }
  },
  watch: {
    value (value) {
      this.isShow = value
    }
  },
  methods: {
    confirm (value) {
      var code = ''
      var name = ''
      for (var i in value) {
        if (!value.hasOwnProperty(i)) continue
        code = value[i].code
        name += value[i].name
      }
      this.isShow = false
      this.$emit('input', false)
      this.$emit('onBack', { 'id': code, 'name': name })
    },
    cancel (value) {
      this.isShow = false
      this.$emit('input', false)
    }
  }
}
</script>
