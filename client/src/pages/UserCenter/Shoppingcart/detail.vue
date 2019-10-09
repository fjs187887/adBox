<style lang="less" scoped>
// 头
.head{
  padding: 30px 15px;
  .avatarBox{
    overflow: hidden;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-right: 12px;
    img{
      width:100%;
    }
  }
  .nameBox{
    color: #333;
    div{
      padding-top: 5px;
      font-size: 14px;
      font-weight: 600;
      padding-bottom: 3px;
    }
    p{
      font-size: 12px;
      margin-top:10px;
      .q-btn{
        padding: 0;
        min-height: 0;
        /deep/.q-icon{
          font-size: 11px!important;
        }
      }
    }
  }
  // 数量
  .numBox{
    margin-top: 40px;
    .zunumber{
      color: #333;
      p{
        text-align: center;
        font-size: 13px;
      }
      .number{
        margin-bottom: 10px;
        font-size: 15px;
        font-weight: 600;
      }
    }
    .LRborder{
      position: relative;
      &:before{
        content: '';
        height: 80%;
        position: absolute;
        bottom: 10%;
        left: 0;
        border-right: 1px solid #e6e6e6!important;
        transform: scaleX(0.5)!important;
      }
      &:after{
        content: '';
        height: 80%;
        position: absolute;
        bottom: 10%;
        right: 0;
        border-right: 1px solid #e6e6e6!important;
        transform: scaleX(0.5)!important;
      }
    }
  }
}
// 内
.info{
  padding: 0 15px;
  .int{
    position: relative;
    padding: 22px 0;
    span{
      font-size: 13px;
      color: #333;
    }
    >div{
      height: 14px;
      img{
        height: 100%;
      }
    }
  }
}
// 弹
/deep/.van-dialog__content{
  padding: 15px 0;
}
/deep/.van-button{
  font-size: 14px;
}
</style>

<template>
  <div class="animated fadeIn">
    <!-- 头 -->
    <div class="head">
      <!-- 头像 名称简介 -->
      <div class="row">
        <div class="col-4 avatarBox">
          <span v-if="contact.avatar"><img :src="contact.avatar"></span>
          <span v-else><img src="statics/user/avatar.png"></span>
        </div>
        <div class="col-8 nameBox">
          <div>
            认证：<span>{{contact.name}}</span>
          </div>
          <p>
            简介：<span class="col">{{contact.auth_introduction}}</span>
            <q-btn class="col-2" flat align="right" @click="introduction(contact.auth_introduction)"  icon="launch"></q-btn>
          </p>
          <p>
            主营业务：<span>{{contact.main_business}}</span>
            <q-btn class="col-2" flat align="right"  @click="main_business(contact.main_business)" icon="launch"></q-btn>
          </p>
        </div>
      </div>
      <!-- 数量 -->
      <div class="row numBox">
        <div class="col-4 zunumber">
          <p class="col-12 number" @click="gotask()" v-if="contact.task">{{contact.task}}</p>
          <p class="col-12 number" @click="gotask()" v-else>0</p>
          <p class="col-12">任务</p>
        </div>
        <div class="col-4 zunumber LRborder">
          <p class="col-12 number" @click="gofan()" v-if="contact.fanscount">{{contact.fanscount}}</p>
          <p class="col-12 number" v-else>0</p>
          <p class="col-12">粉丝</p>
        </div>
        <div class="col-4 zunumber">
          <p class="col-12 number" @click="govisitor()" v-if="contact.visitorcount">{{contact.visitorcount}}</p>
          <p class="col-12 number"  v-else>0</p>
          <p class="col-12">访客</p>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <!-- 内 -->
    <div class="info">
      <div @click="gomessage()" class="row int btBorder">
        <span class="col">私信消息</span>
        <div>
          <img src="statics/money/arrow.png" alt="">
        </div>
      </div>
      <div @click="gotask()" class="row int btBorder">
        <span class="col">任务查看</span>
        <div>
          <img src="statics/money/arrow.png" alt="">
        </div>
      </div>
      <div @click="gofan()" class="row int btBorder">
        <span class="col">粉丝管理</span>
        <div>
          <img src="statics/money/arrow.png" alt="">
        </div>
      </div>
      <div @click="govisitor()" class="row int btBorder">
        <span class="col">访客统计</span>
        <div>
          <img src="statics/money/arrow.png" alt="">
        </div>
      </div>
    </div>
    <!-- vant弹框 -->
    <van-dialog v-model="prompt" confirm-button-color="#ff854a" @cancel="cancel" @confirm="submit(auth_introduction)" title="简介" show-cancel-button>
      <van-field v-model="auth_introduction" autosize placeholder="请输入简介" />
    </van-dialog>
    <van-dialog v-model="prompt1" confirm-button-color="#ff854a" @cancel="cancel1" @confirm="submitmain(main_business1)" title="主营业务" show-cancel-button>
      <van-field v-model="main_business1" autosize placeholder="请输入主营业务" />
    </van-dialog>
    <!-- 简介弹框 -->
    <!-- <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">简介</div>
        </q-card-section>
        <q-card-section>
          <q-input dense v-model="auth_introduction" autofocus @keyup.enter="prompt = false" />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" @click="cancel()" />
          <q-btn flat label="确定" @click="submit(auth_introduction)" />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
    <!-- 主营弹框 -->
    <!-- <q-dialog v-model="prompt1" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">主营业务</div>
        </q-card-section>
        <q-card-section>
          <q-input dense v-model="main_business1" autofocus @keyup.enter="prompt1 = false" />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" @click="cancel1()" />
          <q-btn flat label="确定" @click="submitmain(main_business1)" />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      contact: '',
      userinfo: '',
      prompt: false,
      prompt1: false,
      auth_introduction: '',
      main_business1: ''
      // address: ''
    }
  },
  inject: ['registerRightComponent', 'setTitle'],
  mounted () {
  },
  created () {
    this.getinfo()
  },
  methods: {
    gomessage () {
      this.$router.push({ path: '/message/user/:uid' })
    },
    introduction () {
      this.prompt = true
    },
    main_business () {
      this.prompt1 = true
    },
    cancel () {
      this.prompt = false
    },
    cancel1 () {
      this.prompt1 = false
    },
    submit (data) {
      this.$http.post('app/business/introduction', { auth_introduction: data }, (res) => {
        if (res.code === 0) {
          this.$toast.success('修改成功')
          this.prompt = false
          this.getinfo()
        } else {
          this.$toast.fail('修改失败')
        }
      })
    },
    submitmain (data) {
      this.$http.post('app/business/revise', { main_business: data }, (res) => {
        if (res.code === 0) {
          this.$toast.success('修改成功')
          this.prompt1 = false
          this.getinfo()
        } else {
          this.$toast.fail('修改失败')
        }
      })
    },
    gotask () {
      this.$router.push({ path: '/userreleasetask' })
    },
    gofan () {
      this.$router.push({ path: 'fan' })
    },
    govisitor () {
      this.$router.push({ path: 'visitors' })
    },
    getinfo () {
      this.$http.post('app/business/business_info', (res) => {
        if (res.code === 0) {
          this.contact = res.data
          this.setTitle(this.contact.nickname)
          this.main_business1 = this.contact.main_business
        } else {
        }
      })
    }
  }
}
</script>
