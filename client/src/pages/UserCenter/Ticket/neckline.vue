<template>
  <div style="padding: 16px;">
    <div class="row bor" v-for="item in list" :key="item.aid">
      <div class="col-4" style="padding: 40px;width: 36.3333%;" @click="lingqu(item.lqstatus,item.id)">{{ item.lqstatus }}</div>
      <div style="border: 1px dashed #fff"></div>
      <div class="col-6 offset-1" style="padding: 15px;line-height: 35px;">
        <div>
          {{ item.couname }} {{ item.denomination }}
        </div>
        <div>
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
<style scoped>
.bor{
  border-radius: 10px;background-color: #ff853a;color: #fff;font-size: 14px;margin-bottom: 15px;text-align: center;
}
</style>
