<style scoped lang="less">
  .c-header{
    height: auto;
    text-align: center;
    z-index: 9;
    width: 100%;
    min-height: 55px;
    font-size: 16px;
    align-items: center;
    background-image: url('../../../../statics/TaskHall/ywc.png');
    background-size: 100% 100%;
    .statusTxt{
      height: 80px;
      align-items: center;
      line-height: 1;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      padding-left: 40px;
    }
    .moneyTxt{
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      color:#fff;
      background: rgba(255,255,255,.2);
      .leftT{
        text-align: left;
        padding-left: 40px;
      }
      .rightT{
        float: right;
      }
    }
  }
  .c-booter{
    position: fixed;
    bottom:0;
    z-index: 999;
    text-align: center;
    height: auto;
    width: 100%;
    background: #fff;
    padding:15px;
    .c-btn{
      height: 40px;
      font-size: 13px;
    }
    .c-btnGz {
      width: 80px;
    }
    .c-btnFx{
      width: 250px;
      margin-left: 15px;
      background: rgb(255,133,58)!important;
      color: #fff;
    }
    .c-btnFx.c-btnOff{
      background: #b7bdc7!important;
      color: #fff;
    }
  }
.contentBox{
  .item{
    padding: 20px 15px;
    font-size: 14px;
    p{
      padding: 0 0 20px;
      line-height: 1;
      color: #333;
    }
    span{
      font-size: 12px;
      color: #333;
    }
    .imgAdd{
      width: 100%;
    }
    .imgBox{//截图样例
      border-radius: 3px;
      img{
        width: 105px;
        height: 105px;
      }
    }
  }
}
// 步骤
.bottomBox{
  padding: 15px;
  width: 100%;
  background: #fff;
  p{
    font-size: 14px;
    color: #333;
    line-height: 1;
    margin-bottom: 15px;
  }
}
/* 弹窗2 */
.textSpan{
  position: relative;
  display: block;
  min-width: 240px;
  padding: 40px;
  text-align: center;
  font-size: 15px;
  color:#333;
}
.cardBtn{
  padding: 5px 0;
}
.cardBtn .q-btn{
  font-size: 13px;
  font-weight:normal;
  margin-left: 0!important;
}
</style>

<template>
  <q-layout class="animated fadeIn">
    <!-- status -->
    <!-- <van-sticky :offset-top="50"> -->
    <!-- </van-sticky> -->
    <div class="c-header" v-if="userTask">
      <div class="row statusTxt">
        <p v-if="userTask.status===0">待提交</p>
        <p v-if="userTask.status===1">待审核</p>
        <p v-if="userTask.status===2">已完成</p>
        <p v-if="userTask.status===3">不合格</p>
      </div>
      <div class="row col-12 moneyTxt">
        <p class="col-6 leftT">已获收益：{{userTask.real_income || 0}}元</p>
        <p class="col-6 rightT">预计收益：{{task.uv_income}}元</p>
      </div>
    </div>
    <!-- 内容 -->
    <div class="contentBox">
      <div class="row item">
        <p class="col-12">分享语：</p>
        <span class="col-12" >{{task.title}}</span>
      </div>
      <div class="row item">
        <p class="col-12" >分享图：</p>
        <div class="col-12">
          <div class="imgBox" v-for="item in task.images" :key="item.id">
            <img :src="item" alt="">
          </div>
        </div>
      </div>
      <div class="line"></div>
    </div>
    <!-- 内容 任务步骤 -->
    <div class="row toBorder bottomBox">
      <p class="row col-12" >任务步骤</p>
      <div class="col-12" style="line-height: 2" v-html="task.task_step_explain"></div>
    </div>
    <!-- 按钮 -->
    <div class="row c-booter topBorder" v-if="$store.state.user.info.id !== task.uid">
      <q-btn v-if="fans" color="primary" unelevated rounded outline class="col-3 c-btn c-btnGz" @click="businfo()">已关注</q-btn>
      <q-btn v-else color="primary" unelevated rounded outline class="col-3 c-btn c-btnGz" @click="businfo()">关注</q-btn>
      <q-btn unelevated rounded outline class="col-8 c-btn c-btnFx" v-if="!userTask" @click="receive()">领取任务<span v-if="task.isfree===0">赚{{task.uv_income}}元</span></q-btn>
      <div v-else-if="task.status===2" class="col-8">
        <div style="display: flex;justify-content: center;align-items: center; border-radius: 0.74rem" class="row c-btn c-btnFx" v-if="userTask.status===0" @click="receive()">
          <div class="col-12">重新分享</div>
          <div class="col-12"><count-down :end-time="endTime" after></count-down>提交任务</div>
        </div>
        <q-btn unelevated rounded outline class="c-btn c-btnFx" v-if="userTask.status===-1" @click="submitTask()">
          <count-down :end-time="endTime" before></count-down>提交任务截图</q-btn>
        <q-btn unelevated rounded outline class="c-btn c-btnFx" v-if="userTask.status===1" @click="submitTask()">重新上传截图</q-btn>
        <q-btn unelevated rounded outline class="c-btn c-btnFx c-btnOff" v-if="userTask.status===2">已完成</q-btn>
        <q-btn unelevated rounded outline class="c-btn c-btnFx" v-if="userTask.status===3" @click="seeDetail()">查看审核详情</q-btn>
      </div>
      <q-btn v-else unelevated rounded outline class="col-8 c-btn c-btnFx c-btnOff">已结束</q-btn>
    </div>
    <q-dialog v-model="persistent" persistent>
        <q-card class="no-shadow">
          <span class="textSpan btBorder">
            <span>确认领取任务</span>
          </span>
          <q-card-actions class="row cardBtn" align="center">
            <q-btn class="col-6" flat label="取消" color="gray" v-close-popup />
            <q-btn class="col-6 leBorder" flat label="确定" @click="receiveTask()" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    <coupon-select v-model="showCoupon" @onBack="onResult" @onRequest="hasCoupon"></coupon-select>
  </q-layout>
</template>

<script>
import CountDown from '../../../../components/CountDown'
import CouponSelect from 'app/src/components/coupon-select'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
export default {
  name: 'taskdetail',
  inject: ['setTitle'],
  components: { CountDown, CouponSelect },
  mounted () {
    this.setTitle('任务详情')
    this.$http.post('app/PromotionTask/buypoint', { type: 'get', name: 'ckxrw', id: this.$route.query.tid }, (res) => {
      var time = res.data
      if (time === 'not') {
        return false
      } else {
        var t
        clearTimeout(t)
        t = setTimeout(() => {
          this.$http.post('app/PromotionTask/buypoint', { type: 'query', name: 'ckxrw', id: this.$route.query.tid }, (res) => {
            if (res.code === 0) {
              this.$toast.success({
                message: '浏览小任务奖励金币'
              })
            }
          })
        }, time * 1000)
      }
    })
  },
  data () {
    return {
      userTask: '',
      task: '',
      fans: '',
      tid: '',
      persistent: false,
      showCoupon: false,
      isHasCoupon: true,
      endTime: '',
      saveImgList: ''
    }
  },
  created () {
    this.tid = this.$route.query.tid
    this.taskDetail(this.tid)
  },
  methods: {
    businfo () {
      this.$router.push({ path: '/businessaccount/detailtask', query: { id: this.task.uid } })
    },
    receiveTask () {
      if (this.isHasCoupon && !this.userTask) {
        this.showCoupon = true
      } else {
        this.onResult()
      }
    },
    taskDetail (tid) {
      this.$http.usertask({ tid: tid }, data => {
        if (data.code === 0 && data.data !== null) {
          this.task = data.data.task
          this.fans = data.data.fans
          this.saveImgList = data.data.task.images
          this.task.images = JSON.parse(this.task.images)
          if (data.data.usertask) {
            this.userTask = data.data.usertask
            this.formatTime(this.userTask.create_time, this.task.after_time)
          }
          if (data.msg) {
            this.$toast.success(data.msg)
          }
        } else {

        }
      }).catch(e => {
      })
    },
    submitTask () {
      this.$router.push({ path: '/tasksubmit', query: { data: this.task, id: this.userTask.id } })
    },
    seeDetail () {
      this.$router.push({ path: '/submitdetail', query: { id: this.userTask.id } })
    },
    receive () {
      this.persistent = true
    },
    formatTime (t, hours) {
      if (this.userTask.status >= 1) {
        return
      }
      var time = (t + hours * 60 * 60)
      if (time <= this.task.nowtime) {
        this.userTask.status = -1
        time = time + 30 * 60
        if (time <= this.task.nowtime) {
          this.task = { status: 2 }
        }
      }
      let date = new Date(time * 1000)
      this.endTime = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(i => i < 10 ? `0${i}` : i).join('-') + ' ' + [date.getHours(), date.getMinutes()].map(i => i < 10 ? `0${i}` : i).join(':')
    },
    onResult (value) {
      let pid = 0
      if (value) {
        pid = value.coupon_id
      }
      this.$copyText(this.task.title).then((e) => {
        console.log('复制成功')
      }, (e) => {
        console.log('复制失败')
      })
      this.$http.receive({ tid: this.task.id, coupon_id: pid }, data => {
        if ((data.code === 0 && data.data !== null) || data.error_code === 3130) {
          this.$toast.success('任务领取成功，分享语已复制，图片已保存到相册')
          this.persistent = false
          // this.$router.back()
          console.log(this.saveImgList)
          this.$saveImg(this.task.title, this.task.pub_platform, this.saveImgList)
          this.taskDetail(this.tid)
        }
      }).catch(e => {
      })
    },
    hasCoupon (value) {
      console.log(value.isHas)
      this.isHasCoupon = value.isHas
    }
  }
}
</script>
