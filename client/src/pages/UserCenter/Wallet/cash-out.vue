<style lang="less" scoped>
.topBox{
  .bgMoney{
    width: 100%;
    min-height: 110px;
    padding: 25px 0;
    color: #333;
    text-align: center;
    p{
      font-size: 12px;
    }
    h5{
      font-size: 35px;
      line-height: 1;
      margin: 10px 0 25px;
    }
  }
}
.cenBox{
  padding: 0px 15px 10px;
  p{
    padding: 20px 0;
    font-size: 15px;
    color: #333;
  }
  ul.itemList{
    display: flex;
    .item{
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      border: 1px solid #b7bdc7;
      border-radius: 5px;
      padding: 10px 0;
      margin-bottom: 20px;
      &:nth-child(2){
        margin: 0 15px 20px;
      }
      &:nth-child(5){
        margin: 0 15px 20px;
      }
      img{
        width: 20px;
        margin-right: 8px;
      }
      .imgWhite{
        display: none;
      }
      span{
        font-size: 13px;
        color: #333;
      }
    }
    .primarys{// 激活状态
      background: #ff853a;
      border-color: #ff853a;
      .imgWhite{
        display: block;
      }
      .imgDefault{
        display: none;
      }
      span{
        color: #fff;
      }
    }
  }
  .bindWx{
    position: relative;
    display: flex;
    align-items: center;
    padding: 17px 0;
    .imgWx{
      width: 20px;
      margin-right: 15px;
    }
    span{
      color: #333;
      width: 100%;
    }
    .imgArrow{
      width: 8px;
      justify-content: flex-end;
    }
  }
}
.bottomBox{
  position:fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 15px;
  .q-btn{
    width: 100%;
    background-color: #ff853a;
    color: #fff;
    font-size: 13px;
    font-weight: normal;
    min-height: 0;
    height: 40px;
    box-shadow: none;
  }
}
</style>

<template>
  <q-layout class="animated fadeIn">
    <div class="topBox">
      <div class="bgMoney">
        <h5>{{dataInfo.wallet || 0.00}}</h5>
        <p>可提现收益</p>
      </div>
    </div>
    <div class="line"></div>
    <div class="cenBox">
      <p>提现方式</p>
      <ul class="itemList">
        <li class="item" :class="{primarys: payType===0}" @click="plf_checked(0)">
          <img class="imgDefault" src="statics/money/wx.png" alt="">
          <img class="imgWhite" src="statics/money/wxb.png" alt="">
          <span>微信</span>
        </li>
        <li class="item" :class="{primarys: payType===1}" @click="plf_checked(1)">
          <img class="imgDefault" src="statics/money/zfb.png" alt="">
          <img class="imgWhite" src="statics/money/zfbb.png" alt="">
          <span>支付宝</span>
        </li>
        <li class="item" :class="{primarys: payType===2}" @click="plf_checked(2)">
          <img class="imgDefault" src="statics/money/yhk.png" alt="">
          <img class="imgWhite" src="statics/money/yhkb.png" alt="">
          <span>银行卡</span>
        </li>
      </ul>
      <!-- ？？？？ -->
      <div class="bindWx btBorder topBorder">
        <img class="imgWx" src="statics/money/wx.png" alt="">
        <span>去微信绑定账户</span>
        <img class="imgArrow" src="statics/money/arrow.png" alt="">
      </div>
    </div>
    <div class="cenBox">
      <p>提现金额</p>
      <ul class="itemList">
        <li class="item" :class="{primarys: limitType===0}" @click="limit_checked(0)">
          <span>10 元</span>
        </li>
        <li class="item" :class="{primarys: limitType===1}" @click="limit_checked(1)">
          <span>20 元</span>
        </li>
        <li class="item" :class="{primarys: limitType===2}" @click="limit_checked(2)">
          <span>30 元</span>
        </li>
      </ul>
      <ul class="itemList">
        <li class="item" :class="{primarys: limitType===3}" @click="limit_checked(3)">
          <span>50 元</span>
        </li>
        <li class="item" :class="{primarys: limitType===4}" @click="limit_checked(4)">
          <span>100 元</span>
        </li>
        <li class="item" :class="{primarys: limitType===5}" @click="limit_checked(5)">
          <span>200 元</span>
        </li>
      </ul>
    </div>
    <div class="bottomBox topBorder">
      <q-btn rounded @click="toPay()">立即提现</q-btn>
    </div>
  </q-layout>
</template>

<script>
export default {
  inject: ['setTitle', 'registerRightComponent'],
  mounted: function () {
    this.setTitle('零钱')
  },
  data () {
    return {
      dataInfo: '',
      payType: 0,
      limitType: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.post('app/Wallet/index', (res) => {
        if (res.code === 0) {
          this.dataInfo = res.data
        } else {
          this.$toast.fail('网络错误')
        }
      })
    },
    toPay () {
      this.$http.post('app/Wallet/index', (res) => {
        if (res.code === 0) {
          this.dataInfo = res.data
        } else {
          this.$toast.fail('网络错误')
        }
      })
    },
    startPage (path) {
      this.$router.push({ path: path, query: '' })
    },
    plf_checked (type) {
      this.payType = type
    },
    limit_checked (type) {
      this.limitType = type
    }
  }
}
</script>
