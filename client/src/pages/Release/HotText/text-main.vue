<style scoped lang="less">
.body{
  // top北京
  .topBox{
    padding: 0 15px;
    min-height: 160px;
    background-image: url(../../../statics/Hot/bg.png);
    background-size: 100% 100%;
    .topHeader{ // 标题
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      span{
        position: absolute;
        left: 0;
        display: flex;
        width: 8px;
        height: 14px;
        img{
          width: 100%;
        }
      }
      p{
        font-size: 14px;
        color: #fff;
      }
    }
    .statusBox{ // 开通状态
      >div{
        padding: 20px 0;
        align-items: center;
        >span{
          font-size: 15px;
          color:#fff;
          font-weight: 600;
        }
        .rightSpan{
          font-size: 12px;
          color: #fff;
          text-align: right;
        }
      }
    }
    .tabBox{
      height: 55px;
      padding: 15px 0;
      >div{
        position: relative;
        height: 100%;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        &::after{
          border-color: rgb(255,215,55)!important;
        }
        >a{
          color: rgb(255,215,55)
        }
      }
    }
  }
  // 用户特权
  .cenBox{
    padding: 20px 15px;
    .scrollBox{
      width:100%;
      min-height: 115px;
      padding: 20px 0 15px 10px;
      background-image: url(../../../statics/Hot/tqbg.png);
      background-size: 100% 100%;
      >p{
        font-size: 14px;
        color: #333;
        line-height: 1;
        margin-bottom: 15px;
      }
      .itemList{
        white-space: nowrap;
        overflow: hidden;
        overflow-x: scroll;
        display: flex;
        flex-wrap: unset;
        &::-webkit-scrollbar{
          display: none;
        }
        .item{
          float: left;
          width: 50px;
          height: auto;
          margin-right: 15px;
          text-align: center;
          img{
            width: 36px;
            margin-bottom: 10px;
          }
          span{
            display: block;
            width: 100%;
            text-align: center;
            line-height: 1;
            font-size: 12px;
            white-space: nowrap;
            color: #ff853a;
          }
        }
      }
    }
  }
  // 购买套餐
  .buyBox{
    padding: 0 15px;
    .tcBox{
      padding-bottom: 15px;
      background-image: url(../../../statics/Hot/tcbg.png);
      background-size: 100% 100%;
      >p{
        padding: 15px 11px;
        font-size: 14px;
        color: #333;
        line-height: 1;
        span{
          float: right;
        }
      }
      .itemList{
        border-radius: 5px;
        width: 100%;
        background-color: #fff;
      }
    }
  }
  // 套餐选
  .package{
    display:flex;
    width:100%;
    flex-wrap: wrap;
    align-content: space-between;
    .item{
      flex: 1;
      margin: 10px;
      height:auto;
      padding:15px 0;
      text-align:center;
      border-radius:5px;
      border: 1px solid #b7bdc7;
      background-color: #fff;
      &.ivu-radio-wrapper-checked{
        background-color: #fff1e8;
        border: 1px solid #ff853a;
      }
      .name{
        font-size:13px;
        color: #333;
      }
      .price{
        margin: 15px 0;
        font-size: 25px;
        line-height: 1;
        color: rgb(255,90,61);
      }
      .desc{
        color: #999;
        font-size:12px;
      }
      /deep/.ivu-radio{
        display:none;
      }
    }
  }
  // 协议
  .xieyi{
    position: fixed;
    width: 100%;
    bottom: 71px;
    left: 0;
    background-color: #fff;
    p{
      color: #666;
      span{
        color: #ff853a;
      }
    }
    /deep/.ivu-checkbox-wrapper{
      margin-right: 0;
    }
    /deep/.ivu-checkbox-checked>.ivu-checkbox-inner{
      border-color: #ff853a!important;
      background-color: #ff853a!important;
    }
    /deep/.ivu-checkbox-focus{
      box-shadow: none;
    }
  }
  // 底部按钮
  .bottomBox{
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    padding: 15px;
    width: 100%;
    .ivu-btn{
      padding: 0;
    }
    .ivu-btn-error{
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ff853a;
      border: none;
      height: 40px;
      font-size: 13px;
      border-radius: 25px;
    }
    .ivu-btn:focus{
      box-shadow: none;
    }
  }
}
</style>
<template>
  <div class="animated fadeIn body">
    <!-- top背景 -->
    <div class="topBox">
      <!-- 标题 -->
      <div class="topHeader">
        <span @click="onBack('/user')"><img src="statics/Hot/arrow.png" alt=""></span>
        <p>热文推</p>
      </div>
      <div class="statusBox">
        <div class="status-open row" v-if="HotVip">
          <span>您已开通会员</span>
          <span class="rightSpan col">{{HotVip}}到期</span>
        </div>
        <div class="status-close row" v-else>
          <span>您还未开通热文推会员</span>
        </div>
      </div>
      <div class="tabBox row">
        <div class="col-6 riBorder">
          <router-link to="/myhot">我的热文</router-link>
        </div>
        <div class="col-6">
          <router-link to="/textrecommend">发布热文</router-link>
        </div>
      </div>
    </div>
    <!-- 用户特权 -->
    <div class="cenBox">
      <div class="scrollBox">
        <p>用户特权</p>
        <ul class="itemList">
          <li class="item" v-for="(item, index) in itemList" :key="index">
            <img :src="item.imgsrc" alt="">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购买会员 -->
    <div class="buyBox">
      <div class="tcBox">
        <p>购买会员套餐<span @click="openExchange">兑换码</span></p>
        <div class="itemList row">
          <RadioGroup class="package" v-model="form.package">
            <Radio class="item" v-for="item in packages" :key="item.id" :label="item.id">
              <p class="name">{{item.name}}</p>
              <p class="price">{{item.price | money}}</p>
              <p class="desc">{{item.desc}}</p>
            </Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
    <div class="xieyi">
      <p class="agree text-center q-mb-lg q-mt-lg">
        <Checkbox v-model="form.agree">已阅读并同意 <span>《任务发布协议》</span></Checkbox>
      </p>
    </div>
    <div class="bottomBox topBorder">
      <Button type="error" v-if="HotVip" :loading="buying" long @click="buy()">立即续费</Button>
      <Button type="error" v-else :loading="buying" long @click="buy()">立即购买</Button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import privilege from './privilege'
import Vue from 'vue'
Vue.filter('money', val => {
  val = val / 100
  return val
})
export default {
  data () {
    return {
      form: {
        agree: true,
        package: 0
      },
      privilege,
      buying: !1,
      packages: [],
      itemList: [
        {
          imgsrc: 'statics/Hot/dbgg.png',
          name: '顶部广告'
        },
        {
          imgsrc: 'statics/Hot/dibgg.png',
          name: '底部广告'
        },
        {
          imgsrc: 'statics/Hot/tjrw.png',
          name: '推荐热文'
        },
        {
          imgsrc: 'statics/Hot/zxrw.png',
          name: '自选热文'
        },
        {
          imgsrc: 'statics/Hot/xflb.png',
          name: '悬浮轮播'
        },
        {
          imgsrc: 'statics/Hot/xgfx.png',
          name: '效果分析'
        },
        {
          imgsrc: 'statics/Hot/lbcb.png',
          name: '裂变传播'
        }
      ],
      style: { backgroundColor: 'rgba(242, 242, 242, 1)' }
    }
  },
  mounted () {
    this.$http.getHotTextPackages(({ errcode, data, message }) => {
      if (errcode === 0) {
        this.packages = data
        console.log(this.packages)
        if (this.packages && this.packages[0]) {
          this.form.package = this.packages[0].id
        }
      }
    })
  },
  computed: mapGetters(['info', 'HotVip']),
  methods: {
    ...mapActions(['setUserInfo']),
    onBack (value) {
      this.$router.push(value)
    },
    buy () {
      if (this.buying) {
        return void 0
      }
      if (!this.form.agree) {
        return void this.$toast('请先阅读并同意热文推协议')
      }
      if (!this.form.package) {
        return void this.$toast('请选择要购买的套餐')
      }
      this.buying = true
      this.$http.buyHotPackage(this.form, ({ errcode, data, message }) => {
        if (errcode === 0) {
          this.$Pay(data.order_sn, res => {
            this.buying = false
            switch (res.status) {
              case 'success':
                this.buying = true
                this.$http.userGetInfo(this.info.id, ({ errcode, data, message }) => {
                  this.buying = false
                  if (errcode === 0) this.setUserInfo(data)
                }).catch(e => {
                  this.buying = false
                })
                break
              case 'fail':
                this.$toast.fail(res.data.message || '支付失败')
                break
              case 'cancel':
                console.log(res.status, res)
                break
            }
          }).catch(e => (this.buying = false))
        } else this.$toast.fail(message || '购买失败')
      }).catch(e => (this.buying = false))
    },
    openExchange () {}
  }
}
</script>
