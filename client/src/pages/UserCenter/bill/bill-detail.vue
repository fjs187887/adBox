<style lang="less" scoped>
  .head{
    text-align: center;
    padding: 20px 0;
    overflow: hidden;
    font-size: 13px;
    height: auto;
    line-height: 2;
    transition: height .3s; /* 吸顶时间 */
  }
  .border-top-10{
    border-top: 6px #eee solid;
    padding: 20px 12px;
    margin-top: 20px;
    color: black;
    font-size: 13px;
  }
 .cenTit{
   margin: 0 4%;
   line-height: 2;
 }
</style>

<template>
  <q-layout>
    <div class="head">
      <p style="font-size: 20px">|/</p>
      <p>{{dataInfo.status | checkStatus || '已支付'}}</p>
    </div>
    <p class="border-top-10"></p>
    <div class="cenTit" style="border-bottom: 1px #eee solid">
      <p>{{dataInfo.name || '热文推1个月会员'}}</p>
      <p>规格：{{dataInfo.gg || '1个月会员'}}</p>
    </div>
    <div class="row full-width" style="margin-top: 20px">
      <div class="col-5 cenTit">实付金额</div>
      <div class="col-5 cenTit text-right">{{dataInfo.real_fee || '360'}}元</div>
    </div>
    <p class="border-top-10"></p>
    <div class="cenTit">
      <p>订单编号：{{dataInfo.id || '12342425'}}</p>
      <p>下单时间：{{dataInfo.create_time || '2019.07.15 18:01:56'}}</p>
      <p>支付时间：{{dataInfo.update_time || '2019.07.15 19:21:56'}}</p>
    </div>
  </q-layout>
</template>

<script>
export default {
  filters: {
    checkStatus (status) {
      switch (status) {
        case -2:
          return '已失效'
        case -1:
          return '已取消'
        case 0:
          return '未支付'
        case 1:
          return '待支付'
        case 2:
          return '待发货'
        case 3:
          return '待收货'
        case 4:
          return '已完成'
        case 5:
          return '已关闭'
        case 6:
          return '超时关闭'
      }
    }
    // -2已失效 -1已取消 1等待买家付款 2 待发货 3 待收货 4 已完成 5 已关闭 6超时关闭
  },

  inject: ['setTitle'],
  mounted: function () {
    this.setTitle('账单详情')
  },
  data () {
    return {
      dataInfo: '',
      id: ''
    }
  },
  created () {
    this.id = this.$route.query.data
    this.getData()
  },
  methods: {
    getData () {
      this.$http.userOrder({ id: this.id }, data => {
        if (data.code === 0 && data.data) {
          this.dataInfo = data.data
        }
      }).catch(e => {
      })
    },
    startPage (path) {
      this.$router.push({ path: path, query: '' })
    }
  }
}
</script>
