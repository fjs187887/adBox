<style scoped lang="less">
  .phone{
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
      color: rgb(188,188,188)!important;
      caret-color: #ff853a;
      /deep/.q-field__native{
        padding-left: 5px;
      }
    }
    /deep/input::-webkit-input-placeholder {
      color: #bcbcbc!important;
      opacity: 1;
    }
    .sendBtn{
      position: relative;
      :before{
        content: '';
        width:1px;
        height: 27px;
        position: absolute;
        top: 4px;
        left: 0;
        border-left: 1px solid rgba(188,188,188,.5); //获取验证码 线
        transform: scaleX(0.5)
      }
      .send{
        font-size: 13px;
        color: rgb(188,188,188);  //获取验证码 字
        font-weight: normal;
      }
      .send.on{
      color: #ff853a!important;
    }
    }
    .s-txt{
      font-size: 14px;
      padding-right: 20px;
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
    /deep/.q-field__control::after{
      background: transparent!important;
    }
    /deep/.q-field__control::before{
      border-bottom: transparent!important;  //input框 底线
    }
  }
</style>
<template>
  <div class="phone animated fadeIn">
    <h6>手机验证码登录</h6>
    <i-form>
      <!-- 手机号 -->
      <form-item>
        <q-input
        class="btBorder"
        clearable
        clear-icon="close"
        v-model="phone"
        placeholder="请输入您的手机号"
        hide-bottom-space
        maxlength="11"
      />
      </form-item>
      <!-- 验证码 -->
      <form-item>
        <q-input  dense
                  class="btBorder"
                  placeholder="请输入手机验证码"
                  v-model="verify_code"
                  maxlength="6">
          <template slot="append">
            <q-btn  class="sendBtn"
                    v-if="verify_code_time === 0"
                    flat
                    @click="sendVerifyCode">
              <span class="send"
                    :class="isOn == true ? 'on' : ''">获取验证码 </span>
            </q-btn>
            <loading v-else-if="verify_code_time>60" center size="20" />
            <span v-else
                  class="s-txt"
                  style="opacity:.7">已发送({{verify_code_time}}) </span>
          </template>
        </q-input>
      </form-item>
      <!-- 登录按钮 -->
      <form-item>
        <q-btn class="loginBtn" color="primary"
               :disabled="disabled"
               :loading="logining"
               @click="login">登录</q-btn>
      </form-item>
    </i-form>
  </div>
</template>
<script>
import Loading from 'app/src/components/loading'
export default {
  components: { Loading },
  data () {
    return {
      phone: '',
      verify_code: '',
      logining: false,
      verify_code_time: 0
    }
  },
  computed: {
    isOn () {
      return /^1[3-9]\d{9}$/.test(this.phone)
    },
    disabled () {
      return !/^1[3-9]\d{9}$/.test(this.phone) || !this.verify_code
    }
  },
  methods: {
    sendVerifyCode () {
      this.verify_code_time = 61
      let fn = () => {
        this.verify_code_time -= 1
        if (this.verify_code_time > 0) {
          setTimeout(fn, 1000)
        }
      }
      this.$http
        .loginSmsCode(this.phone, ({ errcode, data, message }) => {
          if (errcode === 0) {
            fn()
            this.$Message.info({
              content: `${data}`,
              duration: 5
            })
          } else {
            this.verify_code_time = 0
            this.$Message.error(message || '验证码发送失败')
          }
        })
        .catch(e => {
          this.verify_code_time = 0
          this.$Message.error('验证码发送失败')
        })
    },
    login () {
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        return void this.$Message.error('手机号格式不正确')
      }
      if (/^\s*$/.test(this.verify_code)) {
        return void this.$Message.error('请输入验证码')
      }
      this.logining = true
      let result = this.$http.login({
        type: 'sms-code',
        data: {
          phone: this.phone,
          verify: this.verify_code
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
