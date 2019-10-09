<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout view="lHh lpr lFf">
    <q-infinite-scroll class="animated" ref="listScoll" @load="search">
      <nodata v-if="nodata"/>
      <div class="row bList" v-for="contact in listInfo" :key="contact.id" @click="gobusiness(contact)">
        <div class="bImgBox col-3">
          <span v-if="contact.avatar"><img class="bImg" :src="contact.avatar" ></span>
          <span v-else><img class="bImg" src="../../statics/user/avatar.png" ></span>
        </div>
        <div class="bTextBox col-6">
          <p class="bName">{{contact.nickname}}<img src="../../statics/TaskHall/geren.png" alt=""></p>
          <p class="bTip" caption>简介：{{contact.auth_introduction || '暂无简介'}}</p>
          <p class="col-12 bNum">关注数：{{contact.fanscount}}</p>
        </div>
        <div class="bBtnBox col-3" style="text-align: center">
          <q-btn v-if="contact.isfans==0" class="col-12 bg-primary text-white" >关注</q-btn>
          <q-btn v-else class="col-12 bg-grey yiguan" >已关注</q-btn>
        </div>
      </div>
      <!-- <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
        </div>
      </template> -->
    </q-infinite-scroll>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      key: '',
      type: 'user',
      nodata: false,
      listInfo: []
    }
  },
  created () {
    this.key = this.$route.query.key
  },
  methods: {
    searchByType (value) {
      this.key = value
      this.listInfo = []
      this.$http.getSearch({ key: this.key, type: this.type }, data => {
        if (data.code === 0) {
          if (data.data.user.length > 0) {
            this.nodata = false
            this.listInfo = data.data.user
            if (this.listInfo.length > 9) {
              this.$refs.listScoll.reset()
              this.$refs.listScoll.resume()
            }
          }
        }
      })
    },
    search (index, done) {
      if (index === 1) {
        this.listInfo = []
      }
      this.$http.getSearch({ key: this.key, type: this.type, page: index }, data => {
        if (data.code === 0 && data.data.user.length >= 0) {
          this.listInfo = this.listInfo.concat(data.data.user)
          if (data.data.user.length < 10) {
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
    startPage (path, data) {
      this.$router.push({ path: path, query: { data: data } })
    }
  }
}
</script>

<style lang="less" scoped>
  .bList{
    height: 90px;
  }
  .bTextBox{
    padding-top: 20px;
  }
  .bImg{
    display: block;
    margin: 16px auto;
    width: 57px;
    height: 57px;
    border-radius: 50%;
  }
  .bTextBox .bName{
    font-size: 14px;
    line-height: 1;
  }
  .bName img{
    height: 11px;
    width: 26px;
    margin-left: 5px;
  }
  .bTip{
    margin: 8px 0 5px;
    line-height: 1;
    color: rgb(152, 157, 166);
  }
  .bNum{
    padding:0 4px;
    width: auto;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    color: rgb(152, 157, 166);
    background: #fff9f5;
  }
  .bBtnBox{
    padding-top: 30px;
  }
  .q-btn{
    width: 65px;
    height: 28px;
    min-height: 0;
    min-width: 0;
    font-size: 12px;
    box-shadow: none!important;
    line-height: 1;
    padding: 0;
  }
  .yiguan{
    border: 1px solid rgb(152, 157, 166)!important;
    color: rgb(152, 157, 166)!important;
    background: #fff!important;
  }
</style>
