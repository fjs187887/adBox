<template>
  <q-layout>
    <div class="head">
      <i-form>
        <form-item><q-input dense label="服务商名称" v-model="username"/></form-item>
        <form-item><q-input dense label="服务商联系方式" v-model="phone"/></form-item>
        <form-item><q-input dense label="地区" v-model="area"/></form-item>
        <form-item><q-input dense label="擅长" v-model="industry"/></form-item>
        <form-item><q-input dense label="报价" v-model="budget"/></form-item>
        <form-item style="text-align: right;"><slot/></form-item>
        <form-item>
          <q-input
            v-model="text"
            filled
            label="服务商简介"
            type="textarea"
          ></q-input>
        </form-item>
        <form-item>
          <q-avatar>
            <img src="/statics/app-logo-128x128.png">
          </q-avatar>
        </form-item>
      </i-form>
      <i-form>
        <q-btn class="bg-primary text-white btn-sub" @click="gofrom()">提交</q-btn>
      </i-form>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'TaskCenter',
  inject: ['setTitle', 'setToLable', 'setToUrl'],
  mounted () {
    this.setTitle('推广意向')
    this.setToLable('')
    this.setToUrl('')
  },
  data () {
    return {
      dataInfo: [
      ],
      username: '',
      phone: '',
      area: '',
      industry: '',
      budget: '',
      text: ''
    }
  },
  methods: {
    gofrom () {
      this.$router.push('/merchantpromotion')
    }
  }
}
</script>
<style scoped>
  .head{
    margin: 40px 0;
    padding: 0 20px;
    height: 100%;
  }
  .btn-sub{
    width: 100%;
    border-radius: 10px;
  }
</style>
