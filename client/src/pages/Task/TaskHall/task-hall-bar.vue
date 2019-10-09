<style scoped>
.rwBar{
  background: #fff;
  /* padding-top: 60px; */
}
  .head{
    text-align: center;
    background:url('../../../statics/TaskHall/rwBar.png');
    background-size: 100%;
    margin-bottom: 5px;
    padding: 20px 0;
    margin: 10px 15px 5px;
    color: #fff;
    overflow: hidden;
    font-size: 13px;
    height: 85px;
    transition: height .3s; /* 吸顶时间 */
  }
  .head.toTop{
    height: 0;
  }
  .head .p1{
    font-size:17px;
    font-weight:500;
    padding: 3px 0 10px;
  }
  .q-toolbar.tiBar{
    width: 100%;
    padding: 0;
    overflow: hidden;
    display: block;
  }
  .q-tabs-c{
    padding: 0 15px;
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
    height: 45px;
  }
    .q-tabs-c .q-tab{
    font-size: 14px;
    padding: 0;
    min-height: 0;
    transition: all .1s;
    text-align: left;
    height: 45px;
    line-height: 34px;
    margin-right: 20px;
    flex: unset;
    color: #666;
    display: table-cell;
    vertical-align: bottom;
  }
  .q-tabs-c .q-tab.active{
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }
  .btnToggle{
    border-radius: 0;
    width: 14px;
    height: 7px;
    min-width: 0;
    min-height: 0;
    position: absolute;
    right: 15px;
  }
  .btnToggle img{
    width: 75%;
  }
  .category{
    height: 41px;
    padding: 7px 15px;
    width: 100%;
    display: block;
    border-bottom: 5px solid #f2f2f2;
    list-style: none;
    margin: 0;
    transition: all .2s;
    background: #fff;
  }
  .category li{
    padding: 0 15px;
    float: left;
    margin-right: 15px;
    width: auto;
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    border: 1px solid rgb(183, 189, 199);
    color:rgb(183, 189, 199);
    border-radius: 19px;
  }
  .category li.select{
    color: rgb(255, 133, 58);
    border: 1px solid rgb(253, 235, 177);
    background:rgb(253, 235, 177);
  }
</style>

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout class="animated" view="lHh lpr lFf">
    <div class="rwBar">
      <div class="row head">
        <div class="col-6" @click="startPage('/sharetask')" style="border-right: 1px #fff solid">
          <p class="p1">{{userData.task || 0}}</p>
          <p>我的任务</p>
        </div>
        <div class="col-6" @click="startPage('/Ticket')">
          <p class="p1">{{userData.coupon || 0}}</p>
          <p>我的佣金券</p>
        </div>
      </div>
      <Affix  class="taskBar" :offset-top="0">
        <q-tabs class="q-tabs-c" v-model="tab" align="left" indicator-color="transparent" active-color="#000" @input="show=true">
          <q-route-tab active-class="active" name="1" replace to="/task/hall/task">分享广告</q-route-tab>
          <q-route-tab active-class="active" name="2" replace to="/task/hall/taskmini">小任务</q-route-tab>
          <q-route-tab active-class="active" name="3" replace to="/task/hall/taskteam">团队任务</q-route-tab>
          <q-btn @click="toggle()" class="btnToggle" flat round dense>
            <img class="img1" v-if="show" src="../../../statics/TaskHall/up.png" alt="">
            <img class="img2" v-if="!show" src="../../../statics/TaskHall/down.png" alt="">
          </q-btn>
        </q-tabs>
      </Affix>
    </div>
    <q-page-container>
      <router-view ref="ss" />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  data () {
    return {
      tab: '1',
      userData: '',
      show: false
    }
  },
  created () {
    this.utaskcoupon()
  },
  mounted () {
    window.addEventListener('scroll', this.barScroll)
  },
  methods: {
    barScroll () {
      let heade = document.querySelector('.q-header')
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // if (scrollTop > 0) {
      //   let opacity = scrollTop / 155
      //   console.log(scrollTop, opacity)
      //   opacity = opacity > 1 ? 1 : opacity
      //   this.opacityStyle = { opacity }
      //   this.showAbs = true
      // } else {
      //   this.showAbs = false
      // }
      if (scrollTop > 155) {
        heade.style.opacity = '0'
        heade.classList.add('isScroll')
      } else if (scrollTop <= 155 && scrollTop >= 150) {
        heade.classList.remove('isScroll')
        heade.style.opacity = '.1'
      } else if (scrollTop < 150 && scrollTop >= 145) {
        heade.classList.remove('isScroll')
        heade.style.opacity = '.2'
      } else if (scrollTop < 145 && scrollTop >= 140) {
        heade.classList.remove('isScroll')
        heade.style.opacity = '.3'
      } else if (scrollTop < 140 && scrollTop >= 135) {
        heade.classList.remove('isScroll')
        heade.style.opacity = '.4'
      } else if (scrollTop < 135 && scrollTop >= 130) {
        heade.classList.remove('isScroll')
        heade.style.opacity = '.5'
      } else if (scrollTop < 130 && scrollTop >= 125) {
        heade.classList.remove('isScroll')
        heade.style.opacity = '.6'
      } else if (scrollTop < 125 && scrollTop >= 120) {
        heade.classList.remove('isScroll')
        heade.style.opacity = '.7'
      } else if (scrollTop < 120 && scrollTop >= 115) {
        heade.classList.remove('isScroll')
        heade.style.opacity = '.8'
      } else if (scrollTop < 115 && scrollTop >= 110) {
        heade.classList.remove('isScroll')
        heade.style.opacity = '.9'
      } else if (scrollTop < 110) {
        heade.style.opacity = '1'
      }
    },
    toggle () {
      this.show = !this.show
      this.$refs.ss.toggle()
    },
    startPage (path) {
      this.$router.push(path)
    },
    utaskcoupon () {
      this.$http.utaskcoupon(data => {
        if (data.code === 0 && data.data) {
          this.userData = data.data
        }
      }).catch(e => {
      })
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.barScroll)
  },
  destroyed () {
    let head = document.querySelector('.q-header.btBorder')
    if (head) {
      head.style.position = 'fixed'
      head.style.opacity = '1'
    }
  }
}
</script>
