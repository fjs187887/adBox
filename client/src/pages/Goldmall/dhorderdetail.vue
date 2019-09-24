<style lang="less" scoped>
.itemBox{
  padding: 35px 15px 18px;
  // 状态
  .itemStatus{
    margin-bottom: 12px;
    line-height: 1;
    text-align: center;
    font-size: 25px;
    min-height: 25px;
    color: #333;
    font-weight: 700;
  }
  // 兑换码
  .prizeBox{
    width: 240px;
    margin: 0 auto;
    margin-top: 25px;
    p{
      color: #999;
      font-size: 12px;
      line-height: 1;
      margin-bottom: 12px;
    }
    .copyBox{
      width: 100%;
      height: auto;
      overflow: hidden;
      .ma{
        float: left;
        min-width: 145px;
        height: 25px;
        line-height: 25px;
        border-radius: 2px;
        background: #F7F7F7;
        text-align: center;
        padding: 0 13px;
        font-size: 13px;
        color: #333;
        margin-right: 20px;
      }
      .copy{
        float: left;
        width: 75px;
        height: 25px;
        line-height: 25px;
        border-radius: 2px;
        background: #ff853a;
        text-align: center;
        color: #fff;
      }
    }
  }
}
.cenBox{
  padding: 20px 15px 0;
  >.col-3{
    img{
      width: 60px;
      min-width: 60px;
      min-height: 60px;
      height: 60px;
      border-radius: 2px;
    }
  }
  >.col-9{
    p{
      &:first-child{
        font-size: 14px;
        color: #333;
        margin: 5px 0 25px;
      }
    }
    .itemGg{
      font-size: 12px;
      color: #999;
    }
  }
  .money{
    position: relative;
    font-size: 13px;
    margin-top: 20px;
    padding: 20px 0;
    width: 100%;
    span{
      text-align: right;
      color: #ff853a;
    }
  }
}
.bottomBox{
  padding: 20px 15px;
  p{
    width: 100%;
    line-height: 1;
    font-size: 13px;
    color:#333;
    margin-bottom: 20px;
  }
}
</style>

<template>
  <div class="animated fadeIn">
    <div class="itemBox">
      <!-- 状态 -->
      <p class="itemStatus">{{ order.statusname }}</p>
      <!-- 兑换码 -->
      <div class="prizeBox">
        <p>请复制兑换码前往热文推页面兑换</p>
        <div class="copyBox">
          <div class="ma">{{ order.code }}</div>
          <div class="copy" v-clipboard:copy="order.code" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <!-- 标题 头像 金额 -->
    <div class="row cenBox" @click="to">
      <div class="col-3">
        <img :src="goods_order.goods_image"/>
      </div>
      <div class="col-9">
        <p class="ellipsis">{{ goods_order.goods_title }}</p>
        <!-- 规格 bug -->
        <p class="row itemGg" v-if="is_spec">规格：<span></span></p>
      </div>
      <div class="row money topBorder">
        实付金额：<span class="col">{{ order.price }}</span>
      </div>
    </div>
    <div class="line"></div>
    <!-- 编号 时间 -->
    <div class="row bottomBox">
      <p>订单编号：{{ order.order_sn }}</p>
      <p>下单时间：{{ order.create_time }}</p>
      <p>支付时间：{{ order.pay_time }}</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
export default {
  inject: ['setTitle'],
  data () {
    return {
      is_spec: false,
      order: {},
      goods_order: {}
    }
  },
  created () {
    this.setTitle('兑换详情')
  },
  mounted () {
    this.$http.post('app/Order/orderdetail', { id: this.$route.query.id }, (res) => {
      this.order = res.data.order
      this.goods_order = res.data.goods_order
      if (this.goods_order.goods_spec) {
        this.is_spec = true
      }
    })
  },
  methods: {
    onCopy () {
      this.$toast.success('已复制')
    },
    onError () {
      this.$toast.fail('复制失败')
    },
    to () {
    }
  }
}
</script>
