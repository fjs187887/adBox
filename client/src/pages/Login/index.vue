<style scoped lang="less">
  .container{
    font-size:13px;
    min-height:100vh;
    background-color:#fff;
    .topBar{
      height: 60px;
      line-height: 60px;
      padding: 0 15px;
      .backLeft{
        width: 8px;
        height: 60px;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 8px;
          height:14px;
        }
      }
      .toggleRight{
        float: right;
        a{
          color: #333;
          font-size: 13px;
        }
      }
    }
    // 登录组件
    .loginComponent{
      // border: 1px solid red;
      padding:20px;
      min-height: calc(~"100vh - 60px - 120px - 50px");
      /deep/.q-field__control{
        height:44px;
      }
    }
    // 其他登录
    .loginOther{
      position: relative;
      bottom: 0;
      width: 100%;
      padding:35px 30px 30px;
      font-size:14px;
      text-align: center;
      &:before{
        z-index:1;
        color: rgba(188,188,188);
        padding:0 15px;
        top:0; left:50%;
        position: absolute;
        content: "使用其他登录方式";
        background-color: #fff;
        transform: translateX(-50%);
      }
      &:after{
        z-index:0;
        content:"";
        width: 78%;
        top:7px; left:50%;
        position:absolute;
        border-top:1px solid rgba(188,188,188,.5);
        transform: translateX(-50%);
      }
      .iconBox{
        padding: 0 30px;
        .iconi{
          width: 45px;
          height: 45px;
          border-radius: 50%;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      p{
        text-align: center;
        font-size: 11px;
        color: #666;
        margin-top: 30px;
      }
    }
  }
</style>
<template>
  <div class="container">
    <!-- 头 -->
    <div class="topBar">
      <div class="backLeft" @click="back">
        <img src="../../statics/login/back.png" alt="">
      </div>
      <div class="toggleRight">
        <a href="javascript:"
        v-for="item in ch_types"
        :key="item.component"
        @click="ch_login_type(item)"
        >
        {{item.name}}登录
        </a>
      </div>
    </div>
    <!-- 登录组件 -->
    <div class="loginComponent">
      <component :is="current_type" @logined="logined"></component>
    </div>
    <!-- 其他登录 -->
    <div class="loginOther">
      <row class="iconBox" type="flex" justify="space-around">
        <i-col v-for="(item, i) in thirdPartyLogin" :key="i">
          <div class="iconi" @click="Open3RD(item)">
            <img :src="item.icon" alt="">
          </div>
        </i-col>
      </row>
      <!-- 用户协议 -->
      <p>登录注册表示您已经阅读并同意<span style="color:red;">《平台用户协议》</span></p>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Login, { types, thirdPartyLogin } from './types'
export default {
  components: { ...Login },
  data () {
    let type = this.$route.params.type && this.$route.params.type.toLowerCase()
    return {
      display: {},
      thirdPartyLogin,
      login_types: types,
      current_type: (types.find(item => item.component === type) || types[0]).component
    }
  },
  computed: {
    ...mapGetters(['info', 'token']),
    ...mapState({
      LoginBack: state => state.app.LoginBack
    }),
    ch_types () {
      return types.filter(item => {
        return item.component !== this.current_type
      })
    }
  },
  methods: {
    ...mapActions(['setUserInfo', 'clearLoinBack', 'loginOut']),
    Open3RD (item) {
      this.$q.loading.show({})
      this.$quickLogin(item.type, (error, data) => {
        if (error) {
          if (error === 'cancel') return this.$q.loading.hide()
          else return this.$Message.error(error)
        }
        this.loginOut()
        this.$http.loginOut().then(() => {
          this.$http.login({ type: item.type, data }, ({ errcode, data, message }) => {
            this.$q.loading.hide()
            if (errcode === 0) this.logined(data)
            else if (errcode === 2033) this.$router.replace(`/user/info/first/${item.type}/${data}`)
            else this.$Message.error(message || '登录失败')
          }).catch(e => {
            this.$q.loading.hide()
            this.$Message.error('网络错误')
          })
        })
      }).catch(e => {
        this.$q.loading.hide()
        this.$Message.error('登录失败')
      })
    },
    ch_login_type (item) {
      this.current_type = item.component
    },
    logined (userinfo) {
      this.setUserInfo(userinfo)
      if (!userinfo.status_desc.PERFECTING_INFO) {
        this.$router.replace('/user/info/first')
      } else {
        if (this.LoginBack) {
          this.$router.replace(this.LoginBack)
          this.clearLoinBack()
        } else this.$router.back()
      }
    },
    back () {
      this.$router.back(-1)
    }
  }
}
</script>
