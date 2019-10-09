<style scoped lang="less">
.item{
  width: 100%;
  padding: 25px 15px 25px;
  background: #fff;
  border-bottom: 3px solid #f0f0f0;
  .Box{
    .topImgBox{
      width: 60px;
      height: 60px;
      float: left;
      border-radius: 4px;
      overflow: hidden;
      margin-right: 15px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .cenTxtBox{
      .cenTit{
        font-size: 14px;
        color: #333;
        padding-top: 5px;
        opacity: 1;
      }
      .cenMoney{
        margin-top: 25px;
        font-size: 12px;
        p{
          color:#999;
        }
        span{
          color: rgb(255,90,61);
          text-align: left;
        }
      }
    }
    .statusBox{
      justify-content: flex-end;
      text-align: right;
      .p{
        font-size: 12px;
        color: #ff853a;
      }
    }
    .cenTime{
      padding-top: 20px;
      width: 100%;
      align-items: center;
      >.col-8{
        font-size: 12px;
        color: rgb(255,90,61);
      }
      .row{
        justify-content: flex-end;
        .q-btn{
          width: 70px;
          height: 30px;
          font-size: 12px;
          border: 1px solid #989da6;
          padding: 0;
          background: #fff;
          color: #989da6!important;
          min-height: 0;
          font-weight: 400!important;
        }
      }
    }
  }
}
</style>

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
<q-layout >
  <q-infinite-scroll ref="listScoll" @load="loadMore">
    <q-pull-to-refresh @refresh="refresh">
      <nodata v-if="nodata"/>
      <!-- item模块 -->
      <div class="row item" v-for="dataInfo in listInfo" :key="dataInfo.id" @click="startPage(dataInfo)">
        <div class="row col-12 Box">
          <!-- 头像 -->
          <div class="col-3 topImgBox">
            <img :src="dataInfo.cover">
          </div>
          <!-- 提示 简介 -->
          <div class="col-9 cenTxtBox">
            <div class="row">
              <div class="col-12 cenTit ellipsis">{{dataInfo.title}}</div>
            </div>
            <!-- 价格 -->
            <div class="row cenMoney">
              <span class="col-4">{{dataInfo.real_income||0}}元</span>
              <!-- 状态 -->
              <div class="col-8 statusBox">
                <p v-if="dataInfo.isGQ">已过期</p>
                <p v-else flat class="col-12 text-primary">待提交</p>
              </div>
            </div>
          </div>
          <!-- 时间 -->
          <div v-if="!dataInfo.isGQ" class="row cenTime">
            <div class="col-8">
              <p>
                请<count-down :end-time="dataInfo.cuntTime" after></count-down>提交审核
              </p>
            </div>
            <div class="col-4 row">
              <q-btn flat color="primary" class="col-12" @click="startPage(dataInfo)">提交</q-btn>
            </div>
          </div>
        </div>
      </div>
      <!-- 滚动加 -->
    </q-pull-to-refresh>
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
      </div>
    </template>
  </q-infinite-scroll>

</q-layout>
</template>

<script>
import CountDown from '../../../../../components/CountDown'
export default {
  components: { CountDown },
  name: 'index',
  data () {
    return {
      tab: '1',
      listInfo: [],
      model: '',
      status: '0',
      nodata: false
    }
  },
  methods: {
    startPage (data) {
      this.$router.push({ path: '/taskdetailmini', query: { data: data, tid: data.task_id } })
    },
    refresh (done) {
      this.listInfo = []
      this.$http.usertask({ type: 2, status: this.status }, data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = data.data
          this.formatTime()
          if (this.listInfo.length > 9) {
            this.$refs.listScoll.reset()
            this.$refs.listScoll.resume()
          }
        } else {
          this.nodata = true
        }
        done()
      }).catch(e => {
        done()
      })
    },
    loadMore (index, done) {
      if (index === 1) {
        this.listInfo = []
      }
      this.$http.usertask({ type: 2, page: index, status: this.status }, data => {
        if (data.code === 0 && data.data.length >= 0) {
          this.listInfo = this.listInfo.concat(data.data)
          this.formatTime()
          if (data.data.length < 10) {
            this.$refs.listScoll.stop()
          }
        }
        if (this.listInfo.length === 0) {
          this.nodata = true
          this.$refs.listScoll.stop()
        }
        done()
      }).catch(e => {
        done()
      })
    },
    formatTime () {
      for (let i = 0; i < this.listInfo.length; i++) {
        if (this.listInfo[i].status === 0) {
          let date = new Date(this.listInfo[i].create_time * 1000)
          if (this.listInfo[i].create_time + this.listInfo[i].after_time * 60 * 60 < this.listInfo[i].nowtime) {
            this.$set(this.listInfo[i], 'isGQ', true)
          }
          let fo = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(i => i < 10 ? `0${i}` : i).join('-') + ' ' + [date.getHours() + this.listInfo[i].after_time, date.getMinutes(), '0'].map(i => i < 10 ? `0${i}` : i).join(':')
          this.$set(this.listInfo[i], 'cuntTime', fo)
        }
      }
    }
  }
}
</script>
