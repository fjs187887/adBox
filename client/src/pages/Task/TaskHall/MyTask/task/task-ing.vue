<style scoped lang="less">
  .item{
    width: 100%;
    padding: 25px 15px 20px;
    border-bottom: 3px solid #f0f0f0;
    background: #fff;
    .topBox{
      font-size: 12px;
      .topTime{
        color: #999;
      }
      .topStatus{
        color: rgb(255,133,58);
        text-align: right;
      }
    }
    .cenBox{
      padding-top: 15px;
      .cenImgBox{
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
      .cenTit{
        font-size: 14px;
        color: #333;
        padding-top: 5px;
        opacity: 1;
      }
      .cenMoney{
        margin-top: 25px;
        font-size: 12px;
        color: #333;
        span{
          color: rgb(255,90,61);
        }
      }
    }
    >.items-end{
      margin-top: 30px;
      .q-btn{
        width:70px;
        height: 28px;
        margin-left: 15px;
        font-size: 12px;
        border: 1px solid #989da6;
        padding: 0;
        background: #fff;
        color: #989da6!important;
        border-radius: 3px;
      }
    }
  }
</style>

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout>
    <q-infinite-scroll ref="listScoll" @load="loadMore" >
      <q-pull-to-refresh @refresh="refresh">
        <nodata v-if="nodata"/>
        <!-- item模块 -->
        <div class="row item" v-for="dataInfo in listInfo" :key="dataInfo.id" @click="startPage(dataInfo)">
          <!-- 顶部时间 状态 -->
          <div class="row col-12 topBox">
            <p class="col-9 topTime">分享时间：{{dataInfo.create_time | formatTime}}</p>
            <p class="col-3 topStatus" align="center">{{dataInfo.status | checkStatus}}</p>
          </div>
          <!-- 中间头像 (标题 价格) -->
          <div class="row col-12 cenBox">
            <q-item class="col-12">
              <div class="cenImgBox">
                <img :src="dataInfo.cover">
              </div>
              <q-item-section>
                <q-item-label class="cenTit ellipsis">{{dataInfo.title}}</q-item-label>
                <!-- 价格 -->
                <q-item-label class="cenMoney" caption>收益：
                  <span>{{dataInfo.real_income || 0}}元</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-pull-to-refresh>
    </q-infinite-scroll>
  </q-layout>
</template>

<script>
export default {
  filters: {
    checkStatus (status) {
      switch (status) {
        case 0:
          return '进行中'
        case 1:
          return '已完成'
      }
    },
    formatTime (value) {
      let date = new Date(value * 1000)
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(i => i < 10 ? `0${i}` : i).join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].map(i => i < 10 ? `0${i}` : i).join(':')
    }
  },
  data () {
    return {
      listInfo: [],
      nodata: false
    }
  },
  created () {
  },
  methods: {
    startPage (data) {
      this.$router.push({ path: '/taskdetail', query: { tid: data.task_id } })
    },
    refresh (done) {
      this.listInfo = []
      this.$http.usertask({ cut: 'share', status: 0 }, data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = data.data
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
      this.$http.usertask({ cut: 'share', status: 0, page: index }, data => {
        if (data.code === 0 && data.data.length >= 0) {
          this.listInfo = this.listInfo.concat(data.data)
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
    }
  }
}
</script>
