<style scoped lang="less">
.topStatus{
  background-color:#ff853a;
  width: 100%;
  height: auto;
  min-height: 100px;
  padding:22px 15px;
  color:#fff;
  .status{
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
    line-height: 1;
  }
  .number{
    width: 100%;
    font-size: 12px;
    word-wrap: break-word;//无
  }
  .prizeBox{
    margin-top: 22px;
    p{
      line-height: 1;
      margin-bottom: 10px;
    }
    .copyBox{
      width: 100%;
      height: auto;
      overflow: hidden;
      .ma{
        float: left;
        min-width: 125px;
        height: 25px;
        line-height: 25px;
        border-radius: 2px;
        background: #fff;
        text-align: center;
        padding: 0 13px;
        font-size: 13px;
        color: #333;
        margin-right: 30px;
      }
      .copy{
        float: left;
        width: 75px;
        height: 25px;
        line-height: 25px;
        border-radius: 2px;
        background: #fff;
        text-align: center;
        color: #ff853a;
      }
    }
  }
}
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
</style>

<template>
  <q-layout class="animated fadeIn">
    <!-- 顶部状态栏 -->
    <div class="topStatus">
      <p class="status">{{ prizeinfo.statusname }}</p>
      <p class="number" style="margin-bottom: 0.4rem;">您的抽奖码：{{ prizeinfo.sn }}</p>
      <p class="number" v-if="prizeinfo.win_sn">中奖码：{{ prizeinfo.win_sn }}</p>
      <!-- 兑换码 -->
      <div v-if="prizeinfo.code" class="prizeBox">
        <p>请复制兑换码前往热文推页面兑换</p>
        <div class="copyBox">
          <div class="ma">{{ prizeinfo.code }}</div>
          <div class="copy" v-clipboard:copy="prizeinfo.code" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</div>
        </div>
      </div>
    </div>
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
          <img :src="item.avatar">
        </q-avatar>
        {{ spec.label }}
      </span>
    </div>
    <div class="line"></div>
    <!-- 抽奖时间 -->
    <div v-if="is_uptime" class="cenRy row">
      <p>抽奖时间：{{ prizeinfo.update_time }}</p>
    </div>
    <div v-if="is_uptime" class="line"></div>
    <!-- 中奖用户 -->
    <div class="" v-if="is_win">
      <p class="cenRy row">中奖用户</p>
      <div class="cenRy row" v-for="item in prizeinfo.winlist" :key="item.id">
        <p class="col-8">
          <q-avatar size="25px">
            <img :src="item.avatar">
          </q-avatar>{{ item.nickname }}（参与{{ item.prize_count }}次）
        </p>
        <span class="col-4" style="float: right;">中奖编号：{{ item.win_sn }}</span>
<!--  <div v-if="is_win">&nbsp;&nbsp;你的中奖编码：{{ prizeinfo.win_sn }}</div> -->
      </div>
    </div>
    <div v-if="is_win" class="line"></div>
    <!-- 商品详情 -->
    <div class="cenInfo">
      <div class="infoItem">
        <p class="itemTit">商品详情</p>
        <div class="itemContent" v-html="info.content"></div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottomBox topBorder">
      <q-btn v-if="is_btn" color="primary" label="我要抽奖" @click="exchange" />
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
  </q-layout>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
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
        label: '>'
      },
      spec_title: '',
      query: {},
      progress: 0,
      position: false,
      forms: {},
      headers: [],
      prizeinfo: [],
      is_win: false,
      is_uptime: false,
      is_btn: false,
      value: 1
    }
  },
  created () {
    this.setTitle('抽奖详情')
  },
  mounted () {
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
    this.$http.post('app/Colprize/cjdeta', { id: this.$route.query.id }, (res) => {
      this.prizeinfo = res.data
      if (res.data.win_sn) {
        this.is_win = true
      }
      if (res.data.update_time) {
        this.is_uptime = true
      }
      if (res.data.status === 1) {
        this.is_btn = true
      }
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
      this.$http.post('app/Colprize/getgold', {}, (res) => {
        this.forms = res.data
        this.forms.allgold = '共计' + this.info.price_gold + '金币，确定抽奖'
        this.forms.gold = this.forms.gold - this.info.price_gold
        if (this.forms.gold < 0) {
          this.$toast.fail('金币不足')
          return false
        } else {
          this.position = true
        }
      })
    },
    onPlus () {
      if (this.forms.gold < this.info.price_gold) {
        this.$toast.fail('金币不足')
        return false
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
          this.$toast.success('参与成功')
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
    onCopy () {
      this.$toast.success({
        message: '已复制'
      })
    },
    onError () {
      this.$toast.fail({
        message: '复制失败'
      })
    }
  }
}
</script>
