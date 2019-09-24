<style scoped lang="less">
.container::before{
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    top: -1px;
    left: 0;
    background: #fff;
    z-index: 2001;
}
.container{
  position: relative;
  padding: 30px 15px 0;
  .q-item{
    padding: 0;
  }
  .nextBtn{
    width: 100%;
    height: 45px;
    color: #fff;
    font-size: 15px;
    border: 0;
    outline: 0;
    border-radius: 3px;
    margin-top:50px;
    box-shadow: none;
    transition: all .2s;
  }
  p.text-center{
    margin-top: 25px;
    font-size: 13px;
    color: #333;
  }
  .btBorder{
    position: relative;
  }
  .formItem{
    padding-bottom: 10px;
    /deep/.ivu-form-item-label{
      font-size: 13px;
      color:#333;
    }
    // 年龄
    /deep/.ivu-input{
      border: 0;
      outline: 0;
      width: 100%;
      font-size: 13px;
      box-shadow: none;
      text-align: right;
      float: right;
    }
    /deep/.ivu-form-item-error-tip{
      display: none;
    }
    // 性别
    .sexBox{
      float: right;
      padding-top: 5px;
      .van-radio{
        float: left;
        margin-left: 10px;
      }
      /deep/.van-radio__label{
        margin-left: 5px;
      }
    }
    // 验证码
    .smsCode{
      float: left;
      width: 60%;
    }
    .s-txt{
      padding-right: 5px;
      font-size: 13px;
      font-weight: normal;
      color: #333;
    }
    .y-txt{
      color: #999;
    }
  }
}
</style>
<template>
  <div class="container animated fadeIn">
    <!-- 新 -->
    <Form class="formBox" :model="form" :label-width="90" label-position="left">
      <!-- 年龄 -->
      <div class="btBorder">
        <FormItem class="formItem" label=" 年龄" required>
          <Input type="text" v-model="form.age"/>
        </FormItem>
      </div>
      <!-- 性别 -->
      <div class="btBorder">
        <FormItem class="formItem" label=" 性别" required>
          <div class="sexBox">
            <van-radio-group v-model="form.sex">
              <van-radio name="1" :value="Number(1)" checked-color="#ff853a">男</van-radio>
              <van-radio name="2" :value="Number(2)" checked-color="#ff853a">女</van-radio>
            </van-radio-group>
          </div>
        </FormItem>
      </div>
      <!-- 地址 -->
      <div class="btBorder">
        <FormItem class="formItem" label="所在地" required>
          <city-selector v-model="form.reside" dense set-first></city-selector>
          <!-- <Cascader :data="data" v-model="form.reside"></Cascader> -->
        </FormItem>
      </div>
      <div class="btBorder">
        <FormItem class="formItem" label="家乡" required>
          <city-selector v-model="form.hometown" dense set-first></city-selector>
        </FormItem>
      </div>
      <!-- 手机号 -->
      <div v-if="!logined" class="btBorder">
        <FormItem class="formItem" label="手机号" required>
          <Input type="text" v-model="form.phone" maxlength="11"/>
        </FormItem>
      </div>
      <div v-if="!logined" class="btBorder">
        <FormItem class="formItem" label="验证码" required>
          <Input class="smsCode" v-model="form.smsCode" maxlength="6"/>
          <div style="float:right">
            <q-btn v-if="verify_code_time === 0" class="s-txt" dense flat @click="sendVerifyCode">
              <span class="s-txt">发送验证码</span>
            </q-btn>
            <loading v-else-if="verify_code_time>60" center size="20" />
            <span v-else class="s-txt y-txt" style="opacity:.7;">已发送{{verify_code_time}}</span>
          </div>
        </FormItem>
      </div>
      <!-- 按钮 -->
      <q-btn :disabled="disabled" class="nextBtn" color="primary" @click="bindInfo()">下一步</q-btn>
      <p class="text-center">完善个人信息，接更多任务赚钱。</p>
    </Form>
    <!-- 结束 -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Loading from 'app/src/components/loading'
import citySelector from 'app/src/components/city-selector'
export default {
  components: { Loading, citySelector },
  inject: ['registerLeftComponent'],
  data () {
    return {
      title: '个人信息',
      form: {
        phone: '',
        smsCode: '',
        reside: 0,
        hometown: 0,
        sex: 1,
        age: null,
        _quick: this.$route.params.bind_id
      },
      isRegister: false,
      verify_code_time: 0
    }
  },
  computed: {
    disabled () {
      return !/^\d{2}$/.test(this.form.age)
    },
    ...mapState({
      LoginBack: state => state.app.LoginBack
    }),
    ...mapGetters(['logined'])
  },
  methods: {
    ...mapActions(['loginOut', 'updateInfo', 'setUserInfo', 'clearLoinBack']),
    sendVerifyCode () {
      this.verify_code_time = 61
      let fn = () => {
        this.verify_code_time -= 1
        if (this.verify_code_time > 0) {
          setTimeout(fn, 1000)
        }
      }
      this.$http[this.logined ? 'updatePhoneSmsCode' : 'loginSmsCode'](this.form.phone, ({ errcode, data, message }) => {
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
    bindInfo () {
      // console.log(this.form)
      if (this.logined) {
        this.$http.userUpdateInfo(this.form, ({ errcode, data, message }) => {
          if (errcode === 0) {
            this.setLoginInfo(data)
          } else this.$Message.error(message || '数据更新失败，请重试')
        })
      } else {
        if (!/^(\+86)?1[3-9]\d{9}$/.test(this.form.phone)) {
          return void this.$Message.error('手机号格式不正确')
        }
        if (/^\s*$/.test(this.form.vcode)) {
          return void this.$Message.error('请输入验证码')
        }
        this.$http.login({
          type: `${this.$route.params.bind_type}|info`,
          data: {
            phone: this.form.phone,
            verify: this.form.smsCode,
            quick_key: this.form._quick,
            ...this.form
          }
        }, ({ errcode, data, message }) => {
          if (errcode === 0) this.setLoginInfo(data)
          else this.$Message.error(message || '登录失败')
        })
      }
    },
    setLoginInfo (data) {
      this.isRegister = true
      this.setUserInfo(data)
      if (this.LoginBack) {
        this.$router.replace(this.LoginBack)
        this.clearLoinBack()
      } else this.$router.back()
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!this.isRegister) {
      this.loginOut()
      this.$http.loginOut()
    }
    next()
  }
}
</script>
