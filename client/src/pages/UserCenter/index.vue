<style scoped lang="less">
.line{
  height: 5px;
  width: 100%;
  background: #f2f2f2;
}
.fixBar{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: #fff;
  padding: 0 15px;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
  opacity: 0;
  transition: opacity .2s;
  .toph{
    width: 100%;
    height:60px;
    line-height: 60px;
    .titBox{
      float: left;
      color: #333;
      font-size: 13px;
      font-weight: 500;
    }
    .imgBox{
      float: right;
      height: 60px;
      width: 19px;
      .q-img{
        width: 19px;
        height: 22px;
      }
    }
  }
}
.bgBox{
  background-color: #f2f2f2;
  background-image: url('../../statics/user/tbg.png');
  background-size: 100% 100%;
  height:auto;
  padding:0 15px;
  .topHeader{
    width: 100%;
    height:60px;
    line-height: 60px;
    .imgBox{
      float: right;
      height: 60px;
      width: 19px;
      .q-img{
        width: 19px;
        height: 22px;
      }
    }
  }
  .cardBox{
    background: #fff;
    border-radius: 5px;
    .userHide{
      padding-top: 15px;
      width: 100%;
      .q-avatar{
        margin-left: 15px;
        width:50px;
        height: 50px;
      }
      .userNameBox{
        display: flex;
        align-items:center;
        height: 50px;
        line-height: 50px;
        .userName{
          display: inline-block;
          max-width: 180px;
          font-size: 22px;
          font-weight: 600;
          color: #333;
          margin-left: 15px;
        }
        .imgs{
          margin-left:15px;
          display: inline-block;
          width: 26px;
          height: 11px;
          background-image: url('../../statics/TaskHall/geren.png');
          background-size: 100% 100%;
        }
        .img2{
          background-image: url('../../statics/TaskHall/qiye.png')!important;
        }
      }
    }
    .moneyBox{
      width:100%;
      padding-top: 30px;
      box-sizing: content-box;
      color: #333;
      div{
        display: inline-block;
        width: 33%;
        text-align: center;
        padding-bottom: 18px;
        p{
          display: block;
          font-size: 15px;
          font-weight:500;
          margin-bottom: 9px;
          line-height: 1;
          color: #333;
        }
        span{
          font-size: 13px;
          line-height: 1;
        }
      }
      .lrLine{
        position: relative;
        &:after{
          content: '';
          position: absolute;
          right: 0;
          top: 7px;
          background: #f2f2f2;
          height: 25px;
          width: 1px;
          display: inline-block;
        }
        &:before{
          content: '';
          position: absolute;
          left: 0;
          top: 7px;
          background: #f2f2f2;
          height: 25px;
          width: 1px;
          display: inline-block;
        }
      }
    }
  }
}
.boxItem{
  padding: 0 15px 20px;
  .itemTit{
    font-size:14px;
    font-weight: 600;
    color:#333;
    padding: 20px 0;
  }
  .itemContent{
    .contentBox{
      width: 25%;
      p{
        font-size: 13px;
        padding-top: 10px;
        color: #333;
        img{
          width: 24px;
          height: 24px;
        }
      }
    }
    .contentTd{
      position: relative;
      padding:15px 5px;
      font-size: 13px;
      color: #333;
    }
    /deep/.ivu-cell-arrow{
      color: rgb(188,188,188);
      right: 5px!important;
      font-size: 13px!important;
    }
    /deep/.ivu-cell-footer{
      color: rgb(188,188,188)!important;
    }
  }
  .callbtmBtn{
    position: absolute;
    bottom: 20px;
    border: 0;
    outline: 0;
    opacity: 0;
    display: block;
    width: 90%;
    height: 55px;
  }
}
</style>

<template>
<q-page class="animated fadeIn">
<!-- 未登录
<div v-show="false">
  <div class="fixBar">
    <div class="toph">
      隐藏显示昵称
      <div class="titBox">
        <router-link class="userName text-ellipsis" to="/login">注册 / 登录</router-link>
      </div>
      <router-link to="/login" class="imgBox">
        <q-img src="../../statics/user/setting1.png"></q-img>
      </router-link>
    </div>
  </div>
  外层背景盒子
  <div class="bgBox container">
    顶部设置栏
    <div class="topHeader">
      <router-link to="/login" class="imgBox">
        <q-img src="../../statics/user/setting.png"></q-img>
      </router-link>
    </div>
    <div class="cardBox">
    头像栏
      <row class="userHide" type="flex" align="middle">
        <i-col>
          <router-link class="aa" to="/login">
            <q-avatar>
              <img src="../../statics/footer/wd.png"/>
            </q-avatar>
          </router-link>
        </i-col>
        <i-col class="userNameBox">
          <router-link class="userName text-ellipsis" to="/login">注册 / 登录</router-link>
        </i-col>
      </row>
    零钱 金币
      <row class="moneyBox" type="flex" align="middle">
        <div>
          <router-link to="/login">***</router-link>
          <span>零钱</span>
        </div>
        <div class="lrLine">
          <router-link to="/login">***</router-link>
          <span>金币</span>
        </div>
        <div>
          <router-link to="/login">***</router-link>
          <span>零钱</span>
        </div>
      </row>
    </div>
  </div>
  <div class="line"></div>
  用户中心栏
  <div class="boxItem">
    <div class="itemTit">用户中心</div>
    <row class="itemContent text-center" type="flex">
      <div class="contentBox">
        <router-link to="/login">
          <p><img src="../../statics/user/1.png" alt=""></p>
          <p>我的任务</p>
        </router-link>
      </div>
      <div class="contentBox">
        <router-link to="/login">
          <p><img src="../../statics/user/2.png" alt=""></p>
          <p>我的关注</p>
        </router-link>
      </div>
      <div class="contentBox">
        <router-link to="/Ticket">
          <p><img src="../../statics/user/3.png" alt=""></p>
          <p>佣金券</p>
        </router-link>
      </div>
      <div class="contentBox">
        <router-link to="/Invit">
          <p><img src="../../statics/user/4.png" alt=""></p>
          <p>我的邀请</p>
        </router-link>
      </div>
    </row>
  </div>
  <div class="line"></div>
  商家服务栏
  <div class="boxItem">
    <div class="itemTit">商家服务</div>
    <row class="itemContent text-center" type="flex">
      <div class="contentBox">
        <router-link to="/login">
          <p><img src="../../statics/user/5.png" alt=""></p>
          <p>我的发布</p>
        </router-link>
      </div>
      <div class="contentBox">
        <router-link to="/login">
          <p><img src="../../statics/user/6.png" alt=""></p>
          <p>我的订单</p>
        </router-link>
      </div>
      <div class="contentBox">
        <router-link to="/login">
          <p><img src="../../statics/user/7.png" alt=""></p>
          <p>认证中心</p>
        </router-link>
      </div>
      <div class="contentBox">
        <p><img src="../../statics/user/8.png" alt=""></p>
        <p>商家号</p>
      </div>
    </row>
  </div>
  <div class="line"></div>
  <div class="boxItem">
    <div class="itemTit">其他服务</div>
    <cell-group class="itemContent">
      <Cell class="contentTd" title="任务中心" to="/login" />
      <Cell class="contentTd" title="新手指南" to="/login" />
      <Cell class="contentTd" title="意见反馈" to="/service/feedback" />
      <Cell class="contentTd" extra="40000-20000" title="客服中心" @click="callPhone()"></Cell>
    </cell-group>
  </div>
</div>  -->
<!-- 已登录 -->
<div>
  <div :style="opacityStyle" v-show="showAbs" class="fixBar">
    <div class="toph">
      <!-- 隐藏显示昵称 -->
      <div class="titBox">
        <span>{{info.nickname}}</span>
      </div>
      <router-link to="/user/info/setting" class="imgBox">
        <q-img src="statics/user/setting1.png"></q-img>
      </router-link>
    </div>
  </div>
  <!-- 外层背景盒子 -->
  <div class="bgBox container">
    <!-- 顶部设置栏 -->
    <div class="topHeader">
      <router-link to="/user/info/setting" class="imgBox">
        <q-img src="statics/user/setting.png"></q-img>
      </router-link>
    </div>
    <div class="cardBox">
    <!-- 头像栏 -->
      <row class="userHide" type="flex" align="middle">
        <i-col>
          <router-link class="aa" to="/user/info">
            <q-avatar>
              <img :src="info.avatar || 'statics/user/avatar.png'"/>
            </q-avatar>
          </router-link>
        </i-col>
        <i-col class="userNameBox">
          <router-link class="userName text-ellipsis" to="/user/info">{{info.nickname}}</router-link>
          <!-- 切换标签图标 -->
          <span class="imgs img1"></span>
          <span v-if="false" class="imgs img2"></span>
        </i-col>
      </row>
    <!-- 零钱 金币 -->
      <row v-if="info" class="moneyBox text-center" type="flex" align="middle">
        <div @click="startPage('/wallet')">
          <p >{{accountInfo.wallet_balance || 0}}</p>
          <span>零钱</span>
        </div>
        <div class="lrLine" @click="startPage('/Goldmall')">
          <p >{{accountInfo.wallet_virtule_coin || 0}}</p>
          <span>金币</span>
        </div>
        <div @click="startPage('/bill-task')">
          <p >{{accountInfo.order || 0}}</p>
          <span>账单</span>
        </div>
      </row>
    </div>
  </div>
  <div class="line"></div>
  <!-- 用户中心栏 -->
  <div class="boxItem">
    <div class="itemTit">用户中心</div>
    <row class="itemContent text-center" type="flex">
      <div class="contentBox">
        <router-link to="/sharetask/task-all">
          <p><img src="statics/user/1.png" alt=""></p>
          <p>我的任务</p>
        </router-link>
      </div>
      <div class="contentBox">
        <router-link to="/Myattention/index">
          <p><img src="statics/user/2.png" alt=""></p>
          <p>我的关注</p>
        </router-link>
      </div>
      <div class="contentBox">
        <router-link to="/Ticket">
          <p><img src="statics/user/3.png" alt=""></p>
          <p>佣金券</p>
        </router-link>
      </div>
      <div class="contentBox">
        <router-link to="/Invit">
          <p><img src="statics/user/4.png" alt=""></p>
          <p>我的邀请</p>
        </router-link>
      </div>
    </row>
  </div>
  <div class="line"></div>
  <!-- 商家服务栏 -->
  <div class="boxItem">
    <div class="itemTit">商家服务</div>
    <row class="itemContent text-center" type="flex">
      <div class="contentBox">
        <router-link to="/userreleasetask">
          <p><img src="statics/user/5.png" alt=""></p>
          <p>我的发布</p>
        </router-link>
      </div>
      <div class="contentBox">
        <router-link to="/user/hot-text/index">
          <p><img src="statics/user/6.png" alt=""></p>
          <p>热文推</p>
        </router-link>
      </div>
      <div class="contentBox" @click="attes">
        <router-link to="">
          <p><img src="statics/user/7.png" alt=""></p>
          <p>认证中心</p>
        </router-link>
      </div>
      <div class="contentBox" @click="shoppingcart()">
        <p><img src="statics/user/8.png" alt=""></p>
        <p>商家号</p>
      </div>
    </row>
  </div>
  <div class="line"></div>
  <!-- 其他服务栏 -->
  <div class="boxItem">
    <div class="itemTit">其他服务</div>
    <cell-group class="itemContent">
      <!-- <Cell class="contentTd" title="成为合伙人" to="/user/register/copartner" /> -->
      <!-- <Cell class="contentTd" title="成为服务商" to="/user/register/servicer" /> -->
<!--      <Cell class="contentTd btBorder" title="热文推" to="/textrecommend/text-hot" />-->
      <Cell class="contentTd btBorder" title="任务中心" to="/taskcenter" />
      <Cell class="contentTd btBorder" title="新手指南" to="/user/guide" />
      <Cell class="contentTd btBorder" title="意见反馈" to="/service" />
      <Cell class="contentTd btBorder" extra="40000-20000" title="客服中心" @click="callPhone()"></Cell>
    </cell-group>
  </div>
</div>
</q-page>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // isGrQy: true
      opacityStyle: {
        opacity: 0
      },
      showAbs: false,
      accountInfo: ''
    }
  },
  computed: {
    ...mapState({
      info: state => state.user.info
    }),
    wallet: () => ({ balance: 10000, virtual_coin: 100 })
  },
  mounted () {
    window.addEventListener('scroll', this.topName)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.topName)
  },
  created () {
    this.getInfo()
  },
  methods: {
    topName () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 0) {
        let opacity = scrollTop / 60
        // console.log(scrollTop, opacity)
        opacity = opacity > 1 ? 1 : opacity
        this.opacityStyle = { opacity }
        this.showAbs = true
      } else {
        this.showAbs = false
      }
    },
    callPhone () {
      this.$q.dialog({
        title: '确认拨打',
        message: '40000-20000',
        ok: '拨打',
        cancel: true,
        persistent: true,
        class: 'call'
      }).onOk(() => {
        console.log('>>>> OK')
      }).onOk(() => {
        console.log('>>>> second OK catcher')
      }).onCancel(() => {
        console.log('>>>> Cancel')
      }).onDismiss(() => {
      })
    },
    shoppingcart () {
      this.$http.post('app/UserAuthentication/check_isauth', (res) => {
        if (res.code === 0) {
          if (res.data) {
            if (res.data.audit_status === 2) {
              this.$router.push({ path: '/Shoppingcart/detail', query: { data: this.$store.state.user.info } })
            } else if (res.data.audit_status === 0) {
              this.$toast.fail('认证正在审核中')
            } else if (res.data.audit_status === 1) {
              this.$toast.fail('认证审核不通过')
            }
          } else {
            this.$toast.fail('请先进行认证')
          }
        } else {
          this.$toast.fail('网络错误')
        }
      })
    },
    getInfo () {
      this.$http.userCenter(data => {
        if (data.code === 0 && data.data) {
          this.accountInfo = data.data
        } else {
        }
      }).catch(e => {
        console.log(e)
      })
    },
    startPage (path) {
      this.$router.push(path)
    },
    attes () {
      this.$http.post('app/UserAuthentication/checksta', {}, (res) => {
        if (res.data === 1) {
          this.$router.push({ path: '/Attestation/examine' })
        } else {
          this.$router.push({ path: '/Attestation/index' })
        }
      })
    }
  }
}
</script>
