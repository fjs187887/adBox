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
          text-align: right;
        }
      }
    }
    .statusBox{
      padding-top: 5px;
      justify-content: flex-end;
      text-align: right;
      .p{
        font-size: 12px;
        color: #ff853a;
      }
      .unSh{
        color:#999;
      }
    }
  }
}
</style>

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout class="animated fadeIn">
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
                <div class="col-8 cenTit ellipsis">{{dataInfo.title}}</div>
                <!-- 状态 || 按钮 -->
                <div class="col-4 statusBox">
                  <p class="text-primary" @click="startPage(dataInfo)">详情</p>
                </div>
              </div>
              <!-- 价格 -->
              <div class="row cenMoney">
                <div class="col-8" >
                  <p>简介：{{dataInfo.auth_introduction||'暂无介绍'}}</p>
                </div>
                <span class="col-4">{{dataInfo.uv_income || 0}}元</span>
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
export default {
  name: 'index',
  data () {
    return {
      tab: '1',
      listInfo: [],
      model: '',
      status: '1',
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
