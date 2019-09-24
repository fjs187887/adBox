<style scoped lang="less">
  .username{
    padding:20px;
    h6{
      font-size: 24px;
      color: #333;
      line-height: 1;
      font-weight: 700;
      margin-top: 20px;
      margin-bottom: 55px;
    }
    .q-input{
      font-size: 14px;
      color: rgb(188,188,188);
      caret-color: #ff853a;
      /deep/.q-field__native{
        padding-left: 5px;
      }
    }
    /deep/input::-webkit-input-placeholder {
      color: #bcbcbc!important;
      opacity: 1;
    }
    /deep/.q-field__control::after{
      background: transparent!important;
    }
    /deep/.q-field__control::before{
      border-bottom: transparent!important;
    }
    /deep/.q-field__marginal{
      height: auto;
      color: rgba(0,0,0,0.2);
      font-size: 18px;
      padding-right: 5px;
    }
    .loginBtn{
      width: 100%;
      height: 45px;
      font-size: 15px;
      border: 0;
      outline: 0;
      border-radius: 3px;
      box-shadow: none;
      margin-top:30px;
      transition: all .2s;
    }
    .loginBtn:disabled {
      background: #b7bdc7!important;  //登录不可选 背景
    }
    .wPsw{
      display: block;
      margin: 0 auto;
      color: #666;
      text-align: center;
    }
  }
</style>
<template>
  <div class="username animated fadeIn">
    <h6>账号密码登录</h6>
    <i-form>
      <!-- 账号 -->
      <form-item>
        <q-input
        clearable
        clear-icon="close"
        v-model="username"
        placeholder="请输入您的账号"
        hide-bottom-space
        class="btBorder"
      />
      </form-item>
      <!-- 密码 -->
      <form-item>
        <q-input  v-model="password"
                  maxlength="12"
                  class="btBorder"
                  placeholder="请输入密码(6-12位字母和数字组合)"
                  :type="pswd ? 'password' : 'text'"
                  >
          <template slot="append">
            <q-icon
              :name="pswd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="pswd = !pswd"
            />
          </template>
        </q-input>
      </form-item>
      <!-- 登录按钮 -->
      <form-item>
        <q-btn class="loginBtn"
               color="primary"
               :disabled="disabled"
               :loading="logining"
               @click="login()"
        >登录</q-btn>
      </form-item>
    </i-form>
    <!-- 忘记密码 地址待填-->
    <router-link class="wPsw" to="/">忘记密码？</router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      logining: false,
      pswd: true
    }
  },
  computed: {
    disabled () {
      return [this.username, this.password].some(item => /^\s*$/.test(item))
    }
  },
  methods: {
    login () {
      if (/^\s*$/.test(this.username)) {
        return void this.$Message.error('请输入用户名')
      }
      if (/^\s*$/.test(this.password)) {
        return void this.$Message.error('请输入密码')
      }
      this.logining = true
      let result = this.$http.login({
        type: 'passwd',
        data: {
          username: this.username,
          password: this.password
        }
      })
      result.then(({ data }) => {
        this.logining = false
        if (data.errcode === 0) this.$emit('logined', data.data)
        else this.$Message.error(data.message || '登录失败，请稍后重试！')
      })
      result.catch(e => {
        this.logining = false
        this.$Message.error('登录失败，请稍后重试！')
      })
    }
  }
}
</script>
