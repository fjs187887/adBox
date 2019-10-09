<template>
  <q-layout view="lHh lpr lFf">
    <Rw />
    <div :class="cang ? 'cang' : ''" @click="to" class="a">
      <img src="statics/TaskHall/yaoqing.png" alt="">
    </div>
  </q-layout>
</template>

<script>
import Rw from './task-hall-bar'
export default {
  data () {
    return {
      cang: false
    }
  },
  methods: {
    to () {
      this.$router.push({ path: '/Invit' })
    },
    scrollToTop () {
      let sTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (sTop > 80) {
        this.cang = true
      } else {
        this.cang = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  components: {
    Rw
  }
}
</script>

<style scoped lang="less">
div.a{
  position: fixed;
  right: 10px;
  bottom: 120px;
  width: 70px;
  height:auto;
  opacity: 1;
  transition: all .2s;
  img{
    width: 100%;
  }
}
div.cang{
  right: -25px!important;
}
</style>
