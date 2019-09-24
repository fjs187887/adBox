<style scoped lang="less">
  .item{
    width: 100%;
    padding: 25px 15px 20px;
    background: #fff;
    border-bottom: 3px solid #f0f0f0;
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
        color:#999;
        border-radius: 3px;
        border: 1px solid #999;
      }
    }
  }
</style>

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout>
    <q-page-container>
      <q-page class="animated fadeIn">
        <q-infinite-scroll ref="listScoll" @load="loadMore" :offset="250" >
          <q-pull-to-refresh @refresh="refresh">
            <!-- item模块 -->
            <div class="row item" v-for="dataInfo in listInfo" :key="dataInfo.id" >
              <!-- 顶部时间 状态 -->
              <div class="row col-12 topBox">
                <p class="col-9 topTime">发布时间：{{dataInfo.create_time | formatTime}}</p>
                <p class="col-3 topStatus" align="center">{{dataInfo.status | checkStatus}}</p>
              </div>
              <!-- 中间头像 (标题 价格) -->
              <div class="row col-12 cenBox" @click="startPage(dataInfo,'/releasetaskdetail',dataInfo.tid)">
                <div class="col-12">
                  <div class="cenImgBox">
                    <img :src="dataInfo.cover">
                  </div>
                  <q-item-section>
                    <q-item-label class="cenTit ellipsis">{{dataInfo.title}}</q-item-label>
                    <!-- 价格 -->
                    <q-item-label class="cenMoney" v-if="dataInfo.isfree===0">任务预算：
                      <span>{{dataInfo.budget || 0}}元</span>
                    </q-item-label>
                  </q-item-section>
                </div>
              </div>
              <!-- 底部按钮 -->
              <div class="column items-end" style="width: 100%">
                <div class="col row" v-if="dataInfo.status == 0">
                  <q-btn class="col" outline label="取消" :dense="true" @click="candel(dataInfo.id,4)"></q-btn>
                  <q-btn class="col" outline label="编辑" :dense="true" @click="startPage(dataInfo,'/releasetask',true)"></q-btn>
                  <q-btn class="col" outline label="支付" :dense="true"></q-btn>
                </div>
                <div class="col" v-else-if="dataInfo.status == 4">
                  <q-btn outline label="删除" :dense="true" @click="candel(dataInfo.id,-1)"></q-btn>
                </div>
                <div class="col" v-else>
                  <q-btn outline label="再次发布" :dense="true" @click="startPage(dataInfo,'/releasetask')"></q-btn>
                </div>
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  filters: {
    checkStatus (status) {
      switch (status) {
        case 0:
          return '待支付'
        case 1:
          return '未开始'
        case 2:
          return '进行中'
        case 3:
          return '已完成'
        case 4:
          return '已取消'
        case 5:
          return '不通过'
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
      loadings: false
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
      this.$http.task({ cut: 'share', status: 1 }, data => {
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
      this.$http.task({ cut: 'share', status: 1, page: index }, data => {
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
      this.$http.task({ cut: 'share', status: 1 }, data => {
        this.loadings = false
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = data.data
        } else {

        }
        done(true)
      }).catch(e => {
      })
    },
    /**
     * 取消或者删除操作
     * @param tid
     * @param status 4取消/-1删除
     */
    candel (tid, status) {
      this.$http.alterTaskStatus({ tid: tid, status: status }, data => {
        if (data.code === 0 && data.data) {
          this.$toast.success('操作成功')
          this.getData()
        } else {
          this.$toast.fail(data.msg || '操作失败')
        }
      }).catch(e => {
      })
    }
  }
}
</script>
