<style scoped lang="less">
.cenBox{
  .q-carousel{
    height: 375px;
    .q-carousel-slide{
      width: 100%;
    }
  }
  .titleBox{
    padding: 0 15px;
    >.row{
      padding-bottom: 15px;
      p.col-6{
        font-size:14px;
        color:#333;
      }
      >div.col-6{
        padding-top: 8px;
      }
      p.col-5{
        font-size: 12px;
        color: #ff853a;
      }
      p.col-7{
        text-align: right;
        font-size:12px;
        color: #666;
      }
    }
  }
}
.cenRy{
  padding: 0 15px;
  height: 42px;
  align-items: center;
  >p{
    font-size: 13px;
    color:#666;
  }
  >span{
    text-align: right;
  }
}
.cenInfo{
  padding: 0 15px;
  .infoItem{
    p.itemTit{
      padding: 20px 0;
      font-size: 14px;
      color: #333;
      font-weight: 700;
    }
    /deep/.itemContent{
      padding-bottom: 70px;
      ul,li{
        list-style: none;
      }
      img{
        width: 100%;
        height: auto;
      }
      p{
        margin: 5px 0;
      }
    }
  }
}
.bottomBox{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  padding: 16px 15px;
  .q-btn{
    width:100%;
    height: 40px;
    font-weight: normal;
    border-radius: 25px;
    box-shadow: none;
  }
}
</style>

<template>
  <q-layout class="animated fadeIn">
    <!-- 中间 标题 人员数 金币 -->
    <div class="cenBox">
      <q-carousel
          animated
          v-model="slide"
          navigation
          infinite
          autoplay
          transition-prev="slide-right"
          transition-next="slide-left">
        <q-carousel-slide v-for="item in barlist" :key="item.id" :name="item.id" :img-src="item.url" ></q-carousel-slide>
      </q-carousel>
      <div class="titleBox">
        <div class="row">
          <p class="col-6">{{ info.name }}</p>
        </div>
        <div class="row">
          <p class="col-5">{{ info.price }}</p>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <!-- 商品规格 -->
    <div class="row cenRy" @click="show(0,bs_jsrq)" v-if="info.is_spec">
      <p class="col-6">选择规格</p>
      <span class="col-6">{{ spec.label }}</span>
    </div>
    <div class="line" v-if="info.is_spec"></div>
    <!-- 商品详情 -->
    <div class="cenInfo">
      <div class="infoItem">
        <p class="itemTit">商品详情</p>
        <div class="itemContent" v-html="info.content"></div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottomBox topBorder">
      <q-btn color="primary" label="我要兑换" @click="exchange" />
    </div>
  </q-layout>
</template>

<script>
export default {
  inject: ['setTitle'],
  data () {
    return {
      slide: 1,
      barlist: [],
      bs_jsrq: [],
      info: {},
      spec: {
        id: 0,
        label: '请选择规格'
      },
      spec_title: '',
      query: {}
    }
  },
  created () {
    this.setTitle('商品详情')
  },
  mounted () {
    this.$http.post('app/Goods/detials', { id: this.$route.query.id }, (res) => {
      this.info = res.data.data
      this.barlist = res.data.data.image_url
      this.slide = res.data.data.image_url[0].id
      this.bs_jsrq = res.data.data.spec
      this.spec_title = res.data.data.spectitle
    })
  },
  methods: {
    show (value, actions) {
      this.$q.bottomSheet({
        message: this.spec_title,
        actions: actions
      }).onOk(action => {
        this.spec.id = action.id
        this.spec.label = action.label
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    exchange () {
      if (this.info.is_spec === 1) {
        if (!this.spec.id) {
          this.$toast.fail('请选择规格')
          return false
        }
      }
      this.query.specs = this.spec
      this.query.goods_id = this.info.id
      localStorage.setItem('infodata', JSON.stringify(this.query))
      this.$router.push({ path: '/Goldmall/order' })
    }
  }
}
</script>
