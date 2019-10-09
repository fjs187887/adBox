<style lang="less" scoped>
  .textBox{
    font-size: 14px;
    padding: 0 15px;
    color: #666;
    margin-top: 30px;
    margin-bottom: 50px;
    line-height: 24px;
  }
  .btnBox{
    padding: 15px 15px;
    .itemBox{
      display: flex;
      height: 104px;
      width: 100%;
      margin-bottom: 15px;
      align-items: center;
      font-size: 18px;
      color: #fff;
      background-size: 100%;
      p{
        padding-left: 13%;
        margin-right: 9%;
      }
      img{
        width: 10px;
        height: 20px;
      }
    }
    .itemGr{
      background-image: url('/statics/UserCenter/Attestation/newa.png');
    }
    .itemQy{
      background-image: url('/statics/UserCenter/Attestation/newb.png');
    }
    .itemQx{
      background-image: url('/statics/UserCenter/Attestation/newc.png');
    }
  }
</style>

<template>
  <div class="animated fadeIn">
    <div class="btnBox">
      <div v-for="(item, index) in list" :key="index" :style="getStyle(item.imgurl)" @click="to(item)" class="itemBox">
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['setTitle'],
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.setTitle('新手指南')
    this.$http.post('app/UserInvite/guide', {}, (res) => {
      if (res.code === 0) {
        this.list = res.data
      }
    })
    this.$http.post('app/PromotionTask/buypoint', { type: 'get', name: 'llxszn' }, (res) => {
      var time = res.data
      if (time === 'not') {
        return false
      } else {
        var t
        clearTimeout(t)
        t = setTimeout(() => {
          this.$http.post('app/PromotionTask/buypoint', { type: 'query', name: 'llxszn' }, (res) => {
            if (res.code === 0) {
              this.$toast.success({
                message: '浏览新手指南奖励金币'
              })
            }
          })
        }, time * 1000)
      }
    })
  },
  methods: {
    to (val) {
      this.$router.push({ path: '/Goldmall/guide_detail', query: { data: val } })
    },
    getStyle (src) {
      return 'background-image: url(' + src + ');'
    }
  }
}
</script>
