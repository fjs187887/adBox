<style scoped>
  .tBox{
    height: 118px;
    margin: 0 15px;
    border-bottom: 1px #eee solid;
  }
  .tLeft{
    padding: 0;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .tLeft img{
    width: 84px;
    height: 84px;
    border-radius: 4px;
  }
  .tRight{
    padding-left: 15px;
    padding-top: 20px;
    padding-bottom: 4px;
  }
  .tRight p.tiTle{
    text-align: left;
    display: block;
    width: 100%;
    font-size: 14px;
    color: rgb(51,51,51);
    height: 40px;
    overflow: hidden;
  }
  .moneyBox{
    width: 170px;
    padding-top: 4px;
  }
  .moneyBox p{
    float: left;
    text-align: left;
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
  }
  .moneyBox p.label{
    font-size: 12px;
    color: rgb(153,153,153);
    font-weight:normal;
    line-height: 26px;
    padding-left: 11px;
  }
  .btnBox{
    width: 70px;
    float: right;
    height: 32px;
    line-height: 32px;
  }
  .btnBox button,.q-button{
    width:100%;
    height: 32px;
    min-height: 0;
    padding: 0;
    font-size: 12px;
    box-shadow: none;
    border-radius: 2px;
    border: transparent;
  }
  .guang{
    background: #fff!important;
    border: 1px solid rgb(183, 189, 199)!important;
    color: rgb(183, 189, 199)!important;
  }
  .scrollBox{
    width: 100%;
    overflow-x: scroll;
  }
  .q-btn-toggle{
    width: 400px;
    color: gray;
    /* opacity: 0.85; */
    font-weight: normal!important;
    background: #fff;
    border-bottom: 5px solid #f2f2f2;
  }
</style>

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout view="lHh lpr lFf">
    <q-page-container>
      <q-page>
        <q-infinite-scroll class="animated fadeIn" ref="listScoll" @load="loadMore" :offset="250">
          <q-pull-to-refresh @refresh="refresh">
            <div v-for="dataInfo in listInfo" :key="dataInfo.id" class="row tBox">
              <div class="col-3 tLeft">
                <img :src="dataInfo.cover">
              </div>
              <div class="row col-9 tRight" align="center">
                <p class="tiTle">{{dataInfo.title}}</p>
                <div class="moneyBox">
                  <p class="col-12 text-primary">￥{{dataInfo.max_income}}</p>
                  <p class="label">剩余：{{dataInfo.surplus}}%</p>
                </div>
                <div class="btnBox">
                  <q-btn v-if="dataInfo.status==1" class="guang col-12 bg-grey text-white" @click="startPage(dataInfo)">已抢光</q-btn>
                  <q-btn v-else class="col-12 bg-primary text-white" @click="startPage(dataInfo)">分享赚钱</q-btn>
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      listInfo: [],
      show: true,
      uid: '',
      type: 0,
      cut: 'task'
    }
  },
  created () {
    this.uid = this.$route.query.id
    this.getdata()
  },
  methods: {
    toggle () {
      this.show = !this.show
    },
    startPage (data) {
      this.$router.push({ path: '/taskdetail', query: { tid: data.tid } })
    },
    getdata () {
      this.listInfo = []
      this.$http.task({ uid: this.uid, cut: this.cut, type: this.type }, data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = data.data
          this.$refs.listScoll.resume()
        } else {
        }
      }).catch(e => {
      })
    },
    refresh (done) {
      this.listInfo = []
      this.$http.task({ uid: this.uid, cut: this.cut, type: this.type }, data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = data.data
        } else {
        }
        done(true)
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
      this.$http.task({ uid: this.uid, cut: this.cut, type: this.type, page: index }, data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = this.listInfo.concat(data.data)
          done(false)
        } else {
          done(true)
        }
      }).catch(e => {
        done(true)
      })
    }
  }
}
</script>
