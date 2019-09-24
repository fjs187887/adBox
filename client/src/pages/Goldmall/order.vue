<style lang="less" scoped>
.itemBox{
  padding: 20px 15px;
  >.col-3{
    img{
      width: 60px;
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
}
.bottomBox{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  align-items: center;
  background: #fff;
  padding: 15px 15px;
  >.col-4{
    color: #333;
    span{
      padding-left: 10px;
      color: rgb(255, 90, 61);
    }
  }
  .q-btn{
    float: right;
    height: 40px;
    box-shadow: none;
    font-weight: normal;
  }
}
</style>

<template>
  <div class="animated fadeIn">
    <!-- title -->
    <div class="row itemBox" @click="to">
      <div class="col-3">
        <img src="https://icweiliimg6.pstatp.com/weili/sm/519149378786689034.webp"/>
      </div>
      <div class="col-9">
        <p>{{ info.name }}</p>
    <!-- 规格 bug -->
        <p class="row itemGg" v-if="is_guige">规格：<span>{{ info.specs.label }}</span></p>
      </div>
    </div>
    <div class="line"></div>
    <!-- bottom -->
    <div class="row bottomBox topBorder">
      <div class="col-4">实付：<span>{{ info.price }}</span></div>
      <div class="col-8">
        <q-btn color="primary" label="确认支付" :loading="is_loading" @click="addorder"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['setTitle'],
  data () {
    return {
      info: [],
      is_guige: false,
      is_loading: false
    }
  },
  mounted () {
    this.setTitle('确认支付')
    this.info = JSON.parse(localStorage.getItem('infodata'))
    this.$http.post('app/Goods/detials', { id: this.info.goods_id }, (res) => {
      this.info = res.data.data
      if (this.info.is_spec === 1) {
        this.is_guige = true
      }
    })
  },
  methods: {
    to () {
      this.$router.push({ path: '/Goldmall/details/', query: { id: this.info.id } })
    },
    addorder () {
      var query = {}
      query.goods_id = this.info.id
      if (this.info.is_spec === 1) {
        query.spec_id = this.info.specs.id
        query.spec_name = this.info.specs.label
      }
      this.is_loading = true
      this.$http.post('app/Order/addorder', query, (res) => {
        if (res.code === 0) {
          this.$toast.success({
            message: '支付成功',
            onClose: () => {
              this.$router.push({ path: '/Goldmall/dhdeta', query: { id: res.data } })
            }
          })
        } else {
          this.$toast.fail('支付失败')
        }
        this.is_loading = false
      })
    }
  }
}
</script>
