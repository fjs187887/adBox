<style scoped lang="less">
.itemList{
  padding: 0 15px;
  .tBox{
    padding: 20px 0;
    position: relative;
    .tLeft{
      img{
        height: 55px;
        width: 100px;
        border-radius: 4px;
      }
    }
    .tRight{
      .tiTle{
        padding: 5px 0 10px;
        width: 100%;
        font-size: 13px;
        color:#333;
      }
    }
    .moneyBox{
      align-items: center;
      p{
        font-size: 13px;
      }
      .label{
        font-size: 12px;
        color: #999;
      }
      .btnBox{
        .q-btn{
          font-size: 12px;
          width: 100%;
          padding: 0;
          height: 30px;
          min-height: 0;
          box-shadow: none;
        }
        .guang{
          background: #fff!important;
          border: 1px solid rgb(183, 189, 199)!important;
          color: rgb(183, 189, 199)!important;
        }
      }
    }
  }
}
  .scrollBox{
    width: 100%;
    overflow-x: scroll;
    .q-btn-toggle{
      width: 100%;
      color: #999;
      background: #fff;
      border-bottom: 5px solid #f2f2f2;
    }
    /deep/.q-btn{
      font-size: 12px;
      font-weight: 400!important;
    }
  }
</style>

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout view="lHh lpr lFf">
    <q-infinite-scroll class="animated fadeIn" ref="listScoll" @load="loadMore">
      <q-pull-to-refresh @refresh="refresh">
        <nodata v-if="nodata"/>
        <!-- item -->
        <div class="itemList">
          <div v-for="dataInfo in listInfo" :key="dataInfo.id" class="row tBox btBorder" @click="startPage(dataInfo)">
            <div class="col-4 tLeft">
              <img :src="dataInfo.cover">
            </div>
            <div class="row col-8 tRight">
              <p class="tiTle ellipsis">{{dataInfo.title}}</p>
              <div class="row col-12 moneyBox">
                <p class="col-2 text-primary">￥{{dataInfo.max_income}}</p>
                <p class="col-6 label">剩余：{{dataInfo.surplus}}%</p>
                <div class="col-4 btnBox">
                  <q-btn v-if="dataInfo.status==1" class="guang bg-grey text-white" >已抢光</q-btn>
                  <q-btn v-else class="bg-primary text-white" >分享赚钱</q-btn>
                </div>
              </div>
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

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      listInfo: [],
      nodata: false,
      show: true,
      screen: '0', // 筛选
      loadings: false
    }
  },
  created () {
  },
  methods: {
    toggle () {
      this.show = !this.show
    },
    startPage (data) {
      var path = ''
      if (data.type === '1') {
        path = '/taskdetail'
      }
      if (data.type === '2') {
        path = '/taskdetailmini'
      }
      this.$router.push({ path: path, query: { tid: data.tid } })
    },
    refresh (done) {
      this.listInfo = []
      this.$http.gettask({ cut: 'team' }, data => {
        if (data.code === 0 && data.data.list.length >= 0) {
          this.listInfo = data.data.list
          if (this.listInfo.length > 9) {
            this.$refs.listScoll.reset()
            this.$refs.listScoll.resume()
          }
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
      this.$http.gettask({ cut: 'team', page: index }, data => {
        if (data.code === 0 && data.data.list.length >= 0) {
          this.listInfo = this.listInfo.concat(data.data.list)
          if (data.data.list.length < 10) {
            console.log('data.data.list.length < 10')
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
