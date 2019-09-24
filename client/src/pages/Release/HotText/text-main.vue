<style lang="less" scoped>
  .head{
    text-align: center;
    background:url('../../../statics/TaskHall/rwBar.png');
    background-size: 100%;
    padding: 20px 0;
    margin: 10px 15px 5px;
    color: #fff;
    overflow: hidden;
    font-size: 13px;
    height: 85px;
    line-height: 45px;
    transition: height .3s; /* 吸顶时间 */
  }
  .border-top-10{
    border-top: 6px #eee solid;
    padding: 20px 12px;
    margin-top: 20px;
    color: black;
    font-size: 13px;
  }

  .xieyi {
    text-align: center;
    font-size: 12px;
    color: #666;
    padding-top: 20px;

    span {
      color: rgb(255, 90, 61)
    }
  }

  .enterBtn {
    padding: 10px 15px 15px;

    .q-btn {
      width: 100%;
      font-size: 13px;
      height: 40px;
      box-shadow: none;
    }
  }
  .pay-item {
    border-radius: 10px;
    width: 30%;
    height: 60px;
    margin: 0 1.5%;
    line-height: 2;
    background: #9e9e9e;
  }
  .pay-item.primarys {
    background: #ff853a;
  }

  .diaTop{
    padding: 0;
    line-height: 3;
    text-align: center;
    width: 100%;
    font-weight: 500;
    background-size: 100%;
  }
  .diaTit{
    font-size: 18px;
  }
  .diaCen{
    padding: 30px 15px 10px;
  }
  .diaCen .ydjl{
    line-height: 1;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 15px;
    font-size: 14px;
    color: #333;
  }
  .diaCen .ydjl span{
    color: rgb(255,133,58);
    margin-right:10px;
  }
  .diaCen p{
    margin: 20px 0;
    font-size: 13px;
    color: #333;
  }
  .diaBtn{
    width: 100%;
    margin: 0 15px;
    margin-bottom: 20px;
  }
</style>

<template>
  <q-layout>
    <p v-if="isVip" style="line-height: 3;text-align: center;width: 100%">1个月套餐  2019-07-01到期</p>
    <p v-else style="line-height: 3;text-align: center;width: 100%">您还未开通热文推会员</p>
    <div class="row head">
      <div class="col-6" @click="startPage('/myhot')" style="border-right: 1px #fff solid">
      <p>我的热文</p>
    </div>
    <div class="col-6" @click="startPage('/textrecommend')">
      <p>发布热文</p>
    </div>
    </div>
    <p class="border-top-10">用户特权</p>
    <div style="border: 1px #eeeeee solid;margin: 12px;padding: 12px 0">
      <div class="row text-center text-black">
        <div class="col-4">会员能力</div>
        <div class="col-4">普通用户</div>
        <div class="col-4">会员用户</div>
      </div>
      <br>
      <br>
      <div class="row text-center" v-for="item in dataInfo" :key="item.id" style="line-height: 2;border-top: 1px #eeeeee solid">
        <div class="col-4">{{item.name}}</div>
        <div class="col-4">{{item.common}}</div>
        <div class="col-4">{{item.vip}}</div>
      </div>
    </div>
    <div class="row full-width border-top-10">
      <p class="col-6">购买会员</p>
      <p class="col-6 text-right text-primary" @click="persistent=true">兑换码</p>
    </div>
    <div class="row text-center text-white">
      <div class=" pay-item" :class="{primarys: payType===0}" @click="checked(0)">
        <p> 一个月：50元</p>
        <p>50元/月</p>
      </div>
      <div class=" pay-item" :class="{primarys: payType===1}" @click="checked(1)">
        <p> 一季度：120元</p>
        <p>40元/月</p>
      </div>
      <div class=" pay-item" :class="{primarys: payType===2}" @click="checked(2)">
        <p> 一年：360元</p>
        <p>30元/月</p>
      </div>
    </div>
    <div style="position: fixed;bottom:0;width: 100%">
      <div class="xieyi">
        <q-radio v-model="accept" val="line" label="已阅读并同意 "><span>《热文推协议》</span></q-radio>
      </div>
      <div class="bg-transparent enterBtn">
        <q-btn rounded color="primary" class="fBtn" @click="toPay(payType)">立即
          <span v-if="isVip">续费</span>
          <span v-else>购买</span>
        </q-btn>
      </div>
    </div>
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-primary text-white">
        <q-card-section class="diaTop" algn="center">
          <div class="diaTit">兑换热文推会员</div>
        </q-card-section>
        <q-card-section class="diaCen bg-white text-black">
          <q-input v-model="dhm" placeholder="请输入兑换码"></q-input>
        </q-card-section>
        <q-card-actions align="center" class="bg-white text-white">
          <q-btn class="diaBtn bg-primary" flat label="确认兑换" v-close-popup @click="duihuan()"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-layout>
</template>

<script>
export default {
  inject: ['setTitle'],
  mounted: function () {
    this.setTitle('热文推')
  },
  data () {
    return {
      dataInfo: [
        {
          id: '0',
          name: '顶部平台广告',
          common: '不可去除',
          vip: '去除'
        },
        {
          id: '1',
          name: '自选热文',
          common: '5次/月',
          vip: '不限量'
        },
        {
          id: '2',
          name: '推荐热文',
          common: '5篇/月',
          vip: '不限量'
        },
        {
          id: '3',
          name: '底部广告',
          common: '1条',
          vip: '8条轮播'
        }
      ],
      persistent: false,
      accept: false,
      dhm: '',
      payType: 0,
      isVip: true
    }
  },
  created () {
  },
  methods: {
    startPage (path) {
      this.$router.push({ path: path, query: '' })
    },
    duihuan (value) {
      if (!value) {
        this.$toast.fail('请输入兑换码')
        return
      }
      console.log(this.dhm)
    },
    toPay (type) {
      if (this.accept === false) {
        this.$toast.fail('您需要先接受许可证和条款')
        return
      }
      console.log(type)
    },
    checked (type) {
      this.payType = type
    }
  }
}
</script>
