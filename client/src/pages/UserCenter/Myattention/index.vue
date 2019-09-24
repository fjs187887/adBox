<style lang="less" scoped>
.bList{
  height: 90px;
  .bImgBox{
    .bImg{
      display: block;
      margin: 16px auto;
      width: 57px;
      height: 57px;
      border-radius: 50%;
    }
  }
  .bTextBox{
    padding-top: 20px;
    .bName{
      font-size: 14px;
      line-height: 1;
      span{
        display: inline-block;
        max-width:75%;
      }
      img{
        height: 11px;
        width: 26px;
        margin-left: 5px;
        vertical-align: text-top;
      }
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
  }
  .bBtnBox{
    padding-top: 30px;
    .q-btn{
      width: 65px;
      height: 28px;
      min-height: 0;
      min-width: 0;
      font-size: 12px;
      box-shadow: none!important;
      line-height: 1;
      padding: 0;
      border: 1px solid rgb(152, 157, 166)!important;
      color: rgb(152, 157, 166)!important;
      background: #fff!important;
    }
  }
}
</style>

<template>
  <q-layout class="animated fadeIn">
    <nodata v-if="isVoid"/>
    <div class="row bList" v-for="contact in dataInfo" :key="contact.id" @click="gobusiness(contact.uid)">
      <div class="bImgBox col-3">
        <img class="bImg" :src="contact.avatar" >
      </div>
      <div class="bTextBox col-6">
        <p class="bName"><span class="ellipsis">{{contact.name}}</span><img src="../../../statics/TaskHall/geren.png" alt=""></p>
        <p class="bTip" caption>简介：{{contact.auth_introduction}}</p>
        <p class="col-12 bNum">关注数：{{contact.count}}</p>
      </div>
      <div class="bBtnBox col-3" style="text-align: center">
        <q-btn class="col-12 yiguan" >已关注</q-btn>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  inject: ['registerRightComponent', 'setTitle'],
  mounted () {
    this.setTitle('我的关注')
  },
  created () {
    this.getdata()
  },
  data () {
    return {
      dataInfo: [],
      slide: 1,
      isVoid: false
    }
  },
  methods: {
    gobusiness (uid) {
      this.$router.push({ path: '/businessaccount/detail', query: { id: uid } })
    },
    getdata () {
      this.$http.post('app/Business/attentionlist', (res) => {
        if (res.code === 0) {
          if (res.data.length > 0) {
            this.dataInfo = res.data
          } else {
            this.$toast.fail({
              message: '没有关注商家'
            })
          }
        } else {
          this.isVoid = true
        }
      })
    }
  }
}
</script>
