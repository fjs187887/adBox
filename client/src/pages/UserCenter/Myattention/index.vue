<style lang="less" scoped>
  .headerTopBox{
    position: fixed;
    z-index: 5000;
    background: #fff;
    width: 100%;
  }
  .q-header{
    position: relative;
    color: #000;
    width: 100%;
    background: #fff;
    height: 60px;
    padding: 0px 15px;
    transition: all .2s;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    .headerBar{
      position: absolute;
      bottom: 12px;
      list-style: none;
      display: flex;
      height: 25px;
      margin-left: -10px;
    }
    .headerList{
      width: 90px;
      text-align: center;
      display: table;
    }
    /* a */
    .hListItem{
      color: #000;
      font-size: 19px;
      font-weight: 600;
      display: table-cell;
      vertical-align: bottom;
      width: 100%;
      height: 25px;
      transition: font-size .2s;
    }
    .rightBox{
      float: right;
      position: absolute;
      bottom: 12px;
      right: 15px;
    }
    .rightBox .q-btn{
      margin-left: 20px;
      width: 16px;
      height: 16px;
      padding: 0;
      min-width: 0;
      min-height: 0;
    }
    .rightBox .q-btn img{
      width: 16px;
      height: 16px;
    }
  }
  .c-item{
    width: 100px;
    height: 45px;
    background: #000;
    color: #fff;
    padding: 0 7px;
    align-items: center;
    line-height: 1;
    font-size: 12px;
  }
  .c-item img{
    width: 12px;
    height: 12px;
    margin: 0 5px;
  }
  .q-page{
    padding-top: 105px;
  }
  ul li{
    list-style: none;
    padding: 0;
    margin:0;
  }
  .bBar{
    padding: 0 15px;
    border-bottom: 5px solid #f2f2f2;
  }
  .q-btn,
  .q-select{
    font-size: 13px;
    height: auto;
    min-height: 0;
    outline: none;
    padding: 0;
  }
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
  .bTextBox .bName .bNameP{
    margin-right: 5px;
    max-width: 75%;
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
    color: #989da6;
    border: 1px solid #989da6;
  }
</style>

<template>
  <q-layout class="animated fadeIn">
    <nodata v-if="isVoid"/>
    <div class="row bList" v-for="contact in dataInfo" :key="contact.id" @click="gobusiness(contact.uid)">
      <div class="bImgBox col-3">
        <span v-if="contact.avatar"><img class="bImg" :src="contact.avatar" ></span>
        <span v-else><img class="bImg" src="../../../statics/user/avatar.png" ></span>
      </div>
      <div class="bTextBox col-6">
        <div class="bName row">
          <p class="bNameP text-ellipsis">{{contact.nickname}}</p>
          <span v-if="contact.type === 0"><img src="../../../statics/TaskHall/geren.png" alt=""></span>
          <span v-else><img src="../../../statics/TaskHall/qiye.png" alt=""></span>
        </div>
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
      this.$router.push({ path: '/businessaccount/detailtask', query: { id: uid } })
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
