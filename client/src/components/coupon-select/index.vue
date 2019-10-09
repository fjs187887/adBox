<style lang="less" scoped>
  .c-popup {
    min-height: 39%;
    max-height: 60%;
    width: 100%;
    .title {
      padding: 30px 0;
      text-align: center;
      font-size: 15px;
      color: #333;
    }
    .itemList{
      padding: 0 55px 105px;
      .itemBox {
        margin: 0 0 20px;
        padding:15px 30px;
        background: #ff853a;
        border-radius: 5px;
        color: #fff;
        .row {
          align-items: flex-end;

          span {
            font-size: 13px;
          }

          .moneySpan {
            font-size: 24px;
            margin-right: 9px;
          }
        }
        .marTop {
          margin-top: 15px;
          font-size: 12px;
        }
        .img {
          img {
            height: 48px;
            float: right;
          }
        }
        .spot{
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .spotc {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            vertical-align: center
          }
          .spotc.xxx {
            background: white;
          }
        }
      }
    }
    .c-booter{
      position: fixed;
      bottom:0;
      z-index: 999;
      text-align: center;
      width: 100%;
      background: #fff;
      .pYj{
        padding: 20px 0 10px;
        font-size: 13px;
        color: #333;
      }
      .row{
        .q-btn{
          box-shadow: none;
          font-size: 13px;
          height: 40px;
          font-weight: normal;
          &:first-child{
            border: 1px solid #999;
            color: #999!important;
          }
        }
      }
    }
    .c-btn {
      margin: 15px 30px;
    }
  }
</style>
<template>
  <van-popup class="c-popup" position="bottom" v-model="isShow" :close-on-click-overlay="false">
    <p class="title">选择优惠券</p>
    <nodata v-if="nodata"/>
    <div class="itemList">
     <div class="row itemBox" v-for="item in listInfo" :key="item.aid" @click="checked(item)">
       <div class="col-7">
         <!-- 金额 券 -->
         <div class="row">
           <span class="moneySpan">{{ item.denomination }}</span>
           <span class="col">{{ item.couname }}</span>
         </div>
         <div class="row marTop">
           有效期：{{ item.end_time }}
         </div>
       </div>
       <div class="col-5 spot">
         <div class="spotc" :class="{xxx: item.id===checkItem.id}"></div>
       </div>
     </div>
   </div>
    <div class="c-booter topBorder">
      <div class="pYj" v-if="checkItem.denomination"> 使用此优惠券能让您本次分享获得的佣金增加{{checkItem.denomination}}</div>
      <div class="pYj" v-else> 请选择优惠券</div>
      <div class="row">
        <q-btn rounded outline class="col-4 text-primary c-btn" @click="cancel">取消</q-btn>
        <q-btn rounded class="col-4 bg-primary text-white c-btn" @click="confirm">确定</q-btn>
      </div>
    </div>
  </van-popup>
</template>
<script>

export default {
  props: ['value'],
  data () {
    return {
      listInfo: '',
      checkItem: '',
      isShow: false,
      nodata: false
    }
  },
  watch: {
    value (value) {
      this.isShow = value
    }
  },
  created () {
    this.getData()
  },
  methods: {
    checked (value) {
      this.checkItem = value
    },
    confirm () {
      this.isShow = false
      this.$emit('input', false)
      this.$emit('onBack', { 'coupon_id': this.checkItem.coupon_id })
    },
    cancel () {
      this.isShow = false
      this.$emit('input', false)
      this.$emit('onBack', { 'coupon_id': 0 })
    },
    getData () {
      this.$http.brokerage(data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = data.data
        } else {
          this.$emit('onRequest', { 'isHas': false })
          this.nodata = true
        }
      }).catch(e => {
      })
    }
  }
}
</script>
