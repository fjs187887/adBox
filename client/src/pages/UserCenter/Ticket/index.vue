<style lang="less" scoped>
.ysy,
.ygq{
  background: #B7BDC7!important;
}
.itemBox{
  margin: 20px 15px;
  padding:15px 30px;
  background: #ff853a;
  border-radius: 5px;
  color: #fff;
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
.bottomBox{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  .col-9{
    padding-left: 15px;
  }
  .q-btn{
    width: 100%;
    font-size: 13px;
    font-weight: normal;
  }
}
// 弹框
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
.bottomDialog{
  padding: 20px 15px 15px;
  background: #fff;
  width: 100%;
  text-align: center;
  p{
    color:#333;
    font-size: 12px;
  }
  .inp{
    width: 70%;
    height: 35px;
    margin: 20px auto 30px;
    /deep/.van-cell{
      font-size: 13px;
      background: #f6f6f6;
    }
  }
  .q-btn{
    width: 100%;
    height: 35px;
    font-size: 13px;
    font-weight: normal;
    box-shadow: none;
    border-radius: 25px;
  }
}
.van-tab{
  font-weight: normal;
  font-size: 13px;
}
/deep/.van-tab--active{
  font-weight: normal;
}
/deep/.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after{
  border-width: 0!important;
}
</style>

<template>
  <div class="animated fadeIn">
    <van-tabs v-model="activeName" swipeable @change="beforetran" title-inactive-color="#333" title-active-color="#ff853a" line-height="0" :offset-top="50" sticky>
      <van-tab title="可使用" name="mails">
        <div class="line"></div>
        <div class="itemBox" v-for="item in list" :key="item.aid">
          <!-- 金额 券 -->
          <div class="row">
            <span class="moneySpan">{{ item.denomination }}</span>
            <span class="col">{{ item.couname }}</span>
          </div>
          <div class="row marTop">
            有效期：{{ item.end_time }}
          </div>
        </div>
        <nodata v-if="nodata"/>
      </van-tab>
      <van-tab title="已使用" name="alarms">
        <div class="line"></div>
        <div class="ysy itemBox row" v-for="item in list" :key="item.aid">
          <!-- 金额 券 -->
          <div class="col-8">
            <div class="row">
              <span class="moneySpan">{{ item.describe }}</span>
              <span class="col">{{ item.couname }}</span>
            </div>
            <div class="row marTop">
              有效期：{{ item.end_time }}
            </div>
          </div>
          <!-- 已使用 -->
          <div class="col-4 img">
            <img src="statics/Goldmall/sy.png" alt="">
          </div>
        </div>
        <nodata v-if="nodata1"/>
      </van-tab>
      <van-tab title="已过期" name="movies">
        <div class="line"></div>
        <div class="ygq itemBox row" v-for="item in list" :key="item.aid">
          <!-- 金额 券 -->
          <div class="col-8">
            <div class="row">
              <span class="moneySpan">{{ item.describe }}</span>
              <span class="col">{{ item.couname }}</span>
            </div>
            <div class="row marTop">
              有效期：{{ item.end_time }}
            </div>
          </div>
          <!-- 已过期 -->
          <div class="col-4 img">
            <img src="statics/Goldmall/gq.png" alt="">
          </div>
        </div>
        <nodata v-if="nodata2"/>
      </van-tab>
    </van-tabs>
    <div class="row bottomBox topBorder">
      <div class="col-3">
        <q-btn outline rounded color="primary" label="兑换码" @click="cdKey"/>
      </div>
      <div class="col-9">
        <q-btn unelevated rounded color="primary" label="金币购买佣金券" v-close-popup @click="confirm"/>
      </div>
    </div>
    <!-- 弹框 -->
    <q-dialog v-model="alert">
      <q-card>
        <div class="TxtBox">
          <h3>使用规则</h3>
          <p class="sTit">如何获取</p>
<!--          <p>1、邀请好友注册，您和好友分别得到2张佣金券；</p>-->
          <p>1、在金币商城可用金币兑换佣金券；</p>
          <p>2、平台活动奖励。</p>
          <p class="sTit">如何使用</p>
          <p>1、分享广告或者领取任务时选择佣金券；</p>
          <p>2、分享广告或者提交任务时消耗佣金券。</p>
        </div>
        <q-card-actions align="center">
          <q-btn flat label="我知道了" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- 兑换弹框 -->
    <q-dialog v-model="position" position="bottom">
      <div class="bottomDialog">
        <p>兑换佣金券</p>
        <div class="inp">
          <van-field input-align="center" clickable v-model="code" placeholder="请输入兑换码" />
        </div>
        <div class="dhBtn">
          <q-btn color="primary" label='确认兑换' @click="okdh" />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      alert: false,
      position: false,
      code: '',
      activeName: 'mails',
      nodata: false,
      nodata1: false,
      nodata2: false
    }
  },
  inject: ['registerRightComponent', 'setTitle'],
  mounted () {
    this.setTitle('我的佣金券')
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
    }, '使用规则'))
    this.beforetran('mails')
  },
  methods: {
    beforetran (newval, oldval) {
      this.list = []
      var status = 0
      if (newval === 'mails') { // 可用
        status = 0
      } else if (newval === 'alarms') { // 已使用
        status = 1
      } else if (newval === 'movies') { // 已过期
        status = 2
      } else {
        return false
      }
      this.$http.post('app/UserCoupon/brokerage', { 'status': status }, (res) => {
        if (res.data.length > 0) {
          this.list = res.data
        } else {
          if (newval === 'mails') { // 可用
            this.nodata = true
          } else if (newval === 'alarms') { // 已使用
            this.nodata1 = true
          } else if (newval === 'movies') { // 已过期
            this.nodata2 = true
          }
        }
      })
    },
    cdKey () {
      this.position = true
    },
    confirm () {
      this.$router.push({ path: '/Goldmall' })
    },
    okdh () {
      if (!this.code) {
        this.$toast.fail({
          message: '请填写兑换码'
        })
        return
      }
      this.$http.post('app/UserCoupon/okdh', { code: this.code }, (res) => {
        if (res.code === 0) {
          this.$toast.success({
            message: '兑换成功',
            onDismiss: () => {
              this.beforetran('mails')
            }
          })
        } else {
          this.$toast.fail({
            message: res.msg
          })
        }
        this.beforetran('mails')
        this.position = false
      })
    }
  }
}
</script>
