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
// 弹框
.q-card{
  border-radius: 0;
  .goldBox{
    padding: 10px 15px 15px;
    text-align: center;
    p{
      margin: 15px 0 15px;
    }
    .mar{
      font-size: 12px;
      color: rgb(255,200,90);
    }
    .q-btn{
      box-shadow: none;
      width: 100%;
      border-radius: 25px;
    }
  }
}
.TxtBox{
  padding: 15px;
  >h3{
    font-size: 15px;
    line-height: 24px;
    font-weight: normal;
    color: #333;
    text-align: center;
  }
  p{
    font-size: 13px;
    color: #666;
    padding: 5px 0;
  }
  p.sTit{
    font-size: 14px;
    color:#333;
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
      <div class="titleBox" style="margin-top: 15px;">
        <div class="row">
          <p class="col-6">{{ info.name }}</p>
          <div class="col-6">
            <q-linear-progress rounded :value="progress" color="primary" />
          </div>
        </div>
        <div class="row">
          <p class="col-5">{{ info.price }}</p>
          <p class="col-7">已参与<span class="text-primary">{{ info.yi_count }}</span>人，剩余<span class="text-primary">{{ info.sheng_count }}</span>人</p>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <!-- 参加人员 -->
    <div class="cenRy row">
      <p class="col-3">参加人员</p>
      <span class="col-9" @click="tocanuser">
        <q-avatar size="25px" style="margin-right: 5px;" v-for="item in headers" :key="item.id">
          <img :src="item.avatar || 'statics/user/avatar.png'">
        </q-avatar>
        {{ spec.label }}
      </span>
    </div>
    <div class="line"></div>
    <!-- 商品详情 -->
    <div class="cenInfo">
      <div class="infoItem">
        <p class="itemTit">商品详情</p>
        <div class="itemContent" v-html="info.content"></div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottomBox topBorder">
      <q-btn v-if="info.is_btn" color="primary" label="我要抽奖" @click="exchange" />
      <q-btn disable v-else label="抽奖结束" />
    </div>
    <!-- 弹框 -->
    <q-dialog v-model="position" position="bottom">
      <q-card>
        <div class="goldBox">
          <p>我的金币：{{ forms.gold }}</p>
          <van-stepper v-model="value" min="1" max="10" @minus="onMinus" @plus="onPlus"/>
          <p class="mar">1次 = {{ info.price }}</p>
          <q-btn color="primary" :label=forms.allgold  @click="okprize" />
        </div>
      </q-card>
    </q-dialog>
    <!-- 开奖规则 -->
    <q-dialog v-model="alert">
      <q-card>
        <div class="TxtBox">
          <h3>开奖规则</h3>
          <p>1、参与人次满额后自动开奖。</p>
          <p>2、参与人次越多，中奖机会越大。</p>
          <p>3、系统随机抽取1个中奖号码。</p>
        </div>
        <q-card-actions align="center">
          <q-btn flat label="我知道了" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
export default {
  inject: ['setTitle', 'registerRightComponent'],
  data () {
    return {
      slide: 1,
      barlist: [],
      bs_jsrq: [],
      info: {},
      spec: {
        id: 0,
        label: '>'
      },
      spec_title: '',
      query: {},
      alert: false,
      progress: 0,
      position: false,
      forms: {},
      headers: [],
      value: 1
    }
  },
  created () {
    this.setTitle('详情')
    this.registerRightComponent(h => h('q-btn', {
      props: {
        dense: true,
        flat: true
      },
      on: {
        click: () => {
          this.alert = true
        }
      }
    }, '开奖规则'))
  },
  mounted () {
    this.showdata()
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
      this.$http.post('app/Colprize/getgold', {}, (res) => {
        this.forms = res.data
        this.forms.allgold = '共计' + this.info.price_gold + '金币，确定抽奖'
        this.forms.gold = this.forms.gold - this.info.price_gold
        if (this.forms.gold < 0) {
          this.$toast.fail('金币不足')
        } else {
          this.position = true
        }
      })
    },
    onPlus () {
      if (this.forms.gold < this.info.price_gold) {
        this.$toast.fail({
          message: '金币不足'
        })
      } else {
        this.forms.num++
        this.forms.gold = this.forms.gold - this.info.price_gold
      }
      this.forms.allgold = '共计' + this.info.price_gold * this.forms.num + '金币，确定抽奖'
    },
    onMinus () {
      this.forms.num--
      this.forms.gold = this.forms.gold + this.info.price_gold
      this.forms.allgold = '共计' + this.info.price_gold * this.forms.num + '金币，确定抽奖'
    },
    okprize () {
      this.$http.post('app/Colprize/okprize', { id: this.info.id, num: this.forms.num }, (res) => {
        if (res.code === 0) {
          this.$toast.success({
            message: '参与成功',
            onClose: () => {
              this.showdata()
              console.log(123)
            }
          })
        } else {
          this.$toast.fail(res.msg)
        }
        this.value = 1
        this.position = false
      })
    },
    tocanuser () {
      this.$router.push({ path: '/Goldmall/partlist', query: { id: this.$route.query.id } })
    },
    showdata () {
      this.$http.post('app/Colprize/prize', { id: this.$route.query.id }, (res) => {
        this.info = res.data.data
        this.barlist = res.data.data.image_url
        this.slide = res.data.data.image_url[0].id
        this.bs_jsrq = res.data.data.spec
        this.spec_title = res.data.data.spectitle
        this.progress = res.data.data.yi_bfb
      })
      this.$http.post('app/Colprize/get_canuser', { id: this.$route.query.id }, (res) => {
        if (res.data.users) {
          this.headers = res.data.users
        }
      })
    }
  }
}
</script>
