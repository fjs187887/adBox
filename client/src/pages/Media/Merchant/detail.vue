<template>
  <q-layout>
    <div class="row head bg-primary" >
      <div class="col-2 img">
        <q-avatar>
          <img src="/statics/app-logo-128x128.png">
        </q-avatar>
        <q-btn class="col-2  renzh" color="white" text-color="black">已认证</q-btn>
      </div>
      <div class="row col-8 font-size14">
        <div class="col-12 detail" >
          <span class="fw1">曹操</span>
          <span class="fw1">北京朝阳区</span>
        </div>
        <div class="col-12 fw">入住时间：2019-7-31</div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 zh">
        <p style="padding: 0 10px;font-size: 14px">服务商简介</p>
      </div>
      <div class="col-12 border-zh">
        <p style="padding: 0 10px;font-size: 12px;margin: 20px 0;">曹操百万大军直指刘备</p>
      </div>
    </div>
    <div class="col-12 friend">
      <div class="row tj">
        <div class="col-6">已接单：50</div>
        <div class="col-6">交付周期：5天</div>
      </div>
    </div>
    <div class="row quote-2">
      <div class="col-12 quote" >
        <span>报价</span>
      </div>
      <div class="col-12 quote-1">
        <span class="text-primary">20元</span>
      </div>
    </div>
    <div class="row quote-2">
      <div class="col-12 quote" >
        <span>擅长</span>
      </div>
      <div class="col-12 hy-1">
        <div class="col-12 fw">软文编辑，图片设计</div>
      </div>
    </div>
    <div class="row quote-3">
      <div class="col-12 quote" >
        <span>历史任务截图</span>
      </div>
      <div class="col-12 quote-1">
        <q-avatar>
          <img src="/statics/app-logo-128x128.png">
        </q-avatar>
      </div>
    </div>
    <div class="row col-12">
      <q-btn class="col-12 bg-primary text-white" @click="gofrom()">提交购买表单</q-btn>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'TaskCenter',
  inject: ['setTitle', 'setToLable', 'setToUrl'],
  mounted () {
    this.setTitle('内容服务商详情')
    this.setToLable('')
    this.setToUrl('')
  },
  data () {
    return {
      dataInfo: [
      ]
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
    height: 100px;
    border-radius: 10px;
    margin: 12px;
    padding: 12px;
    font-size: 16px;
  }
  .renzh{
    border-radius: 6px;
    min-height: auto;
    padding: 5px 5px;
    height: 20px;
    margin: 5px 0;
    font-size: 12px;
    line-height: 1;
  }
  .hy{
    border-radius: 6px;
    min-height: auto;
    padding: 5px 5px;
    height: 20px;
    margin: 5px 10px;
    font-size: 12px;
    line-height: 1;
  }
  .tj{
    margin: 20px;
  }
  .fw{
    font-size: 12px;
    padding: 0 10px;
  }
  .fw1{
    /*border: 1px #eee solid;*/
    font-size: 14px;
    border-radius: 4px;
    padding: 2px;
    margin: 0 10px;
  }
  .fw{
    font-size: 14px;
    padding: 0 10px;
  }
  .detail{
    height: 0px;
  }
  .img{
    padding: 0 5px;
  }
  .font-size14{
    padding: 0 15px;
    color: #eeeeee;
  }
  .zh{
    /*margin: 12px;*/
    padding:  12px;
  }
  .border-zh{
    border-bottom: #eeeeee 1px solid;
    /*margin: 12px;*/
    padding: 0 12px;
  }
  .friend{
    border-bottom: #eeeeee 10px solid;
    margin: 20px 0;
  }
  .quote-2{
    border-bottom: #eeeeee 10px solid;
    margin: 20px 0;
  }
  .quote-3{
    /*border-bottom: #eeeeee 10px solid;*/
    margin: 20px 0;
  }
  .quote{
    font-size: 14px;
    padding: 0 20px;
  }
  .quote-1{
    font-size: 12px;
    margin: 20px 0;
    padding: 0 20px;
  }
  .hy-1{
    font-size: 12px;
    margin: 10px 0;
    padding: 0 10px;
  }
</style>
