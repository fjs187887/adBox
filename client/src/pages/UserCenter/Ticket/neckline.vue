<style lang="less" scoped>
.ylq{
  background: #B7BDC7!important;
}
.itemBox{
  margin: 20px 15px;
  background: #ff853a;
  border-radius: 5px;
  color: #fff;
  .col-4{
    border-right: 1px dashed #fff;
    padding: 15px 0px;
    font-size: 14px;
    span{
      justify-content: center;
      align-items: center;
      display: flex;
      height: 100%;
    }
  }
  .col-8{
    padding: 15px 15px;
  }
  .row{
    align-items: flex-end;
    span{
      font-size: 13px;
    }
    .moneySpan{
      font-size: 24px;
      margin-right: 9px;
    }
  }
  .marTop{
    margin-top:15px;
    font-size: 12px;
  }
  .img{
    img{
      height: 48px;
      float: right;
    }
  }
}
</style>

<template>
  <div class="animated fadeIn">
    <div class="row itemBox" :class="isLq ? 'ylq' : ''" v-for="item in list" :key="item.aid">
      <!-- 金额 券 -->
      <div class="col-4" @click="lingqu(item.lqstatus,item.id)"><span>{{ item.lqstatus }}</span></div>
      <div class="col-8">
        <div class="row">
          <span class="moneySpan">{{ item.denomination }}</span>
          <span class="col">{{ item.couname }}</span>
        </div>
        <div class="row marTop">
          有效期：{{ item.end_time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  inject: ['setTitle'],
  mounted () {
    this.setTitle('领券中心')
    this.beforetran()
  },
  methods: {
    beforetran () {
      this.list = []
      var status = 0
      this.$http.post('app/UserCoupon/neckline', { 'status': status }, (res) => {
        this.list = res.data
      })
    },
    lingqu (val, id) {
      if (val === '已领取') {
        return false
      } else if (val === '领取') {
        this.$http.post('app/UserCoupon/claim', { id: id }, (res) => {
          if (res.code === 0) {
            this.$toast.success('领取成功')
          } else {
            this.$toast.fail(res.msg)
            return false
          }
          this.beforetran()
        })
      }
    }
  }
}
</script>
