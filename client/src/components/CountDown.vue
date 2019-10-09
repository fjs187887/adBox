<template>
  <span v-if="flag"></span>
  <span v-else>
    <span v-if="after">在{{time}}之后</span>
    <span v-else-if="before">在{{time}}之内</span>
    <span v-else>{{time}}</span>
  </span>
</template>

<script>
export default {
  data () {
    return {
      time: '',
      flag: false
    }
  },
  mounted () {
    let timer = setInterval(() => {
      if (this.flag === true) {
        clearInterval(timer)
      }
      this.timeDown()
    }, 500)
  },
  props: {
    endTime: {
      type: String
    },
    nowTime: {
      type: String
    },
    after: Boolean,
    before: Boolean
  },
  methods: {
    timeDown () {
      const endTime = new Date(this.endTime)
      const nowTime = new Date()
      if (endTime <= nowTime) {
        this.flag = true
        return
      }
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
      // let d = parseInt(leftTime / (24 * 60 * 60))
      let h = this.formate(parseInt(leftTime / (60 * 60) % 24))
      let m = this.formate(parseInt(leftTime / 60 % 60))
      let s = this.formate(parseInt(leftTime % 60))
      if (leftTime <= 0) {
        this.flag = true
        this.$emit('time-end')
      }
      // this.time = `${d}天${h}小时${m}分${s}秒`
      this.time = `${h}:${m}:${s}`
    },
    formate (time) {
      if (time >= 10) {
        return time
      } else {
        return `0${time}`
      }
    }
  }
}
</script>

<style scoped>
</style>
