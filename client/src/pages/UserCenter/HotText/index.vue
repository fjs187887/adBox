<style scoped lang="less">
.body{
  .q-card{
    padding:10px;
    margin-bottom:10px;
    .title{
      display: flex;
      font-weight: bold;
      padding:5px 0 20px;
      align-items: center;
      &>span{
        flex:1;
      }
      &:before{
        height:1.2em;
        content:"";
        padding-right: 3px;
        border-left: 3px solid #666;
      }
    }
  }
  .status{
    .status-close,.status-open{
      text-align: center;
      padding:20px 0 10px;
    }
    .btn-group{
      padding:20px 40px;
      text-align: center;
      .q-btn{
        border-right:1px solid #ccc;
        &:last-child{
          border-right:none;
        }
      }
    }
  }
  .package{
    display:flex;
    flex-wrap: wrap;
    align-content: space-between;
    .item{
      flex:1;
      margin:4px;
      color:#fff;
      height:60px;
      min-width:110px;
      padding-top:8px;
      text-align:center;
      border-radius:5px;
      background-color: #808695;
      &.ivu-radio-wrapper-checked{
        background-color: #E73702;
      }
      .name{
        font-size:14px;
        line-height:2em;
      }
      .desc{
        font-size:12px;
      }
      /deep/.ivu-radio{
        display:none;
      }
    }
  }
  .ivu-table-wrapper /deep/ .ivu-table{
    border-left:1px solid #e1e1e1;
    thead{
      color:rgba(217, 0, 27, 0.803921568627451);
    }
  }
}
</style>
<template>
  <div class="body">
    <q-card class="status" square flat>
      <div class="status-open" v-if="HotVip">
        <span>已开通会员，</span>
        <span>{{HotVip}}到期</span>
      </div>
      <div class="status-close" v-else>您还未开通热文推会员</div>
      <div class="btn-group">
        <q-btn-group rounded spread>
          <q-btn to="/myhot">我的热文</q-btn>
          <q-btn to="/textrecommend">发布热文</q-btn>
        </q-btn-group>
      </div>
    </q-card>
    <q-card square flat>
      <p class="title">会员特权</p>
      <i-table :data="privilege.data" :columns="privilege.columns"></i-table>
    </q-card>
    <q-card square flat>
      <p class="title">
        <span>购买会员</span>
        <!--<q-btn size="xs" color="red" flat @click="openExchange">兑换码</q-btn>-->
      </p>
      <RadioGroup class="package" v-model="form.package">
        <Radio class="item" v-for="item in packages" :key="item.id" :label="item.id">
          <p class="name text-ellipsis">{{item.name}}</p>
          <p class="desc text-ellipsis">{{item.desc}}</p>
        </Radio>
      </RadioGroup>
      <p class="agree text-center q-mb-lg q-mt-lg">
        <Checkbox v-model="form.agree">已阅读并同意 <a href="javascript:;">热文推协议</a></Checkbox>
      </p>
      <Button type="error" :loading="buying" long @click="buy()">立即购买</Button>
    </q-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import privilege from './privilege'
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
      title: '热文推',
      style: { backgroundColor: 'rgba(242, 242, 242, 1)' }
    }
  },
  mounted () {
    this.$http.getHotTextPackages(({ errcode, data, message }) => {
      if (errcode === 0) {
        this.packages = data
        if (this.packages && this.packages[0]) {
          this.form.package = this.packages[0].id
        }
      }
    })
  },
  computed: mapGetters(['info', 'HotVip']),
  methods: {
    ...mapActions(['setUserInfo']),
    buy () {
      if (this.buying) {
        return void 0
      }
      if (!this.form.agree) {
        return void this.$Message.error('请先阅读并同意热文推协议')
      }
      if (!this.form.package) {
        return void this.$Message.error('请选择要购买的套餐')
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
                this.$Message.error(res.data.message || '支付失败')
                break
              case 'cancel':
                console.log(res.status, res)
                break
            }
          }).catch(e => (this.buying = false))
        } else this.$Message(message || '购买失败，请稍后再试。')
      }).catch(e => (this.buying = false))
    },
    openExchange () {}
  }
}
</script>
