<style scoped lang="less">
  .item{
    width: 90%;
    padding: 25px 15px 20px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    margin: 10px 5%;
    .topBox{
      font-size: 12px;
      .topTime{
        color: #999;
        text-align: right;
      }
      .topStatus{
        color: rgb(255,133,58);
      }
    }
    .cenTit{
      margin-top: 25px;
    }
  }
</style>

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout>
    <q-infinite-scroll ref="listScoll" @load="loadMore" :offset="250" >
      <q-pull-to-refresh @refresh="refresh">
        <!-- item模块 -->
        <div class="row item" v-for="dataInfo in listInfo" :key="dataInfo.id" @click="startPage(dataInfo,'/bill-detail',dataInfo.tid)">
          <!-- 顶部时间 状态 -->
          <div class="row full-width topBox">
            <p class="col-6 topStatus">{{dataInfo.status | checkStatus}}</p>
            <p class="col-6 topTime">{{dataInfo.create_time}}</p>
          </div>

          <div class="row full-width cenTit ellipsis">
            <p>{{dataInfo.name || '2019/8/30 21：00-2019 / 8/31 12:00系统开始升级，升级期间可能影响系统业务的进行'}}</p>
          </div>
        </div>
      </q-pull-to-refresh>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
        </div>
      </template>
    </q-infinite-scroll>
    <q-page-scroller position="bottom-right" :scroll-offset="250" :offset="[18, 18]">
      <q-btn class="toTop" fab icon="keyboard_arrow_up" color="primary"></q-btn>
    </q-page-scroller>
  </q-layout>
</template>

<script>
export default {
  inject: ['setTitle'],
  mounted () {
    this.setTitle('公告')
  },
  filters: {
    checkStatus (status) {
      switch (status) {
        case -2:
          return '已失效'
        case -1:
          return '已取消'
        case 0:
          return '未支付'
        case 1:
          return '待支付'
        case 2:
          return '待发货'
        case 3:
          return '待收货'
        case 4:
          return '已完成'
        case 5:
          return '已关闭'
        case 6:
          return '超时关闭'
      }
    }
    // -2已失效 -1已取消 1等待买家付款 2 待发货 3 待收货 4 已完成 5 已关闭 6超时关闭
  },
  data () {
    return {
      listInfo: [],
      loadings: false,
      type: 3,
      status: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    startPage (data, path, attach) {
      this.$router.push({ path: path, query: { data: data, attach: attach } })
    },
    getData () {
      this.loadings = true
      this.listInfo = []
      this.$http.userOrder({ type: this.type, status: this.status }, data => {
        this.loadings = false
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = data.data
          if (this.listInfo.length > 9) {
            this.$refs.listScoll.resume()
          }
        } else {

        }
      }).catch(e => {
      })
    },
    loadMore (index, done) {
      if (this.listInfo.length === 0) {
        this.$refs.listScoll.reset()
        done(true)
        return
      }
      index = index + 1
      this.$http.userOrder({ type: this.type, status: this.status, page: index }, data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = this.listInfo.concat(data.data)
          done(false)
        } else {
          done(true)
        }
      }).catch(e => {
        done(true)
      })
    },
    refresh (done) {
      this.loadings = true
      this.listInfo = []
      this.$http.userOrder({ type: this.type, status: this.status }, data => {
        this.loadings = false
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = data.data
        } else {

        }
        done(true)
      }).catch(e => {
      })
    }
  }
}
</script>
