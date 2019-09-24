<style lang="less" scoped>
  .formBox{
    padding: 0 15px;
    .q-input{
      position: relative;
      font-size: 13px;
      color: #333;
      padding: 0;
      caret-color: #ff853a;
      /deep/.q-field__native{
        padding-left: 90px;
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    // label
    /deep/.q-field__label{
      transform: unset!important;
      width: 38%;
      font-size: 13px;
      color:#333;
    }
    /deep/.q-field__native .q-placeholder{
      float: right;
    }
    // 下边框
    /deep/.q-field__control::after{
      background: transparent!important;
    }
    /deep/.q-field__control::before{
      border-bottom: transparent!important;
    }
    // 错误提示
    /deep/.q-field__messages.col{
      display: none;
    }
    // 上传
    .uploadBox{
      padding-top: 45px;
      .upItemTit{
        font-size: 15px;
        text-align: center;
        color: #666;
      }
      .upItem{
        margin-top: 40px;
        text-align: center;
        .upSfz{
          margin-top: 20px;
          height: 200px;
          img{
            height:200px;
            max-height: 200px;
          }
        }
      }
    }
  }
  .up-ma{
    position: relative;
    margin-top: 40px;
  }
  .submitBox{
    padding: 20px 15px;
    .q-btn{
      width: 100%;
      height: 40px;
    }
  }
  .q-dialog{
    padding-top: 15px;
  }
  .cardBox{
    position: relative;
    .cardPabt{
      padding-bottom: 50px;
    }
  }
  .d-btnBox{
    position: absolute;
    bottom: 3.5%;
    height: 45px;
    width: 87%;
    box-shadow: 0px -1px 3px #e6e6e6;
    background: #fff;
    .col-6{
      padding: 5px 20px;
      .q-btn{
        height: 35px;
        width: 100%;
      }
    }
  }
</style>

<template>
  <div class="animated fadeIn">
    <div class="q-pa-md" style="max-width: 400px">
      <div style="margin: 10px 0px;font-size: 16px">意见反馈</div>
      <q-input
        v-model="text"
        outlined
        placeholder="请填写您的意见,我们将不断为您改进!"
        type="textarea"
        :rules="ruleData.text"
      />
    </div>
    <div class="formBox">
      <q-input class="btBorder" maxlength="18" v-model="phone_number" dense="true" label="联系电话：" placeholder="请输入联系方式" :rules="ruleData.phone_number"/>
      <q-input class="btBorder" v-model="email" label="邮箱：" placeholder="请输入邮箱"  :rules="ruleData.email"/>
    </div>
    <div class="submitBox" style="position: fixed;bottom: 0;width: 100%">
      <q-btn rounded color="primary" unelevated label="确认提交" @click="confirmOk"/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      text: '',
      phone_number: '',
      email: '',
      loading: false,
      ruleData: {
        type: '',
        text: [
          val => {
            if (/^\s*$/.test(val) || !val) return '请填写意见'
            if (val.length > 200) return '标题不能超过200字'
            return true
          }
        ],
        phone_number: [
          val => {
            if (/^\s*$/.test(val) || !val) return '请填写联系方式'
            if (!/^1[3-9]\d{9}$/.test(val)) return '格式不正确'
            return true
          }
        ],
        email: [
          val => {
            if (/^\s*$/.test(val) || !val) return '请填写邮箱'
            if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/.test(val)) return '邮箱格式不对'
            return true
          }
        ]
      }
    }
  },
  inject: ['setTitle'],
  created () {
  },
  mounted () {
    this.setTitle('意见反馈')
  },
  methods: {
    confirmOk () {
      if (!this.text || !this.phone_number || !this.email) {
        this.$toast.fail('必填项不能为空')
      }
      this.$http.post('app/Idea/add', { text: this.text, phone_number: this.phone_number, email: this.email }, (res) => {
        if (res.code === 0) {
          this.$toast.success('提交成功')
          this.$router.push({ path: 'service' })
        } else {
          this.$toast.fail('提交失败')
        }
      })
    }
  }
}
</script>
